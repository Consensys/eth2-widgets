import React, { PropsWithChildren } from 'react'
import { Slider } from 'antd'

interface SliderProps {
    onChange: (value: number) => void
    initialValue: number
}

const SliderWrapper: React.FC = (props: PropsWithChildren<any>) => {
    return <div style={{ width: "25vw", padding: "1em" }}>
        {props.children}
    </div>
}

const ethStakedInMillionsFormatter = (value) => {
    return `${value} Millions`;
};

const averageValidatorsOnlineFormatter = (value) => {
    return `${value}%`;
}

const ethSliderMarks = {
    1: {
        style: {
            color: '#f50',
        },
        label: <strong>1 Million</strong>,
    },
    10: {
        style: {
            color: '#f50',
        },
        label: <strong>10 Millions</strong>,
    }
};

export const EthStakedSlider: React.FC<SliderProps> = (props: SliderProps) => {
    const { initialValue, onChange } = props
    return <SliderWrapper>
        <h2>Total Eth Staked</h2>
        <Slider tipFormatter={ethStakedInMillionsFormatter}
            defaultValue={initialValue}
            max={10}
            marks={ethSliderMarks}
            onChange={onChange}
            min={initialValue} />
    </SliderWrapper>

};

const averageValidatorsOnlineMarks = {
    66: {
        style: {
            color: '#f50',
        },
        label: <strong>66%</strong>,
    },
    100: {
        style: {
            color: '#f50',
        },
        label: <strong>100%</strong>,
    }
};

export const AverageValidatorsOnline: React.FC<SliderProps> = (props: SliderProps) => {
    const { initialValue, onChange } = props
    return <SliderWrapper>
        <h2>Average percentage of validators online</h2>
        <Slider tipFormatter={averageValidatorsOnlineFormatter}
            defaultValue={initialValue}
            onChange={onChange}
            marks={averageValidatorsOnlineMarks}
            max={100}
            min={initialValue} />
    </SliderWrapper>
}

