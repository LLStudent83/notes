/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import shortid from 'shortid';
// import Clock from '../clock/Clock';
import ClockClass from '../clock/ClockClass';
import './appWorldClock.css';

export default class AppWorldClock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nameClock: '',
      timeZone: '',
      clocks: [],
    };
  }

  handleNameSityChange = ({ target }) => {
    const { value } = target;
    this.setState({ nameClock: value });
  };

  handleTimeZoneChange = ({ target }) => {
    const { value } = target;
    this.setState({ timeZone: value });
  };

  addClock = () => {
    const { nameClock, timeZone, clocks } = this.state;
    if (timeZone === '') {
      // eslint-disable-next-line no-useless-return
      return;
    }
    this.setState({ clocks: [...clocks, { timeZone, nameClock, id: shortid.generate() }] });
    this.setState({ nameClock: '', timeZone: '' });
  };

  deleteClock(id) {
    // eslint-disable-next-line react/no-access-state-in-setstate
    const sortClocks = this.state.clocks.filter((clock) => clock.id !== id);
    this.setState({ clocks: sortClocks });
  }

  render() {
    const { nameClock, timeZone, clocks } = this.state;
    return (
      <div className="wrapper">
        <div className="controlPanel">
          <div className="input_wrapper">
            <label htmlFor="nameSity">Название</label><br />
            <input id="nameSity" type="text" value={nameClock} onChange={this.handleNameSityChange} />
          </div>
          <div className="input_wrapper">
            <label htmlFor="timeZone">Временная зона</label><br />
            <input id="timeZone" type="text" value={timeZone} onChange={this.handleTimeZoneChange} />
          </div>
          <input className="addTime" type="button" value="Добавить" onClick={this.addClock} />
        </div>
        <ul className="clocks">
          {/* <Clock timeZone={Number(timeZone)} /> */}
          {clocks.map((clock) => (
            <ClockClass
              timeZone={Number(clock.timeZone)}
              nameClock={clock.nameClock}
              deleteClock={() => this.deleteClock(clock.id)}
              key={clock.id}
            />
          ))}
        </ul>

      </div>
    );
  }
}
