import React from 'react';
import SecurityCheck from '../src/components/SecurityCheck';
import { useUser } from '../src/hooks/useUser';
import User from '../src/components/User';


export default {
  component: SecurityCheck,
  subcomponents: {  }
};

function PrintUser() {
    const user = useUser()
console.log("PrintUser user:", user);
    return (
        <div>
        <h1>User:</h1>
        <p>Name: {user.name}</p>
        <p>Email: {user.email}</p>
        </div>
    );
}

function LoginUser() {
  const user = useUser();
  return (
    <button onClick={() => user.login({ id: 1, name: 'John Doe', email: 'email@domain.com', role: 'USER' })}>
      Login as John Doe
    </button>
  );
}

function DeniedAccess() {
  return (
    <div>
      <h1>Access Denied</h1>
      <p>You do not have permission to view this content.</p>
    </div>
  );
}


export const AuthUser = {
  render: (args) => (
    <User userSchema={{
        id: { type: 'string' },
        name: { type: 'string' },
        email: { type: 'string' },
        role: { type: 'string' }}}>
        <LoginUser />
        <PrintUser />
        <SecurityCheck alternativeComponent={DeniedAccess()} rules={
            [{ field: 'role', value: 'USER' }]
            }>
            <h1>Security Check</h1>
            <p>This is a secure area. Only authenticated users can see this.</p>
        </SecurityCheck>
    </User>
  ),
};
