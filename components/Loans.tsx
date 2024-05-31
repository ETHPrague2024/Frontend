import { useEffect, useState } from "react";
import { contract } from "@/utilities/contract";
import { Box, Text, Stack } from "@chakra-ui/react";
import { LoanEvent, NewLoanAdvertisedEvent, LoanFilledEvent, LoanOfferRevokedEvent } from "@/types/loans";

export const Loans: React.FC = () => {
    const [events, setEvents] = useState<LoanEvent[]>([]);

    useEffect(() => {
        // Fetch past events
        const fetchPastEvents = async () => {
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

            setEvents(pastEvents as LoanEvent[]);
        };

        fetchPastEvents();

        // Listen for new events
        contract.on("NewLoanAdvertised", (loanID: any, chainId: any, tokenCollateralAddress: any, tokenCollateralAmount: any, tokenCollateralIndex: any, tokenLoanAddress: any, tokenLoanAmount: any, tokenLoanIndex: any, durationOfLoanSeconds: any) => {
            console.log("NewLoanAdvertised", {
                loanID,
                chainId,
                tokenCollateralAddress,
                tokenCollateralAmount,
                tokenCollateralIndex,
                tokenLoanAddress,
                tokenLoanAmount,
                tokenLoanIndex,
                durationOfLoanSeconds,
            });

            setEvents((prevEvents) => [
                ...prevEvents,
                {
                    type: "NewLoanAdvertised",
                    loanID: loanID,
                    chainId: chainId,
                    tokenCollateralAddress,
                    tokenCollateralAmount: tokenCollateralAmount,
                    tokenCollateralIndex: tokenCollateralIndex,
                    tokenLoanAddress,
                    tokenLoanAmount: tokenLoanAmount,
                    tokenLoanIndex: tokenLoanIndex,
                    durationOfLoanSeconds: durationOfLoanSeconds,
                } as NewLoanAdvertisedEvent,
            ]);
        });

        contract.on("LoanFilled", (loanId: any) => {
            console.log("LoanFilled", { loanId });

            setEvents((prevEvents) => [
                ...prevEvents,
                {
                    type: "LoanFilled",
                    loanId: loanId,
                } as LoanFilledEvent,
            ]);
        });

        contract.on("LoanOfferRevoked", (loanId: any) => {
            console.log("LoanOfferRevoked", { loanId });

            setEvents((prevEvents) => [
                ...prevEvents,
                {
                    type: "LoanOfferRevoked",
                    loanId: loanId.toNumber(),
                } as LoanOfferRevokedEvent,
            ]);
        });

        // Clean up listeners on component unmount
        return () => {
            contract.removeAllListeners("NewLoanAdvertised");
            contract.removeAllListeners("LoanFilled");
            contract.removeAllListeners("LoanOfferRevoked");
        };
    }, []);

    return (
        <Box p={5}>
            <Text fontSize="xl" mb={5}>
                Loan Events
            </Text>
            <Stack spacing={3}>
                {events.map((event, index) => (
                    <Box key={index} p={4} borderWidth="1px" borderRadius="lg">
                        <Text fontWeight="bold">{event.type}</Text>
                        {Object.entries(event).map(
                            ([key, value]) =>
                                key !== "type" && (
                                    <Text key={key}>
                                        <strong>{key}:</strong> {value.toString()}
                                    </Text>
                                )
                        )}
                    </Box>
                ))}
            </Stack>
        </Box>
    );
};

export default Loans;
