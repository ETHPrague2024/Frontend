import type { NextPage } from "next";
import Head from "next/head";
import  Metrics from '../components/Metrics';
// import { Loans } from "@/components/Loans";

const Home: NextPage = () => {
    return (
        <>
            <Head>
                <title>ETH Prague 2024</title>
                <meta name="description" content="ETH Prague 2024 Website" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>{/* <Loans></Loans> */}
            <Metrics />
            </main>
        </>
    );
};

export default Home;
