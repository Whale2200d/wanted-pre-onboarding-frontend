import React, { useState } from 'react';

interface TodoProps {
  id: number;
  content: string;
}

function Todo() {
  const [todos, setTodos] = useState<TodoProps[]>([]);
  const [inputValue, setInputValue] = useState('');

  const handleInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const createTodo = () => {
    const newTodo: TodoProps = {
      id: todos.length + 1,
      content: inputValue,
    };
    setTodos([...todos, newTodo]);
    setInputValue('');
  };

  const deleteTodo = (id: number) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  const editTodo = () => {};

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
      <li>
        <label>
          <input type="checkbox" />
          <span>TODO 1</span>
          <button data-testid="modify-button">수정</button>
          <button data-testid="delete-button">삭제</button>
        </label>
      </li>
      <li>
        <label>
          <input type="checkbox" />
          <span>TODO 2</span>
          <button data-testid="modify-button">수정</button>
          <button data-testid="delete-button">삭제</button>
        </label>
      </li>
      {todos.map((todo) => {
        return (
          <li key={todo.id}>
            <label>
              <input type="checkbox" />
              <span>{todo.content}</span>
              <button data-testid="modify-button">수정</button>
              <button
                onClick={() => deleteTodo(todo.id)}
                data-testid="delete-button"
              >
                삭제
              </button>
            </label>
          </li>
        );
      })}
    </>
  );
}

export default Todo;
