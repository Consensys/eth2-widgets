import React from 'react';
import { render, fireEvent, waitForElement, getByText } from '@testing-library/react';
import { ValidatorSimulatorWidget, getDefaultDataToComputeMyRewards, getMyPercentageUptimeReward, getMyEthEarnedInMonths } from './ValidatorSimulatorWidget'
import '@testing-library/jest-dom/extend-expect';

describe('Validator simulator Widget Component', () => {

    const renderWidget = () => {
        return render(<ValidatorSimulatorWidget />)
    }

    test('that the ethereum widget renders correctly', () => {
        const expectedWidgetTitle = 'Validator Simulation'
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

    test('getMyPercentageUptimeReward 100%', () => {
        const myEth = 32;
        const myUptime = 100;
        const defaultTotalEthStaked = 1000000
        const defaultValues = getDefaultDataToComputeMyRewards(defaultTotalEthStaked)
        const result = getMyPercentageUptimeReward(defaultTotalEthStaked, myEth, myUptime);

        expect(result).toBeDefined()
        expect(result[0].month_number).toEqual(1)
        expect(defaultValues[0].network_percentage_net_rewards).toEqual(result[0].my_eth_net_percentage_reward)
        expect(defaultValues[1].network_percentage_net_rewards).toEqual(result[1].my_eth_net_percentage_reward)
    })

    test('getMyEthEarnedInMonths 100%', () => {
        const myEth = 32;
        const myUptime = 100;
        const defaultTotalEthStaked = 1000000
        const result = getMyEthEarnedInMonths(defaultTotalEthStaked, myEth, myUptime);
        const defaultValues = getDefaultDataToComputeMyRewards(defaultTotalEthStaked)

        expect(result).toBeDefined()
        expect(result[0].month_number).toEqual(1)
        expect(result[0].my_eth_net_reward).toEqual(defaultValues[0].network_percentage_net_rewards * myEth + myEth)
    })
})