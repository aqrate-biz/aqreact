import React from 'react';
import DataLoader from '../src/components/DataLoader';
import { useData } from '../src/hooks/useData';
import Logger from '../src/components/Logger';

export default {
  component: DataLoader,
  subcomponents: {  }
};

function DataDisplay() {
  const { data, loading, error } = useData();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>Data Loaded</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}


export const DataWithChildComponent = {
  render: (args) => (
    <Logger>
      <DataLoader url="https://randomuser.me/api/" params={{ results: 5 }}>
          <DataDisplay />
      </DataLoader>
    </Logger>
  ),
};

function DataWithoutChild() {
  
    const [status, setStatus] = React.useState('initializing');
    const [data, setData] = React.useState(null);

  return (
    <DataLoader url="https://randomuser.me/api/" params={{ results: 5 }} 
        onStatusChange={setStatus}
        onData={setData}>
        {status}
        <pre>{JSON.stringify(data, null, 2)}</pre>
    </DataLoader>
  );
}

export const DataWithoutChildComponent = {
  render: (args) => (
    <Logger>
      <DataWithoutChild></DataWithoutChild>
    </Logger>
  ),
};
