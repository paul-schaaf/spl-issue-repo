import * as BufferLayout from "buffer-layout";
import * as Layout from "./layout";
import { Account, PublicKey, TransactionInstruction } from "@solana/web3.js";
import { Numberu64 } from "@solana/spl-token-swap";
import { REPRO_ADDRESS } from "../constants";

export class Repro {
  static async createInitializeTokenInstruction(
    connection,
    token: Account,
    token2key: PublicKey
  ) {
    const keys = [
      { pubkey: token.publicKey, isSigner: true, isWritable: false },
      { pubkey: token2key, isSigner: false, isWritable: false },
    ];

    const dataLayout = BufferLayout.struct([
      BufferLayout.u8("instruction"),
      Layout.uint64("amount"),
    ]);

    const data = Buffer.alloc(dataLayout.span);

    dataLayout.encode(
      {
        instruction: 0,
        amount: new Numberu64(100).toBuffer(),
      },
      data
    );

    console.log((await connection.getAccountInfo(token2key, 'recent')).owner.toBase58());


    return new TransactionInstruction({
      keys,
      programId: REPRO_ADDRESS,
      data,
    });
  }
}

export const AccountLayout: typeof BufferLayout.Structure = BufferLayout.struct(
  [
    Layout.publicKey('mint'),
    Layout.publicKey('owner'),
    Layout.uint64('amount'),
    BufferLayout.u32('delegateOption'),
    Layout.publicKey('delegate'),
    BufferLayout.u8('state'),
    BufferLayout.u32('isNativeOption'),
    Layout.uint64('isNative'),
    Layout.uint64('delegatedAmount'),
    BufferLayout.u32('closeAuthorityOption'),
    Layout.publicKey('closeAuthority'),
  ],
); 
