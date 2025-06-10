import React from 'react';
import Logger from '../src/components/Logger';
import { useLogger } from '../src/hooks/useLogger';

export default {
  component: Logger,
  subcomponents: {  }
};



function AddLogs() {
  const log = useLogger('StorybookLogger');
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
    <Logger loggers={['console','log']} maxEntries={10}>
        <AddLogs />
    </Logger>    
  ),
};
