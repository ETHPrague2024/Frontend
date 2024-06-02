import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const response = await fetch("http://localhost:8000/fetchLoans");
        const data = await response.json();

        const loansWithMoreInfo = await Promise.all(
            data.loanCreateds.map(async (loan: any) => {
                try {
                    const moreInfoResponse = await fetch(`https://api.pwn.xyz/api/v1/loan/loan/${loan.loanId}`);
                    const moreInfo = await moreInfoResponse.json();
                    return {
                        ...loan,
                        moreInfo,
                    };
                } catch (error) {
                    console.error(`Error fetching more info for loan ID ${loan.loanId}:`, error);
                    return {
                        ...loan,
                        moreInfo: null,
                    };
                }
            })
        );

        res.status(200).json({ loanCreateds: loansWithMoreInfo });
    } catch (error) {
        console.error("Error fetching loan data:", error);
        res.status(500).json({ error: "Failed to fetch loan data" });
    }
}
