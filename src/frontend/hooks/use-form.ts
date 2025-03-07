import { ChangeEvent, useState } from 'react';

export function useForm(initialState: Record<string, string>) {
  const [formState, setFormState] = useState(initialState);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  return { formState, handleChange };
}
