import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store.ts";
import { useMutation } from "react-query";

export const TasksList: React.FC = () => {
  const url = useSelector((state: RootState) => state.routeUrl.url);

  async function addTask(task: string) {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ text: task }),
      mode: "cors",
      credentials: "include",
    });

    return response.json();
  }

  const { mutate } = useMutation({
    mutationFn: addTask,
  });

  return (
    <div className="wrapper">
      <h3>Добавить новую задачу:</h3>
      <input
        type="text"
        placeholder="Введите задачу"
        onKeyDown={(e) => e.key === "Enter" && mutate(e.currentTarget.value)}
      />
    </div>
  );
};
