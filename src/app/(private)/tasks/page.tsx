'use client'

import Button from "@/components/Button";
import styles from "./page.module.css";
import Task from "@/components/Task";
import { useState } from "react";
import Priority from "@/components/Priority";

interface Task {
    id: number;
    title: string;
    description: string;
    priority?: 'low' | 'medium' | 'high' | 'finished' | null;
    deadline?: Date | null ;
}

type PriorityType = 'low' | 'medium' | 'high' | 'finished' | null;

export default function Tasks() {
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [tasks, setTasks] = useState([] as Task[])
    const [newTask, setNewTask] = useState({
        title: '',
        description: '',
        priority: null,
        deadline: null
    } as Task)
    const [idCounter, setIdCounter] = useState(0)

    function handleAddNewTask(event : React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setNewTask({...newTask, id: idCounter})
        setTasks([...tasks, newTask])
        setIdCounter(idCounter + 1)
        setModalIsOpen(false)
    }

    function handleDeleteTask(index: number) {
        console.log(tasks)
        setTasks(tasks.filter(task => task.id !== index))
    }

    return (
        <>
            {modalIsOpen && (
                <div className={styles.modal}>
                    <div className={styles.modalContent}>
                        <header>
                            <h2>Nova tarefa</h2>
                            <Button
                                size="sm"
                                variant="primary"
                                onClick={() => setModalIsOpen(false)}
                            >
                                X
                            </Button>
                        </header>

                        <form
                            onSubmit={handleAddNewTask}
                            className={styles.form}
                        >
                            <input
                                type="text"
                                onChange={(e) => setNewTask({...newTask, title: e.target.value })}
                                placeholder="Título"
                            />

                            <div>
                                <select
                                    value={newTask.priority || 'no'}
                                    onChange={(e) => setNewTask({...newTask, priority: (e.target.value === 'no' ? null : e.target.value) as PriorityType})}
                                >
                                    <option value="low">
                                        <Priority type="low"/>    
                                    </option>
                                    <option value="medium">
                                        <Priority type="medium"/>
                                    </option>
                                    <option value="high">
                                        <Priority type="high"/>
                                    </option>
                                    <option value="no">Sem prioridade</option>
                                </select>

                                <input type="date" onChange={(e) => setNewTask({...newTask, deadline: e.target.value ? new Date(e.target.value) : null})}/>
                            </div>

                            <textarea
                                onChange={(e) => setNewTask({...newTask, description: e.target.value })}
                                placeholder="Descrição"
                            />

                            <Button type="submit" size='lg' variant='primary'>Adicionar</Button>
                        </form>
                    </div>
                </div>
            )}

            <div className={styles.container}>
                <p>Bem-vindo, usuário!</p>

                <header className={styles.header}>
                    <h1>Tarefas</h1>
                    <Button
                        size="md"
                        variant="secondary"
                        onClick={() => setModalIsOpen(true)}
                    >
                        + Nova tarefa
                    </Button>
                </header>

                <main className={styles.main}>
                    {tasks.map((task) => {
                        return (
                            <Task
                                key={task.id}
                                title={task.title}
                                description={task.description}
                                {...task.priority && { priority: task.priority }}
                                {...task.deadline && { deadline: task.deadline }}
                                onDelete={() => handleDeleteTask(task.id)}
                            />
                        )
                    
                    })}
                </main>
            </div>
        </>
    )
}