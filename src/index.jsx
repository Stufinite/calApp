import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter as Router, browserHistory} from 'react-router-dom'
import {createStore} from 'redux'
import {Provider} from 'react-redux'

import App from './components/App'
import calApp from './reducers/index'

import './stylesheets/main.scss'

const store = createStore(calApp)

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <App store={store}/>
    </Router>
  </Provider>,
 document.getElementById('root'))
