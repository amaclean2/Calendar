import React, { Component } from 'react';

import MonthView from './Component/MonthView/MonthView';
import DayView from './Component/DayView/DayView';
import Login from './Component/Login';
import './CSS/style.css';

class App extends Component {
	constructor() {
		super()
		this.state = {
			events: null,
			date: new Date(),
			view: 'month',
			userId: null
		}
		this.get = this.get.bind(this);
		this.delete = this.delete.bind(this);
		this.add = this.add.bind(this);
		this.put = this.put.bind(this);
		this.toggleViews=this.toggleViews.bind(this);
    this.toggleClose=this.toggleClose.bind(this);
    this.goMonthBack=this.goMonthBack.bind(this);
    this.goMonthForwards=this.goMonthForwards.bind(this);
    this.goDayBack=this.goDayBack.bind(this);
    this.goDayForwards=this.goDayForwards.bind(this);
    this.setUser=this.setUser.bind(this);
    this.setToday=this.setToday.bind(this);
	}

	setUser(id) {
		this.setState({userId: id});
	}

	setToday() {
		this.setState({date: new Date()});
	}

	add(header, body, hour, minute, ap) {
		let year = this.state.date.getFullYear(),
        month = this.state.date.getMonth() + 1,
        day = this.state.date.getDate(),
        newEvents = this.state.events;
    let data = {
      header: header,
      body: body,
      hour: hour,
      minute: minute,
      ap: ap,
      Assigned_date: "\"" + year + "-" + month + "-" + day + "\"",
      user: this.state.userId
    };

    let request = new Request('http://localhost:3050/events', {
          method: 'POST',
          headers: new Headers({ 'Content-Type': 'application/json' }),
          body: JSON.stringify(data)
        });

    fetch(request)
      .then( response => {
        return response.json()
      }).then( data => {
        let year = data.Assigned_date.substr(0, 4),
            month = data.Assigned_date.substr(5, 2),
            day = data.Assigned_date.substr(8, 2),
            date = new Date(year, month - 1, day),
            header = data.header,
            hour = data.hour,
            minute = data.minute,
            ap = data.ap,
            body = data.body,
            id = data._id;
        newEvents.push({id: id, header: header, body: body, hour: hour, minute: minute, ap: ap, date: date});
        this.setState({events: newEvents});
      });
	}

	delete(id) {
		let request = new Request('http://localhost:3050/events/' + id, {
			method: 'DELETE',
			headers: new Headers({ 'Content-Type': 'application/json' })
		});

		fetch(request)
			.then( () => {
				let i, newEvents = this.state.events, index;
				for (i of newEvents) {
					if( i.id === id ) {
						index = newEvents.indexOf(i);
					}
				}
				newEvents.splice(index, 1);
				this.setState({events: newEvents});
			});
	}

	put(id, header, body, hour, minute, ap) {
		let data = {header: header, body: body, hour: hour, minute: minute, ap: ap };
		let request = new Request('http://localhost:3050/events/' + id, {
			method: 'PUT',
			headers: new Headers({ 'Content-Type': 'application/json' }),
			body: JSON.stringify(data)
		}),
		newEvents = this.state.events,
		i, index;

		for ( i of newEvents ) {
			if( i.id === id ) {
				index = newEvents.indexOf(i);
			}
		}
		newEvents.splice(index, 1);

		fetch(request)
			.then( response => {
				return response.json()
			}).then( data => {
        let year = data.Assigned_date.substr(0, 4),
            month = data.Assigned_date.substr(5, 2),
            day = data.Assigned_date.substr(8, 2),
            date = new Date(year, month - 1, day),
            header = data.header,
            body = data.body,
            hour = data.hour,
            minute = data.minute,
            ap = data.ap,
            id = data._id;
        newEvents.push({id: id, header: header, body: body, hour: hour, minute: minute, ap: ap, date: date});
        this.setState({events: newEvents});
			});
	}

	get() {
		let request = new Request('http://localhost:3050/events', {
      method: 'GET',
      headers: new Headers({ 'Content-Type': 'application/json' })
    }),
    newEvents = [],
    i;

    fetch(request)
      .then( response => {
        return response.json()
      }).then( data => {
        for ( i of data ) {
        	if(i.user === this.state.userId) {
	        	let year = i.Assigned_date.substr(0, 4),
	        	    month = i.Assigned_date.substr(5, 2),
	        	    day = i.Assigned_date.substr(8, 2),
	        	    date = new Date(year, month - 1, day),
	        	    header = i.header,
	        	    body = i.body,
                hour = i.hour,
                minute = i.minute,
                ap = i.ap,
	        	    id = i._id,
	        	    userId = i.user;
	        	newEvents.push({id: id, header: header, body: body, hour: hour, minute: minute, ap: ap, date: date, userId: userId});
	        }
        }
        this.setState({events: newEvents});
      });
	}

	goDayForwards() {
    let day = this.state.date.getDate(),
        month = this.state.date.getMonth(),
        year = this.state.date.getFullYear();
    day ++;
    if(day > new Date(year, month + 1, 0).getDate()) {
      month++;
      day = 1;
      if(month > 11) {
        month = 0;
        year++;
      }
    }
    this.setState({date: new Date(year, month, day)});
  }

  goDayBack() {
    let day = this.state.date.getDate(),
        month = this.state.date.getMonth(),
        year = this.state.date.getFullYear();
    day--;
    if(day < 1) {
      day = new Date(year, month, 0).getDate();
      month--;
      if (month < 0) {
        year--;
        month = 11;
      }
    }
    this.setState({date: new Date(year, month, day)});
  }

  goMonthBack() {
    let month = this.state.date.getMonth() - 1;
    let year = this.state.date.getFullYear();
    if ( month === -1 ) {
      year = year - 1;
      month = 11;
    }
    this.setState({ date: new Date(year, month, this.state.date.getDate()) })
  }

  goMonthForwards() {
    let month = this.state.date.getMonth() + 1;
    let year = this.state.date.getFullYear();
    if ( month === 12 ) {
      year = year + 1;
      month = 0;
    }
    this.setState({ date: new Date(year, month, this.state.date.getDate()) });
  }

  toggleClose() {
    this.setState({close: true})
  }

  toggleViews(clicked) {
    if(clicked !== undefined) {
      this.setState({date: clicked});
    }
    var newView = this.state.view
    if(newView === 'month') {
      this.setState({view: 'day'})
    }
    else {
      this.setState({view: 'month'})
    }
  }

  showViews() {
    return (this.state.view === 'month') ?
      <MonthView
        showDay={this.toggleViews}
        events={this.state.events}
        close={this.toggleClose}
        date={this.state.date}
        goBack={this.goMonthBack}
        goForwards={this.goMonthForwards}
        setToday={this.setToday}
        get={this.get} /> :
      <DayView
        showMonth={this.toggleViews}
        events={this.state.events}
        date={this.state.date}
        close={this.toggleClose}
        goBack={this.goDayBack}
        goForwards={this.goDayForwards}
        add={this.add}
        put={this.put}
        delete={this.delete} />
  }

  showLogin() {
  	return (
  		<Login setUser={this.setUser} />
  		)
  }

  render() {
  	let views = (this.state.userId !== null) ? this.showViews() : this.showLogin();
    return (
      <div className="App">
      	{views}
      </div>
    );
  }
}

export default App;
