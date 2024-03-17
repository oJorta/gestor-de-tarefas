'use client'

import styles from './task.module.css'

import { FiTrash } from "react-icons/fi";
import Priority from '../Priority';
import { useEffect, useState } from 'react';

interface TaskProps {
    title: string;
    description?: string;
    priority?: 'low' | 'medium' | 'high' | 'finished' | null;
    deadline?: Date;
    onDelete?: () => void;
}

export default function Task({ title, description, priority, deadline, onDelete }: TaskProps) {
    const [isChecked, setIsChecked] = useState(priority === 'finished' ? true : false)

    return (
      <>
        <div className={`${styles.taskContainer} ${isChecked && styles.finished}`}>
          <header>
            <h3>{title}</h3>
            <div className={styles.options}>
              <input
                type="checkbox"
                checked={isChecked}
                onChange={() => setIsChecked(!isChecked)}
              />
              <button onClick={onDelete}>
                <FiTrash />
              </button>
            </div>
          </header>

          <div className={styles.taskInfo}>
            {priority && !isChecked ? (
              <Priority type={priority} />
            ) : (
              isChecked && <Priority type="finished" />
            )}
            {deadline && <p>Prazo: {deadline.toLocaleDateString()}</p>}
          </div>

          {description && <p className={styles.description}>{description}</p>}
        </div>
      </>
    );
}