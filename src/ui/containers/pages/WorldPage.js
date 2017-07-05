import React, {Component} from 'react';
import HeaderPage from "../layouts/HeaderPage";
import "../../style/pages/WorldPage.scss";

class WorldPage extends Component {

	render() {
		return (
			<HeaderPage>
				<div className="content world">
					<div className="left-panel">
						<div className="tweet-feed">
							<h1 className="text text-primary">
								Live Tweet Feed
							</h1>
						</div>
					</div>
					<div className="right-panel">
						<div className="globe-container">
							<div className="globe-view">

							</div>
							<div className="globe-controls">

							</div>
						</div>
					</div>
				</div>
			</HeaderPage>
		);
	}
}

WorldPage.propTypes = {};

export default WorldPage;
