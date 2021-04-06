import React from 'react'
import { Route, Switch } from 'react-router'

import List from './List'
import Detail from './Detail'

export default function Extrinsics() {
  return (
    <Switch>
      <Route path="/extrinsics/:hash" component={Detail} />
      <Route
        path="/extrinsics"
        render={props => (
          <div className="box">
            <List {...props} />
          </div>
        )}
      />
    </Switch>
  )
}
