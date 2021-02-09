import {clusterApiUrl, PublicKey} from "@solana/web3.js";

export const ENDPOINTS = {
  devnet: clusterApiUrl("devnet"),
  mainnet_beta: clusterApiUrl("mainnet-beta"),
  testnet: clusterApiUrl("testnet"),
};

export const REPRO_ADDRESS = new PublicKey(
  "5GXFfGR8VtgYRtYy2RV9RPrirMnhytUPuefiiE5idoau"
);

export const DEVNET_SPL_TOKEN_PROGRAM = new PublicKey(
  "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
);