/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './clock.css';

function Clock({ timeZone, nameClock }) {
  const [sec, setSec] = useState(new Date().getSeconds());
  const [min, setMin] = useState(new Date().getMinutes());
  const [hour, setHour] = useState(new Date().getHours() + timeZone);

  const goTime = () => {
    // if (sec >= 59) {
    //   setSec(0);
    //   if (min >= 59) {
    //     setMin(0);
    //     if (hour >= 11) {
    //       setHour(0);
    //     } else {
    //       setHour((lastHour) => lastHour + 1);
    //     }
    //   } else {
    //     setMin((lastMin) => lastMin + 1);
    //   }
    // } else {
    //   setSec((lastSec) => lastSec + 1);
    // }
    setSec((lastSec) => {
      if (lastSec >= 59) {
        setMin((lastMin) => {
          console.log(lastMin);
          return (lastMin + 1);
        });
        return 0;
      }
      return (lastSec + 1);
    });
  };
  // useEffect(() => {
  //   setSec(sec + 1);
  // }, [sec]);

  let idInterval;
  useEffect(() => {
    setInterval(goTime, 100);
    return () => { clearInterval(idInterval); };
  }, []);

  const secDeg = sec * 6;
  const minDeg = min * 6;
  const hourDeg = hour * 30;

  return (
    <div className="clock">
      <p className="nameClock">{nameClock}</p>
      <ul id="clock">
        <li id="sec" style={{ transform: `rotate(${secDeg}deg)` }} />
        <li id="hour" style={{ transform: `rotate(${hourDeg}deg)` }} />
        <li id="min" style={{ transform: `rotate(${minDeg}deg)` }} />
      </ul>

    </div>

  );
}

Clock.propTypes = {
  timeZone: PropTypes.number.isRequired,
  nameClock: PropTypes.string.isRequired,
};

export default Clock;
