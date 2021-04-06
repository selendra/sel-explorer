import EventsList from './List'
import { Route, Switch } from 'react-router'
import Detail from './Detail'
import React from 'react'

export default function Events() {
  return (
    <Switch>
      <Route path="/events/:eventId" component={Detail} />
      <Route
        path="/events"
        render={props => (
          <div className="box">
            <EventsList {...props} />
          </div>
        )}
      />
    </Switch>
  )
}
