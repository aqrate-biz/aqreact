import React from 'react';
import API from '../src/components/API';
import { useAPI } from '../src/hooks/useAPI';

export default {
  component: API,
  subcomponents: {  }
};


function CallApi({ method}) {
  const api = useAPI();
  const [response, setResponse] = React.useState(null);
  return (
    <div>
      <button onClick={async () => {
        try {
          const res = await api.get('');
          setResponse(JSON.stringify(res,null, 2));
        } catch (error) {
          setResponse(`Error: ${error.message}`);
        }
      }}>
        Call API Method: {method}
      </button>
      <pre>
        {response ? response : "No response yet"}
      </pre>
    </div>
  );
}

export const Api = {
  render: (args) => (
    <API baseUrl="https://randomuser.me/api/" authMode="">
        <CallApi method="GET"></CallApi>
    </API>
  ),
};
