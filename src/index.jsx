import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, browserHistory } from 'react-router-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'

import calApp from './reducers/index'
import App from './containers/App'

import './stylesheets/main.scss'

const store = createStore(calApp)

store.testData = {
  data: {
    title: '計算機程式設計',
    department: '資訊科學與工程學系',
    code: '2293',
    credit: '3',
    professor: '蔡崇煒',
    time: '三 6 7 8',
    location: '理學大樓1001',
    prerequisite: '無',
    note: '無'
  }
}

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter history={browserHistory}>
      <App store={store}/>
    </BrowserRouter>
  </Provider>,
 document.getElementById('root'))
