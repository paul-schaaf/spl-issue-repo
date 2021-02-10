# Instructions to Reproduce

1. Create a test wallet. This can be done by running the command: `solana-keygen
   new --outfile src/test-wallet-only.json` from the `js/` directory.
2. Airdrop SOL to the wallet.
3. Build and deploy the program (or used the address of the already deployed
   program). To change the program address, change `REPRO_ADDRESS` in
   `js/src/constants.ts`. Build with `cargo build-bpf` in the `program/`
   directory and deploy using the provided command.
4. `npm install` all dependences for the `js/` directory. Start the server with
   `npm start`.
5. Navigate to `localhost:3000` and click the Reproduce button.

Example error output:

```
Instruction 0: Program failed to complete 
    Program 5GXFfGR8VtgYRtYy2RV9RPrirMnhytUPuefiiE5idoau invoke [1]
    Program log: Instruction: Initialize liquidity.
    Program log: 3HY5r4jyw11VZeqxK8AMrub4yAmeZyWMKtt4orbezeQM
    Program log: 11111111111111111111111111111111
    Program log: Panicked at: 'called `Result::unwrap()` on an `Err` value: InvalidAccountData'
```
