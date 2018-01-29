import React, {Component} from 'react';
import HeaderPage from '../layouts/HeaderPage';
import Title from '../../components/title/Title';
import Subtitle from '../../components/subtitle/Subtitle';
import '../../style/pages/HomePage.scss';
import {Col, Grid, Jumbotron, Row} from "react-bootstrap";

class HomePage extends Component {
    render() {
        return (
            <HeaderPage centered>
                <Grid>
                    <Row>
                        <Col xs={12}>
                            <div className="splash">
                                <Jumbotron>
                                    <h1>Tweet Globe</h1>
                                    <p>
                                        The interactive twitter profiler.
                                    </p>
                                    <p>
                                        <small>test</small>
                                    </p>
                                </Jumbotron>
                            </div>
                        </Col>
                    </Row>
                </Grid>
            </HeaderPage>
        );
    }
}

HomePage.propTypes = {};

export default HomePage;
