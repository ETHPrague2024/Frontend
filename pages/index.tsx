import type { NextPage } from "next";
import Head from "next/head";
import Metrics from "../components/Metrics";
// import { Loans } from "@/components/Loans";
import { LoansComponent } from "@/components/LoansComponent";
import { Flex, Text } from "@chakra-ui/react";

const Home: NextPage = () => {
    return (
        <>
            <Head>
                <title>ETH Prague 2024</title>
                <meta name="description" content="ETH Prague 2024 Website" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Flex bg="gray.900" color="white" minH="100vh" align="start" justify="center" p={10}>
                <Flex direction="column" w="full" maxW="7xl">
                    <Text fontSize="5xl" fontWeight="bold" mb={6} color="teal.200">
                        Requested Loans [TestNet]
                    </Text>
                    <LoansComponent />
                </Flex>
            </Flex>
        </>
    );
};

export default Home;
