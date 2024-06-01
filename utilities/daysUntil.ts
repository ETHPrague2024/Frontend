export function daysUntil(targetDate: string): number {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const endDate = new Date(targetDate);
    endDate.setHours(0, 0, 0, 0);

    const differenceInMilliseconds = endDate.getTime() - today.getTime();

    const days = differenceInMilliseconds / (1000 * 60 * 60 * 24);

    return Math.ceil(days);
}

// const daysLeft = daysUntil("2024-06-05");
// console.log(daysLeft);
