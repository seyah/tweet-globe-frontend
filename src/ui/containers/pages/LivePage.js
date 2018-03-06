import React, {Component} from 'react';
import "../../style/pages/LivePage.scss";
import HeaderPage from "../layouts/HeaderPage";
import {connect} from "react-redux";
import {Grid} from "react-bootstrap";

class LivePage extends Component {

    constructor(props) {
        super(props);

        this.print = this.print.bind(this);
    }

    componentDidMount() {
        console.log("hi");
    }

    print(str) {
        console.log(str);
    }

    componentWillUnmount() {
        console.log("bye")
    }

    render() {
        return (
            <HeaderPage>
                <Grid className="live-twitter">

                </Grid>
            </HeaderPage>
        );
    }
}

LivePage.defaultProps = {
    data: {},
};

let mapStateToProps = (state) => {
    return {
        data: state.twitter
    }
};

export default connect(mapStateToProps)(LivePage);
