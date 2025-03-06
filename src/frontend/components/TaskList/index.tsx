import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { Items } from '../../../types/items.ts';
import { Task } from '../Task';
import { Item } from '../../../types/item.ts';
import { routeUrlSelector } from '../../features/routeUrl/routeUrlSelector.ts';
import { apiUrlSelector } from '../../features/apiUrl/apiUrlSelector.ts';

type TasksListProps = {
  setStep: (step: string) => void;
};

export const TasksList: React.FC<TasksListProps> = ({ setStep }) => {
  const [value, setValue] = useState<string>('');
  const queryClient = useQueryClient();
  const url = useSelector(routeUrlSelector).url;
  const apiUrl = useSelector(apiUrlSelector).url;

  const apiVersion = url.includes('v2') ? 'v2' : 'v1';

  function logout() {
    const route = apiVersion === 'v1' ? '/logout' : '/router';
    const qs = { action: apiVersion === 'v1' ? '' : 'logout' };
    const totallyRoute = apiUrl + apiVersion + route + '?' + new URLSearchParams(qs);

    fetch(totallyRoute, {
      method: 'POST',
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.ok) {
          localStorage.clear();
          setStep('login');
        }
      });
  }

  async function getTasks(): Promise<Items> {
    const route = apiVersion === 'v1' ? '/items' : '/router';
    const qs = { action: apiVersion === 'v1' ? '' : 'getItems' };
    const totallyRoute = apiUrl + apiVersion + route + '?' + new URLSearchParams(qs);

    const response = await fetch(totallyRoute, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      mode: 'cors',
      credentials: 'include',
    });

    return response.json();
  }

  async function addTask(task: string) {
    const route = apiVersion === 'v1' ? '/items' : '/router';
    const qs = { action: apiVersion === 'v1' ? '' : 'addItem' };
    const totallyRoute = apiUrl + apiVersion + route + '?' + new URLSearchParams(qs);

    const response = await fetch(totallyRoute, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({ text: task }),
      mode: 'cors',
      credentials: 'include',
    });

    return response.json();
  }

  async function changeTask(task: Item) {
    const route = apiVersion === 'v1' ? '/items' : '/router';
    const qs = { action: apiVersion === 'v1' ? '' : 'editItem' };
    const totallyRoute = apiUrl + apiVersion + route + '?' + new URLSearchParams(qs);

    const response = await fetch(totallyRoute, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(task),
      mode: 'cors',
      credentials: 'include',
    });

    return response.json();
  }

  async function removeTask(id: string) {
    const route = apiVersion === 'v1' ? '/items' : '/router';
    const qs = { action: apiVersion === 'v1' ? '' : 'deleteItem' };
    const totallyRoute = apiUrl + apiVersion + route + '?' + new URLSearchParams(qs);

    const response = await fetch(totallyRoute, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({ id: id }),
      mode: 'cors',
      credentials: 'include',
    });

    return response.json();
  }

  const { data, isSuccess, isLoading, isError, error } = useQuery<Items>({
    queryKey: 'items',
    queryFn: getTasks,
  });

  const mutation = useMutation({
    mutationFn: addTask,
    onSuccess: () => {
      queryClient.invalidateQueries('items').then((r) => r);
    },
  });

  return (
    <div className='wrapper'>
      <h3>Добавить новую задачу:</h3>
      <input
        type='text'
        placeholder='Введите задачу'
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            if (value != '') {
              mutation.mutate(value);
              setValue('');
            }
          }
        }}
      />
      {isSuccess &&
        data.items.map((item, index) => (
          <Task
            key={item.id}
            task={item}
            index={index + 1}
            changeTask={changeTask}
            removeTask={removeTask}
          />
        ))}
      {isLoading && <h3>Tasks is loading</h3>}
      {isError && <h3>Error: {error instanceof Error ? error.message : 'Unknown error'}</h3>}
      <hr />
      <button
        onClick={logout}
        className='logout'
      >
        Выйти
      </button>
    </div>
  );
};
