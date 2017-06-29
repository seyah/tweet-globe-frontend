import React, {Component} from 'react';
import BorderPage from '../layouts/BorderPage';
import Title from '../../components/title/Title';
import Subtitle from '../../components/subtitle/Subtitle';
import '../../style/pages/HomePage.scss';

class HomePage extends Component {
	render() {
		return (
			<BorderPage>
				<div className="content">
					<div className="splash">
						<Title>Welcome to Tweet Globe</Title>
						<Subtitle>The interactive social globe</Subtitle>
					</div>
				</div>
			</BorderPage>
		);
	}
}

HomePage.propTypes = {};

export default HomePage;
