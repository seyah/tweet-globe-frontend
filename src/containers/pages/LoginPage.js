import React, {Component} from 'react';
import BorderPage from '../layouts/BorderPage';
import logoImage from '../../../public/images/logo.png';
import '../../style/pages/LoginPage.scss';

class LoginPage extends Component {
	render() {
		return (
			<BorderPage>
				<div className="content">
					<img src={logoImage} style={{width: '15%'}}/>
					<div className="login-box">
						<span className="text-primary">Please enter your details to log in:</span>
					</div>
				</div>
			</BorderPage>
		);
	}
}

LoginPage.propTypes = {};

export default LoginPage;
