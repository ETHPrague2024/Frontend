// pages/api/metrics.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const response = await axios.get('http://localhost:8000/metrics', {
      timeout: 30000 // 30 seconds timeout
    });
    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error fetching metrics data:', error);
    res.status(500).json({ error: 'Failed to fetch metrics data from the server' });
  }
};

export default handler;
