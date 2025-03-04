import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { apiUrlSelector } from '../../features/apiUrl/apiUrlSelector';
import { routeUrlSelector } from '../../features/routeUrl/routeUrlSelector';

type LoginFormProps = {
  setStep: (step: string) => void;
};

export const LoginForm: React.FC<LoginFormProps> = ({ setStep }) => {
  const [login, setLogin] = useState('');
  const [pass, setPass] = useState('');

  const url = useSelector(apiUrlSelector).url;
  const routeUrl = useSelector(routeUrlSelector).url;
  const apiVersion = routeUrl.search('v2') !== -1 ? 'v2' : 'v1';

  function logIn() {
    if (login.trim() !== '' && pass.trim()) {
      const params = JSON.stringify({ login: login, pass: pass });
      const route = apiVersion === 'v1' ? '/login' : '/router';
      const qs = { action: apiVersion === 'v1' ? '' : 'login' };
      fetch(url + apiVersion + route + '?' + new URLSearchParams(qs), {
        method: apiVersion === 'v1' ? 'POST' : 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: params,
      })
        .then((res) => res.json())
        .then((response) => {
          if (response.ok) {
            localStorage.setItem('name', login);
            setStep('items');
          } else if (response.error === 'not found') {
            alert('Такая комбинация логина и пароля не найдена');
          } else {
            alert('Произошла ошибка. Посмотрите консоль разработчика чтоб увидеть подробности.');
          }
        });
    }
  }

  function register() {
    if (login.trim() !== '' && pass.trim()) {
      const params = JSON.stringify({ login: login, pass: pass });
      const route = apiVersion === 'v1' ? '/register' : '/router';
      const qs = { action: apiVersion === 'v1' ? '' : 'register' };
      fetch(url + apiVersion + route + '?' + new URLSearchParams(qs), {
        method: apiVersion === 'v1' ? 'POST' : 'POST',
        body: params,
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((res) => res.json())
        .then((response) => {
          if (response.ok) {
            logIn();
          } else {
            alert('Произошла ошибка. Посмотрите консоль разработчика чтоб увидеть подробности.');
          }
        });
    }
  }

  return (
    <div className='wrapper login'>
      <h3>Доступ к учетной записи</h3>
      <div className='LoginInput'>
        <input
          value={login}
          onChange={(e) => setLogin(e.target.value)}
          type='text'
          placeholder='yaropolk@example.com'
          required
        />
        <input
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          type='password'
          placeholder='******'
          required
        />
      </div>
      <div className='LoginButton'>
        <button
          onClick={() => {
            register();
          }}
        >
          Зарегистрироваться
        </button>
        <button
          onClick={() => {
            logIn();
          }}
          className='primary'
        >
          Войти
        </button>
      </div>
    </div>
  );
};
