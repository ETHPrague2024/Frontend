import { useEffect, useState } from "react";
import { contract } from "@/utilities/contract";
import { Box, Text, Stack, Heading, VStack, HStack, Divider, Badge, Icon, useColorModeValue } from "@chakra-ui/react";
import { LoanEvent, NewLoanAdvertisedEvent, LoanFilledEvent, LoanOfferRevokedEvent } from "@/types/loans";
import { FaCheckCircle, FaTimesCircle, FaBullhorn } from "react-icons/fa";

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

    const bgColor = useColorModeValue("white", "gray.800");
    const boxShadow = useColorModeValue("md", "dark-lg");

    const getIcon = (type: string) => {
        switch (type) {
            case "NewLoanAdvertised":
                return <Icon as={FaBullhorn} boxSize={6} color="green.500" />;
            case "LoanFilled":
                return <Icon as={FaCheckCircle} boxSize={6} color="blue.500" />;
            case "LoanOfferRevoked":
                return <Icon as={FaTimesCircle} boxSize={6} color="red.500" />;
            default:
                return null;
        }
    };

    const keyMapping: { [key: string]: string } = {
        loanID: "Loan ID",
        chainId: "Chain ID",
        tokenCollateralAddress: "Collateral Address",
        tokenCollateralAmount: "Collateral Amount",
        tokenCollateralIndex: "Collateral Index",
        tokenLoanAddress: "Loan Address",
        tokenLoanAmount: "Loan Amount",
        tokenLoanIndex: "Loan Index",
        durationOfLoanSeconds: "Loan Duration (seconds)",
        loanId: "Loan ID",
    };

    return (
        <Box p={5}>
            <Heading mb={5}>Loan Events</Heading>
            <Stack spacing={4}>
                {events.map((event, index) => (
                    <Box key={index} p={5} borderWidth="1px" borderRadius="lg" bg={bgColor} boxShadow={boxShadow}>
                        <HStack justifyContent="space-between">
                            <HStack>
                                {getIcon(event.type)}
                                <Badge colorScheme={event.type === "NewLoanAdvertised" ? "green" : event.type === "LoanFilled" ? "blue" : "red"}>{event.type}</Badge>
                            </HStack>
                            <Text fontSize="sm" color="gray.500">
                                Event ID: {index + 1}
                            </Text>
                        </HStack>
                        <Divider my={3} />
                        <VStack align="start" spacing={2}>
                            {Object.entries(event).map(
                                ([key, value]) =>
                                    key !== "type" && (
                                        <HStack key={key} alignItems="baseline">
                                            <Text fontWeight="bold">{keyMapping[key] || key}:</Text>
                                            <Text>{value.toString()}</Text>
                                        </HStack>
                                    )
                            )}
                        </VStack>
                    </Box>
                ))}
            </Stack>
        </Box>
    );
};

export default Loans;
