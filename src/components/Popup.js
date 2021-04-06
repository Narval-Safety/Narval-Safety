import React, { Component } from 'react';
import WhiteReactLogo from '../../img/narval-logo-white.svg';
import DarkReactLogo from '../../img/narval-logo-dark.svg';
import { IconButton , SvgIcon } from '@material-ui/core';
import { Settings } from '@material-ui/icons';
import Switch from '@material-ui/core/Switch';
import { withStyles } from '@material-ui/core/styles';
import '../App.css';

class Popup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            http: "",
            active: "",
            rate: -1,
            darkmode: false
        };
        this.refreshRender = this.refreshRender.bind(this)
        this.forceUpdateHandler = this.forceUpdateHandler.bind(this);
    }

    forceUpdateHandler(){
        this.forceUpdate();
      };

    refreshRender(msg) {
        console.log(msg.greeting)
        if (msg.greeting == "refresh") {
            this.setStateFromConfig()
        }
    }

    setStateFromConfig() {
        chrome.storage.local.get('config', (obj) => {
            const config = JSON.parse(obj.config)
            console.log(config.active)
            this.setState({ active: config.active});
        });
        chrome.storage.local.get('rate', (obj) => {
            console.log(obj)
            this.setState({ rate: obj.rate});
        });
    }

    changeMode() {
        console.log("changing mode")
        if (this.state.darkmode) {
            this.setState({ darkmode: false})
        } else {
            this.setState({ darkmode: true })
        }
    }

    changeStateConfig(value) {
        const config = {
            active: value,
        }
        console.log(config)
        chrome.storage.local.set({"config": JSON.stringify(config)},function (){
            console.log("Storage Succesful");
        });
        this.forceUpdateHandler()
    }

    componentDidMount() {
        this.props.chrome.runtime.onMessage.addListener(this.refreshRender);
    }

    componentWillMount() {
        this.setStateFromConfig()
    }

    render() {
        const styles = (this.state.darkmode ? stylesDark : stylesWhite)
        const ReactLogo = (this.state.darkmode ? DarkReactLogo : WhiteReactLogo)

        const BlueSwitch = withStyles({
            switchBase: {
              color: this.state.darkmode ? '#eff2f2' : "#3F8AAB",
              '&$checked': {
                color: this.state.darkmode ? '#eff2f2' : "#104261",
              },
              '&$checked + $track': {
                backgroundColor: this.state.darkmode ? "#259ce6" : "#104261",
              },
            },
            checked: {},
            track: {},
          })(Switch);
          
        const handleChange = () => {
            if (this.state.active) {
                this.setState({ active: false });
                this.changeStateConfig(false)
            } else {
                this.setState({ active: true })
                this.changeStateConfig(true)
            }
          };

        const handleChangeMode = () => {
            this.changeMode()
        }

        let comp = null
        if (this.state.active) {
            if ( this.state.rate >= 0) {
                comp = (
                <div>
                    <h2 style={styles.font1}>
                        Site frauduleux a
                    </h2>
                    <h2 style={styles.font2}>
                        {this.state.rate.toFixed(1)}%
                    </h2>
                </div>
                )
            } else {
                comp = (
                <div>
                    <h2 style={styles.font3}>
                        Charging ...
                    </h2>
                </div>
                )
            }
        }

        return (
            <div style={this.state.active ? styles.mainActive : styles.main}>
                <div style={styles.headerContainer}>
                    <img src={ReactLogo} style={styles.img}/>
                    <h2 style={styles.font}>
                    Narval
                    </h2>
                    <div style={styles.switchButton}>
                    <BlueSwitch style={{  }} checked={this.state.active} onChange={handleChange}/>
                    </div>
                    {comp}
                </div>
                <div style={styles.toolBar}>
                    <IconButton onClick={handleChangeMode} aria-label="settings" style={styles.optionButton}>
                        <Settings />
                    </IconButton>
                </div>
            </div>
        );
    }
}

const stylesWhite = {
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',

    },
    font: {
        color: '#104261',
        textAlign: 'center',
        fontSize: '30px',
        margin: '2%',
        fontFamily: "NORTH"
    }
    ,
    font1: {
        color: '#104261',
        textAlign: 'center',
        fontSize: '10px',
        margin: '2%',
        fontFamily: "NORTH",
        marginTop: '20%'
    },
    font2: {
        color: '#104261',
        textAlign: 'center',
        fontSize: '20px',
        margin: '2%',
        fontFamily: "NORTH"
    },
    font3: {
        color: '#104261',
        textAlign: 'center',
        fontSize: '20px',
        margin: '2%',
        fontFamily: "NORTH",
        marginTop: '20%'
    },
    main: {
        width: '250px',
        height: '300px',
        alignItems: 'stretch',
        justifyContent: 'center',
        backgroundColor: '#eff2f2',

    },
    mainActive: {
        width: '250px',
        height: '400px',
        alignItems: 'stretch',
        justifyContent: 'center',
        backgroundColor: '#eff2f2',

    },
    img: {
        height: '100px',
        margin: 'auto',
        width: '100%',
        marginTop: "10%"
    },
    optionButton: {
        margin: 'auto',
        color: '#104261'
    },
    toolBar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: '20px',
        margin: 'auto',
        width: '100%'
    },
    switchButton: {
        margin: 'auto',
        display: 'flex',
        marginTop: '5%',
        justifyContent: 'center',
        alignItems: 'center'
    }
}

const stylesDark = {
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',

    },
    font: {
        color: '#eff2f2',
        textAlign: 'center',
        fontSize: '30px',
        margin: '2%',
        fontFamily: "NORTH"
    }
    ,
    font1: {
        color: '#eff2f2',
        textAlign: 'center',
        fontSize: '10px',
        margin: '2%',
        fontFamily: "NORTH",
        marginTop: '20%'
    },
    font2: {
        color: '#eff2f2',
        textAlign: 'center',
        fontSize: '20px',
        margin: '2%',
        fontFamily: "NORTH"
    },
    font3: {
        color: '#eff2f2',
        textAlign: 'center',
        fontSize: '20px',
        margin: '2%',
        fontFamily: "NORTH",
        marginTop: '20%'
    },
    main: {
        width: '250px',
        height: '300px',
        alignItems: 'stretch',
        justifyContent: 'center',
        backgroundColor: '#104261',

    },
    mainActive: {
        width: '250px',
        height: '400px',
        alignItems: 'stretch',
        justifyContent: 'center',
        backgroundColor: '#104261',

    },
    img: {
        height: '100px',
        margin: 'auto',
        width: '100%',
        marginTop: "10%"
    },
    optionButton: {
        margin: 'auto',
        color: '#eff2f2'
    },
    toolBar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: '20px',
        margin: 'auto',
        width: '100%'
    },
    switchButton: {
        margin: 'auto',
        display: 'flex',
        marginTop: '5%',
        justifyContent: 'center',
        alignItems: 'center'
    }
}

export default Popup;
