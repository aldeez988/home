import React, { useState } from 'react';
import uuid from 'uuid/v4';
function Tasks() {
    const [taskText, setTaskText] = useState('');
    const [tasks, setTasks] = useState([]);
    const [completedTasks, setCompletedTasks] = useState([]);
    const updateTaskText = (e) => {
        setTaskText(e.target.value)
    }
    const addTask = () => {
        setTasks([...tasks, { taskText, id: uuid() }]);
    }

    console.log('Tasks', tasks)
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
                      <div key={id}>{taskText}</div>
                        )
                    })
                }
            </div>
        </div>
    )
}
export default Tasks;