import React from 'react'
import { Route, Switch } from 'react-router'
import Publace from '../pages/Publace'

function Routes() {
    return (
        <Switch>
            <Route exact path='/publace' component={Publace} />
            <Route path="*" component={Publace} />   
        </Switch>
    )
}

export default Routes