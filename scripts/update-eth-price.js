const fs = require("fs");
const path = require("path");
const https = require("https");

function fetchETHPrice() {
  return new Promise((resolve, reject) => {
    https.get("https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd,cny&include_24hr_change=true", (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => {
        try {
          const json = JSON.parse(data);
          const now = new Date();
          const formatted = now.toISOString().replace("T", " ").slice(0, 19);
          const priceData = {
            usd: json.ethereum.usd,
            usd_change_24h: json.ethereum.usd_24h_change.toFixed(2),
            cny: json.ethereum.cny,
            cny_change_24h: json.ethereum.cny_24h_change.toFixed(2),
            last_updated: formatted + "+08:00",
          };

          const filePath = path.join(__dirname, "../public/eth-price.json");
          fs.writeFileSync(filePath, JSON.stringify(priceData, null, 2));
          resolve("✅ ETH 价格已更新");
        } catch (err) {
          reject(err);
        }
      });
    }).on("error", (err) => reject(err));
  });
}

fetchETHPrice()
  .then(console.log)
  .catch(console.error);
