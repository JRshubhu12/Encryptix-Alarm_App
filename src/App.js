import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import SetAlarm from './components/SetAlarm';
import AlarmList from './components/AlarmList';
import AlarmRing from './components/AlarmRing';  // Assuming you have an AlarmRing component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/setalarm" element={<SetAlarm />} />
        <Route path="/alarm-list" element={<AlarmList />} />
        <Route path="/alarm-ring/:id" element={<AlarmRing />} />
      </Routes>
    </Router>
  );
}

export default App;
