import React, { Component } from 'react';

class DeleteModal extends Component {
	render() {
		return (<div className="deleteModal fadeIn" onClick={this.props.close}>
				<div className="window">
					<h2><span>Delete</span><span className="name">{this.props.heading}</span></h2>
					<div className="modalButtons">
						<button onClick={() => {this.props.delete(this.props.id)}} className="warn">Delete</button>
						<button>Keep</button>
					</div>
				</div>
			</div>)
	}
}

export default DeleteModal;