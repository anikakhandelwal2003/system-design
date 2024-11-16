import React, { useState, useEffect } from 'react';
import CheckIcon from '@mui/icons-material/Check';
import InfoIcon from '@mui/icons-material/Info';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import ErrorIcon from '@mui/icons-material/Error';
import CloseIcon from '@mui/icons-material/Close';
import '../styles/toast.css';

function ToastMessage() {
  const [toastList, setToastList] = useState([]);
  const [count, setCount] = useState(0);

  const ToastConstant = {
    success: "Show Success",
    info: "Show Info",
    warning: "Show Warning",
    error: "Show Error"
  };

  const showToast = (type, message) => {
    const newToast = { id: count, type, message };
    setToastList(prevList => [...prevList, newToast]);
    setCount(prevCount => prevCount + 1);

    setTimeout(() => {
      setToastList((prevList) => prevList.filter((toast) => toast.id !== newToast.id));
    }, 3000);
  };

  const removeToast = (id) => {
    setToastList(prevList => prevList.filter(toast => toast.id !== id));
  };

  return (
    <div className='main-div-toast'>
      <h1>Toast Component</h1>
      <div className='toast-buttons'>
        <button onClick={() => showToast('success', 'This is a success message')}>
          {ToastConstant.success}
        </button>
        <button onClick={() => showToast('info', 'This is an info message')}>
          {ToastConstant.info}
        </button>
        <button onClick={() => showToast('warning', 'This is a warning message')}>
          {ToastConstant.warning}
        </button>
        <button onClick={() => showToast('error', 'This is an error message')}>
          {ToastConstant.error}
        </button>
      </div>

      <div className="toast-container">
        {toastList.map((toast) => (
          <div key={toast.id} className={`toast-item ${toast.type}`}>
            <div className='icon-toast'></div>
            {toast.type === "success" ? <CheckIcon /> :
             toast.type === "info" ? <InfoIcon /> :
             toast.type === "warning" ? <WarningAmberIcon /> :
             <ErrorIcon />}
            {toast.message}
            <CloseIcon onClick={() => removeToast(toast.id)} style={{ cursor: 'pointer' }} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ToastMessage;
