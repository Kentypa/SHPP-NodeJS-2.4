import './App.css';
import { Header } from './frontend/components/Header';
import { Settings } from './frontend/components/Settings';
import { LoginForm } from './frontend/components/LoginForm';
import { useState } from 'react';
import { TasksList } from './frontend/components/TaskList';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

function App() {
  const [step, setStep] = useState('');

  return (
    <QueryClientProvider client={queryClient}>
      <Header />
      <main>
        <Settings setStep={setStep} />
        {step === 'login' && <LoginForm setStep={setStep} />}
        {step === 'items' && <TasksList setStep={setStep} />}
        {step === 'error' ? (
          <div className='wrapper'>
            Произошла ошибка. Откройте консоль разработчика чтоб увидеть подробности.
          </div>
        ) : null}
      </main>
    </QueryClientProvider>
  );
}

export default App;
