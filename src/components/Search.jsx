import React from 'react'
import PropTypes from 'prop-types'
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

const Course = ({course, key, onSelect}) => (
  <div className="list-item" key={key}>
    <div className="info">
      <span className="title">
        {course.title}
      </span>
      <span className="time">
        {course.time}
      </span>
      <span className="professor">
        {course.professor}
      </span>
      <span className="department">
        {course.department}
      </span>
    </div>

    <div className="control">
      {course.selected
        ? <Icon name="checkmark" color="blue" size="big"/>
      : <Icon onClick={(e) => {
        onSelect(course)
      }} name="plus circle" color="grey" size="big"/>}
    </div>
  </div>
)

const CourseList = ({filter = 'all', searchResult, onSelect}) => (
  <div className="course-list">
    {(() => {
      let typeMap = {
        'obl': '必修類',
        'opt': '選修類',
        'ge': '通識類',
        'pe': '體育類',
        'other': '其他類'
      }
      let list = []
      for (let i = 0; i < searchResult.length; i++) {
        let c = searchResult[i]
        if (c.category !== typeMap[filter] && filter != 'all') {
          continue
        }
        list.push(<Course course={c} key={i} onSelect={onSelect}/>)
      }
      return list.length == 0
        ? (searchResult.length == 0)
          ? <EmptyMsg/>
          : <NotFoundMsg/>
        : list
    })()}
  </div>
)

const Search = ({searchResult, onSearchInput, onSelect}) => {
  return (
    <div className="search">
      <Input icon='search' placeholder='搜尋...' onKeyPress={(e) => {
        if (e.key === 'Enter') {
          onSearchInput(e.target.value)
        }
      }}/>
      <TypeMenu/>
      <Route path="/search(/:filter)?" render={(props) => (
          <CourseList filter={props.location.pathname.split('/')[2]} searchResult={searchResult} onSelect={onSelect}/>
        )}/>
    </div>
  )
}

export default Search
