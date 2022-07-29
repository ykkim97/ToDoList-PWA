import React from "react";
import ToDoItem from "./ToDoItem";
import styles from "./ToDoList.module.css";

const ToDoList = ({ todos, onCheckToggle, onInputToggle, onChangeSelectedToDo }) => {
    return (
        <div className={styles['todolist']}>
            {todos.map((todo, index) => (
                <ToDoItem 
                    todo={todo} 
                    key={index} 
                    onCheckToggle={onCheckToggle} 
                    onInputToggle={onInputToggle} 
                    onChangeSelectedToDo={onChangeSelectedToDo}
                />
            ))}
        </div>
    )
}

export default ToDoList;