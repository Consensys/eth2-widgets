import React, { PropsWithChildren } from 'react'
import { Spin } from 'antd'

interface ControlProps {
    title: string
}

export const ControlsContainer: React.FC<ControlProps> = ({ title, children }: PropsWithChildren<ControlProps>) => {
    return (<div className="controls-container">
        <h3 data-testid="widget-title">{title}</h3>
        {children}
    </div>)
}

interface ChartProps {
    isLoading: boolean
}

export const ChartContainer: React.FC<ChartProps> = ({ children, isLoading }: PropsWithChildren<ChartProps>) => {
    return (<div className="chart-container">
        {isLoading ? <Spinner /> :
            children
        }
    </div>)
}

const Spinner: React.FC = () => {
    return <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid #FAFAFC" }}>
        <Spin tip="Running simulation..." />
    </div>
}