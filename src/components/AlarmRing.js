import React, { useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

function AlarmRing() {
  const { id } = useParams();
  const navigate = useNavigate();
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.play();
      toast.info('Alarm ringing!');
    }
  }, []);

  const handleSnooze = () => {
    // Snooze logic here
    toast.info('Alarm snoozed for 5 minutes.');
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    navigate('/');
  };

  const handleDismiss = () => {
    const alarms = JSON.parse(localStorage.getItem('alarms')) || [];
    const updatedAlarms = alarms.filter((alarm) => alarm.id !== parseInt(id, 10));
    localStorage.setItem('alarms', JSON.stringify(updatedAlarms));
    toast.success('Alarm dismissed.');
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    navigate('/');
  };

  return (
    <div className="alarm-ring">
      <h2>Alarm Ringing</h2>
      <audio ref={audioRef} src="/alarm-sound.mp3" loop />
      <button onClick={handleSnooze}>Snooze</button>
      <button onClick={handleDismiss}>Dismiss</button>
      <ToastContainer />
    </div>
  );
}

export default AlarmRing;
