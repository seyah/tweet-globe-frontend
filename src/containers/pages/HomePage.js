import React, {Component} from 'react';
import BorderPage from "../layouts/BorderPage";
import Title from "../../components/title/Title";

class HomePage extends Component {

	render() {
		return (
			<BorderPage>
				<div className="content">
					<Title>
						Welcome to Tweet Globe!
					</Title>
				</div>
			</BorderPage>
		);
	}

}

HomePage.propTypes = {};

export default HomePage;
