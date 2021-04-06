import React from 'react'
import { Route, Switch } from 'react-router'

import BlockDetail from './Detail'
import BlocksList from './List'

export default function Blocks() {
  return (
    <Switch>
      <Route path="/blocks/:heightOrHash" component={BlockDetail} />
      <Route
        path="/blocks"
        render={props => (
          <div className="box">
            <BlocksList {...props} />
          </div>
        )}
      />
    </Switch>
  )
}
