import React, {Component} from 'react';
import "../../style/pages/JudgerPage.scss";
import BorderlessPage from "../layouts/BorderlessPage";

class JudgerPage extends Component {

    render() {
        return (
            <BorderlessPage>
                <div className="content judger">
                    <div className="sidebar">
                        <h1 className="text text-primary">
                            tttt ttt
                        </h1>
                    </div>
                    <div className="panel">
                        <div className="globe-container">
                            <div className="globe-view">
                            </div>
                            <div className="globe-controls">

                            </div>
                        </div>
                    </div>
                </div>
            </BorderlessPage>
        );
    }
}

JudgerPage.propTypes = {};

export default JudgerPage;
