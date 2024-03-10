import styles from './task.module.css'

import { FiTrash } from "react-icons/fi";
import Priority from '../Priority';

interface TaskProps {
    title: string;
    description?: string;
    priority?: 'low' | 'medium' | 'high' | 'finished' | null;
    deadline?: Date;
    onDelete?: () => void;
}

export default function Task({ title, description, priority, deadline, onDelete }: TaskProps) {
    return (
        <>
            <div className={styles.taskContainer}>
                <header>
                    <h3>{title}</h3>
                    <div className={styles.options}>
                        <input type="checkbox" name="" id="" />
                        <button onClick={onDelete}>
                            <FiTrash/>
                        </button>
                    </div>
                </header>

                <div className={styles.taskInfo}>
                    {priority && <Priority type={priority} />}
                    {deadline && <p>Prazo: {deadline.toLocaleDateString()}</p>}
                </div>
                
                {description && <p className={styles.description}>{description}</p>}
            </div>
        </>
    )
}