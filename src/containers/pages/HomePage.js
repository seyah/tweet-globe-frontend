import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import TextEntry from '../../components/textEntry/TextEntry';
import logo from 'images/logo.png';
import Title from '../../components/title/Title';

class HomePage extends Component {

	render() {
		return (
            <div className="content">
                <img style={{width: '10%'}} src={logo}/>
                <Title>Starting with React.JS</Title>
                <TextEntry title="Some Sample Content">
                    <p>{this.props.sampleContent1}</p>
                </TextEntry>
                <TextEntry title="Some Sample Content">
                    <p>{this.props.sampleContent2}</p>
                </TextEntry>
                <TextEntry title="Some Sample Content">
                    <p>{this.props.sampleContent3}</p>

                    <p>{this.props.sampleContent4}</p>
                </TextEntry>
            </div>
		);
	}

}

HomePage.propTypes = {
	sampleContent1: PropTypes.string,
	sampleContent2: PropTypes.string,
	sampleContent3: PropTypes.string,
	sampleContent4: PropTypes.string
};

const mapStateToProps = function (state) {
	return {
		sampleContent1: state.sampleReducer.sampleContent1,
		sampleContent2: state.sampleReducer.sampleContent2,
		sampleContent3: state.sampleReducer.sampleContent3,
		sampleContent4: state.sampleReducer.sampleContent4
	};
};

export default connect(mapStateToProps)(HomePage);
