import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import {inputHandler} from '../utils/inputHandler'
import axios from "axios";

export const Home = () => {
    const [newTask, setNewTask] = useState('')
    const [tasksList, setTasksList] = useState([])

    const getTaskList = async () => {
        const tasks = await axios.get('http://localhost:3500/api/tasks')

        setTasksList(tasks.data)
    }

    useEffect(() => {
        getTaskList().catch(err => console.log(err))
    }, [])

    const deleteTask = async (task) => {
        await axios.delete(`http://localhost:3500/api/tasks/${task._id}`)
        const tasks = await axios.get('http://localhost:3500/api/tasks')

        setTasksList(tasks.data)
    }

    return <div>
        <div>
            <nav>
            <div className="logout"><Link className="link-dark green-hover"to="/login">Logout</Link></div>
            <div className="logout"><Link className="link-dark red-hover" to="/login">Cancel account</Link></div>
            </nav>
            <hr/>
            <div className="title-homepage"><h1>My tasks</h1></div>
        </div>
        <form className="input-group mb-3 task-group" onSubmit={(event) => {
            event.preventDefault();
            axios.post('http://localhost:3500/api/tasks', {
                newTask: newTask
            })
                .then(response => console.log('hi'))
                .catch(error => console.log(error))
            setNewTask('')
            getTaskList().catch(err => console.log(err))
        }
        }>
            <input value={newTask} type="text" className="form-text" placeholder="New task"
                   aria-label="New task" aria-describedby="button-addon2"
                   onChange={(ev) => inputHandler(ev, setNewTask)} autoFocus/>
            <button className="btn btn-outline-secondary button-task" type="submit" id="button-addon2">Add task</button>
        </form>
        <ul className="list-group">{tasksList.map(task => <li className="form-text" key={task._id}>{task.task}
            <button onClick={() => deleteTask(task)} className="delete-button">x
            </button>
        </li>)}</ul>

    </div>
}
