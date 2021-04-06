import React from 'react'
import BestBlocks from './BestBlocks'
import BestExtrinsics from './BestExtrinsics'
import ChainStatus from './ChainStatus'
import InputSearch from '../../components/InputSearch'

export default function Home(props) {
  return (
    <section className="blockTransaction">
      <div className="columns is-hidden-desktop">
        <div className="column">
          <InputSearch {...props} />
        </div>
      </div>
      <div className="columns">
        <div className="column">
          <ChainStatus />
        </div>
      </div>
      <div className="columns">
        <div className="column">
          <BestBlocks />
        </div>
        <div className="column">
          <BestExtrinsics />
        </div>
      </div>
    </section>
  )
}
