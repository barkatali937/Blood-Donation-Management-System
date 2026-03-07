export const isEligible = (lastDonationDate) => {
    if (!lastDonationDate) return true;

    const lastDate = new Date(lastDonationDate);
    const today = new Date();

    const diffTime = today - lastDate;
    const diffDays = diffTime / (1000 * 60 * 60 * 24);

    return diffDays >= 90;
}