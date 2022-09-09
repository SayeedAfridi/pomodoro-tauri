import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import App from './App';

const AppProvider: React.FC = () => {
  return (
    <ChakraProvider>
      <App />
    </ChakraProvider>
  );
};

export default AppProvider;
