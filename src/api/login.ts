
import { NextApiRequest, NextApiResponse } from 'next';
import { loginHandler } from '../service/loginHandler';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const result = await loginHandler(req.body.email, req.body.password);
      res.status(200).json(result);
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ message: 'Login failed' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
