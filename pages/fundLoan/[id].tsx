import { Box, Flex, Text, Icon, Avatar, VStack, HStack, Button } from "@chakra-ui/react";
import { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { FaCheckCircle, FaArrowLeft } from "react-icons/fa";

const LoanDetails: NextPage = () => {
    const router = useRouter();
    const { id } = router.query;

    return (
        <>
            <Head>
                <title>ETH Prague 2024 - Loan Details</title>
                <meta name="description" content={`Loan details for ${id}`} />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>
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
                                <Text>Loan Request Created: 05/27/2024</Text>
                                <HStack>
                                    <VStack align="start">
                                        <Text>Borrower</Text>
                                        <HStack>
                                            <Avatar name="borrower" />
                                            <Text>borrower.eth</Text>
                                        </HStack>
                                    </VStack>
                                </HStack>
                                <HStack spacing={10}>
                                    <VStack align="start">
                                        <Text>Duration</Text>
                                        <Text fontSize="2xl" fontWeight="bold">
                                            30 Days
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
                                            1 PWND
                                        </Text>
                                    </VStack>
                                    <VStack align="start">
                                        <Text>Current LTV</Text>
                                        <Text fontSize="2xl" fontWeight="bold" color="green.400">
                                            55%
                                        </Text>
                                    </VStack>
                                </HStack>
                                <Text>Wants to repay</Text>
                                <Text fontSize="2xl" fontWeight="bold">
                                    1.0008 PWND{" "}
                                    <Text as="span" color="gray.500">
                                        (1% APR)
                                    </Text>
                                </Text>
                                <Button colorScheme="teal" size="md" w="full">
                                    Fund Loan
                                </Button>
                            </VStack>
                        </Flex>
                    </Flex>
                </Flex>
            </main>
        </>
    );
};

export default LoanDetails;
