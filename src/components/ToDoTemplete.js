import React from "react";
import styles from "./ToDoTemplete.module.css";

const ToDoTemplete = ({children, todosLength}) => {
    return (
        <>
            <header className={styles['templete']}>
                <nav>
                    <div className={styles['title']}>오늘 할 일</div>
                    <div className={styles['info']}>{todosLength} 개의 할 일이 있습니다.</div>
                </nav>
                <div className={styles['children']}>{children}</div>
            </header>
        </>
    )
}

export default ToDoTemplete;