import { NextPage } from "next";
import Head from "next/head";
import { ActiveLoansComponent } from "@/components/ActiveLoansComponent";
import { Text, Flex } from "@chakra-ui/react";

const ActiveList: NextPage = () => {
    return (
        <>
            <Head>
                <title>ETH Prague 2024 - Active Loans</title>
                <meta name="description" content="Overview of all active loans" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>
                <Flex bg="gray.900" color="white" minH="100vh" align="start" justify="center" p={10}>
                    <Flex direction="column" w="full" maxW="7xl">
                        <Text fontSize="5xl" fontWeight="bold" mb={6} color="teal.200">
                            Active Loans [MainNet]
                        </Text>
                        <ActiveLoansComponent />
                    </Flex>
                </Flex>
            </main>
        </>
    );
};

export default ActiveList;
