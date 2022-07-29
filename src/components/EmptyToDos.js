import React from "react";
import styles from "./EmptyToDos.module.css";

const EmptyToDos = () => {
    return (
        <div className={styles['empty-todos-div']}>
            <img src="panda.png" className={styles['img']}/>
            <h2 className={styles['info']}>오늘 뭐하지?</h2>
        </div>
    )
}

export default EmptyToDos;