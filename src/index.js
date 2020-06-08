import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import './components/Home/Home.scss'
import Home from './components/Home/Home'
import * as serviceWorker from './serviceWorker'

import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'

ReactDOM.render(
  <Router>
    <div className='page-full'>
      <Switch>
        <Route exact path='/' component={Home} />
      </Switch>
    </div>
  </Router>
  , document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()