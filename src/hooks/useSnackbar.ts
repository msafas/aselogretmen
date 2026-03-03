import { useState } from 'react';
import { AlertColor } from '@mui/material';

/*
interface SnackbarOptions {
  message: string;
  severity: AlertColor;
  open?: boolean;
}
*/

const useSnackbar = () => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState<AlertColor>('success');

  const showSnackbar = (message: string, severity: AlertColor = 'success') => {
    setMessage(message);
    setSeverity(severity);
    setOpen(true);
  };

  const hideSnackbar = () => {
    setOpen(false);
  };

  return {
    open,
    message,
    severity,
    showSnackbar,
    hideSnackbar
  };
};

export default useSnackbar; 