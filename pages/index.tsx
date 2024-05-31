import type { NextPage } from "next";
import Head from "next/head";
import { Page } from "@/components/Page";

const Home: NextPage = () => {
    return (
        <>
            <Head>
                <title>ETH Prague 2024</title>
                <meta name="description" content="ETH Prague 2024 Website" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Page>
                <h1>ETH Prague 2024</h1>
            </Page>
        </>
    );
};

export default Home;
