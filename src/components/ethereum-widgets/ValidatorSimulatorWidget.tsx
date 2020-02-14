import React, { useState, useEffect } from 'react'
import { Button } from 'antd';
import { CartesianGrid, XAxis, YAxis, Label, AreaChart, Area, Legend, Tooltip } from 'recharts';

import { MINIMAL_ETH_STAKED, MINIMAL_AVERAGE_PERCENTAGE_VALIDATORS_ONLINE, NET_REWARDS_COLOUR } from './constants'
import { EthStakedSlider, AverageValidatorsOnline } from './Sliders'
import { buildFakeSimulationData } from './faker';
import { ControlsContainer, ChartContainer } from './Containers';

import "./styles.css"

export const ValidatorSimulatorWidget: React.FC = () => {
    const [isReady, setIsReady] = useState(false)
    const [wasmClient, setWasmClient] = useState(undefined)
    const [ethStaked, setEthStaked] = useState(MINIMAL_ETH_STAKED)
    const [averagePercentageOfValidatorOnline, setAveragePercentageOfValidatorOnline] = useState(MINIMAL_AVERAGE_PERCENTAGE_VALIDATORS_ONLINE)
    const [validatorAnnualInterest, setValidatorAnnualInterest] = useState(0)
    const [netRewardsActive, setNetRewardsActive] = useState(true)
    const [isRunning, setIsRunning] = useState(false)

    useEffect(() => {
        const loadClient = async () => {
            import("eth2-simulator")
                .then(module => {
                    console.log("MODULE", module.get_validator_reward)
                    setWasmClient(module)
                    setIsReady(true)
                    console.log("WASM MODULE LOADED")
                }).catch((error) => {
                    console.log("Error loading the module")
                });
        }
        loadClient()
            .catch(e => {
                console.log("ERROR")
            })
    }, [])

    useEffect(() => {
        if (isReady) {
            console.log("WASM CLIENT", wasmClient)
            console.log("USE EFFECT RUNNING", ethStaked, averagePercentageOfValidatorOnline)
            const result = wasmClient.get_validator_reward(ethStaked, averagePercentageOfValidatorOnline);
            setValidatorAnnualInterest(result)
        }
    });

    const handleLegendClick = ({ value }) => {
        if (value === "Net rewards") {
            setNetRewardsActive(!netRewardsActive)
        }
    }

    const runSimulation = () => {
        setIsRunning(true)
    }

    return (
        <div className="widget-container">
            <ControlsContainer title="Network Simulation">
                <EthStakedSlider
                    onChange={(e) => {
                        console.log("New Eth Staked Value", e)
                        // call rust module
                        setEthStaked(e)
                    }}
                    initialValue={MINIMAL_ETH_STAKED}
                />
                <AverageValidatorsOnline
                    onChange={(e) => {
                        console.log("New Eth Staked Value", e)
                        // call rust module
                        setAveragePercentageOfValidatorOnline(e)
                    }}
                    initialValue={MINIMAL_AVERAGE_PERCENTAGE_VALIDATORS_ONLINE}
                />
                <Button onClick={runSimulation} type="primary" block={true} loading={isRunning}>{isRunning ? "" : "Run"}</Button>
            </ControlsContainer>

            <ChartContainer isLoading={isRunning}>
                <AreaChart width={800} height={400} data={buildFakeSimulationData()}>
                    <Legend onClick={handleLegendClick} verticalAlign="top" align="right" height={36} />
                    <Tooltip formatter={(value, name, props) => (`${value}%`)} />
                    <defs>
                        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={NET_REWARDS_COLOUR} stopOpacity={0.8} />
                            <stop offset="95%" stopColor={NET_REWARDS_COLOUR} stopOpacity={0} />
                        </linearGradient>
                    </defs>

                    <Area type="monotone" dataKey={netRewardsActive ? "net_rewards" : ""} stroke={NET_REWARDS_COLOUR} fillOpacity={1} fill="url(#colorUv)" name="Net rewards" />

                    <CartesianGrid stroke="#D5DCE4" strokeDasharray="5 5" />

                    <XAxis stroke="#97A4BA" dataKey="time">
                        <Label style={{ textAnchor: 'middle', fontSize: '80%' }} value="Months" offset={0} fill="#97A4BA" position="insideBottom" />
                    </XAxis>

                    <YAxis stroke="#97A4BA" datakey="net_rewards" unit="%" name="net_rewards" viewBox={200} />

                </AreaChart>
            </ChartContainer>
        </div>
    )
}