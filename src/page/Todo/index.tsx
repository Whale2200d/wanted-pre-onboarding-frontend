import axios from 'axios';
import React, { useState } from 'react';

interface TodoProps {
  userId: number;
  todo: string;
  isCompleted: boolean;
}

function Todo() {
  const BASE_URL = 'https://www.pre-onboarding-selection-task.shop';

  const [todos, setTodos] = useState<TodoProps[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [isModify, setIsModify] = useState<boolean>(false);

  const handleInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const createTodo = () => {
    const newTodo: TodoProps = {
      userId: todos.length + 1,
      todo: inputValue,
      isCompleted: isChecked,
    };
    setTodos([...todos, newTodo]);
    setInputValue('');

    axios({
      url: `${BASE_URL}/todos`,
      method: 'POST',
      withCredentials: true,
      headers: {
        // Authorization: `Bearer ${access_token}`,
        'Content-Type': 'application/json',
      },
      data: {
        todo: inputValue,
      },
    })
      .then((result) => {
        if (result.status === 201) {
          console.log('Created Todo Data!!');
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteTodo = (id: number) => {
    const updatedTodos = todos.filter((todo) => todo.userId !== id);
    setTodos(updatedTodos);

    axios({
      url: `${BASE_URL}/todos/:${id}`,
      method: 'DELETE',
      withCredentials: true,
      headers: {
        // Authorization: `Bearer ${access_token}`,
      },
    })
      .then((result) => {
        if (result.status === 204) {
          console.log('delete Todo Data!!');
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const updateTodo = (id: number, todo: string, isChecked: boolean) => {
    axios({
      url: `${BASE_URL}/todos/:${id}`,
      method: 'PUT',
      withCredentials: true,
      headers: {
        // Authorization: `Bearer ${access_token}`,
        'Content-Type': 'application/json',
      },
      data: {
        todo: todo,
        isCompleted: isChecked,
      },
    })
      .then((result) => {
        if (result.status === 200) {
          console.log('update Todo Data!!');
        }
      })
      .catch((error) => {
        console.log(error);
      });

    setIsChecked(!isChecked);
    setIsModify(!isModify);
  };

  return (
    <>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputValue}
        data-testid="new-todo-input"
      />
      <button onClick={createTodo} data-testid="new-todo-add-button">
        추가
      </button>
      {todos.map((todo, id) => {
        return (
          <li key={todo.userId}>
            <label>
              {!isModify ? (
                <>
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => setIsChecked(!isChecked)}
                  />
                  <span>{todo.todo}</span>
                  <button
                    onClick={() => setIsModify(!isModify)}
                    data-testid="modify-button"
                  >
                    수정
                  </button>
                  <button
                    onClick={() => deleteTodo(todo.userId)}
                    data-testid="delete-button"
                  >
                    삭제
                  </button>
                </>
              ) : (
                <>
                  <input type="text" defaultValue={todo.todo} />
                  <button onClick={() => updateTodo(id, todo.todo, isChecked)}>
                    제출
                  </button>
                  <button onClick={() => setIsModify(!isModify)}>취소</button>
                </>
              )}
            </label>
          </li>
        );
      })}
    </>
  );
}

export default Todo;
