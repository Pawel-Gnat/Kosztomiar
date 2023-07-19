import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { Project } from '@/types/types';
import { mongoDatabaseConnect } from '@/utils/mongoDatabaseConnect';
import { NextApiRequest, NextApiResponse } from 'next';
import { Session, getServerSession } from 'next-auth';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session: Session | null = await getServerSession(req, res, authOptions);

  if (!session) {
    res.status(401).json({ message: 'Użytkownik nie jest uwierzytelniony' });
    return;
  }

  const userEmail = session.user?.email;

  const client = await mongoDatabaseConnect();
  const userCollection = client.db().collection('users');
  const loggedUser = await userCollection.findOne({ email: userEmail });

  if (!loggedUser) {
    res.status(404).json({ message: 'Nie znaleziono użytkownika' });
    client.close();
    return;
  }

  if (req.method === 'GET') {
    client.close();
    res.status(200).json(loggedUser.projects);
  }

  if (req.method === 'POST' && req.body.project) {
    const project = req.body.project;
    await userCollection.updateOne(
      { email: userEmail },
      { $addToSet: { projects: project } },
    );
    client.close();
    res.status(200).json({ message: 'Utworzono nowy projekt', status: 'success' });
  }

  if (req.method === 'POST' && req.body.category) {
    const { projectId, newCategory } = req.body.category;
    const query = { 'projects.id': projectId };
    const update = { $addToSet: { 'projects.$.data': newCategory } };
    await userCollection.updateOne(query, update);
    client.close();
    res.status(200).json({ message: 'Utworzono nową kategorię', status: 'success' });
  }

  if (req.method === 'PUT' && req.body.project) {
    const project = req.body.project;
    await userCollection.updateOne(
      { email: userEmail },
      { $pull: { projects: project } },
    );
    client.close();
    res.status(200).json({ message: 'Projekt został usunięty', status: 'success' });
  }

  if (req.method === 'PUT' && req.body.category) {
    const { projectId, categoryName } = req.body.category;
    const query = { 'projects.id': projectId };
    const update = { $pull: { 'projects.$.data': { category: categoryName } } };
    await userCollection.updateOne(query, update);
    client.close();
    res.status(200).json({ message: 'Kategoria została usunięta', status: 'success' });
  }

  if (req.method === 'PATCH' && req.body.category) {
    const { projectId, currentCategoryName, newCategoryName } = req.body.category;
    const query = {
      'projects.id': projectId,
      'projects.data.category': currentCategoryName,
    };
    const update = {
      $set: {
        'projects.$[project].data.$[categoryData].category': newCategoryName,
      },
    };
    const arrayFilters = [
      { 'project.id': projectId },
      { 'categoryData.category': currentCategoryName },
    ];
    await userCollection.updateOne(query, update, { arrayFilters });
    client.close();
    res.status(200).json({ message: 'Kategoria została zmieniona', status: 'success' });
  }
}

export default handler;
