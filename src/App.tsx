import "./App.css";
import { Header } from "./components/Header";
import { Settings } from "./components/Settings";
import { LoginForm } from "./components/LoginForm";
import { useState } from "react";
import { TasksList } from "./components/TaskList";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

function App() {
  const [step, setStep] = useState("");

  return (
    <QueryClientProvider client={queryClient}>
      <Header />
      <main>
        <Settings setStep={setStep} />
        {step === "login" && <LoginForm />}
        {step === "items" && <TasksList />}
        {step === "error" ? (
          <div className="wrapper">
            Произошла ошибка. Откройте консоль разработчика чтоб увидеть
            подробности.
          </div>
        ) : null}
      </main>
    </QueryClientProvider>
  );
}

export default App;
