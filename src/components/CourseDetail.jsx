import React from 'react'

import {Icon} from 'semantic-ui-react'

const TitleBar = () => (
  <div className="title-bar">

    <Icon name="arrow left" onClick={() => {
      window.history.back()
    }}/>
    <span>課程詳細資料</span>

  </div>
)

const Detail = ({course}) => (
  <div className="course-detail">
    <div className="box-title">
      <span>基本資訊</span>
    </div>

    <div>
      <span className="label">課程名稱</span>
      <span className="content title">{course.title}</span>
    </div>

    <div>
      <span className="label">開設系所</span>
      <span className="content department">{course.department}</span>
    </div>

    <div>
      <span className="label">課程代碼</span>
      <span className="content code">{course.code}</span>
    </div>

    <div>
      <span className="label">選修學分</span>
      <span className="content credit">{course.credit}</span>
    </div>

    <div>
      <span className="label">指導教授</span>
      <span className="content professor">{course.professor}</span>
    </div>

    <div>
      <span className="label">上課時間</span>
      <span className="content time">{course.time}</span>
    </div>

    <div>
      <span className="label">上課地點</span>
      <span className="content location">{course.location}</span>
    </div>

    <div>
      <span className="label">先修課程</span>
      <span className="content prerequisite">{course.prerequisite}</span>
    </div>

    <div>
      <span className="label">課程備註</span>
      <span className="content note">{course.note}</span>
    </div>

  </div>
)

const Radar = ({course}) => (
  <div className="course-detail">
    <div className="box-title">
      <span>性質雷達圖</span>
    </div>

    <div className="radar"></div>

    <span className="review">
      <a href="#" target="_blank">前往課程心得</a><Icon name="chevron right"/></span>
  </div>
)

const CourseDetail = ({course}) => (
  <div className="overlay">
    <TitleBar/>
    <Radar course={course}/>
    <Detail course={course}/>
  </div>
)

export default CourseDetail
