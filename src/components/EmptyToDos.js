import React from "react";
import styles from "./EmptyToDos.module.css";

// 할 일 목록이 비어있을 때 사용되는 컴포넌트
const EmptyToDos = () => {
    return (
        <div className={styles['empty-todos-div']}>
            <img src="panda.png" className={styles['img']}/>
            <h2 className={styles['info']}>오늘 뭐하지?</h2>
        </div>
    )
}

export default EmptyToDos;