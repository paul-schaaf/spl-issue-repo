import {clusterApiUrl, PublicKey} from "@solana/web3.js";

export const ENDPOINTS = {
  devnet: clusterApiUrl("devnet"),
  mainnet_beta: clusterApiUrl("mainnet-beta"),
  testnet: clusterApiUrl("testnet"),
};

export const REPRO_ADDRESS = new PublicKey(
  "4Tp45VFoC62XyzBrTf77ek1rFhvkxnsaJkHgbNGHgWwQ"
);

export const DEVNET_SPL_TOKEN_PROGRAM = new PublicKey(
  "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
);

// B9Ybd5PhEfRawWhvrsdVzirDQRohWpWh2ZhdnSSGxBEs