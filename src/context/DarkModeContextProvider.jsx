import { createContext, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useLocalStorageState } from '../hooks/useLocalStorageState';

const DarkModeContext = createContext();

const DarkModeContextProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useLocalStorageState(
    window.matchMedia('(prefers-color-scheme:dark)').matches,
    'isDarkMode'
  );

  function toggleDarkMode() {
    setIsDarkMode((isDark) => !isDark);
  }

  useEffect(() => {
    if (isDarkMode) document.documentElement.classList.add('dark-mode');
    else document.documentElement.classList.remove('dark-mode');
  }, [isDarkMode]);
  ///////////////////////////////////////////////////
  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};

export const useDarkMode = () => {
  const context = useContext(DarkModeContext);

  if (context === undefined)
    throw new Error(
      'DarkModeCotnext used outside of DarkModeCotnext provider...'
    );

  return context;
};

DarkModeContextProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.array.isRequired,
    PropTypes.object.isRequired,
  ]),
};

export default DarkModeContextProvider;
