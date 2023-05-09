import { useState } from 'react';
import { useRouter } from 'next/router';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginDisabled, setLoginDisabled] = useState(true);
  const router = useRouter();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setLoginDisabled(
      event.target.value.length < 8 ||
      !/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/.test(event.target.value)
    );
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (username === 'admin' && password === 'admin@123') {
      router.push('/home');
    } else {
      alert('Invalid username or password');
    }
  };

  return (
    <div>
      <h1>Welcome to the Countries Login by Kelvin</h1>
      <form onSubmit={handleFormSubmit}>
        <label>
          Username:
          <input type="text" value={username} onChange={handleUsernameChange} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" value={password} onChange={handlePasswordChange} />
        </label>
        <br />
        <button type="submit" disabled={loginDisabled}>
          Login
        </button>
      </form>
    </div>
  );
}
