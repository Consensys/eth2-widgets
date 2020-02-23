import React, { PropsWithChildren } from 'react'
import { Slider } from 'antd'

interface SliderProps {
    onChange: (value: number) => void
    initialValue: number
    disabled: boolean
}

const SliderWrapper: React.FC = (props: PropsWithChildren<any>) => {
    return <div style={{ width: "100%" }}>
        {props.children}
    </div>
}

const ethStakedInMillionsFormatter = (value) => {
    return `${value} Millions`;
};

const percentageFormatter = (value) => {
    return `${value}%`;
}

const ethSliderMarks = {
    1: {
        style: {
            color: '#67758D',
        },
        label: <p className="legend-slider">1 Million</p>,
    },
    10: {
        style: {
            color: '#67758D',
        },
        label: <p className="legend-slider">10 Millions</p>,
    }
};

export const EthStakedSlider: React.FC<SliderProps> = (props: SliderProps) => {
    const { initialValue, onChange } = props
    return <SliderWrapper>
        <h4>Total Eth Staked</h4>
        <Slider tipFormatter={ethStakedInMillionsFormatter}
            defaultValue={initialValue}
            max={10}
            marks={ethSliderMarks}
            onChange={onChange}
            min={initialValue} />
    </SliderWrapper>

};

const onlineProbabilityMarks = {
    80: {
        style: {
            color: '#67758D',
        },
        label: <p className="legend-slider">80%</p>
    },
    100: {
        style: {
            color: '#67758D',
        },
        label: <p className="legend-slider">100%</p>
    }
};

const probabilityMarks = {
    0: {
        style: {
            color: '#67758D',
        },
        label: <p className="legend-slider">0%</p>
    },
    100: {
        style: {
            color: '#67758D',
        },
        label: <p className="legend-slider">100%</p>
    }
};

export const OnlineProbabilitySlider: React.FC<SliderProps> = (props: SliderProps) => {
    const { initialValue, onChange, disabled } = props
    return <SliderWrapper>
        <h4>Online Probability</h4>
        <Slider tipFormatter={percentageFormatter}
            defaultValue={initialValue}
            onChange={onChange}
            step={5}
            marks={onlineProbabilityMarks}
            disabled={disabled}
            max={100}
            min={80} />
    </SliderWrapper>
}

export const HonestProbabilitySlider: React.FC<SliderProps> = (props: SliderProps) => {
    const { initialValue, onChange } = props
    return <SliderWrapper>
        <h4>Honest probability</h4>
        <Slider tipFormatter={percentageFormatter}
            defaultValue={initialValue}
            onChange={onChange}
            marks={probabilityMarks}
            max={100}
            disabled={true}
            min={0} />
    </SliderWrapper>
}

const averageValidatorsOnlineMarks = {
    66: {
        style: {
            color: '#67758D',
        },
        label: <p className="legend-slider">66%</p>
    },
    100: {
        style: {
            color: '#67758D',
        },
        label: <p className="legend-slider">100%</p>
    }
};

export const AverageValidatorsOnline: React.FC<SliderProps> = (props: SliderProps) => {
    const { initialValue, onChange } = props
    return <SliderWrapper>
        <h4>Average percentage of validators online</h4>
        <Slider tipFormatter={percentageFormatter}
            defaultValue={initialValue}
            onChange={onChange}
            marks={averageValidatorsOnlineMarks}
            max={100}
            min={initialValue} />
    </SliderWrapper>
}

