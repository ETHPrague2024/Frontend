export const formatAddress = (address: any) => {
    if (!address) return "";
    return `${address.substring(0, 5)}...${address.substring(address.length - 4)}`;
};
