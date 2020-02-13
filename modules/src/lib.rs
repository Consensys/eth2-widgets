mod utils;

use wasm_bindgen::prelude::*;

// When the `wee_alloc` feature is enabled, use `wee_alloc` as the global
// allocator.
#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

#[wasm_bindgen]
extern {
    fn alert(s: &str);
}

const BASE_REWARDS_PER_EPOCH: u32 = 4;
const DEPOSIT_CONTRACT_TREE_DEPTH: u32 = 32; // validators deposit

// Configuration
const MAX_COMMITTEES_PER_SLOT: u32 = 64;
const TARGET_COMMITTEE_SIZE: u32 = 128;

// Rewards and penalties
const BASE_REWARD_FACTOR: u32 = 64;
const PROPOSER_REWARD_QUOTIENT: u32 = 8;

const SLOT_TIME: u32 = 12;
const EPOCH_LENGHT: u32 = 32;

#[wasm_bindgen]
pub fn get_validator_reward(total_eth_staked: u32, average_validators_online: u32) -> f64 {

    let validators_number: f64 = 31250f64;

    let in_wei: f64 = 10f64.powf(9f64);
    println!("In wei {:.}", in_wei);

    let total_stake: f64 = validators_number * DEPOSIT_CONTRACT_TREE_DEPTH as f64;

    println!("Total staked {:.}", total_stake);

    println!("Number of validators {}", validators_number);

    let epoch_per_year: f64 = ((60 as f64 * 60 as f64 * 24 as f64 * 365.242) / (SLOT_TIME * EPOCH_LENGHT) as f64 ).into();

    println!("Epoch per year {:.3}", epoch_per_year);

    // # to get full validator reward  
    let effective_validator_balance = 32;
    let total_stake_in_wei: f64= (total_stake * in_wei).into();

    println!("Total staked in wei {:.}", total_stake_in_wei);
    let square_root_of_total_stake: f64 = total_stake_in_wei.sqrt();

    println!("Square root of total stake {:.}", square_root_of_total_stake);
    
    let base_reward_for_full_validator = (effective_validator_balance as f64 * BASE_REWARD_FACTOR as f64 * in_wei) as f64 / (square_root_of_total_stake) / BASE_REWARDS_PER_EPOCH as f64;
    
    println!("Base reward for full validator {:.}", base_reward_for_full_validator);

    const match_source_target: f64 = 3f64;
    let average_network_online: f64 = 0.90f64;
    let ff_reward: f64 = base_reward_for_full_validator * match_source_target * average_network_online;

    let block_proposer_reward_percentage: f64 = 0.125f64;
    let block_proposer_reward = base_reward_for_full_validator * block_proposer_reward_percentage * average_network_online;
    
    // block attester
    let block_attester_reward_percentage = 0.875f64;
    let penalty_for_inclusion_block_late = 0.0156f64; // 1/64
    let penalty_if_included_in_later_slot = average_network_online + (average_network_online * ((1f64 - average_network_online) * (1f64 - penalty_for_inclusion_block_late)));
    let block_attester_reward = base_reward_for_full_validator * block_attester_reward_percentage * penalty_if_included_in_later_slot;

    let extra_factor: f64 = 1f64 - average_network_online;
    let extra = average_network_online * extra_factor.powf((2f64 * (1f64 - 2f64 * average_network_online)) as f64);
    let validator_reward_per_epoch = ff_reward + block_proposer_reward + block_attester_reward + extra;

    println!("Validator reward per epoch {:.}", validator_reward_per_epoch);

    let validator_penalties_per_epoch = BASE_REWARDS_PER_EPOCH as f64 * base_reward_for_full_validator;

    println!("Validator penalties per epoch {:.}", validator_penalties_per_epoch);

    println!("Validator reward per year {:.}", validator_reward_per_epoch * epoch_per_year);

    let validator_uptime = (average_validators_online as f64 / 100f64);
    let validator_annual_interest = ((validator_reward_per_epoch * validator_uptime) - (validator_penalties_per_epoch * (1f64 - validator_uptime))) * epoch_per_year / in_wei / DEPOSIT_CONTRACT_TREE_DEPTH as f64;
    
    println!("Validator annual interest {:.}", validator_annual_interest * 100f64);

    // alert(&format!("Staking Rewards, {:.}!", validator_annual_interest * 100f64));
    let result: f64 = validator_annual_interest * 100f64;

    result
    // alert(&format!("Total Eth Staked {}, Average Validators Online {}", total_eth_staked, average_validators_online));

}
