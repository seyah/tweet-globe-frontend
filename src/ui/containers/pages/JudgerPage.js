import React, {Component} from 'react';
import "../../style/pages/JudgerPage.scss";
import BorderlessPage from "../layouts/BorderlessPage";
import ActionButton from "../../components/actionButton/ActionButton";

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
                                <ActionButton icon="fa-thumbs-down fa-3x" colour={'#af0100'}/>
                                <ActionButton icon="fa-hand-stop-o fa-3x" colour={'#af7d00'}/>
                                <ActionButton icon="fa-thumbs-up fa-3x" colour={'#15af00'}/>
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
