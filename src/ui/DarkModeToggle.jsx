import { HiOutlineMoon, HiOutlineSun } from 'react-icons/hi';
import ButtonIcon from './ButtonIcon';
import { useDarkMode } from '../context/DarkModeContextProvider';

const DarkModeToggle = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  ///////////////////////////////////////////////////
  return (
    <ButtonIcon onClick={toggleDarkMode}>
      {isDarkMode ? <HiOutlineSun /> : <HiOutlineMoon />}
    </ButtonIcon>
  );
};

export default DarkModeToggle;
