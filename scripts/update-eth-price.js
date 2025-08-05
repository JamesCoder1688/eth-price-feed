const fs = require("fs");
const https = require("https");

const API_URL = "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd,cny&include_24hr_change=true";

https.get(API_URL, (res) => {
  let data = "";

  res.on("data", (chunk) => {
    data += chunk;
  });

  res.on("end", () => {
    const json = JSON.parse(data);
    const eth = json.ethereum;

    const output = {
      usd: eth.usd,
      usd_change_24h: eth.usd_24h_change,
      cny: eth.cny,
      cny_change_24h: eth.cny_24h_change,
      last_updated: new Date().toISOString(),
    };

    fs.writeFileSync("public/eth-price.json", JSON.stringify(output, null, 2));
    console.log("✅ ETH 价格已写入 public/eth-price.json");
  });
}).on("error", (err) => {
  console.error("❌ 获取数据失败:", err);
});
