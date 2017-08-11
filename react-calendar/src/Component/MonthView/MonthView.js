import React, { Component } from 'react';

import months from '../Data/Months';
import monthArray from './SetMonthArray';
import headers from './Headers';
import EventList from './EventList';

class MonthView extends Component {

  showHeaders() {
    let i = 0, long = headers.longHeaders.map(day => {
      return (
        <li key={day}>{ day }</li>
        )
    }),
        short = headers.shortHeaders.map(day => {
          i++;
          return (
            <li key={i}>{ day }</li>
          );
        });
    return (
        <div>
          <ul className="largeScreenHeader">
            { long }
          </ul>
          <ul className="smallScreenHeader">
            { short }
          </ul>
        </div>
      )
  }
  showDays() {
    let i = 0, prevDay = 0, wrongMonth = true, darkDay, month = monthArray(this.props.date).map( week => {
      let days = week.map( day => {
        i++;
        if ( day === 1 && i === 1 ) wrongMonth = false;
        if ( prevDay > day && wrongMonth )
          wrongMonth = false;
        else if (prevDay > day && !wrongMonth )
          wrongMonth = true;
        darkDay = (wrongMonth) ? 'darkDay day' : 'day';
        if ( new Date().getFullYear() === this.props.date.getFullYear()
           && new Date().getMonth() === this.props.date.getMonth()
           && new Date().getDate() === day
           && !wrongMonth )
          darkDay += ' today';
        prevDay = day;

        return (<li key={i} className={darkDay} onClick={() => {this.props.showDay(new Date(this.props.date.getFullYear(), this.props.date.getMonth(), day))}} >
                  { day }
                  <EventList events={this.props.events} showDay={this.props.showDay} day={day} mandy={this.props.date} wrongMonth={wrongMonth} />
                </li>)
      });
      return <ul key={i * 100} className="week">{ days }</ul>
    });
    return <div>{month}</div>
  }

  componentWillMount() {
    this.props.get();
  }

  render() {
    let head = this.showHeaders();
    let month = this.showDays();
    let title = months[this.props.date.getMonth()] + ', ' + this.props.date.getFullYear();
    return (
      <div className="monthView" >
        <div className="buttons">
          <button onClick={() => {this.props.setToday()}} className="specialButton">Today</button>
          <button onClick={() => this.props.goBack()} ><i className="fa fa-chevron-left" aria-hidden="true"></i></button>
          <button onClick={() => this.props.goForwards()}><i className="fa fa-chevron-right" aria-hidden="true"></i></button>
          {/* <button><i className="fa fa-times" aria-hidden="true"></i></button> */}
        </div>
        <h2>{title}</h2>
        {head}
        {month}
      </div>
    );
  }
}

export default MonthView;