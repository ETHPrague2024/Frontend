import type { NextApiRequest, NextApiResponse } from "next";
import fetch from "node-fetch";
import { Loan } from "@/types/loans";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const id = req.query.id as string;

    try {
        const response = await fetch("http://localhost:3000/api/processLoans");
        const loans: Loan[] = await response.json();

        const loan = loans.find((loan) => loan.loanID === parseInt(id));

        if (loan) {
            res.status(200).json(loan);
        } else {
            res.status(404).json({ message: `Loan with ID ${id} not found` });
        }
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: "Failed to fetch loan data", error: error.message });
        } else {
            res.status(500).json({ message: "Failed to fetch loan data", error: "Unknown error" });
        }
    }
}
