import axios from 'axios';
import React, { useEffect, useState } from 'react';

interface TodoProps {
  userId: number;
  todo: string;
  isCompleted: boolean;
}

function Todo() {
  const BASE_URL = 'https://www.pre-onboarding-selection-task.shop';
  const access_token = localStorage.getItem('access_token');

  const [todos, setTodos] = useState<TodoProps[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [updatingIndex, setUpdatingIndex] = useState<number>(-1);
  const [updatingValue, setUpdatingValue] = useState<string>('');

  const handleInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  // Todo가 변경될 때마다 localStorage에 저장하기
  useEffect(() => {
    window.localStorage.setItem('todoItems', JSON.stringify(todos));
  }, [todos]);

  // 페이지가 로드될 때마다, localStorage에서 Todo를 가져오기
  useEffect(() => {
    const storedTodos = localStorage.getItem('todoItems');
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
      console.log('JSON.parse(storedTodos): ', JSON.parse(storedTodos));
    }
  }, []);

  const createTodo = () => {
    const newTodo: TodoProps = {
      userId: todos.length + 1,
      todo: inputValue,
      isCompleted: false,
    };
    setTodos([...todos, newTodo]);
    setInputValue('');

    axios({
      url: `${BASE_URL}/todos`,
      method: 'POST',
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${access_token}`,
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
        Authorization: `Bearer ${access_token}`,
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

  const startUpdating = (userId: number) => {
    setUpdatingIndex(userId - 1);
    setUpdatingValue(todos[userId - 1].todo);
  };

  const updateTodo = (userId: number, todo: string, isCompleted: boolean) => {
    const updatedTodos = [...todos];
    if (updatingIndex !== -1) {
      updatedTodos[updatingIndex].todo = updatingValue;
      updatedTodos[updatingIndex].isCompleted = !isCompleted;
      console.log(
        'updatedTodos[updatingIndex].todo:',
        updatedTodos[updatingIndex].todo
      );
    }

    axios({
      url: `${BASE_URL}/todos/:${userId - 1}`,
      method: 'PUT',
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${access_token}`,
        'Content-Type': 'application/json',
      },
      data: {
        todo: todo,
        isCompleted: isCompleted,
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

    setTodos(updatedTodos);
    setUpdatingIndex(-1);
    setUpdatingValue('');
  };

  const cancelUpdating = () => {
    setUpdatingIndex(-1);
    setUpdatingValue('');
  };

  const handleToggleComplete = (userId: number) => {
    setTodos(
      todos.map((todo) =>
        todo.userId === userId
          ? { ...todo, isCompleted: !todo.isCompleted }
          : todo
      )
    );
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
      {todos.map((todo) => {
        return (
          <li key={todo.userId}>
            <label>
              {updatingIndex + 1 !== todo.userId ? (
                <>
                  <input
                    type="checkbox"
                    checked={todo.isCompleted}
                    onChange={() => handleToggleComplete(todo.userId)}
                  />
                  <span>{todo.todo}</span>
                  <button
                    onClick={() => startUpdating(todo.userId)}
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
                  <input
                    type="text"
                    value={updatingValue}
                    onChange={(e) => setUpdatingValue(e.target.value)}
                  />
                  <button
                    onClick={() =>
                      updateTodo(todo.userId, todo.todo, todo.isCompleted)
                    }
                  >
                    제출
                  </button>
                  <button onClick={cancelUpdating}>취소</button>
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
