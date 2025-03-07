import { Item } from '../../types/item';
import { Items } from '../../types/items';

export function tasksService(apiVersion: string, apiUrl: string) {
  const route = apiVersion === 'v1' ? '/items' : '/router';

  async function getTasks(): Promise<Items> {
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

  return { getTasks, addTask, changeTask, removeTask };
}
