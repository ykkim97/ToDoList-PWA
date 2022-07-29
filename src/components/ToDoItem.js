import React from "react";
import styles from "./ToDoItem.module.css";
import { MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md";

const ToDoItem = ({ todo, onCheckToggle, onInputToggle, onChangeSelectedToDo }) => {
    const { id, text, isChecked } = todo;
    return (
        <div className={styles['ToDoItem']}>
            <div className={isChecked ? styles['checked'] : styles[`content`]}>
                <div>
                    {isChecked ? <MdCheckBox onClick={() => {onCheckToggle(id)}}/> : <MdCheckBoxOutlineBlank onClick={() => {onCheckToggle(id)}}/>}
                </div>
                <div className={styles['text']} onClick={() => {
                    onChangeSelectedToDo(todo);
                    onInputToggle();
                }}>{text}</div> 
            </div>
        </div>
    )
}

export default ToDoItem;