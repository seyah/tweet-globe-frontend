import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './ActionButton.scss';

class ActionButton extends Component {

	constructor(props) {
		super(props);

		this.state = {hover: false}
	}

	render() {
		let {colour, icon, invertIcon, onClick} = this.props;

		let style = {
			border: "3px solid " + colour,
			color: colour,
			backgroundColor: this.state.hover ? colour  : "transparent"
		};

		return (
			<div className={"action-button" + (this.state.hover ? " hover" : "")}
				 onClick={onClick}
				 onMouseEnter={() => this.setState({...this.state, hover: true})}
				 onMouseLeave={() => this.setState({...this.state, hover: false})}
				 style={style}>
				<i className={"fa " + icon + (this.state.hover && invertIcon ? " invert" : "")}/>
			</div>
		);
	}
}

ActionButton.defaultProps = {
	colour: '#fff',
	icon: "fa-plus",
	invertIcon: false
};

ActionButton.propTypes = {
	colour: PropTypes.string,
	icon: PropTypes.string,
	invertIcon: PropTypes.bool,
	onClick: PropTypes.func
};

export default ActionButton;
