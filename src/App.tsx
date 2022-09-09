import { Button, Flex, Text } from '@chakra-ui/react';
import React, { useCallback, useEffect, useState } from 'react';
import { buttonsData } from './data/buttons';

const App: React.FC = () => {
  const [time, setTime] = useState<number>(0);
  const [timerStart, setTimerStart] = useState<boolean>(false);

  const toggleTimer = useCallback(() => {
    setTimerStart(!timerStart);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (timerStart) {
        if (time > 0) {
          setTime(time - 1);
        } else if (time === 0) {
          // TODO: Send notification to user.
          clearInterval(interval);
        }
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [timerStart, time]);

  return (
    <Flex
      flex={1}
      background='gray.900'
      height='100vh'
      alignItems='center'
      flexDirection='column'
    >
      <Text color='white' fontWeight='bold' marginTop='20' fontSize='35'>
        Pomodoro Timer
      </Text>
      <Text fontWeight='bold' fontSize='7xl' color='white'>
        {`${
          Math.floor(time / 60) < 10
            ? `0${Math.floor(time / 60)}`
            : `${Math.floor(time / 60)}`
        }:${time % 60 < 10 ? `0${time % 60}` : time % 60}`}
      </Text>
      <Flex>
        <Button
          width='7rem'
          background='orange.500'
          color='white'
          _hover={{ background: 'orange.600' }}
          _active={{ background: 'orange.800' }}
          onClick={toggleTimer}
        >
          {!timerStart ? 'Start' : 'Pause'}
        </Button>
        {/* TODO: Add Button to reset timer */}
      </Flex>
      <Flex marginTop={10}>
        {buttonsData.map(({ value, display }) => (
          <Button
            key={value}
            marginX={4}
            background='green.500'
            _hover={{ background: 'green.600' }}
            _active={{ background: 'green.800' }}
            color='white'
            onClick={() => {
              setTimerStart(false);
              setTime(value);
            }}
          >
            {display}
          </Button>
        ))}
      </Flex>
    </Flex>
  );
};
export default App;
