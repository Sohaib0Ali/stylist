import { StatusBar } from 'react-native';
import { showMessage } from 'react-native-flash-message';

const customMessageStyle = {
  top: StatusBar.currentHeight,
  left: 0,
  right: 0,
};

export const showWarning = msg => {
  showMessage({
    message: msg,
    type: 'warning',
    style: customMessageStyle
  });
};
export const showDanger = msg => {
  showMessage({
    message: msg,
    type: 'danger',
    style: customMessageStyle
  });
};
export const showInfo = msg => {
  showMessage({
    message: msg,
    type: 'info',
    style: customMessageStyle
  });
};
export const showSuccess = msg => {
  showMessage({
    message: msg,
    type: 'success',
    style: customMessageStyle
  });
};
