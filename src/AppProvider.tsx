import React, { useEffect } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import App from './App';
import {
  isPermissionGranted,
  requestPermission,
} from '@tauri-apps/api/notification';

const checkNotificationPerm = async () => {
  const permissionGranted = await isPermissionGranted();
  if (!permissionGranted) {
    await requestPermission();
  }
};

const AppProvider: React.FC = () => {
  useEffect(() => {
    checkNotificationPerm();
  }, []);

  return (
    <ChakraProvider>
      <App />
    </ChakraProvider>
  );
};

export default AppProvider;
