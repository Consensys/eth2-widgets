/* tslint:disable */
/* eslint-disable */
/**
* @param {BigInt} _total_eth_staked 
* @param {number} _average_validators_online 
* @returns {number} 
*/
export function get_validator_rewards(_total_eth_staked: BigInt, _average_validators_online: number): number;
/**
* @param {number} _total_eth_staked 
* @param {number} _online_probability 
* @param {number} _honest_probability 
* @returns {any} 
*/
export function get_network_rewards(_total_eth_staked: number, _online_probability: number, _honest_probability: number): any;
