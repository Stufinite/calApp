import React from 'react'
import { Icon } from 'semantic-ui-react'

const TypeMenu = () => (
  <ul className="type-menu">
    <li>全部</li>
    <li>必修</li>
    <li>選修</li>
    <li>通識</li>
    <li>體育</li>
    <li>其它</li>
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

const Credit = () => (
  <div className="credits-box">
    <span>已選修學分</span>
    <span id="credits">0</span>
  </div>
)

const Course = ({course, key}) => (
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
      <Icon name="trash" color="red" size="big"/>
    </div>
  </div>
)

const CourseList = ({course}) => (
  <div className="course-list">
    {course.length == 0
      ? <EmptyMsg/>
      : course.map((c, i) => <Course course={c} key={i}/>)}
  </div>
)

const SelectedList = ({data}) => (
  <div className="list">
    <TypeMenu/>
    <Credit/>
    <CourseList course={data}/>
  </div>
)

export default SelectedList
