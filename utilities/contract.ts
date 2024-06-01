import { ethers } from "ethers";
import { infuraProvider } from "./provider";
import { PWNLoanABI, PWNLoanContract } from "@/utilities/constants";

const contractAddress = PWNLoanContract;
const contractABI = PWNLoanABI;

export const contract = new ethers.Contract(contractAddress, contractABI, infuraProvider);
