name: Update ETH Price

on:
  schedule:
    - cron: '*/5 * * * *'  # ⏱ 每 5 分钟执行一次
  workflow_dispatch:        # 手动触发支持

jobs:
  update:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repo
        uses: actions/checkout@v3

      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: 18

      - name: Install dependencies
        run: npm install

      - name: Update ETH price JSON
        run: npm run update-price

      - name: Commit and push if changed
        run: |
          git config user.name "github-actions[bot]"
          git config user.email "github-actions[bot]@users.noreply.github.com"
          git add eth-price.json
          git commit -m "Update eth-price.json" || echo "No changes to commit"
          git push
