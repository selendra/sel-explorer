import React, { useEffect } from 'react'
import { Route, Switch } from 'react-router'
import Blocks from './pages/Blocks'
import Extrinsincs from './pages/Extrinsics'
import Events from './pages/Events'
import Accounts from './pages/Accounts'
import ScrollTop from './components/ScrollTop'
import Home from './pages/Home'
import './services/socket'
import Search from './pages/Search'
import Analytics from './pages/Analytics'

export default function Main() {
  return (
    <div className="section main-content">
      <section className="container">
        <ScrollTop />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/blocks" component={Blocks} />
          <Route path="/extrinsics" component={Extrinsincs} />
          <Route path="/sudo_extrinsics" component={Extrinsincs} />
          <Route path="/events" component={Events} />
          <Route path="/accounts" component={Accounts} />
          <Route path="/search" component={Search} />
          <Route path="/runtimeHistory" component={Blocks} />
          <Route path="/analytics" component={Analytics} />
        </Switch>
      </section>
    </div>
  )
}
