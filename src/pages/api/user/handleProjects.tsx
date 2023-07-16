import { authOptions } from '@/pages/api/auth/[...nextauth]';
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
}

export default handler;
