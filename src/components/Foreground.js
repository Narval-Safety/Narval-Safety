import React from 'react';
import Swal from 'sweetalert2'
import WhiteReactLogo from '../../img/narval-logo-white.svg';

class Foreground extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            http: "",
            torend: true,
        };
        this.refreshRender = this.refreshRender.bind(this)
    }

    refreshRender(msg) {
        if (msg.greeting == "alert") {
            this.setState({ torend: true })
        }
    }

    componentWillMount() {
        this.props.chrome.runtime.onMessage.addListener(this.refreshRender);
    }

    render () {
        return (
            <div>
                {this.state.torend && <div style={styles.main}>
                        {Swal.fire({
                            imageUrl: "https://image.noelshack.com/fichiers/2021/05/4/1612474135-narval-minim.png",
                            imageWidth: 150,
                            imageHeight: 150,
                            imageAlt: 'Custom image',
                            title: 'Attention !',
                            text: 'Ce site est potentiellement frauduleux !',
                            textColor: '#104261',
                            background: '#eff2f2',
                            confirmButtonColor: '#104261',
                            confirmButtonText: 'OK'
                        })}
                    </div>}
            </div>
        )
    }
}

const styles = {
    main: {
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: '1000',
        fontSize: '80px',
        pointerEvents: 'none',
        backgroundColor: 'red'
    }
}
export default Foreground;
