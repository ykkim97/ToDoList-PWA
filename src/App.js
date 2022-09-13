import React, { useEffect } from 'react';
import { useState } from 'react';
import { MdAddCircle } from 'react-icons/md';
import EmptyToDos from './components/EmptyToDos';
import ToDoInput from './components/ToDoInput';
import ToDoList from './components/ToDoList';
import ToDoTemplete from './components/ToDoTemplete';
import { FaTrash } from "react-icons/fa";
import './App.css';

let nextId = 1;

function App() {
  // 할 일이 들어있는 todos객체 Array
  const [todos, setTodos] = useState(() => {
    const storage = localStorage.getItem('todos');
    if (storage) {
      return JSON.parse(storage);
    } else {
      return [];
    }
  });
  
  const [inputToggle, setInputToggle] = useState(false);
  const [selectedToDo, setSelectedToDo] = useState(null);

  let todosArray;

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))

    let getStorage = localStorage.getItem('todos');
    getStorage = JSON.parse(getStorage);
    if (getStorage != null && getStorage.length === 0) nextId = 1;
    else {
      nextId = getStorage[getStorage.length - 1].id + 1;
    }
  },[todos]);

  // 할일 작성 모달창 토글
  const onInputToggle = () => {
    if (selectedToDo) {
      setSelectedToDo(null);
    }
    setInputToggle(prev => !prev);
  }

  // 할 일 새로 추가
  const onAddToDo = (text) => {
    if (text == null) {
      return alert('할 일을 입력해주세요!')
    } else {
      const todo = {
        id : nextId,
        text,
        isChecked : false
      };
      setTodos(todos => todos.concat(todo));
      nextId++;

      todosArray = localStorage.getItem('todos');
      if (todosArray === null) {
        todosArray = [];
      } else {
        todosArray = JSON.parse(todosArray);
      }

      todosArray = [...todosArray, todo];
      localStorage.setItem('todos', JSON.stringify(todosArray));
    }
  }

  // 체크 박스 토글
  const onCheckToggle = (id) => {
    setTodos(todos => todos.map(todo => (todo.id === id ? {...todo, isChecked : !todo.isChecked} : todo)));
  }

  // 선택된 할 일을 변경
  const onChangeSelectedToDo = (todo) => {
    setSelectedToDo(todo);
  }

  // 삭제하기
  const onDelete = (id) => {
    onInputToggle();
    setTodos(todos => todos.filter(todo => todo.id !== id));
  }
  
  // 수정하기
  const onUpdate = (id, text) => {
    setTodos(todos => todos.map(todo => todo.id === id ? {...todo, text} : todo));
    onInputToggle();
  }

  // 전체선택
  const onAllCheck = () => {
    setTodos(todos.map(todo => ({...todo, isChecked : true})))
  }

  // 전체선택 해제
  const onAllCheckClear = () => {
    setTodos(todos.map(todo => ({...todo, isChecked : false})))
  }

  // 선택 항목 삭제
  const onDeleteCheckItem = () => {
    setTodos(todos => todos.filter(todo => todo.isChecked === false));
  }

  return (
    <ToDoTemplete todosLength={todos.length}>
        {/* 할일이 등록되지 않으면 <EmptyToDos />를 등록이 되어있으면 할 일 목록을 보여주는 부분 */}
        {todos.length === 0 
          ? (<EmptyToDos />) : 
          (
            <div>
              <div className='check-menu'>
                <button onClick={onAllCheck} className="all-check">전체 선택</button>
                <button onClick={onAllCheckClear} className="all-checkclear">선택 해제</button>
                <button onClick={onDeleteCheckItem} className="all-delete"><FaTrash /></button>
              </div>

              <ToDoList 
                todos={todos} 
                onCheckToggle={onCheckToggle}
                onInputToggle={onInputToggle}
                onChangeSelectedToDo={onChangeSelectedToDo}
              />

            </div>
          )
        }

        {/* 할일 추가 버튼 */}
        <div className='add-todo'>
          <MdAddCircle onClick={onInputToggle}/>
        </div>

        {/* 할일 추가 모달창을 띄울지 말지 확인하는 부분 */}
        {inputToggle ? 
          <ToDoInput 
            onInputToggle={onInputToggle} 
            onAddToDo={onAddToDo}
            selectedToDo={selectedToDo}
            onDelete={onDelete}
            onUpdate={onUpdate}
          /> : ""
        }
      </ToDoTemplete>
  );
}

export default App;
