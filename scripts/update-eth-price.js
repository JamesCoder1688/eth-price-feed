// scripts/update-eth-price.js
const fs = require('fs');
const path = require('path');

const outputPath = path.join(__dirname, '..', 'eth-price.json');

async function fetchEthPrice() {
  const res = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd,cny&include_24hr_change=true');
  const json = await res.json();

  const eth = json.ethereum;

  const result = {
    usd: eth.usd,
    usd_change_24h: parseFloat(eth.usd_24h_change.toFixed(2)),
    cny: eth.cny,
    cny_change_24h: parseFloat(eth.cny_24h_change.toFixed(2)),
    last_updated: new Date().toISOString(),
  };

  fs.writeFileSync(outputPath, JSON.stringify(result, null, 2));
  console.log('✅ eth-price.json 已更新');
}

fetchEthPrice().catch(err => {
  console.error('❌ 获取价格失败:', err);
  process.exit(1);
});
