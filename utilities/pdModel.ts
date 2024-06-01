export function sigmoid(z: number): number {
    return 1 / (1 + Math.exp(-z));
  }
  
  export function predictProbability(features: number[], coefficients: number[], intercept: number): number {
    const z = intercept + features.reduce((sum, feature, index) => sum + feature * coefficients[index], 0);
    return sigmoid(z);
  }
  