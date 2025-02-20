import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store.ts";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Items } from "../../types/items.ts";
import { Task } from "../Task";
import { Item } from "../../types/item.ts";

export const TasksList: React.FC = () => {
  const [value, setValue] = useState<string>("");
  const queryClient = useQueryClient();
  const { data, isLoading, isError, error } = useQuery<Items>({
    queryKey: "items",
    queryFn: getTasks,
  });
  const url = useSelector((state: RootState) => state.routeUrl.url);

  async function changeTask(task: Item) {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(task),
      mode: "cors",
      credentials: "include",
    });

    return response.json();
  }

  async function removeTask(id: number) {
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ id: id }),
      mode: "cors",
      credentials: "include",
    });

    return response.json();
  }

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

  async function getTasks(): Promise<Items> {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      mode: "cors",
      credentials: "include",
    });

    return response.json();
  }

  const mutation = useMutation({
    mutationFn: addTask,
    onSuccess: () => {
      queryClient.invalidateQueries("items").then((r) => r);
    },
  });

  return (
    <div className="wrapper">
      <h3>Добавить новую задачу:</h3>
      <input
        type="text"
        placeholder="Введите задачу"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            mutation.mutate(value);
            setValue("");
          }
        }}
      />
      {data?.items.map((item, index) => (
        <Task
          key={item.id}
          task={item}
          index={index + 1}
          changeTask={changeTask}
          removeTask={removeTask}
        />
      ))}
      {isLoading && <h3>Tasks is loading</h3>}
      {isError && (
        <h3>
          Error: {error instanceof Error ? error.message : "Unknown error"}
        </h3>
      )}
    </div>
  );
};
