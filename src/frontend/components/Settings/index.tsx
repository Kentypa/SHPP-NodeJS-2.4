import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setApiUrl } from '../../features/apiUrl/apiUrlSlice.ts';
import { setRouteUrl } from '../../features/routeUrl/routeUrlSlice.ts';
import { apiUrlSelector } from '../../features/apiUrl/apiUrlSelector.ts';

type AvailablesAPIVersions = 'v1' | 'v2';

type SettingsProps = {
  setStep: (step: string) => void;
};

export const Settings: React.FC<SettingsProps> = ({ setStep }) => {
  const url = useSelector(apiUrlSelector).url;
  const dispatch = useDispatch();
  const [apiVersion, setApiVersion] = useState<AvailablesAPIVersions>('v1');

  function getTasks() {
    const route = apiVersion === 'v1' ? '/items' : '/router';
    const qs = { action: apiVersion === 'v1' ? '' : 'getItems' };
    const totallyRoute = url + apiVersion + route + '?' + new URLSearchParams(qs);
    dispatch(setRouteUrl(totallyRoute));
    fetch(totallyRoute, {
      credentials: 'include',
      method: apiVersion === 'v1' ? 'GET' : 'POST',
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.error === 'forbidden') {
          setStep('login');
        } else {
          setStep('items');
        }
      })
      .catch(() => {
        setStep('error');
      });
  }

  return (
    <div className='settings'>
      <h3>Настройки приложения:</h3>
      <label>
        Api URL:
        <input
          type='text'
          value={url}
          onChange={(e) => dispatch(setApiUrl(e.target.value))}
        />
      </label>
      <div>
        Версия АПИ
        <button
          className={apiVersion === 'v1' ? 'selected' : ''}
          onClick={() => setApiVersion('v1')}
        >
          v1
        </button>
        <button
          className={apiVersion === 'v2' ? 'selected' : ''}
          onClick={() => setApiVersion('v2')}
        >
          v2
        </button>
      </div>
      <div>
        <button
          onClick={() => {
            getTasks();
          }}
          className='primary'
        >
          Поехали
        </button>
      </div>
    </div>
  );
};
