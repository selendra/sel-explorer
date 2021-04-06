import React from 'react'
import { Route, Switch } from 'react-router'

import List from './AccountsLlist'
import Detail from './Detail'

export default function Accounts() {
  return (
    <Switch>
      <Route path="/accounts/:address" component={Detail} />
      <Route path="/accounts/transfer" component={Detail} />
      <Route
        path="/accounts"
        render={props => (
          <div className="box">
            <List {...props} />
          </div>
        )}
      />
    </Switch>
  )
}
