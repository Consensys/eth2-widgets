import React from 'react';
import { render, fireEvent, waitForElement, getByText } from '@testing-library/react';
import { EthereumWidget, WidgetType } from './EthereumWidget'
import '@testing-library/jest-dom/extend-expect';

describe('Ethereum Widget Component', () => {

    const renderWidget = (type: WidgetType = 'network-simulation') => {
        return render(<EthereumWidget type={type} />)
    }

    test('that the ethereum widget renders correctly', () => {
        const expectedWidgetTitle = 'Network Simulation'
        const { getByText, getByTestId, debug } = renderWidget()

        expect(getByText(expectedWidgetTitle)).toBeDefined()
        expect(getByTestId('widget-title')).toBeDefined()
        expect(getByTestId('widget-title')).toBeInTheDocument()
    })

    test('that the ethereum widget snapshot is correct', () => {
        const expectedWidgetTitle = 'Network Simulation'
        const { container, debug } = renderWidget()

        expect(container).toMatchSnapshot()
    })
})