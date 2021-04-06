import React from 'react'
import bignumber from 'bignumber.js';

export default function({ json }) {
  return (
    <pre
      style={{
        textAlign: 'left',
        backgroundColor: 'unset',
        padding: 0,
        color: '#959595'
      }}
    >
      {JSON.stringify(json, null, 2)}
    </pre>
  )
}
