import * as wasm from './eth2-simulator_bg.wasm';

/**
* @param {number} total_eth_staked
* @param {number} average_validators_online
* @returns {number}
*/
export function get_validator_reward(total_eth_staked, average_validators_online) {
    var ret = wasm.get_validator_reward(total_eth_staked, average_validators_online);
    return ret;
}

