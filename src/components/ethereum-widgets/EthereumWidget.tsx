import React, { useState, useEffect } from 'react'
import { Collapse, Icon } from 'antd';

import { EthStakedSlider, OnlineProbabilitySlider, HonestProbabilitySlider } from './Sliders'

import { MINIMAL_ETH_STAKED, MINIMAL_AVERAGE_PERCENTAGE_VALIDATORS_ONLINE, BIGGEST_PROBABILITY } from './constants'

import "./styles.css"
import { Button } from 'antd'

const { Panel } = Collapse;

export type WidgetType = 'network-simulation' | 'validator-simulation'

interface Props {
    title?: string
    type: WidgetType
}

const titlesPerWidget = {
    'network-simulation': "Network Simulation",
    'validator-simulation': "Validator Simulation"
}

const getTitle = (type: WidgetType, title?: string) => {
    return title ? title : titlesPerWidget[type]
}

export const EthereumWidget: React.FC<Props> = ({ title, type }: Props) => {
    const [isReady, setIsReady] = useState(false)
    const [wasmClient, setWasmClient] = useState(undefined)
    const [ethStaked, setEthStaked] = useState(MINIMAL_ETH_STAKED)
    const [onlineProbability, setOnlineProbability] = useState(BIGGEST_PROBABILITY)
    const [honestProbability, setHonestProbability] = useState(BIGGEST_PROBABILITY)
    const [averagePercentageOfValidatorOnline, setAveragePercentageOfValidatorOnline] = useState(MINIMAL_AVERAGE_PERCENTAGE_VALIDATORS_ONLINE)
    const [validatorAnnualInterest, setValidatorAnnualInterest] = useState(0)
    const [showAdvanceOptions, setShowAdvanceOptions] = useState(false)

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

    return (
        <div className="widget-container">
            <div className="controls-container">
                <h3 data-testid="widget-title">{getTitle(type, title)}</h3>
                <EthStakedSlider
                    onChange={(e) => {
                        console.log("New Eth Staked Value", e)
                        // call rust module
                        setEthStaked(e)
                    }}
                    initialValue={MINIMAL_ETH_STAKED}
                />
                <Collapse
                    accordion={true}
                    expandIcon={() => <Icon type="setting" />}
                    onChange={() => setShowAdvanceOptions(!showAdvanceOptions)}>
                    <Panel header="Advance options" key="advanced">
                        <OnlineProbabilitySlider
                            initialValue={BIGGEST_PROBABILITY}
                            onChange={(e) => {
                                console.log("New online probability value", e)
                                // call rust module
                                setOnlineProbability(e)
                            }}
                        />
                        <HonestProbabilitySlider
                            initialValue={BIGGEST_PROBABILITY}
                            onChange={(e) => {
                                console.log("New honest probability value", e)
                                // call rust module
                                setHonestProbability(e)
                            }}
                        />
                    </Panel>
                </Collapse>
                <Button type="primary" block={true}>Run</Button>
            </div>
            <div className="chart-container">

            </div>
        </div>
    )
}

// components
// export const Wrapper = styled('div')`
//     background-color: white;
// `;


// add sections for controls and for chart
// install styled components
// <div>

// <AverageValidatorsOnline
//     onChange={(e) => {
//         console.log("New Eth Staked Value", e)
//         // call rust module
//         setAveragePercentageOfValidatorOnline(e)
//     }}
//     initialValue={MINIMAL_AVERAGE_PERCENTAGE_VALIDATORS_ONLINE}
// />
// </div>
// <div style={{ paddingLeft: "4em" }}>
// <h2>Validator annual % interest</h2>
// <h3 style={{ color: "blue" }}>{validatorAnnualInterest} %</h3>
// </div>