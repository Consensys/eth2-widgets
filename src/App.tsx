import React from "react";
import { HashRouter as Router } from "react-router-dom";

import Routes from './routes'

export default function () {
    return (
        <Router>
            <Routes />
        </Router>
    );
}
