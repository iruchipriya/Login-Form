import React, { useState } from 'react';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordStrengthError, setPasswordStrengthError] = useState('');
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [forgotPassword, setForgotPassword] = useState(false);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (username === 'validUser' && password === 'ValidPassword123') {
      // Successful login logic
      alert('Login successful!');
    } else {
      setLoginAttempts(loginAttempts + 1);
      if (loginAttempts >= 2) {
        setForgotPassword(true);
      } else {
        alert('Incorrect username or password');
      }
    }
  };

  const isPasswordStrong = (password) => {
    const strongRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
    return strongRegex.test(password);
  };

  const handlePasswordBlur = () => {
    if (!isPasswordStrong(password)) {
      setPasswordStrengthError(
        'Password must contain at least one lowercase letter, one uppercase letter, one number, and be at least 6 characters long.'
      );
    } else {
      setPasswordStrengthError('');
    }
  };

  const handleResetPassword = () => {
    setPassword('dummyPassword');
    setForgotPassword(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input
          type="text"
          value={username}
          onChange={handleUsernameChange}
          required
        />
      </label>
      <br />
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={handlePasswordChange}
          onBlur={handlePasswordBlur}
          required
        />
      </label>
      {passwordStrengthError && (
        <div style={{ color: 'red' }}>{passwordStrengthError}</div>
      )}
      <br />
      <button
        type="submit"
        disabled={!username || !password || !!passwordStrengthError}
      >
        Login
      </button>
      {forgotPassword && (
        <div>
          <button type="button" onClick={handleResetPassword}>
            Reset Password
          </button>
        </div>
      )}
    </form>
  );
};

export default LoginForm;
