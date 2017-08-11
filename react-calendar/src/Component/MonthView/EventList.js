import React, { Component } from 'react';

class EventList extends Component {

  getEvents() {
    let mandy = this.props.mandy;
    let list = [];
    let i;
    if(this.props.events !== null) {
      for ( i of this.props.events ) {
        if ( i.date.getMonth() === mandy.getMonth()
             && i.date.getFullYear() === mandy.getFullYear()
             && i.date.getDate() === this.props.day
             && !this.props.wrongMonth ) {
          list.push(i);
        }
      }
    }
    let display = list.map( item => {
      return (<span key={item.id} className="event fadeIn">{item.header}</span>);
    })
    
    return display;
  }

  render() {
    let eventlist = this.getEvents();
    return (
      <div className="events">
        {eventlist}
      </div>
    );
  }
}

export default EventList;