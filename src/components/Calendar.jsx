import React from 'react'
import { Button, Icon } from 'semantic-ui-react'

const WeekMenu = () => (
  <ul className="week-menu">
    <li>日</li>
    <li>一</li>
    <li>二</li>
    <li>三</li>
    <li>四</li>
    <li>五</li>
    <li>六</li>
  </ul>
)

class Timetable extends React.Component {
  render() {
    return (
      <div className="timetable">

        <div className="clock">
          {this.createClockCells()}
        </div>

        <div className="course">
          {this.createCells()}
        </div>

      </div>
    )
  }

  createCells() {
    let list = []
    for (let i = 7; i < 21; i++) {
      list.push(
        <div className="cell" key={i}></div>
      )
    }
    return list
  }

  createClockCells() {
    let list = []
    for (let i = 7; i < 21; i++) {
      list.push(
        <div className="cell" key={i}>
          {i}
        </div>
      )
    }
    return list
  }
}

const TableControl = () => (
  <div className="table-control">

    <Button className="day-left"><Icon name="chevron left"/></Button>
    <Button className="mode-change">顯示一週</Button>
    <Button className="day-right"><Icon name="chevron right"/></Button>

  </div>
)

const Calendar = () => (
  <div className="calendar">

    <WeekMenu/>
    <Timetable/>
    <TableControl/>

  </div>
)

export default Calendar
