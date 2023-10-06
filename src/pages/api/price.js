export default async (_, res) => {
    const result = await fetch("https://api.coindesk.com/v1/bpi/currentprice/bitcoin.json");
    const data = await result.json();
    res.status(200).json(data.bpi.USD.rate);
};
