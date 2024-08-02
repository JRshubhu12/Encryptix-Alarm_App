// src/components/SetAlarm.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import './SetAlarm.css';

function SetAlarm() {
  const [alarmName, setAlarmName] = useState('');
  const [alarmTime, setAlarmTime] = useState(dayjs());
  const [selectedDays, setSelectedDays] = useState({
    monday: true,
    tuesday: true,
    wednesday: true,
    thursday: true,
    friday: true,
    saturday: true,
    sunday: true,
  });
  const navigate = useNavigate();

  const handleSaveAlarm = () => {
    const alarms = JSON.parse(localStorage.getItem('alarms')) || [];
    const newAlarm = {
      id: Date.now(),
      name: alarmName,
      time: alarmTime.toISOString(),
      days: selectedDays,
      active: true,
    };
    alarms.push(newAlarm);
    localStorage.setItem('alarms', JSON.stringify(alarms));
    navigate('/');
  };

  const handleDayChange = (day) => {
    setSelectedDays((prevDays) => ({
      ...prevDays,
      [day]: !prevDays[day],
    }));
  };

  return (
    <div className='desktop'>
      <div className="set-alarm">
        <h1>Set New Alarm</h1>
        <div className='placeholder'>
          <input
            type="text"
            placeholder="Alarm Name"
            value={alarmName}
            onChange={(e) => setAlarmName(e.target.value)}
          />
        </div>
        <div className='beautiful-timepicker'>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
              label="Select Date and Time"
              value={alarmTime}
              onChange={(newValue) => setAlarmTime(newValue)}
            />
          </LocalizationProvider>
        </div>
        <div className="days-btn-container">
  <input
    className="day-btn"
    id="monday"
    type="checkbox"
    checked={selectedDays.monday}
    onChange={() => handleDayChange('monday')}
  />
  <label className="day-label" htmlFor="monday">M</label>

  <input
    className="day-btn"
    id="tuesday"
    type="checkbox"
    checked={selectedDays.tuesday}
    onChange={() => handleDayChange('tuesday')}
  />
  <label className="day-label" htmlFor="tuesday">T</label>

  <input
    className="day-btn"
    id="wednesday"
    type="checkbox"
    checked={selectedDays.wednesday}
    onChange={() => handleDayChange('wednesday')}
  />
  <label className="day-label" htmlFor="wednesday">W</label>

  <input
    className="day-btn"
    id="thursday"
    type="checkbox"
    checked={selectedDays.thursday}
    onChange={() => handleDayChange('thursday')}
  />
  <label className="day-label" htmlFor="thursday">T</label>

  <input
    className="day-btn"
    id="friday"
    type="checkbox"
    checked={selectedDays.friday}
    onChange={() => handleDayChange('friday')}
  />
  <label className="day-label" htmlFor="friday">F</label>

  <input
    className="day-btn"
    id="saturday"
    type="checkbox"
    checked={selectedDays.saturday}
    onChange={() => handleDayChange('saturday')}
  />
  <label className="day-label" htmlFor="saturday">S</label>

  <input
    className="day-btn"
    id="sunday"
    type="checkbox"
    checked={selectedDays.sunday}
    onChange={() => handleDayChange('sunday')}
  />
  <label className="day-label" htmlFor="sunday">S</label>
</div>

        <button className='save_alarm' onClick={handleSaveAlarm}>Save Alarm</button>
      </div>
    </div>
  );
}

export default SetAlarm;