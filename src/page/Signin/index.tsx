import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SignIn() {
  const BASE_URL = 'https://www.pre-onboarding-selection-task.shop';

  const navigate = useNavigate();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isEmailValid, setIsEmailValid] = useState<boolean>(false);
  const [isPasswordValid, setisPasswordValid] = useState<boolean>(false);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value;
    const isEmailValid = email.includes('@');
    setEmail(email);
    setIsEmailValid(isEmailValid);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const password = e.target.value;
    const isPasswordValid = password.length >= 8;
    setPassword(password);
    setisPasswordValid(isPasswordValid);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isEmailValid && isPasswordValid) {
      // 로그인 로직(Authentication)
      axios({
        url: `${BASE_URL}/auth/signin`,
        method: 'POST',
        withCredentials: true,
        data: {
          email: email,
          password: password,
        },
      })
        .then((result) => {
          if (result.status === 200) {
            localStorage.setItem('access_token', result.data.token);
            console.log('signin success!!');
          }
        })
        .catch((error) => {
          console.log(error);
        });

      // 로그인 성공 시, todo 페이지로 이동
      navigate(`/todo`);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={handleEmailChange}
        data-testid="email-input"
      />
      <input
        type="password"
        value={password}
        onChange={handlePasswordChange}
        data-testid="password-input"
      />
      <button
        type="submit"
        disabled={!(isEmailValid && isPasswordValid)}
        data-testid="signup-button"
      >
        로그인
      </button>
    </form>
  );
}

export default SignIn;
