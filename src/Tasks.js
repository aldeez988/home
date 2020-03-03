import React, { useState, useEffect, useReducer } from 'react';
import uuid from 'uuid/v4';

const initialTaskState = {
    tasks: [],
    completedTasks: []
};
const TYPES = {
    ADD_TASK: 'ADD_TASKS',
    COMPLETE_TASK: 'COMPLETE_TASKS',
    DELETE_TASK: 'DELETE_TASK'
};

const tasksReducer = (state, action)=>{
    const { completedTask } = action;
    const { deletedTask } = action;
    switch(action.type){
        case TYPES.ADD_TASK: 
        return {...state, tasks: [...state.tasks, action.task]};
        case TYPES.COMPLETE_TASK:
            return {
                ...state, 
                tasks: state.tasks.filter(task=> task.id !== completedTask.id),
                completedTasks: [...state.completedTasks, completedTask]
            }
      case TYPES.DELETE_TASK:
        return {
            ...state,
            completedTasks: state.completedTasks.filter(task=> task.id !== deletedTask.id)
        }
       default: 
       return state;

    }
};
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
    const [state, dispatch] = useReducer(tasksReducer, initialTaskState);
    
    console.log('>>>>>>>><<<<<<<<<<<<<<<<', state);
    useEffect(()=>{
        storeTasks({tasks, completedTasks});
    });
    const updateTaskText = (e) => {
        setTaskText(e.target.value)
    }
    const addTask = () => {
        const task = {taskText, id: uuid()}
        dispatch({type: TYPES.ADD_TASK, task});

        setTasks([...tasks, task]);
    }
    
    const completeTask = completedTask =>()=>{
        dispatch({type: TYPES.COMPLETE_TASK, completedTask});

        setCompletedTasks([...completedTasks, completedTask])
        setTasks(tasks.filter(task=> task.id !== completedTask.id))
    }

    const deleteTask = deletedTask =>()=>{
        dispatch({type: TYPES.DELETE_TASK, deletedTask})
        setCompletedTasks(completedTasks.filter(task=> task.id !== deletedTask.id))
    }
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