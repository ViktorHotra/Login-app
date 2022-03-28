import { Link } from 'react-router-dom';
import { useCallback, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { inputHandler } from '../utils/inputHandler';
import { UserContext } from '../contexts/user';

export const Home = () => {
    const [newTask, setNewTask] = useState('');
    const [tasksList, setTasksList] = useState([]);

    const { user, setUser } = useContext(UserContext);

    const getTaskList = useCallback(async () => {
        const response = await axios.get('http://localhost:3500/api/tasks', {
            headers: { Authorization: `Bearer ${user.token}` },
        });
        setTasksList(response.data.tasksList);
    }, [user.token]);

    useEffect(() => {
        getTaskList().catch((err) => console.log(err));
    }, [getTaskList]);

    const deleteTask = async (task) => {
        await axios.delete(`http://localhost:3500/api/tasks/${task._id}`, {
            headers: { Authorization: `Bearer ${user.token}` },
        });
        const tasks = await axios.get('http://localhost:3500/api/tasks', {
            headers: { Authorization: `Bearer ${user.token}` },
        });
        setTasksList(tasks.data.tasksList);
    };

    const removeUser = async () => {
        await axios.delete(`http://localhost:3500/api/remove`, {
            headers: { Authorization: `Bearer ${user.token}` },
        });
        await setUser({});
    };

    return (
        <div>
            <div>
                <nav className="menu">
                    <div className="username">{user.user}</div>
                    <div className="dropdown dropend">
                        <button
                            className="btn btn-secondary btn-sm dropdown-toggle menu-btn"
                            type="button"
                            id="dropdownMenuButton1"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        >
                            Menu
                        </button>
                        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                            <li>
                                <Link className="dropdown-item" to="/change">
                                    Change password
                                </Link>
                            </li>
                            <li>
                                <Link className="dropdown-item" to="#" onClick={() => removeUser()}>
                                    Delete account
                                </Link>
                            </li>
                            <li>
                                <Link className="dropdown-item" to="#" onClick={() => setUser({})}>
                                    Logout
                                </Link>
                            </li>
                        </ul>
                    </div>
                </nav>
                <hr />
                <div className="title-homepage">
                    <h1>My tasks</h1>
                </div>
            </div>
            <form
                className="input-group mb-3 task-group"
                onSubmit={(event) => {
                    event.preventDefault();
                    axios
                        .post(
                            'http://localhost:3500/api/tasks',
                            {
                                newTask,
                            },
                            { headers: { Authorization: `Bearer ${user.token}` } }
                        )
                        .then((response) => {
                            console.log(response.data.message);
                        })
                        .catch((error) => console.log(error));
                    setNewTask('');
                    getTaskList().catch((err) => console.log(err));
                }}
            >
                <input
                    value={newTask}
                    type="text"
                    className="form-text"
                    placeholder="New task"
                    aria-label="New task"
                    aria-describedby="button-addon2"
                    onChange={(ev) => inputHandler(ev, setNewTask)}
                />
                <button className="btn btn-outline-secondary button-task" type="submit" id="button-addon2">
                    Add task
                </button>
            </form>
            <ul className="list-group">
                {tasksList.map((task) => (
                    <li className="form-text" key={task._id}>
                        {task.task}
                        <button onClick={() => deleteTask(task)} type="button" className="delete-button">
                            x
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};
