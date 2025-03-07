export function authService(url: string, apiVersion: string) {
  async function logIn(login: string, password: string, setStep: (items: string) => void) {
    if (login.trim() !== '' && password.trim()) {
      const params = JSON.stringify({ login: login, pass: password });
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

  function logout(setStep: (items: string) => void) {
    const qs = { action: apiVersion === 'v1' ? '' : 'logout' };
    const route = apiVersion === 'v1' ? '/logout' : '/router';
    const totallyRoute = url + apiVersion + route + '?' + new URLSearchParams(qs);

    console.log(url);

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

  async function register(login: string, password: string, setStep: (items: string) => void) {
    if (login.trim() !== '' && password.trim()) {
      const params = JSON.stringify({ login: login, pass: password });
      const qs = { action: apiVersion === 'v1' ? '' : 'register' };
      const route = apiVersion === 'v1' ? '/register' : '/router';
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
            logIn(login, password, setStep);
          } else {
            alert('Произошла ошибка. Посмотрите консоль разработчика чтоб увидеть подробности.');
          }
        });
    }
  }

  return { logIn, logout, register };
}
