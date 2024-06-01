export function getLTV(collateral: number, loan: number) {
    return (collateral / loan) * 100;
}
