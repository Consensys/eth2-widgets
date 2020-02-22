#[macro_use]
extern crate serde_derive;

mod utils;

use wasm_bindgen::prelude::*;
use std::collections::HashMap;

// When the `wee_alloc` feature is enabled, use `wee_alloc` as the global
#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

mod process_epoch;
mod types;

use process_epoch::process_epoch;
use types::*;

#[wasm_bindgen]
pub fn get_validator_rewards(_total_eth_staked: u64, _average_validators_online: u32) -> f64 {
    10f64
}

#[wasm_bindgen]
pub fn get_network_rewards(_total_eth_staked: u32, _online_probability: f32, _honest_probability: f32) -> JsValue {
    let config = Config::new(_total_eth_staked, _online_probability, _honest_probability);

    let mut state = State::new(config);
    let mut output = Output::new();
    
    for i in 0..state.config.epochs {
        state = process_epoch(state, i, &mut output);
    }

    let result = output.get_rows();
   
    JsValue::from_serde(&result).unwrap()
}