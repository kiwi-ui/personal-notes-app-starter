import React, { useContext } from 'react'
import ThemeContext from '../../ThemeContext/ThemeContext';

const ToggleChangeTheme = () => {
  const {theme, toggleTheme} = useContext(ThemeContext);
  return (
    <button className="toggle-theme" onClick={toggleTheme}>
        {theme === 'dark' ? '🌞' : '🌙'}
    </button>
  )
}

export default ToggleChangeTheme