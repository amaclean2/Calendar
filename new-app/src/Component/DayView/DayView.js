import React, { Component } from 'react';

import DayEvent from './DayEvent';
import AddForm from './AddForm';

import months from '../Data/Months';

class DayView extends Component {
  

  render() {
    let eventList = [], i;
    if(this.props.events !== null ) {
      for ( i of this.props.events ) {
        if (i.date.getFullYear() === this.props.date.getFullYear()
            && i.date.getMonth() === this.props.date.getMonth()
            && i.date.getDate() === this.props.date.getDate() )
          eventList.push(i);
      }
    };
    let display = eventList.map(event => {
      return (
        <DayEvent key={event.id} event={event} delete={this.props.delete} put={this.props.put} />
      )
    });
    return (
      <div className="dayView">
        <div>
          <h2>{months[this.props.date.getMonth()]} {this.props.date.getDate()}, {this.props.date.getFullYear()}</h2>
          <div className="buttons">
            <button className="" onClick={() => {this.props.showMonth(this.props.date)}}><i className="fa fa-calendar" aria-hidden="true"></i></button>
            <button onClick={() => this.props.goBack()}><i className="fa fa-chevron-left" aria-hidden="true"></i></button>
            <button onClick={() => this.props.goForwards()}><i className="fa fa-chevron-right" aria-hidden="true"></i></button>
          </div>
          <AddForm add={this.props.add} date={this.props.date} />
          <div className="eventList">
            { display }
          </div>
        </div>
      </div>
    );
  }
}

export default DayView;