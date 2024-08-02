import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import moment from 'moment';
import { ToastContainer, toast } from 'react-toastify';
import image6 from './images/image 6.svg';
import imageGroup from './images/Group 1.svg';
import button1 from './images/Button.svg';
import emogi from './images/emogi.svg';
import bell from './images/image 5.svg';
import profile from './images/profile.svg';
import add from './images/add.webp';
import save from './images/save.svg';
import './Home.css'; 

function Home() {
  const [currentTime, setCurrentTime] = useState(moment().format('MMMM Do YYYY, h:mm:ss a'));
  const [greeting, setGreeting] = useState('Hello User');
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      const now = moment();
      setCurrentTime(now.format('MMMM Do YYYY, h:mm:ss a'));
      setGreeting(getGreeting(now));

      const alarms = JSON.parse(localStorage.getItem('alarms')) || [];
      alarms.forEach(alarm => {
        if (alarm.active && moment(alarm.time).isSame(now, 'minute')) {
          toast.info('Alarm ringing!');
          navigate(`/alarm-ring/${alarm.id}`);
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [navigate]);

  const getGreeting = (now) => {
    const hour = now.hour();
    if (hour < 12) {
      return 'Good Morning';
    } else if (hour < 18) {
      return 'Good Afternoon';
    } else if (hour < 23) { // Added condition for evening
      return 'Good Evening';
    } else {
      return 'Good Night'; // New greeting for after 11 PM
    }
  };

  const toggleAlarm = (id) => {
    const alarms = JSON.parse(localStorage.getItem('alarms')) || [];
    const updatedAlarms = alarms.map(alarm => 
      alarm.id === id ? { ...alarm, active: !alarm.active } : alarm
    );
    localStorage.setItem('alarms', JSON.stringify(updatedAlarms));
  };

  const getDaysString = (days) => {
    return Object.keys(days)
      .filter(day => days[day])
      .map(day => day.charAt(0).toUpperCase() + day.slice(1, 3))
      .join(', ');
  };

  const getActiveAlarm = () => {
    const alarms = JSON.parse(localStorage.getItem('alarms')) || [];
    return alarms.filter(alarm => alarm.active).sort((a, b) => moment(a.time) - moment(b.time))[0];
  };

  const getAlarmName = (name) => {
    return name || 'Unnamed Alarm'; 
  };


  const activeAlarm = getActiveAlarm();

  return (
    <div className="desktop">
      <div className="image">
        <Link to="/setalarm">
          <img className="img" src={image6} alt="Clock" />
        </Link>
      </div>
      <div className="label">
        <div className="text-wrapper">Alarm</div>
      </div>
      <div className="box">
        <div className="group">
          <div className="overlap-group">
            <Link to="/setalarm">
              <img className="imgbell" src={imageGroup} alt="Group" />
            </Link>
          </div>
        </div>
      </div>
      <div className="button">
        <div className="text-wrapper-greeting">{greeting}</div>
        <img className="image" alt="Image" src={button1} />
        <img className="emogi" alt="Image" src={emogi} />
        <div className="user">Hi USER</div>
      </div>
      <ToastContainer />
      <div className="box">
        <div className="rectangle">
          {activeAlarm ? (
            <div key={activeAlarm.id} className="alarm-item styled-alarm">
              <input 
                type="checkbox" 
                checked={activeAlarm.active} 
                onChange={() => toggleAlarm(activeAlarm.id)} 
              />
              <div className="alarm-details">
                {/* <span className="alarm-name">{getAlarmName(alarm.name)}</span> */}
                <span className="alarm-time">{moment(activeAlarm.time).format('MMMM Do YYYY, h:mm:ss a')}</span>
                <div className="alarm-days">{getDaysString(activeAlarm.days)}</div>
              </div>
              {activeAlarm.active && <img src={bell} alt="Alarm Set" className="alarm-image" />}
            </div>
          ) : (
            <div className='no-alarm'>No alarms set.</div>
          )}
        </div>
      </div>
      <div className="image">
        <img className="profile" alt="Image" src={profile} />
      </div>
      <div className="image">
        <Link to="/setalarm">
          <img className="add" alt="Image" src={add} />
        </Link>
      </div>
      <div className="image">
        <Link to="/alarm-list">
          <img className="save" alt="Image" src={save} />
        </Link>
      </div>
      <footer className="footer">
        <div className="footer-content"></div>
      </footer>
    </div>
  );
}

export default Home;
