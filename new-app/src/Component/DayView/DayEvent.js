import React, { Component } from 'react';

import DeleteModal from './DeleteModal';

class DayEvent extends Component {
	constructor() {
		super()
		this.state = {
			header: null,
			body: null,
			hour: null,
			minute: null,
			ap: null,
			edit: false,
			delete: false
		}
		this.toggleDelete=this.toggleDelete.bind(this);
		this.toggleEdit=this.toggleEdit.bind(this);
		this.editHeader=this.editHeader.bind(this);
		this.editBody=this.editBody.bind(this);
		this.editHour=this.editHour.bind(this);
		this.editMinute=this.editMinute.bind(this);
		this.editAP=this.editAP.bind(this);
		this.reset=this.reset.bind(this);
	}

	toggleDelete() {
	  this.setState({delete: !this.state.delete});
	}

	confirmDelete() {
	    return (this.state.delete) ? <DeleteModal id={this.props.event.id} heading={this.state.header} delete={this.props.delete} close={this.toggleDelete} /> : null;
	}

	///

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

	editHour(e) {
		let newHour = e.target.value;
		this.setState({hour: newHour});
	}

	editMinute(e) {
		let newMinute = e.target.value;
		this.setState({minute: newMinute});
	}

	editAP(e) {
		let newAP = e.target.value;
		this.setState({ap: newAP});
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
			let hours = this.props.event.hour,
				minutes = this.props.event.minute;
			if(hours < 10) {
				hours = '0' + hours;
			}
			if(minutes<10) {
				minutes = '0' + minutes;
			}
			return (
				<div>
					<span className="header">{ this.props.event.header }</span>
					<br />
	        		<span className="body">
	        			<span>{ hours }:{ minutes } {this.props.event.ap } - </span>
	        			{ this.props.event.body }
	        		</span>
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