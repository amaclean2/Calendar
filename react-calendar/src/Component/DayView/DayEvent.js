import React, { Component } from 'react';

import DeleteModal from './DeleteModal';

class DayEvent extends Component {
	constructor() {
		super()
		this.state = {
			header: null,
			body: null,
			edit: false,
			delete: false
		}
		this.toggleDelete=this.toggleDelete.bind(this);
		this.toggleEdit=this.toggleEdit.bind(this);
		this.editHeader=this.editHeader.bind(this);
		this.editBody=this.editBody.bind(this);
		this.reset=this.reset.bind(this);
	}

  toggleDelete() {
    this.setState({delete: !this.state.delete});
  }

  confirmDelete() {
    return (this.state.delete) ? <DeleteModal id={this.props.event.id} heading={this.state.header} delete={this.props.delete} close={this.toggleDelete} /> : null;
  }

	componentWillMount() {
		this.setState({header: this.props.event.header, body: this.props.event.body});
	}

	toggleEdit() {
		this.setState({edit: !this.state.edit});
	}

	editHeader(e) {
		let newHeader = e.target.value;
		this.setState({header: newHeader});
	}

	editBody(e) {
		let newBody = e.target.value;
		this.setState({body: newBody});
	}

	reset() {
		this.toggleEdit();
		this.props.put(this.props.event.id, this.state.header, this.state.body);
	}

	showViews() {
		if(this.state.edit) {
			return (
					<div>
						<div className="header edit">
		        	<label>Title</label>
		        	<input onChange={this.editHeader} defaultValue={this.props.event.header } />
		        </div>
		        <div className="body edit">
		        	<label>Notes</label>
		        	<input onChange={this.editBody} defaultValue={ this.props.event.body } />
		        </div>
		        <button className="editButton" onClick={this.reset}>Save</button>
					</div>
				)
		} else {
			return (
				<div>
					<span className="header">{ this.props.event.header }</span><br />
	        <span className="body">{ this.props.event.body }</span>
				</div>
				)
		}
	}

  render() {
  	let views = this.showViews();
  	let del = this.confirmDelete();
    return (
      <div className="dayEvent fadeIn">
      	{del}
      	<div className="editButtons">
      		<span className="close" onClick={this.toggleEdit}>
	      		<i className="fa fa-pencil" aria-hidden="true"></i>
	      	</span>
	      	<span className="close" onClick={this.toggleDelete/**/}>
	      		<i className="fa fa-times" aria-hidden="true"></i>
	      	</span>
      	</div>
	      {views}
      </div>
    );
  }
}

export default DayEvent;