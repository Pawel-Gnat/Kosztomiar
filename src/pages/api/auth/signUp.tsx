import { mongoDatabaseConnect } from '@/utils/mongoDatabaseConnect';
import { NextApiRequest, NextApiResponse } from 'next/types';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return;
  }

  const data = req.body;
  const { name, email, password } = data;

  const client = await mongoDatabaseConnect();
  const db = client.db();

  const existingUser = await db.collection('users').findOne({ email: email });

  if (existingUser) {
    res.status(422).json({ message: 'Użytkownik już istnieje' });
    client.close();
    return;
  }

  const result = await db.collection('users').insertOne({
    name,
    email,
    password,
  });

  res.status(201).json({ message: 'Utworzono konto' });
  client.close();
}

export default handler;
