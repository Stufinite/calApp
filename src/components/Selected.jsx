import React from 'react'
import {IndexRoute, Route, NavLink} from 'react-router-dom'
import {Icon} from 'semantic-ui-react'

const TypeMenu = () => (
  <ul className="type-menu">
    <NavLink to="/selected" exact activeClassName="selected">
      <li>全部</li>
    </NavLink>
    <NavLink to="/selected/obl" exact activeClassName="selected">
      <li>必修</li>
    </NavLink>
    <NavLink to="/selected/opt" exact activeClassName="selected">
      <li>選修</li>
    </NavLink>
    <NavLink to="/selected/ge" exact activeClassName="selected">
      <li>通識</li>
    </NavLink>
    <NavLink to="/selected/pe" exact activeClassName="selected">
      <li>體育</li>
    </NavLink>
    <NavLink to="/selected/other" exact activeClassName="selected">
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
      <span className="title">清單裡還沒有加入課程喔</span>
      <span className="content">點擊課表上的空堂，或查詢課程名稱、教師、課程代碼或是感興趣的關鍵字，來加入想要的課程</span>
    </div>
  </div>
)

const Credit = (selected) => (
  <div className="credits-box">
    <span>已選修學分</span>
    <span id="credits">{(selected == undefined || selected.length == 0
        ? 0
        : ((arr) => {
          let sum = 0
          arr.map((c) => sum += c.credits)
          return sum
        })(selected.selected))}</span>
  </div>
)

const Course = ({course, key, onDelete}) => (
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
    </div>

    <div className="control">
      <Icon onClick={() => {
        onDelete(course)
      }} name="trash" color="red" size="big"/>
    </div>
  </div>
)

const CourseList = ({filter = 'all', course, onDelete}) => (
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
        for (let i = 0; i < course.length; i++) {
          let c = course[i]
          if (c.category !== typeMap[filter] && filter != 'all') {
            continue
          }
          list.push(<Course course={c} key={i} onDelete={onDelete}/>)
        }
        return list.length == 0
          ? <EmptyMsg/>
          : list
      })()}
  </div>
)

const Selected = ({selected, onDelete}) => (
  <div className="list">
    <TypeMenu/>
    <Credit selected={selected}/>
    <Route path="/selected(/:filter)?" render={(props) => (
        <CourseList filter={props.location.pathname.split('/')[2]} course={selected} onDelete={onDelete}/>
      )}/>
  </div>
)

export default Selected
