import {
  Account,
  Connection,
  PublicKey,
  Transaction,
  sendAndConfirmTransaction,
  clusterApiUrl,
} from "@solana/web3.js";
import { Token } from "@solana/spl-token";
import { DEVNET_SPL_TOKEN_PROGRAM } from "../constants";
import { Repro } from "./reproInstruction";

const KEYPAIR_STR = require('../test-wallet-only.json');

export async function repro() {
  const connection = new Connection(clusterApiUrl("devnet"), 'singleGossip');

  const keypair = Buffer.from(KEYPAIR_STR);
  const adminAccount = new Account(keypair);

  const mint = await Token.createMint(
    connection,
    adminAccount,
    adminAccount.publicKey,
    null,
    9,
    DEVNET_SPL_TOKEN_PROGRAM
  );

  const tokenAccountKey = await mint.createAccount(adminAccount.publicKey);
  
  const ix = await Repro.createInitializeTokenInstruction(
    connection,
    adminAccount,
    tokenAccountKey
  );
  const tx = new Transaction();
  tx.add(ix);

  const txid = await sendAndConfirmTransaction(connection, tx, [adminAccount]);
  console.log(txid);
  console.log("Tx succeeded.");
}
