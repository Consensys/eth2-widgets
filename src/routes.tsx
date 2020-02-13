import React from 'react'
import { Route, Switch } from 'react-router-dom'

import { EthereumWidget } from './components/ethereum-widgets';

export const MainRoutes = () => (
    <Switch>
        <Route exact={true} path="/network-simulation">
            <EthereumWidget type="network-simulation" />
        </Route>
        <Route exact={true} path="/validator-simulation">
            <EthereumWidget type="validator-simulation" />
        </Route>
    </Switch>
)

export default MainRoutes
