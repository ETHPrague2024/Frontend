import { Box, Flex, Text, Icon, Avatar, VStack, HStack, Button } from "@chakra-ui/react";
import { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FaCheckCircle, FaArrowLeft } from "react-icons/fa";
import { useAccount } from "wagmi";

const LoanDetails: NextPage = () => {
    const router = useRouter();
    const { id } = router.query;
    const { address } = useAccount();

    const [loanDetails, setLoanDetails] = useState(null);

    useEffect(() => {
        if (id) {
            fetch(`/api/getProcessedLoan/${id}`)
                .then((response) => response.json())
                .then((data) => setLoanDetails(data))
                .catch((error) => console.error("Error fetching loan details:", error));
        }
    }, [id]);

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
                    <Flex bg="gray.900" color="white" minH="100vh" align="center" justify="center" p={10} direction="column">
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
                                    Sepolia
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
                                                3410 USDC
                                            </Text>
                                            <Text fontSize="sm">
                                                <Link href="https://etherscan.io/" target="blank">
                                                    0xContractAddress
                                                </Link>
                                            </Text>
                                        </Box>
                                    </Flex>
                                    <Text mt={2} fontSize="2xl" fontWeight="bold">
                                        Estimated Value: $3.41k
                                    </Text>
                                </VStack>
                                <VStack align="start">
                                    <Text fontSize="2xl" fontWeight="bold">
                                        Agreed Loan Terms
                                    </Text>
                                    <Text>Loan Request Created: 05/27/2024</Text>
                                    <HStack spacing={4}>
                                        <VStack align="start">
                                            <Text>Borrower</Text>
                                            <HStack>
                                                <Avatar name="borrower" />
                                                <Text>borrower.eth</Text>
                                            </HStack>
                                        </VStack>
                                        <VStack align="start">
                                            <Text>Lender</Text>
                                            <HStack>
                                                <Avatar name="lender" />
                                                <Text>lender.eth</Text>
                                            </HStack>
                                        </VStack>
                                    </HStack>
                                    <Text>Borrowing</Text>
                                    <Text fontSize="2xl" fontWeight="bold">
                                        1 PWND
                                    </Text>
                                    <Text>Current LTV</Text>
                                    <Text fontSize="2xl" fontWeight="bold" color="green.400">
                                        55%
                                    </Text>
                                    <Text>Repayment</Text>
                                    <Text fontSize="2xl" fontWeight="bold">
                                        1.0008 PWND{" "}
                                        <Text as="span" color="gray.500">
                                            (1% APR)
                                        </Text>
                                    </Text>
                                    <Text>Ends at</Text>
                                    <Text fontSize="2xl" fontWeight="bold">
                                        15/06/2024{" "}
                                        <Text as="span" color="gray.500">
                                            (14 days)
                                        </Text>
                                    </Text>
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
