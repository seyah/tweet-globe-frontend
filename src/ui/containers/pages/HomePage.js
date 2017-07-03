import React, {Component} from 'react';
import BorderPage from '../layouts/BorderPage';
import Title from '../../components/title/Title';
import Subtitle from '../../components/subtitle/Subtitle';
import '../../style/pages/HomePage.scss';
import TweetGlobe from '../../../../public/images/tweetglobe.png';

class HomePage extends Component {
	render() {
		return (
			<BorderPage>
				<div className="content">
					<div className="splash">
						<img src={TweetGlobe} style={{width: '45%', minWidth: '100px'}}/>
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
