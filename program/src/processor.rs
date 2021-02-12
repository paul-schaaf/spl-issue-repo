use solana_program::{
    account_info::next_account_info,
    account_info::AccountInfo,
    entrypoint::ProgramResult,
    msg,
    program::{invoke, invoke_signed},
    program_error::ProgramError,
    program_pack::Pack,
    pubkey::Pubkey,
};
use spl_token::{state::Account as TokenAccount, state::Mint as TokenMint};

use crate::instruction::{InitializeToken, ReproInstruction};

pub struct Processor;
impl Processor {
    // Map instructions to processors here.
    pub fn process(
        program_id: &Pubkey,
        accounts: &[AccountInfo],
        instruction_data: &[u8],
    ) -> ProgramResult {
        let instruction = ReproInstruction::unpack(instruction_data)?;

        match instruction {
            ReproInstruction::InitializeToken(InitializeToken { amount }) => {
                msg!("Instruction: Initialize liquidity.");
                Self::process_initialize_token(accounts, amount, program_id)
            }
        }
    }

    // Unpacks token account.
    pub fn unpack_token_account(
        account_info: &AccountInfo,
    ) -> Result<TokenAccount, ProgramError> {
        TokenAccount::unpack(&account_info.data.borrow())
    }

    pub fn process_initialize_token(
        accounts: &[AccountInfo],
        amount: u64,
        program_id: &Pubkey,
    ) -> ProgramResult {
        let account_info_iter = &mut accounts.iter();
        let admin_acc = next_account_info(account_info_iter)?;
        let token_acct_2 = next_account_info(account_info_iter)?;

        let pubkey = token_acct_2.key.to_string();
        let owner = token_acct_2.owner.to_string();

        msg!(&("token acc 2 key: ".to_string() + &pubkey));
        msg!(&("token acc 2 owner: ".to_string() + &owner));
        let spl_token_acct = Self::unpack_token_account(token_acct_2)?;

        /* let pubkey2 = token_acct_2.key.to_string();
        let owner2 = token_acct_2.owner.to_string();
        msg!(&pubkey2);
        msg!(&owner2);
        let spl_token_acct2 = Self::unpack_token_account(token_acct_2).unwrap();
        let spl_amt = spl_token_acct2.amount.to_string();
        msg!(&spl_amt); */

        Ok(())
    }
}
