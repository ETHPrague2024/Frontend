import type { NextApiRequest, NextApiResponse } from "next";
import { contract } from "@/utilities/contract";
import { LoanEvent, NewLoanAdvertisedEvent, LoanFilledEvent, LoanOfferRevokedEvent } from "@/types/loans";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const newLoanAdvertisedEvents = await contract.queryFilter("NewLoanAdvertised");
        const loanFilledEvents = await contract.queryFilter("LoanFilled");
        const loanOfferRevokedEvents = await contract.queryFilter("LoanOfferRevoked");

        const pastEvents: LoanEvent[] = [
            ...newLoanAdvertisedEvents
                .map((event) => {
                    if (event.args) {
                        return {
                            type: "NewLoanAdvertised",
                            loanID: event.args.loanID,
                            chainId: event.args.chainId,
                            tokenCollateralAddress: event.args.tokenCollateralAddress,
                            tokenCollateralAmount: event.args.tokenCollateralAmount,
                            tokenCollateralIndex: event.args.tokenCollateralIndex,
                            tokenLoanAddress: event.args.tokenLoanAddress,
                            tokenLoanAmount: event.args.tokenLoanAmount,
                            tokenLoanIndex: event.args.tokenLoanIndex,
                            durationOfLoanSeconds: event.args.durationOfLoanSeconds,
                        } as NewLoanAdvertisedEvent;
                    }
                    return null;
                })
                .filter((event) => event !== null),
            ...loanFilledEvents
                .map((event) => {
                    if (event.args) {
                        return {
                            type: "LoanFilled",
                            loanId: event.args.loanId,
                        } as LoanFilledEvent;
                    }
                    return null;
                })
                .filter((event) => event !== null),
            ...loanOfferRevokedEvents
                .map((event) => {
                    if (event.args) {
                        return {
                            type: "LoanOfferRevoked",
                            loanId: event.args.loanId,
                        } as LoanOfferRevokedEvent;
                    }
                    return null;
                })
                .filter((event) => event !== null),
        ];

        res.status(200).json(pastEvents);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch events" });
    }
};

export default handler;
