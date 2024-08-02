import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import './AlarmList.css';

function AlarmList() {
  const [alarms, setAlarms] = useState([]);

  useEffect(() => {
    const storedAlarms = JSON.parse(localStorage.getItem('alarms')) || [];
    console.log('Stored Alarms:', storedAlarms); // Debugging: log the stored alarms
    setAlarms(storedAlarms);
  }, []);

  const toggleAlarm = (id) => {
    const updatedAlarms = alarms.map((alarm) =>
      alarm.id === id ? { ...alarm, active: !alarm.active } : alarm
    );
    localStorage.setItem('alarms', JSON.stringify(updatedAlarms));
    setAlarms(updatedAlarms);
  };

  const getAlarmName = (name) => {
    return name || 'Unnamed Alarm'; // Return the name or a default message if it's empty
  };

  return (
    <div className="desktop">
      <div className="alarm-list-container">
      <h2 className="text">Alarm List</h2>
      {alarms.length > 0 ? (
        <div className="alarm-list">
          {alarms.map((alarm) => (
            <div key={alarm.id} className="alarm-item">
              <div className="alarm-details">
                {/* <span className="alarm-name">{getAlarmName(alarm.name)}</span> */}
                <span className="alarm-time12">
                  {alarm.time ? moment(alarm.time).format('MMMM Do YYYY, h:mm a') : 'Invalid time'}
                </span>
                <span className="alarm-status">{alarm.active ? 'On' : 'Off'}</span>
              </div>
              <button onClick={() => toggleAlarm(alarm.id)} className="toggle-button">
                Toggle
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p>No alarms set.</p>
      )}
      {/* <Link to="/" className="go-back-link">Go Back</Link> */}
      <a class="btn" href="/">Go Back</a>
      </div>
    </div>
  );
}

export default AlarmList;
