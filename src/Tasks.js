import React, { useState, useEffect } from 'react';
import uuid from 'uuid/v4';

const TASKS_STORAGE_KEY = 'TASKS_STORAGE_KEY';
const storeTasks = (taskMap)=>{
localStorage.setItem(
    TASKS_STORAGE_KEY,
    JSON.stringify(taskMap)
);
};

const readStoredTasks = ()=>{
    const taskMap = JSON.parse(localStorage.getItem(TASKS_STORAGE_KEY)); 
    return taskMap ? taskMap : {tasks: [], completedTasks: []};
};
function Tasks() {
    const [taskText, setTaskText] = useState('');
    const storedTasks = readStoredTasks();
    const [tasks, setTasks] = useState(storedTasks.tasks);
    const [completedTasks, setCompletedTasks] = useState(storedTasks.completedTasks);
    useEffect(()=>{
        storeTasks({tasks, completedTasks});
    });
    const updateTaskText = (e) => {
        setTaskText(e.target.value)
    }
    const addTask = () => {
        setTasks([...tasks, { taskText, id: uuid() }]);
    }
    
    const completeTask = completedTask =>()=>{
        setCompletedTasks([...completedTasks, completedTask])
        setTasks(tasks.filter(task=> task.id !== completedTask.id))
    }

    const deleteTask = deletedTask =>()=>{
        setCompletedTasks(completedTasks.filter(task=> task.id !== deletedTask.id))
    }
    console.log("Completed Task", completedTasks );
    console.log("Task", tasks);
    return (
        <div>
            <h3>Tasks</h3>
            <div className='form'>
                <input value={taskText} onChange={updateTaskText} />
                <button onClick={addTask}>Add Task</button>
            </div>
            <div className='task-list'>
                {
                 tasks.map(task => {
                const {taskText, id} = task;
                 return (
                      <div key={id} onClick={completeTask(task)}>{taskText}</div>
                        )
                    })
                }
            </div>
            <div className='completed-list'>
            <hr/>    
            {
             completedTasks.map(task => {
                const {taskText, id} = task;
                 return (
                 <div key={id}>{taskText}{''}<span className="delete-task" onClick={deleteTask(task)}>X</span></div>
                        )
                    })
                } 
            </div>
        </div>
    )
}
export default Tasks;