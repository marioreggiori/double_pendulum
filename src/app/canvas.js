import React, {Component} from 'react';

export default class extends Component {
    constructor(props) {
        super(props);

        this.canvas = React.createRef();

        this.trace = [];

        this.height = 2000;
        this.width = 2000;

        this.lastTime = Date.now();
    }

    componentDidMount() {
        const canvas = this.canvas.current;
        const ctx = canvas.getContext('2d');

        ctx.lineWidth = 3;


        ctx.translate(this.width / 2, this.height / 2);

        ctx.strokeStyle = '#fff';


        const draw = (rad1, rad2) => {
            const x1 = this.props.length_1 * Math.sin(rad1),
                y1 = this.props.length_1 * Math.cos(rad1),
                x2 = x1 + this.props.length_2 * Math.sin(rad2),
                y2 = y1 + this.props.length_2 * Math.cos(rad2);

            if (this.props.trace) {
                this.trace.push([x2, y2])
            }

            ctx.clearRect(-this.width / 2, -this.height / 2, this.height, this.width);


            for (const i in this.trace) {
                if (!this.trace.hasOwnProperty(i)) continue;
                ctx.fillStyle = '#950810';
                ctx.fillRect(this.trace[i][0] - 1, this.trace[i][1] - 1, 2, 2);
            }



            ctx.beginPath();
            ctx.arc(0, 0, 10, 0, 2 * Math.PI);
            ctx.fillStyle = '#fff';
            ctx.fill();

            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(x1, y1);
            ctx.stroke();


            ctx.beginPath();
            ctx.arc(x1, y1, this.props.mass_1, 0, 2 * Math.PI);
            ctx.fillStyle = '#fff';
            ctx.fill();


            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.stroke();


            ctx.beginPath();
            ctx.arc(x2, y2, this.props.mass_2, 0, 2 * Math.PI);
            ctx.fillStyle = '#fff';
            ctx.fill();


            window.requestAnimationFrame(() => {
                calc();
            })
        };


        const calc = () => {
            const factor = (-this.lastTime + (this.lastTime = Date.now())) / 1000;

            const angular_acceleration_1 =
                (-this.props.g * factor * (2 * this.props.mass_1 + this.props.mass_2) * Math.sin(this.props.angle_1) - this.props.mass_2 * this.props.g * factor * Math.sin(this.props.angle_1 - 2 * this.props.angle_2) - 2 * Math.sin(this.props.angle_1 - this.props.angle_2) * this.props.mass_2 * (Math.pow(this.props.angular_velocity_2, 2) * this.props.length_2 + Math.pow(this.props.angular_velocity_1, 2) * this.props.length_1 * Math.cos(this.props.angle_1 - this.props.angle_2)))
                / (this.props.length_1 * (2 * this.props.mass_1 + this.props.mass_2 - this.props.mass_2 * Math.cos(2 * this.props.angle_1 - 2 * this.props.angle_2)));

            const angular_acceleration_2 =
                (2 * Math.sin(this.props.angle_1 - this.props.angle_2) * (Math.pow(this.props.angular_velocity_1, 2) * this.props.length_1 * (this.props.mass_1 + this.props.mass_2) + this.props.g * factor * (this.props.mass_1 + this.props.mass_2) * Math.cos(this.props.angle_1) + Math.pow(this.props.angular_velocity_2, 2) * this.props.length_2 * this.props.mass_2 * Math.cos(this.props.angle_1 - this.props.angle_2)))
                / (this.props.length_2 * (2 * this.props.mass_1 + this.props.mass_2 - this.props.mass_2 * Math.cos(2 * this.props.angle_1 - 2 * this.props.angle_2)));


            const change = {
                angular_velocity_1: this.props.angular_velocity_1 + angular_acceleration_1,
                angular_velocity_2: this.props.angular_velocity_2 + angular_acceleration_2,

                angle_1: this.props.angle_1 + this.props.angular_velocity_1 + angular_acceleration_1,
                angle_2: this.props.angle_2 + this.props.angular_velocity_2 + angular_acceleration_2,
            };

            if (change.angle_1 > Math.PI) {
                change.angle_1 -= 2 * Math.PI;
            } else if (change.angle_1 < -Math.PI) {
                change.angle_1 += 2 * Math.PI
            }

            if (change.angle_2 > Math.PI) {
                change.angle_2 -= 2 * Math.PI;
            } else if (change.angle_2 < -Math.PI) {
                change.angle_2 += 2 * Math.PI
            }

            if (!this.props.pause) {
                this.props.change(change);
            }

            draw(this.props.angle_1, this.props.angle_2);
        };


        calc();
    }

    render() {
        return (
            <div id="canvas">
                <canvas ref={this.canvas} height={this.height} width={this.width}/>
            </div>
        )
    }
}