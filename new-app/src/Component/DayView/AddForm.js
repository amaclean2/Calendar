import React, { Component } from 'react';

class AddForm extends Component {
  constructor() {
    super()
    this.state = {
      header: null,
      body: null,
    }
    this.updateHeader=this.updateHeader.bind(this);
    this.updateBody=this.updateBody.bind(this);
  }

  updateHeader(e) {
    let newHeader = e.target.value;
    this.setState({header: newHeader});
  }

  updateBody(e) {
    let newBody = e.target.value;
    this.setState({body: newBody});
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
            <input type="number" className="hours time-units" defaultValue="00" />:<input type="number" className="minutes time-units" defaultValue="00" />
            <select>
              <option value="AM">AM</option>
              <option value="PM">PM</option>
            </select>
          </div>
        </div>
        <div className="saveFlex">
          <button className="specialButton" onClick={() => {this.props.add(this.state.header, this.state.body)}}>Save</button>
        </div>
      </div>
    );
  }
}

export default AddForm;