import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
} from "react-router-dom";
import Popup from './Popup.js';
import Foreground from './Foreground.js';

class Options extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <Router>
                <div style={styles.container}>
                    <div style={styles.nav_bar}>
                        <h1>Narval Ext - Options</h1>
                        <text>Options here</text>
                    </div>
                    <Switch>
                        <Route exact path="/popup">
                            <Popup />
                        </Route>
                        <Route exact path="/foreground">
                            <Foreground />
                        </Route>
                        <Route exact path="/">
                            <Redirect to="/options.html" />
                        </Route>
                    </Switch>
                </div>
            </Router>
        )
    }
}

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    }
}
export default Options;
