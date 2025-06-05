import React from 'react';
import User from '../src/components/User.jsx';
import { useUser } from '../src/hooks/useUser.jsx';


export default {
  component: User,
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


export const AuthUser = {
  render: (args) => (
    <User userSchema={{
        id: { type: 'string' },
        name: { type: 'string' },
        email: { type: 'string' },
        role: { type: 'string' }}}>
        <LoginUser />
        <PrintUser />
    </User>
  ),
};
