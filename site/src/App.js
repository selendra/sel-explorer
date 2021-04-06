import React, { useEffect } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import Main from './Main'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchForeignAssetsInfo,
  fetchNativeAssetInfo
} from '@src/store/reducers/assetSlice'
import { localeSelector } from '@src/store/reducers/settingsSlice'
import Sidebar from './pages/Sidebar'

function App() {
  const dispatch = useDispatch()
  const { locale } = useSelector(localeSelector) || {}

  useEffect(() => {
    dispatch(fetchNativeAssetInfo())
    dispatch(fetchForeignAssetsInfo())
  }, [dispatch, locale])

  return (
    <Router>
      <React.Fragment>
        <Sidebar>
          <Main />
        </Sidebar>
      </React.Fragment>
    </Router>
  )
}

export default App
