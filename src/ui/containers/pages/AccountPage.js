import React, {Component} from 'react';
import {connect} from 'react-redux';
import BorderPage from '../layouts/BorderPage';
import '../../style/pages/AccountPage.scss';

class AccountPage extends Component {
	render() {
		let {authentication} = this.props;

		return (
			<BorderPage>
				<div className="content">
					<div className="account-box">
						<h1 className="text text-primary title">{authentication.user.firstName} {authentication.user.lastName}</h1>
						<span className="text text-primary">Username: {authentication.user.username}</span>
					</div>
				</div>
			</BorderPage>
		);
	}
}

AccountPage.propTypes = {};

let mapStateToProps = (state) => {
	return {
		authentication: state.authentication
	}
};

export default connect(mapStateToProps)(AccountPage);
