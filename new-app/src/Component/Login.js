import React, { Component } from 'react';
import FacebookLogin from 'react-facebook-login';

class Login extends Component {
	constructor() {
		super()
		this.login=this.login.bind(this);
	}

	login(response) {
		this.props.setUser(response.id);
	}

	render() {
		return (
			<div className="loginScreen" >
				<h2>Login</h2>
				<FacebookLogin
					appId="1654882704522900"
					autoLoad={true}
					fields="name, email, picture"
					callback={this.login} />
			</div>
		)
	}
}

export default Login;