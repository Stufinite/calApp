import React from 'react'
import PropTypes from 'prop-types'
import { Route } from 'react-router-dom'
import { connect } from 'react-redux'

import Calendar from '../components/Calendar'
import CourseDetail from '../components/CourseDetail'
import Navbar from '../components/Navbar'
import Search from '../components/Search'
import SelectedList from '../components/SelectedList'

import SearchContainer from './SearchContainer'

const App = ({store}) => {
  return (
    <div>
      <Navbar/>
      <Route exact path="/" component={Calendar}/>
      <Route path="/selected" render={ (props) => (<SelectedList {...props} data={[store.testData]}/>) }/>
      <Route path="/search" render={ (props) => (<SearchContainer {...props} data={store.getState().search.data}/>) }/>
      <Route path="/detail" render={ (props) => (<CourseDetail {...props} data={store.testData}/>) }/>
    </div>
  )
}

App.propTypes = {
  store: PropTypes.object.isRequired
}

export default App
