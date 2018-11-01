import React, {Component} from 'react';

import Context from './context';

const slider = [
    {unit: 'm⋅s⁻²', key: 'g', name: 'Gravitational acceleration', from: .001, to: 20},
    {unit: 'kg', key: 'mass_1', name: 'Mass 1', from: 1, to: 50},
    {unit: 'm', key: 'length_1', name: 'Length 1', from: 1, to: 500},
    {unit: '°', key: 'angle_1', name: 'Angle 1', from: -Math.PI, to: Math.PI, step: .0001},
    {unit: 's⁻¹', key: 'angular_velocity_1', name: 'Angle acceleration 1', from: -.15, to: .15, step: .001},
    {unit: 'kg', key: 'mass_2', name: 'Mass 2', from: 1, to: 50},
    {unit: 'm', key: 'length_2', name: 'Length 2', from: 1, to: 500},
    {unit: '°', key: 'angle_2', name: 'Angle 2', from: -Math.PI, to: Math.PI, step: .0001},
    {unit: 's⁻¹', key: 'angular_velocity_2', name: 'Angle acceleration 2', from: -.15, to: .15, step: .001},
];

export default class extends Component {
    render() {
        return (
            <Context.Consumer>
                {({state, change, pause}) => {
                    return (
                        <div id="controls"
                             onMouseOver={ev => pause(true)}
                             onMouseOut={ev => pause(false)}>
                            {slider.map((config, index) => {
                                return (
                                    <div key={index} className="slider">
                                        <div className="name">
                                            {config.name}
                                        </div>
                                        <div className="range">
                                            <div className="display">
                                                {config.unit === '°' ? (Math.round(state[config.key] * 180 / Math.PI)) : ((config.unit === 's⁻¹') ? (Math.round(state[config.key] * 100)+'⋅10⁻²') : (state[config.key]))} {config.unit}
                                            </div>
                                            <input
                                                type="range"
                                                value={state[config.key]}
                                                min={config.from}
                                                max={config.to}
                                                step={config.step || null}
                                                onChange={ev => {
                                                    change({[config['key']]: parseInt(ev.target.value)})
                                                }}/>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    );
                }}
            </Context.Consumer>
        )
    }
}