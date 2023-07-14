import { NextApiRequest, NextApiResponse } from 'next';
import { Session, getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';
import { mongoDatabaseConnect } from '@/utils/mongoDatabaseConnect';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'PATCH') {
    return;
  }

  const session: Session | null = await getServerSession(req, res, authOptions);

  if (!session) {
    res.status(401).json({ message: 'Użytkownik nie jest uwierzytelniony' });
    return;
  }

  const userEmail = session.user?.email;
  const activePassword = req.body.currentPassword;
  const newPassword = req.body.newPassword;

  const client = await mongoDatabaseConnect();
  const userCollection = client.db().collection('users');
  const loggedUser = await userCollection.findOne({ email: userEmail });

  if (!loggedUser) {
    res.status(404).json({ message: 'Nie znaleziono użytkownika' });
    client.close();
    return;
  }

  const userPassword = loggedUser.password;

  if (userPassword !== activePassword) {
    res.status(403).json({ message: 'Podaj poprawne hasło' });
    client.close();
    return;
  }

  const result = await userCollection.updateOne(
    { email: userEmail },
    { $set: { password: newPassword } },
  );

  client.close();
  res.status(200).json({ message: 'Hasło zostało zmienione' });
}

export default handler;
