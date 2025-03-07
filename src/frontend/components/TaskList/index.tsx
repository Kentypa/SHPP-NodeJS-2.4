import { FC, useState } from 'react';
import { useSelector } from 'react-redux';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { Items } from '../../../types/items.ts';
import { Task } from '../Task';
import { routeUrlSelector } from '../../store/routeUrl/routeUrlSelector.ts';
import { apiUrlSelector } from '../../store/apiUrl/apiUrlSelector.ts';
import { tasksService } from '../../services/tasksService.ts';
import { authService } from '../../services/authService.ts';

type TasksListProps = {
  setStep: (step: string) => void;
};

export const TasksList: FC<TasksListProps> = ({ setStep }) => {
  const [value, setValue] = useState<string>('');
  const queryClient = useQueryClient();
  const url = useSelector(routeUrlSelector).url;
  const apiUrl = useSelector(apiUrlSelector).url;

  const apiVersion = url.includes('v2') ? 'v2' : 'v1';

  const { addTask, changeTask, getTasks, removeTask } = tasksService(apiVersion, apiUrl);
  const { logout } = authService(apiUrl, apiVersion);

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
        onClick={() => {
          logout(setStep);
        }}
        className='logout'
      >
        Выйти
      </button>
    </div>
  );
};
