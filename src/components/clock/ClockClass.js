/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React from 'react';
// import PropTypes from 'prop-types';
import './clock.css';

export default class ClockClass extends React.Component {
  constructor(prpps) {
    super(prpps);
    this.timeZone = prpps.timeZone;
    this.nameClock = prpps.nameClock;
    this.deleteClock = prpps.deleteClock;
    this.state = {
      secDeg: new Date().getSeconds() * 6,
      minDeg: new Date().getMinutes() * 6,
      hourDeg: (new Date().getHours() * 30) + (this.timeZone * 30) + (new Date().getMinutes() / 2),
    };
  }

  componentDidMount() {
    this.idInterval = setInterval(this.goTime, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.idInterval);
  }

  goTime = () => {
    const { secDeg, minDeg, hourDeg } = this.state;
    if (secDeg >= 354) {
      this.setState({ secDeg: 0 });
      if (minDeg >= 354) {
        this.setState({ minDeg: 0 });
        if (hourDeg >= 354) {
          this.setState({ hourDeg: 0 });
        }
      } else {
        this.setState({ minDeg: minDeg + 6 });
        this.setState({ hourDeg: hourDeg + 0.5 });
      }
    } else {
      this.setState({ secDeg: secDeg + 6 });
    }
  };

  render() {
    const { secDeg, minDeg, hourDeg } = this.state;

    return (
      <li>
        <div className="clock">
          <p className="nameClock">{this.nameClock}</p>
          <button className="AcnivityItem__deleteItem" type="button" onClick={() => this.deleteClock()}>
            <span className="material-icons highlight_off">
              highlight_off
            </span>
          </button>
          <ul id="clock">
            <li id="sec" style={{ transform: `rotate(${secDeg}deg)` }} />
            <li id="hour" style={{ transform: `rotate(${hourDeg}deg)` }} />
            <li id="min" style={{ transform: `rotate(${minDeg}deg)` }} />
          </ul>
        </div>
      </li>
    );
  }
}
