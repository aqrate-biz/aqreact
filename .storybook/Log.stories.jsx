import React from 'react';
import Log from '../src/components/Log';
import { useLog } from '../src/hooks/useLog';

export default {
  component: Log,
  subcomponents: {  }
};



function AddLogs() {
  const log = useLog();
  const addLogs = () => {
    log.log('debug', 'This is a log message', { additional: 'data' }, 'test');
    log.warn('This is a warning message');
    log.error('This is an error message');
    log.info('This is an info message');
  };
  return (
    <button onClick={addLogs}>Add logs (max 10)</button>
  );
}

export const LogEntries = {
  render: (args) => (
    <Log loggers={['console','log']} maxEntries={10}>
        <AddLogs />
    </Log>    
  ),
};
