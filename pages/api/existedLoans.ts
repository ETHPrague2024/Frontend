// pages/api/getLoans.ts
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const response = await fetch('http://localhost:8000/fetchLoans');
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching loan data:', error);
    res.status(500).json({ error: 'Failed to fetch loan data' });
  }
}
