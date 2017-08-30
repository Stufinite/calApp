import React from 'react'
import PropTypes from 'prop-types'
import { Route } from 'react-router-dom'
import { connect } from 'react-redux'

import Calendar from '../components/Calendar'
import CourseDetail from '../components/CourseDetail'
import Navbar from '../components/Navbar'

import SearchContainer from './SearchContainer'
import SelectedContainer from './SelectedContainer'

const App = ({store}) => {
  return (
    <div>
      <Navbar/>
      <Route exact path="/" component={Calendar}/>
      <Route path="/selected" render={ (props) => (<SelectedContainer {...props} />) }/>
      <Route path="/search" render={ (props) => (<SearchContainer {...props} />) }/>
      <Route path="/detail" render={ (props) => (<CourseDetail {...props} data={store.testData}/>) }/>
    </div>
  )
}

App.propTypes = {
  store: PropTypes.object.isRequired
}

export default App
