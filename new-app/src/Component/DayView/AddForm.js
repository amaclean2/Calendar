import React, { Component } from 'react';

class AddForm extends Component {
  constructor() {
    super()
    this.state = {
      header: null,
      body: null,
      hours: new Date().getHours() < 13 ? new Date().getHours() : new Date().getHours() - 12,
      minutes: new Date().getMinutes(),
      ap: new Date().getHours() < 13 ? 'AM' : 'PM',
    }
    this.updateHeader=this.updateHeader.bind(this);
    this.updateBody=this.updateBody.bind(this);
    this.updateHours=this.updateHours.bind(this);
    this.updateMinutes=this.updateMinutes.bind(this);
    this.updateAP=this.updateAP.bind(this);
    this.handleFocus=this.handleFocus.bind(this);
  }

  updateHeader(e) {
    let newHeader = e.target.value;
    this.setState({header: newHeader});
  }

  updateBody(e) {
    let newBody = e.target.value;
    this.setState({body: newBody});
  }

  updateHours(e) {
    let newHours = e.target.value;
    this.setState({hours: newHours});
    e.target.value = e.target.value < 10 ? '0' + e.target.value : e.target.value;
    e.target.value = e.target.value.length > 2 ? e.target.value.slice(-2) : e.target.value;
  }

  updateMinutes(e) {
    let newMinutes = e.target.value;
    this.setState({minutes: newMinutes});
    e.target.value = e.target.value < 10 ? '0' + e.target.value : e.target.value;
    e.target.value = e.target.value.length > 2 ? e.target.value.slice(-2) : e.target.value;
  }

  updateAP(e) {
    let newAP = e.target.value;
    this.setState({ap: newAP});
  }

  handleFocus(e) {
    e.target.select();
  }

  render() {
    
    return (
      <div>
        <div className="addOptions">
          <div>
            <label>Title</label><br />
            <input onChange={this.updateHeader} placeholder="Water Balloon Fight"/>
          </div>
          <div>
            <label>Notes</label><br />
            <input onChange={this.updateBody} placeholder="Throw first!"/>
          </div>
        </div>
        <div className="time">
          <label>Start Time</label>
          <div className="entries">
            <input type="number" className="hours time-units" defaultValue={this.state.hours} onChange={this.updateHours} onFocus={this.handleFocus} />
            :
            <input type="number" className="minutes time-units" defaultValue={this.state.minutes} onChange={this.updateMinutes} onFocus={this.handleFocus}/>
            <select onChange={this.updateAP} defaultValue={this.state.ap}>
              <option value="AM">AM</option>
              <option value="PM">PM</option>
            </select>
          </div>
        </div>
        <div className="saveFlex">
          <button className="specialButton" onClick={() => {this.props.add(this.state.header, this.state.body, this.state.hours, this.state.minutes, this.state.ap)}}>Save</button>
        </div>
      </div>
    );
  }
}

export default AddForm;