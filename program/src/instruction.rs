use solana_program::{
    instruction::{AccountMeta, Instruction},
    program_error::ProgramError,
    pubkey::Pubkey,
};

use std::convert::TryInto;

#[repr(C)]
#[derive(Clone, Debug, PartialEq)]
pub struct InitializeToken {
    pub amount: u64,
}

#[repr(C)]
#[derive(Debug, PartialEq)]
pub enum ReproInstruction {
    /// 0. `[signer]` The token account holder.
    /// 1. `[]` Another token account holder.
    InitializeToken(InitializeToken),
}

impl ReproInstruction {
    pub fn unpack(input: &[u8]) -> Result<Self, ProgramError> {
        let (tag, rest) = input
            .split_first()
            .ok_or(ProgramError::InvalidInstructionData)?;

        Ok(match tag {
            0 => {
                let (amount, _rest) = Self::unpack_u64(rest)?;
                Self::InitializeToken(InitializeToken { amount })
            }
            _ => return Err(ProgramError::InvalidInstructionData),
        })
    }

    fn unpack_u64(input: &[u8]) -> Result<(u64, &[u8]), ProgramError> {
        if input.len() >= 8 {
            let (amount, rest) = input.split_at(8);
            let amount = amount
                .get(..8)
                .and_then(|slice| slice.try_into().ok())
                .map(u64::from_le_bytes)
                .ok_or(ProgramError::InvalidInstructionData)?;
            Ok((amount, rest))
        } else {
            Err(ProgramError::InvalidInstructionData)
        }
    }
}
