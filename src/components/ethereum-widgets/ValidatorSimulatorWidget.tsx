import React, { useState, useEffect } from 'react'
import { Button, Input } from 'antd';
import { CartesianGrid, XAxis, YAxis, Label, AreaChart, Area, Legend, Tooltip } from 'recharts';

import { MINIMAL_ETH_STAKED, MINIMAL_AVERAGE_PERCENTAGE_VALIDATORS_ONLINE, NET_REWARDS_COLOUR, MINIMAL_MY_ETH_STAKED } from './constants'
import { EthStakedSlider, AverageValidatorsOnline } from './Sliders'
import { ControlsContainer, ChartContainer } from './Containers';
import { data } from '../../data'

import "./styles.css"

export const getDefaultDataToComputeMyRewards = (totalEthStaked: number) => {
    const onlineProbability = 1;
    const defaultDataToComputeMyRewards = data.filter((item) => {
        return item.initial_staked_balance === (totalEthStaked * 1000000) && item.probability_online === onlineProbability
    })
    return defaultDataToComputeMyRewards
}

export const getMyPercentageUptimeReward = (totalEthStaked: number, myEthStaked: number, uptime: number) => { // honestProbability is ignored
    console.log(`My eth staked ${myEthStaked} uptime ${uptime}`)
    const defaultDataToComputeMyRewards = getDefaultDataToComputeMyRewards(totalEthStaked);
    // por cada record, multiplico
    const uptimeValue = uptime / 100;
    const myPercentageUptimeReward = defaultDataToComputeMyRewards.map((item) => {
        return {
            my_eth_net_percentage_reward: item.network_percentage_net_rewards * uptimeValue,
            month_number: item.month_number
        }
    })
    return myPercentageUptimeReward
}

export const getMyEthEarnedInMonths = (totalEthStaked: number, myEthStaked: number, uptime: number) => {
    const myPercentageUptimeReward = getMyPercentageUptimeReward(totalEthStaked, myEthStaked, uptime)

    const myEthEarnedInMonths = myPercentageUptimeReward.map((item) => {
        console.log("My eth net percentage reward", item.my_eth_net_percentage_reward)
        console.log("My eth staked", myEthStaked)

        return {
            my_eth_net_reward: (item.my_eth_net_percentage_reward * myEthStaked / 100) + myEthStaked,
            month_number: item.month_number
        }
    })

    return myEthEarnedInMonths
}

export const ValidatorSimulatorWidget: React.FC = () => {
    const [ethStaked, setEthStaked] = useState(MINIMAL_ETH_STAKED)
    const [myEthStaked, setMyEthStaked] = useState(MINIMAL_MY_ETH_STAKED)
    const [averagePercentageOfValidatorOnline, setAveragePercentageOfValidatorOnline] = useState(MINIMAL_AVERAGE_PERCENTAGE_VALIDATORS_ONLINE)
    const [netRewardsActive, setNetRewardsActive] = useState(true)
    const [isRunning, setIsRunning] = useState(false)
    const [validatorSimulationData, setValidatorSimulationData] = useState([])

    const handleLegendClick = ({ value }) => {
        if (value === "Net rewards") {
            setNetRewardsActive(!netRewardsActive)
        }
    }

    const runSimulation = () => {
        setIsRunning(true)
        const result = getMyEthEarnedInMonths(ethStaked, myEthStaked, averagePercentageOfValidatorOnline);
        setValidatorSimulationData(result)
        setIsRunning(false)
    }

    return (
        <div className="widget-container">
            <ControlsContainer title="Validator Simulation">
                <div style={{ width: "100%" }}>
                    <h4>My Eth to stake</h4>
                    <Input type="number" min={32} onChange={(e) => {
                        // TODO VALIDATE That only numbers are valid
                        console.log("New My Eth Staked value", e.target.value);
                        setMyEthStaked(Number(e.target.value));
                    }} size="large" placeholder="Eth amount" />
                </div>

                <EthStakedSlider
                    disabled={false}
                    onChange={(e) => {
                        console.log("New Eth Staked Value", e)
                        setEthStaked(e)
                    }}
                    initialValue={MINIMAL_ETH_STAKED}
                />

                <AverageValidatorsOnline
                    disabled={false}
                    onChange={(e) => {
                        console.log("New Eth Staked Value", e)
                        setAveragePercentageOfValidatorOnline(e)
                    }}
                    initialValue={MINIMAL_AVERAGE_PERCENTAGE_VALIDATORS_ONLINE}
                />
                <Button style={{ marginTop: "1em" }} onClick={runSimulation} type="primary" block={true} loading={isRunning}>{isRunning ? "" : "Run"}</Button>
            </ControlsContainer>

            <ChartContainer isLoading={isRunning}>
                <AreaChart width={800} height={400} data={validatorSimulationData}>
                    <Legend onClick={handleLegendClick} verticalAlign="top" align="right" height={36} />
                    <Tooltip formatter={(value, name, props) => (`${value} Eth`)} />
                    <defs>
                        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={NET_REWARDS_COLOUR} stopOpacity={0.8} />
                            <stop offset="95%" stopColor={NET_REWARDS_COLOUR} stopOpacity={0} />
                        </linearGradient>
                    </defs>

                    <Area type="monotone" dataKey={netRewardsActive ? "my_eth_net_reward" : ""} stroke={NET_REWARDS_COLOUR} fillOpacity={1} fill="url(#colorUv)" name="Net rewards" />

                    <CartesianGrid stroke="#D5DCE4" strokeDasharray="5 5" />

                    <XAxis stroke="#97A4BA" dataKey="month_number">
                        <Label style={{ textAnchor: 'middle', fontSize: '80%' }} value="Months" offset={0} fill="#97A4BA" position="insideBottom" />
                    </XAxis>

                    <YAxis stroke="#97A4BA" datakey="my_eth_net_reward" unit="Eth" name="my_eth_net_reward" viewBox={200} />

                </AreaChart>
            </ChartContainer>
        </div>
    )
}