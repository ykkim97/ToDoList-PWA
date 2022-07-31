import React, { useEffect } from 'react';
import { useState } from 'react';
import { MdAddCircle } from 'react-icons/md';
import './App.css';
import EmptyToDos from './components/EmptyToDos';
import ToDoInput from './components/ToDoInput';
import ToDoList from './components/ToDoList';
import ToDoTemplete from './components/ToDoTemplete';

let nextId = 1;

function App() {
  
    // 할일이 들어있는 todos객체 배열
    const [todos, setTodos] = useState([
      // {
      //   id : 1,
      //   text : "할일 1",
      //   isChecked : true
      // },
      // {
      //   id : 2,
      //   text : "할일 2",
      //   isChecked : false
      // },
      // {
      //   id : 3,
      //   text : "할일 3",
      //   isChecked : true
      // },
    ]);
  
    
    const [inputToggle, setInputToggle] = useState(false);
    const [selectedToDo, setSelectedToDo] = useState(null);
  

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

  return (
    <ToDoTemplete todosLength={todos.length}>
        {todos.length === 0 
          ? (<EmptyToDos />) : 
          <ToDoList 
            todos={todos} 
            onCheckToggle={onCheckToggle}
            onInputToggle={onInputToggle}
            onChangeSelectedToDo={onChangeSelectedToDo}
          />
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
