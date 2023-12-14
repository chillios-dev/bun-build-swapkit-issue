import { Chain, SwapKitCore } from "@swapkit/core";
import { generatePhrase, keystoreWallet } from "@swapkit/wallet-keystore";

const client = new SwapKitCore();

client.extend({ wallets: [keystoreWallet] });

const phrase = generatePhrase(12);

/**
 * this part of code works fine in `bun run` but not `bun build`
 * it uses @swapkit/toolbox-utxo package source code:
 * https://github.com/thorswap/SwapKit/tree/develop/packages/toolboxes/utxo
 */

// await client.connectKeystore([Chain.Bitcoin], phrase);

// const wallet = await client.getBalance(Chain.Bitcoin);

/**
 * this part of code fails in both `bun run` and `bun build`
 * it uses @swapkit/toolbox-cosmos package source code:
 * https://github.com/thorswap/SwapKit/tree/develop/packages/toolboxes/cosmos
 */

await client.connectKeystore([Chain.Cosmos], phrase);

const wallet = await client.getBalance(Chain.Cosmos);

console.log(
  wallet.map((a) => ({ asset: a.toString(), value: a.getValue("string") }))
);
