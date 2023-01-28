import { Button, Flex, Text } from '@chakra-ui/react';
import React, { useCallback, useEffect, useState } from 'react';
import { buttonsData } from './data/buttons';
import { sendNotification } from '@tauri-apps/api/notification';
import { ask } from '@tauri-apps/api/dialog';

const App: React.FC = () => {
  const [time, setTime] = useState<number>(0);
  const [timerStart, setTimerStart] = useState<boolean>(false);

  const toggleTimer = useCallback(() => {
    setTimerStart(!timerStart);
  }, []);

  const triggerResetDialog = useCallback(async () => {
    const shouldReset = await ask('Do you want to reset timer?', {
      type: 'warning',
      title: 'Pomodoro Timer App',
    });

    if (shouldReset) {
      setTime(900);
      setTimerStart(false);
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (timerStart) {
        if (time > 0) {
          setTime(time - 1);
        } else if (time === 0) {
          sendNotification({
            title: `Time's up!`,
            body: `Congrats on completing a session!🎉`,
          });
          setTime(900);
          setTimerStart(false);
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
        <Button
          background='blue.500'
          marginX={5}
          color='white'
          onClick={triggerResetDialog}
          _hover={{ background: 'blue.600' }}
          _active={{ background: 'blue.800' }}
        >
          Reset
        </Button>
      </Flex>
      <Flex
        marginX={8}
        marginTop={6}
        justifyContent='space-between'
        flexWrap='wrap'
      >
        {buttonsData.map(({ value, display }) => (
          <Button
            key={value}
            marginTop={4}
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
