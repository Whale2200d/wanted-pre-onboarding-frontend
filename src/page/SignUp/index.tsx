import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SignUp() {
  const BASE_URL = '';

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
      // signup 로직
      axios({
        url: `${BASE_URL}/auth/signup`,
        method: 'POST',
        withCredentials: true,
        data: {
          email: email,
          password: password,
        },
      })
        .then((result) => {
          if (result.status === 201) {
            console.log('Signup success!!');
            // signup 성공 시, signin 페이지로 이동
            navigate(`/signin`);
          }
        })
        .catch((error) => {
          console.log(error);
        });
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
        회원가입
      </button>
    </form>
  );
}

export default SignUp;
