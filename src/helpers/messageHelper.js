import {toast} from 'react-toastify';

export default {
  showSuccess,
  showWarning,
  showError
};

const toastConfiguration = {
  position: toast.POSITION.BOTTOM_LEFT
};

function showSuccess(message) {
  toast.success(message, toastConfiguration);
}

function showWarning(messsage) {
  toast.warn(messsage, toastConfiguration);
}

function showError(error) {
  toast.error(error, toastConfiguration);
}
