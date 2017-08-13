import React from 'react'
import {IndexRoute, Route, NavLink} from 'react-router-dom'

import {Icon, Input} from 'semantic-ui-react'

const TypeMenu = () => (
  <ul className="type-menu">

    <NavLink to="/search" exact activeClassName="selected">
      <li>全部</li>
    </NavLink>
    <NavLink to="/search/obl" exact activeClassName="selected">
      <li>必修</li>
    </NavLink>
    <NavLink to="/search/opt" exact activeClassName="selected">
      <li>選修</li>
    </NavLink>
    <NavLink to="/search/ge" exact activeClassName="selected">
      <li>通識</li>
    </NavLink>
    <NavLink to="/search/pe" exact activeClassName="selected">
      <li>體育</li>
    </NavLink>
    <NavLink to="/search/other" exact activeClassName="selected">
      <li>其它</li>
    </NavLink>

  </ul>
)

const EmptyMsg = () => (
  <div className="empty-msg">
    <div className="icon-box">
      <Icon name="info circle" color="grey" size="big"/>
    </div>
    <div className="msg-box">
      <span className="title">這學期要選什麼課？</span>
      <span className="content">輸入課程名稱、教師、課程代碼或是感興趣的關鍵字，來找到想要的課程</span>
    </div>
  </div>
)

const NotFoundMsg = () => (
  <div className="empty-msg">
    <div className="icon-box">
      <Icon name="info circle" color="grey" size="big"/>
    </div>
    <div className="msg-box">
      <span className="title">找不到相關課程</span>
      <span className="content">此分類中找不到相關的內容</span>
    </div>
  </div>
)

const Course = () => (
  <div className="list-item" key={this.props.key}>
    <div className="info">
      <span className="title">
        {this.props.course.title}
      </span>
      <span className="time">
        {this.props.course.time}
      </span>
      <span className="professor">
        {this.props.course.professor}
      </span>
    </div>

    <div className="control">
      {this.props.course.selected
        ? <Icon name="checkmark" color="blue" size="big"/>
        : <Icon name="plus circle" color="grey" size="big"/>}
    </div>
  </div>
)

class CourseList extends React.Component {
  render() {
    return (
      <div className="course-list">
        {this.getCourse()}
      </div>
    )
  }

  getCourse() {
    let list = []
    let data = this.props.data
    let type = this.props.type
    let typeMap = {
      'obl': '大學部',
      'opt': '大學部',
      'ge': '通識類',
      'pe': '體育類',
      'other': '其他類'
    }

    for (let i = 0; i < data.length; i++) {
      let c = data[i]
      if (c.type !== typeMap[type] && type != 'all') {
        continue
      }

      list.push(<Course course={c} key={i}/>)
    }
    return list.length == 0
      ? (data.length != 0
        ? <NotFoundMsg/>
        : <EmptyMsg/>)
      : list
  }
}

let state = {
  data: []
}
class Search extends React.Component {
  constructor(props) {
    super(props)

    this.state = state
  }

  render() {
    return (
      <div className="search">
        <Input icon='search' placeholder='搜尋...' onKeyPress={this.doSearch.bind(this)}/>
        <TypeMenu/>
        <Route path="/search" exact render={(props) => (<CourseList {...props} type="all" data={this.state.data}/>)}/>
        <Route path="/search/obl" exact render={(props) => (<CourseList {...props} type="obl" data={this.state.data}/>)}/>
        <Route path="/search/opt" render={(props) => (<CourseList {...props} type="opt" data={this.state.data}/>)}/>
        <Route path="/search/ge" render={(props) => (<CourseList {...props} type="ge" data={this.state.data}/>)}/>
        <Route path="/search/pe" render={(props) => (<CourseList {...props} type="pe" data={this.state.data}/>)}/>
        <Route path="/search/other" render={(props) => (<CourseList {...props} type="other" data={this.state.data}/>)}/>
      </div>
    )
  }

  componentWillUnmount() {
    // Remember state for the next mount
    state = this.state
  }

  doSearch(e) {
    if (e.key !== 'Enter') {
      return
    }

    let DOMAIN = 'http://localhost.api.campass.com.tw:8080'
    let school = 'NSYSU'
    let semester = '1061'
    let keyword = e.target.value

    if (keyword.length == 0) {
      return
    }

    fetch(`${DOMAIN}/curso/get/search/?keyword=${keyword}&school=${school}`, {
      credential: 'include',
      method: 'GET',
      headers: {
        Accept: 'application/json'
      }
    }).then((response) => {
      if (!response.ok) {
        throw new Error(response.statusText)
      }
      return response.json()
    }).then((responseJson) => {
      let codeStr = ''
      for (let code of responseJson) {
        codeStr += code + ' '
      }

      if (codeStr.length == 0) {
        throw new Error('Cannot find related courses')
      }

      fetch(`${DOMAIN}/api/get/course/code?semester=${semester}&school=${school}&code=${codeStr}`, {
        credential: 'include',
        method: 'GET',
        headers: {
          Accept: 'application/json'
        }
      }).then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText)
        }
        return response.json()
      }).then((responseJson) => {
        this.classify(responseJson)
      })
    })
  }

  classify(data) {
    let DOMAIN = 'http://localhost.api.campass.com.tw:8080'
    let school = 'NSYSU'

    fetch(`${DOMAIN}/cphelper/get/Genra/?school=${school}`, {
      credential: 'include',
      method: 'GET',
      headers: {
        Accept: 'application/json'
      }
    }).then((response) => {
      if (!response.ok) {
        throw new Error(response.statusText)
      }
      return response.json()
    }).then((responseJson) => {
      for (let i = 0; i < data.length; i++) {
        let c = data[i]
        let types = Object.keys(responseJson)
        for (let t of types) {
          for (let d of Object.keys(responseJson[t])) {
            if (c.department === d) {
              c['type'] = t
            }
          }
        }
      }
      this.setState({data: data})
    })
  }
}

export default Search
