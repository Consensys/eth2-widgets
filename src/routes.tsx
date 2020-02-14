import React from 'react'
import { Route, Switch } from 'react-router-dom'

import { NetworkSimulatorWidget, ValidatorSimulatorWidget } from './components/ethereum-widgets';

export const MainRoutes = () => (
    <Switch>
        <Route exact={true} path="/">
            <h1>Eth2 Widgets</h1>
        </Route>
        <Route path="/network-simulation">
            <NetworkSimulatorWidget />
        </Route>
        <Route path="/validator-simulation">
            <ValidatorSimulatorWidget />
        </Route>
    </Switch>
)

export default MainRoutes
