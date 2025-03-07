import { useSelector } from 'react-redux';
import { apiUrlSelector } from '../../store/apiUrl/apiUrlSelector';
import { routeUrlSelector } from '../../store/routeUrl/routeUrlSelector';
import { useForm } from '../../hooks/use-form';
import { FC } from 'react';
import { authService } from '../../services/authService';

type LoginFormProps = {
  setStep: (step: string) => void;
};

export const LoginForm: FC<LoginFormProps> = ({ setStep }) => {
  const { formState, handleChange } = useForm({ login: '', pass: '' });

  const url = useSelector(apiUrlSelector).url;
  const routeUrl = useSelector(routeUrlSelector).url;
  const apiVersion = routeUrl.search('v2') !== -1 ? 'v2' : 'v1';

  const { logIn, register } = authService(url, apiVersion);

  return (
    <div className='wrapper login'>
      <h3>Доступ к учетной записи</h3>
      <div className='LoginInput'>
        <input
          value={formState.login}
          onChange={(e) => handleChange(e)}
          type='text'
          name='login'
          placeholder='yaropolk@example.com'
          required
        />
        <input
          value={formState.pass}
          onChange={(e) => handleChange(e)}
          type='password'
          name='pass'
          placeholder='******'
          required
        />
      </div>
      <div className='LoginButton'>
        <button
          onClick={() => {
            register(formState.login, formState.pass, setStep);
          }}
        >
          Зарегистрироваться
        </button>
        <button
          onClick={() => {
            logIn(formState.login, formState.pass, setStep);
          }}
          className='primary'
        >
          Войти
        </button>
      </div>
    </div>
  );
};
