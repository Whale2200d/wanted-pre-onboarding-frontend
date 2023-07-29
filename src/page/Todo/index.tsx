import React from 'react';

function Todo() {
  return (
    <>
      <input data-testid="new-todo-input" />
      <button data-testid="new-todo-add-button">추가</button>
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
      {todos.map(({ todoId: number, todoContent: string }) => {
        return (
          <li key={todoId}>
            <label>
              <input type="checkbox" />
              <span>{todoContent}</span>
              <button data-testid="modify-button">수정</button>
              <button data-testid="delete-button">삭제</button>
            </label>
          </li>
        );
      })}
    </>
  );
}

export default Todo;
