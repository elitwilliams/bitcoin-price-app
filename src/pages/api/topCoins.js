export default async (req, res) => {
    const endpoint = "https://api.coingecko.com/api/v3/coins/markets";
    const params = new URLSearchParams({
        vs_currency: "usd",
        order: "market_cap_desc",
        limit: "25",
        sparkline: "false",
        price_change_percentage: "24h",
        market_cap: "true",
        volume: "true",
        market_dominance: "false",
        market_cap_rank: "true",
        market_cap_change_percentage_24h: "false",
        price_change_24h: "false",
        market_volume: "true",
        market_cap_change: "false",
        market_cap_rank_change: "false",
        market_cap_change_24h: "false",
        last_updated: "false",
        market_cap_change_percentage_24h_in_currency: "false",
        price_change_24h_in_currency: "false",
        price_change_percentage_1h_in_currency: "false",
        price_change_percentage_24h_in_currency: "false",
        price_change_percentage_7d_in_currency: "false"
    });

    try {
        const response = await fetch(`${endpoint}?${params.toString()}`);
        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        res.status(400).json({ error: 'Failed to fetch data' });
    }
};