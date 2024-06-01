import { Box, Flex, Text, Icon, Avatar, VStack, HStack, Button } from "@chakra-ui/react";
import { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { FaCheckCircle, FaArrowLeft } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

import { getNetworkName } from "@/utilities/getNetworkName";
import { formatAddress } from "@/utilities/formatAddress";

import { getDateFromBlockNumber } from "@/utilities/getDateFromBlockNumber";
import { formatDate } from "@/utilities/formatDate";
import { getLTV } from "@/utilities/getLTV";

type LoanDetailsType = {
    borrowerAddress: string;
    chainIdLoan: string;
    tokenCollateralAddress: string;
    tokenCollateralAmount: number;
    tokenCollateralIndex: number;
    collateralDetails: any;
    tokenLoanAddress: string;
    tokenLoanAmount: number;
    tokenLoanIndex: number;
    tokenLoanRepaymentAmount: number;
    durationOfLoanSeconds: number;
    loanDetails: any;
    blockNumber: number;
};

const LoanDetails: NextPage = () => {
    const router = useRouter();
    const { id } = router.query;

    const { address } = useAccount();
    const [loanDetails, setLoanDetails] = useState<LoanDetailsType | null>(null);
    const [networkName, setNetworkName] = useState<string | null>(null);
    const [secondsToDays, setSecondsToDays] = useState<string | null>(null);
    const [randomAssetValue, setRandomAssetValue] = useState<number | null>(null);
    const [loanCreated, setLoanCreated] = useState<string | null>(null);
    const [ltv, setLTV] = useState<string | null>(null);

    useEffect(() => {
        if (id) {
            fetch(`/api/getProcessedLoan/${id}`)
                .then((response) => response.json())
                .then((data) => setLoanDetails(data))
                .catch((error) => console.error("Error fetching loan details:", error));
        }
    }, [id]);

    useEffect(() => {
        async function fetchNetworkName() {
            if (loanDetails) {
                const networkName = await getNetworkName(loanDetails.chainIdLoan);
                setNetworkName(networkName);
            }
        }

        async function convertSecondsToDays() {
            if (loanDetails) {
                const days = (loanDetails.durationOfLoanSeconds / 86400).toFixed(0);
                setSecondsToDays(days);
            }
        }

        async function getRandomAssetValueAndLTV() {
            if (loanDetails) {
                const randomValue = Math.floor(Math.random() * 91) + 10;
                setRandomAssetValue(randomValue * loanDetails.tokenCollateralAmount);

                const randomValueLTV = Math.floor(Math.random() * (70 - 15 + 1) + 15);
                setLTV(randomValueLTV.toFixed(2));
            }
        }

        async function getLoanCreatedDate() {
            if (loanDetails) {
                await getDateFromBlockNumber(loanDetails.blockNumber).then((date) => {
                    setLoanCreated(formatDate(date as string));
                });
            }
        }

        fetchNetworkName();
        convertSecondsToDays();
        getRandomAssetValueAndLTV();
        getLoanCreatedDate();
    }, [loanDetails]);

    console.log(loanDetails);
    return (
        <>
            <Head>
                <title>ETH Prague 2024 - Loan Details</title>
                <meta name="description" content={`Loan details for ${id}`} />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>
                {loanDetails ? (
                    <Flex bg="gray.900" color="white" minH="100vh" align="center" justify="start" p={10} direction="column">
                        <Flex w="full" maxW="4xl" justify="space-between" align="center" mb={4}>
                            <Flex align="center">
                                <Button onClick={() => router.back()} leftIcon={<FaArrowLeft />} variant="link" color="teal.500">
                                    Back
                                </Button>
                                <Text fontSize="5xl" fontWeight="bold" ml={4}>
                                    Loan {id}
                                </Text>
                            </Flex>
                            <Flex align="center">
                                <Text fontSize="2xl" fontWeight="bold">
                                    {networkName}
                                </Text>
                            </Flex>
                        </Flex>
                        <Flex direction="column" w="full" maxW="4xl" bg="gray.800" p={8} borderRadius="md" boxShadow="xl">
                            <Flex justify="space-between" mb={4}>
                                <VStack align="start">
                                    <Text fontSize="2xl" fontWeight="bold">
                                        Collateral for loan
                                    </Text>
                                    <Flex align="center">
                                        <Box bg="teal.500" p={4} borderRadius="full">
                                            <Icon as={FaCheckCircle} boxSize={12} color="gray.900" />
                                        </Box>
                                        <Box ml={4}>
                                            <Text fontSize="xl" fontWeight="bold">
                                                {loanDetails?.tokenCollateralAmount} {loanDetails?.collateralDetails?.symbol}
                                            </Text>
                                            <Text fontSize="sm">
                                                <Link href="https://etherscan.io/" target="blank">
                                                    {loanDetails?.tokenCollateralAddress}
                                                </Link>
                                            </Text>
                                        </Box>
                                    </Flex>
                                    <Text mt={2} fontSize="2xl" fontWeight="bold">
                                        Estimated Value: ${randomAssetValue}
                                    </Text>
                                </VStack>
                                <VStack align="start">
                                    <Text>Loan Request Created: {loanCreated}</Text>
                                    <HStack>
                                        <VStack align="start">
                                            <Text>Borrower</Text>
                                            <HStack>
                                                <Avatar name={loanDetails?.borrowerAddress} />
                                                <Text>{formatAddress(loanDetails?.borrowerAddress)}</Text>
                                            </HStack>
                                        </VStack>
                                    </HStack>
                                    <HStack spacing={10}>
                                        <VStack align="start">
                                            <Text>Duration</Text>
                                            <Text fontSize="2xl" fontWeight="bold">
                                                {secondsToDays} Days
                                            </Text>
                                        </VStack>
                                        <VStack align="start">
                                            <Text>Expires in</Text>
                                            <Text fontSize="2xl" fontWeight="bold">
                                                5 Days
                                            </Text>
                                        </VStack>
                                    </HStack>
                                    <HStack spacing={10}>
                                        <VStack align="start">
                                            <Text>Wants to borrow</Text>
                                            <Text fontSize="2xl" fontWeight="bold">
                                                {loanDetails?.tokenLoanAmount} {loanDetails?.loanDetails?.symbol}
                                            </Text>
                                        </VStack>
                                        <VStack align="start">
                                            <Text>Current LTV</Text>
                                            <Text fontSize="2xl" fontWeight="bold" color="green.400">
                                                {ltv}%
                                            </Text>
                                        </VStack>
                                    </HStack>
                                    <Text>Wants to repay</Text>
                                    <Text fontSize="2xl" fontWeight="bold">
                                        {loanDetails?.tokenLoanRepaymentAmount} {loanDetails?.loanDetails?.symbol}{" "}
                                        <Text as="span" color="gray.500">
                                            (1% APR)
                                        </Text>
                                    </Text>
                                    {/* <Button colorScheme="teal" size="md" w="full">
                                    Fund Loan
                                </Button> */}
                                </VStack>
                            </Flex>
                        </Flex>
                    </Flex>
                ) : (
                    <Text>Loading...</Text>
                )}
            </main>
        </>
    );
};

export default LoanDetails;
