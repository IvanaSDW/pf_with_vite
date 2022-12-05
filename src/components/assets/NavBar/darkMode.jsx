import React from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';
import './darkMode.css';

const DarkMode = () => {
  let clickedClass = 'clicked';
  const body = document.body;
  const lightTheme = 'light';
  const darkTheme = 'dark';
  let theme;

  if (localStorage) {
    theme = localStorage.getItem('theme');
  }
  if (theme === lightTheme || theme === darkTheme) {
    body.classList.add(theme);
  } else {
    body.classList.add(lightTheme);
  }
  const switchTheme = (e) => {
    if (theme === darkTheme) {
      body.classList.replace(darkTheme, lightTheme);
      e.target.classList.remove(clickedClass);
      localStorage.setItem('theme', 'light');
      theme = lightTheme;
    } else {
      body.classList.replace(lightTheme, darkTheme);
      e.target.classList.add(clickedClass);
      localStorage.setItem('theme', 'dark');
      theme = darkTheme;
    }
  };

  return (
    <button
      className={theme === 'dark' ? clickedClass : ''}
      id="darkMode"
      onClick={switchTheme}
    >
      <FaSun
        style={{ fontSize: 17, padding: 2, marginTop: 3, color: 'yellow' }}
      />{' '}
      <FaMoon
        style={{ fontSize: 15, padding: 2, marginTop: 3, color: 'yellow' }}
      />{' '}
    </button>
  );
};
export default DarkMode;
