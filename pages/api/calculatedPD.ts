import type { NextApiRequest, NextApiResponse } from 'next';
import { loadModelParams } from '../../utilities/loadModelParams';
import { sigmoid, predictProbability } from '../../utilities/pdModel';

let modelParams;

try {
  modelParams = loadModelParams();
} catch (error) {
  console.error('Error loading model parameters:', error);
  modelParams = null;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!modelParams) {
    res.status(500).json({ error: 'Model parameters could not be loaded' });
    return;
  }

  const coefficients = modelParams.coefficients[0];
  const intercept = modelParams.intercept[0];

  try {
    const response = await fetch('http://localhost:3000/api/processLoans');
    const loans = await response.json();

    const pdResults = loans.map((loan: any) => {
      if (loan.loanID) {
        const pd = Math.random() *10; // Generate a random PD value between 0% and 10%
        return { loanID: loan.loanID, pd };
      } else {
        return null;
      }
    }).filter(pdResult => pdResult !== null); // Filter out any null results

    res.status(200).json(pdResults);
  } catch (error) {
    console.error('Error calculating PD:', error);
    res.status(500).json({ error: 'Failed to calculate PD' });
  }
}
