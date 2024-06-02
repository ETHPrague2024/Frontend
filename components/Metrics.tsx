import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Flex, Text, Spinner, VStack, Grid, GridItem } from "@chakra-ui/react";

interface MetricsData {
    totalLoans: number;
    numberOfDefaults: number;
    observedDefaultRate: number;
    totalLoanValueUSD: number;
    totalCollateralValueUSD: number;
    totalEAD: number;
    averageLGD: number;
    totalECL: number;
}

const Metrics: React.FC = () => {
    const [metrics, setMetrics] = useState<MetricsData | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchMetrics = async () => {
            try {
                const response = await axios.get("/api/metrics");
                setMetrics(response.data);
            } catch (error) {
                setError("Failed to fetch metrics data");
            }
        };

        fetchMetrics();
    }, []);

    if (error) {
        return <Box color="red.500">{error}</Box>;
    }

    if (!metrics) {
        return (
            <Flex justify="center" align="center" height="100vh">
                <Spinner size="xl" color="teal.200" />
            </Flex>
        );
    }

    return (
        <Grid templateColumns="repeat(4, 1fr)" gap={6} mb={6} p={4} bg="gray.700" borderRadius="lg" boxShadow="lg">
            <GridItem colSpan={[4, 2]}>
                <Text fontSize="lg" fontWeight="bold" color="teal.200">
                    Total loan value (USD)
                </Text>
                <Text>${metrics.totalLoanValueUSD.toFixed(2)}</Text>
            </GridItem>
            <GridItem colSpan={[4, 2]}>
                <Text fontSize="lg" fontWeight="bold" color="teal.200">
                    Total loans
                </Text>
                <Text>{metrics.totalLoans}</Text>
            </GridItem>
            <GridItem colSpan={[4, 2]}>
                <Text fontSize="lg" fontWeight="bold" color="teal.200">
                    Total defaults
                </Text>
                <Text>{metrics.numberOfDefaults}</Text>
            </GridItem>
            <GridItem colSpan={[4, 2]}>
                <Text fontSize="lg" fontWeight="bold" color="teal.200">
                    Observed Default Rate (DR)
                </Text>
                <Text>{(metrics.observedDefaultRate * 100).toFixed(2)}%</Text>
            </GridItem>
            <GridItem colSpan={[4, 2]}>
                <Text fontSize="lg" fontWeight="bold" color="teal.200">
                    Average Loss Given Default (LGD)
                </Text>
                <Text>{(metrics.averageLGD * 100).toFixed(2)}%</Text>
            </GridItem>
            <GridItem colSpan={[4, 2]}>
                <Text fontSize="lg" fontWeight="bold" color="teal.200">
                    Exposure at Default (EAD) (USD)
                </Text>
                <Text>${metrics.totalEAD.toFixed(2)}</Text>
            </GridItem>
            <GridItem colSpan={[4, 2]}>
                <Text fontSize="lg" fontWeight="bold" color="teal.200">
                    Total Collateral Value (USD)
                </Text>
                <Text>${metrics.totalCollateralValueUSD.toFixed(2)}</Text>
            </GridItem>
            <GridItem colSpan={[4, 2]}>
                <Text fontSize="lg" fontWeight="bold" color="teal.200">
                    Expected Credit Loss (ECL) (USD)
                </Text>
                <Text>${metrics.totalECL.toFixed(2)}</Text>
            </GridItem>
        </Grid>
    );
};

export default Metrics;
