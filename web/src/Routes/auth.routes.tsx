import React from 'react';
import { Switch, Route } from 'react-router-dom'

import Home from '../pages/Home'

function AuthRoutes()  {
    return (
        <Switch>
            <Route exact path="/" component={Home} />   
            <Route path="*" component={Home} />   
        </Switch>
    );
}

export default AuthRoutes;