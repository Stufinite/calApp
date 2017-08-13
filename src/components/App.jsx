import React from 'react'
import PropTypes from 'prop-types'
import {Route} from 'react-router-dom'

import Calendar from './Calendar'
import CourseDetail from './CourseDetail'
import Navbar from './Navbar'
import Search from './Search'
import SelectedList from './SelectedList'


class App extends React.Component {
  constructor(props) {
    super(props)

    this.store = this.props.store

    this.testData = {
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

  render() {
    return (
      <div>
        <Navbar/>
        <Route exact path="/" component={Calendar}/>
        <Route path="/selected" render={ (props) => (<SelectedList {...props} course={[this.testData]}/>) }/>
        <Route path="/search" component={Search}/>
        <Route path="/detail" render={ (props) => (<CourseDetail {...props} course={this.testData}/>) }/>
      </div>
    )
  }
}

App.propTypes = {
  store: PropTypes.object.isRequired
}

export default App
