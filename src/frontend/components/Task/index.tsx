import React, { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { Item } from '../../../types/item.ts';

type TaskProps = {
  task: Item;
  index: number;
  removeTask: (id: string) => Promise<void>;
  changeTask: (task: Item) => Promise<void>;
};

export const Task: React.FC<TaskProps> = ({ removeTask, changeTask, task, index }) => {
  const { id, text, checked } = task;

  const [editable, setEditable] = useState(false);
  const [value, setValue] = useState<string>(text);

  const queryClient = useQueryClient();

  const changeMutation = useMutation({
    mutationFn: changeTask,
    onSuccess: () => {
      queryClient.invalidateQueries('items');
    },
  });

  const removeMutation = useMutation({
    mutationFn: removeTask,
    onSuccess: () => {
      queryClient.invalidateQueries('items');
    },
  });

  return (
    <div className={checked ? 'task taskCompleted' : 'task'}>
      <div className='contentText'>
        <button
          onClick={() => changeMutation.mutate({ ...task, checked: !checked })}
          className='task_done taskButton'
        >
          {checked ? (
            <span style={{ color: '#27ae60' }}> ☑ </span>
          ) : (
            <span style={{ color: 'rgba(0, 0, 0, 0.28)' }}> ☐ </span>
          )}
        </button>

        {!editable ? (
          <span className='task_content'>
            {index}. {text}
          </span>
        ) : (
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                changeMutation.mutate({ ...task, text: value });
                setEditable(false);
              }
            }}
            autoFocus
            className='edit-input'
          />
        )}

        {!editable ? (
          <div className='button check'>
            <button
              onClick={() => setEditable(true)}
              style={{ color: '#eca81a' }}
            >
              ✎️
            </button>
            <button
              onClick={() => removeMutation.mutate(id)}
              style={{ color: '#cd1537' }}
            >
              ✕
            </button>
          </div>
        ) : (
          <div>
            <button
              onClick={() => {
                changeMutation.mutate({ ...task, text: value });
                setEditable(false);
              }}
            >
              💾
            </button>
            <button onClick={() => setEditable(false)}>✕</button>
          </div>
        )}
      </div>
    </div>
  );
};
