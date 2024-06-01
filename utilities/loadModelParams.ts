import fs from 'fs';
import path from 'path';

interface ModelParams {
  coefficients: number[][];
  intercept: number[];
}

let modelParams: ModelParams | null = null;

export const loadModelParams = (): ModelParams => {
  if (!modelParams) {
    const filePath = path.resolve(process.cwd(), 'model_params.json');
    try {
      const data = fs.readFileSync(filePath, 'utf8');
      modelParams = JSON.parse(data);
    } catch (error) {
      console.error('Failed to load model parameters:', error);
      throw new Error('Failed to load model parameters');
    }
  }
  if (!modelParams) {
    throw new Error('Model parameters are null');
  }
  return modelParams;
};
