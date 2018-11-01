import React, {Component, Fragment} from 'react';

import Context from './context';


import Controls from './controls';
import Canvas from './canvas';

export default class extends Component {
    constructor(props) {
        super(props);

        this.state = {
            g: 9.81,
            length_1: 150,
            length_2: 150,
            mass_1: 10,
            mass_2: 10,
            angle_1: Math.PI / .8,
            angle_2: Math.PI / .6,
            angular_velocity_1: 0,
            angular_velocity_2: 0,
            trace: true,
            pause: false,
        };
    }

    componentDidMount() {
        window.addEventListener('blur', ev => {
            this.setState({pause: true});
        });
        window.addEventListener('focus', ev => {
            this.setState({pause: false});
        })
    }

    change(data) {
        this.setState(data);
    }

    pause(state) {
        this.setState({pause: state});
    }

    render() {
        return (
            <Fragment>
                <Context.Provider
                    value={{
                        state: this.state,
                        change: this.change.bind(this),
                        pause: this.pause.bind(this)
                    }}>
                    <Canvas {...this.state} change={this.change.bind(this)}/>
                    <Controls/>
                </Context.Provider>
            </Fragment>
        );
    }
}