import React from 'react';
import { DataProvider, useDataContext } from '../index.jsx';
import { DataLoader } from '../index.jsx';


export default {
  component: DataProvider,
  subcomponents: { DataLoader }
};

function P({ name, k }) {
  const dataContext = useDataContext();
  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', marginTop: '10px', fontFamily: 'monospace' }}>
      <h4>Data for '{name}':</h4>
      <pre>{JSON.stringify(dataContext[k], null, 2)}</pre>
    </div>
  );
}


export const InitData = {
  render: (args) => (
    <DataProvider name="DP" dataKeys={['p']} initialData={{ p: 'This data will change in 5s' }}>
      <DataLoader type="init" dataKey="p" options={{value:'This data has changed after 5s',delay:5000}} />
      <P name="init" k="p"></P>
    </DataProvider>
  ),
};

export const BrowserData = {
  render: (args) => (
    <DataProvider name="DP" dataKeys={['b']} initialData={{ b: null }}>
      <DataLoader type="browser" dataKey="b" />
      <P name="browser" k="b"></P>
    </DataProvider>
  ),
};