import { Toaster } from 'react-hot-toast';

const ToastProvider = () => {
  return (
    <Toaster
      position="bottom-right"
      toastOptions={{
        duration: 3000,
        style: {
          background: 'rgba(0, 0, 0, 0.9)',
          color: '#fff',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '12px',
          padding: '16px',
          fontSize: '14px',
          fontFamily: 'Inter, sans-serif'
        },
        success: {
          iconTheme: {
            primary: '#10b981',
            secondary: '#fff',
          },
        },
        error: {
          iconTheme: {
            primary: '#ef4444',
            secondary: '#fff',
          },
        },
      }}
    />
  );
};

export default ToastProvider;
