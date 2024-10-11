import React, { useEffect, useState } from 'react';

const Home = () => {
    const [tasks, setTasks] = useState([]);
    const [task, setTask] = useState('');
    const [isEditing, setIsEditing] = useState(null);
    const [editTask, setEditTask] = useState('');

    useEffect(() => {
        const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
        console.log('Tasks from local storage:', storedTasks);
        setTasks(storedTasks);
    }, []);


    const handleAddTask = () => {
        const normalizedTask = task.replace(/\s+/g, ' ').trim();
        if (normalizedTask) { 
            const updatedTasks = [normalizedTask, ...tasks];
            setTasks(updatedTasks);
            setTask(''); 
            localStorage.setItem('tasks', JSON.stringify(updatedTasks));
            console.log([normalizedTask, ...tasks]);
        }
    };
    

    const handleDeleteTask = (indexToDelete) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this task?');
        if (confirmDelete) {
            const updatedTasks = tasks.filter((_, index) => index !== indexToDelete);
            setTasks(updatedTasks);
            localStorage.setItem('tasks', JSON.stringify(updatedTasks));
            console.log(updatedTasks);
        }
    };


    const handleEditTask = (index) => {
        setIsEditing(index);
        setEditTask(tasks[index]);
    };

  
    const handleSaveEdit = (index) => {
        const updatedTasks = tasks.map((t, i) => (i === index ? editTask.replace(/\s+/g, ' ').trim() : t));
        setTasks(updatedTasks);
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
        console.log(updatedTasks)
        setIsEditing(null);
        setEditTask('');
    };


    const handleCancelEdit = () => {
        setIsEditing(null);
        setEditTask('');
    };


    return (
        <div style={{ maxWidth: '400px', margin: '0 auto', textAlign: 'center' }}>
            <h1>To-Do List</h1>
            <input
                type="text"
                value={task}
                onChange={(e) => setTask(e.target.value)}
                placeholder="Add a new task"
                style={{ width: '70%', padding: '10px', marginBottom: '10px' }}
            />
            <button onClick={handleAddTask} style={{ padding: '10px', marginBottom: '10px' }}>
                Add Task
            </button>
            <ul style={{ listStyleType: 'none', padding: '0' }}>
                {tasks.filter((t) => t.trim() !== '').map((t, index) => (
                    <li
                        key={index}
                        style={{ padding: '5px', borderBottom: '1px solid #ccc', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                    >
                        {isEditing === index ? (
                            <div style={{ flexGrow: 1 }}>
                                <input
                                    type="text"
                                    value={editTask}
                                    onChange={(e) => setEditTask(e.target.value)}
                                    style={{ width: '70%', padding: '5px' }}
                                />
                                <button
                                    onClick={() => handleSaveEdit(index)}
                                    style={{
                                        padding: '5px 10px',
                                        backgroundColor: 'green',
                                        color: 'white',
                                        border: 'none',
                                        marginLeft: '5px',
                                        cursor: 'pointer',
                                    }}
                                >
                                    ✓
                                </button>
                                <button
                                    onClick={handleCancelEdit}
                                    style={{
                                        padding: '5px 10px',
                                        backgroundColor: 'gray',
                                        color: 'white',
                                        border: 'none',
                                        marginLeft: '5px',
                                        cursor: 'pointer',
                                    }}
                                >
                                    ✕
                                </button>
                            </div>
                        ) : (
                            <>
                                <span style={{ flexGrow: 1 }}>{t}</span>
                                <button
                                    onClick={() => handleEditTask(index)}
                                    style={{
                                        padding: '5px 10px',
                                        backgroundColor: 'blue',
                                        color: 'white',
                                        border: 'none',
                                        marginRight: '5px',
                                        cursor: 'pointer',
                                    }}
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDeleteTask(index)}
                                    style={{
                                        padding: '5px 10px',
                                        backgroundColor: 'red',
                                        color: 'white',
                                        border: 'none',
                                        cursor: 'pointer',
                                    }}
                                >
                                    Delete
                                </button>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Home;



