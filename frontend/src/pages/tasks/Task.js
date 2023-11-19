import React, { useState, useEffect } from 'react'
import axios from "axios"
import MUIDataTable from "mui-datatables"
import { Button, Badge } from 'reactstrap'
import { Edit } from "@mui/icons-material"
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import Avatar from '@mui/material/Avatar'
import { ChecklistOutlined } from "@mui/icons-material"
import CreateTask from '../../components/modals/CreateTask'
import EditTask from '../../components/modals/EditTask'
import DeleteTask from '../../components/modals/DeleteTask'
import './task.css';


function Task() {
    const [modal, setModal] = useState(false);
    const [updatemodal, setUpdatemodal] = useState(false);
    const [deletemodal, setDeletemodal] = useState(false);
    const [tempObject, setTempobject] = useState([])
    const [tasks, setTasks] = useState([])
    const [users, setUser] = useState([])
    const [id, setId] = useState('')
    const [keySearch, setKeySearch] = useState('viv')
    const [status, setStatus] = useState([{ id: 0, name: "En cours" }, { id: 1, name: "Bloqué" }, { id: 2, name: "Terminé" }])
    const columns = [
        {
            name: "label",
            label: "Libellé",
            options: {
                filter: false,
            }
        },
        {
            name: "userId",
            label: "Attribution",
            options: {
                filterType: 'dropdown',
                filter: true,
                customBodyRender: (value) => (
                    <div>
                        {value && value ? (
                            <Avatar alt={value.toString()} src="../../assets/photos/1.jpg" />
                        ) : (
                            <Avatar alt="#" />
                        )}
                    </div>
                ),

            },
        },
        {
            name: "status",
            label: "Statut",
            options: {
                filterType: 'dropdown',
                filter: true,
                customBodyRender: (value) => (
                    <div>
                        {value === 0 ? (
                            <p>
                                <Badge color="info">
                                    En cours
                                </Badge>
                            </p>
                        ) : value === 1 ? (
                            <Badge color="danger">
                                Bloqué
                            </Badge>
                        ) : value === 2 ? (
                            <Badge color="success">
                                Terminé
                            </Badge>
                        ) : (
                            <></>
                        )}
                    </div>
                ),
            },
        },
        {
            name: "Actions",
            label: "Actions",
            options: {
                filter: false,
                customBodyRender: (value, tableMeta) => (
                    <div>
                        <IconButton onClick={() => updateHandle(tasks[tableMeta.rowIndex])} aria-label="delete" size="large">
                            <Edit color="warning" fontSize="inherit" />
                        </IconButton>
                        <IconButton onClick={() => deleteHandle(tasks[tableMeta.rowIndex].id)} aria-label="delete" size="large">
                            <DeleteIcon sx={{ color: "red" }} fontSize="inherit" />
                        </IconButton>
                    </div>
                ),
            },
        },
    ];


    const options = {
        filterType: 'dropdown',
        selectableRows: 'none',
        viewColumns: false,
        print: false,
        download: true,
        pagination: true,
        rowsPerPageOptions: [10],
        page: 0,
        rowsPerPage: 4,
        textLabels: {
            body: {
                noMatch: "Aucun enregistrement trouvé",
            },
            pagination: {
                displayRows: 'sur',
            },
        },
        downloadOptions: {
            filename: 'exported_tasks.csv', 
            separator: ';', 
            filterOptions: {
              useDisplayedColumnsOnly: true,
              useDisplayedRowsOnly: true,
            },
        },
    }

    const updateHandle = (object) => {
        setTempobject(object)
        setUpdatemodal(true)
    }

    const deleteHandle = (id) => {
        setId(id)
        setDeletemodal(true)
    }

    const toggle = () => {
        setModal(!modal);
    }
    const updatetoggle = () => {
        setUpdatemodal(!updatemodal);
    }
    const deletetoggle = () => {
        setDeletemodal(!deletemodal);
    }

    const fetchTaskList = async () => {
        try {
            const getTasks = await axios.get('https://localhost:7152/api/Tasks')
            const getUsers = await axios.get('https://localhost:7152/api/User')
            setTasks(getTasks.data.$values)
            setUser(getUsers.data.$values)
        } catch (error) {
            console.error('Erreur lors de la récupération des données:', error)
        }
    }


    const saveTask = async (taskObj) => {
        const newTask = { userId: parseInt(taskObj.userId), label: taskObj.label, status: parseInt(taskObj.status) }
        try {
            const response = await axios.post('https://localhost:7152/api/Tasks', newTask)
            setTasks((prevTasks) => [...prevTasks, response.data]);
        } catch (error) {
            console.error('Erreur lors de l\'enregistrement:', error)
        }
        setModal(false)
    }

    const updateTask = async (taskObj) => {
        const updatedTaskData = { userId: parseInt(taskObj.userId), label: taskObj.label, status: parseInt(taskObj.status) }
        const taskId = parseInt(taskObj.id)
        console.log(updatedTaskData)
        console.log(taskId)
        try {
            const response = await axios.put(`https://localhost:7152/api/Tasks/${taskId}`, updatedTaskData);
            setTasks(tasks.map(task => (task.id === taskId ? response.data : task)));
        } catch (error) {
            console.error('Erreur lors de la mise à jour:', error)
        }
        setUpdatemodal(false)
    }

    const deleteTask = async (id) => {
        const taskId = parseInt(id)
        try {
            await axios.delete(`https://localhost:7152/api/Tasks/${taskId}`)
            setTasks(tasks.filter(task => task.id !== taskId));
        } catch (error) {
            console.error('Erreur lors de la suppression:', error)
        }
        setDeletemodal(false)
    }

    useEffect(() => {
        fetchTaskList();
    }, [])

    return (
        <div className="task">
            <CreateTask modal={modal} toggle={toggle} save={saveTask} users={users} status={status} />
            <EditTask modal={updatemodal} toggle={updatetoggle} save={updateTask} formData={tempObject} users={users} state={status} />
            <DeleteTask modal={deletemodal} toggle={deletetoggle} id={id} deleteTask={deleteTask} />
            <div className="header">
                <Button className="addButton" onClick={() => setModal(true)}>
                    Ajouter une tache
                </Button>
            </div>
            <div className="showTable">
                {tasks.length === 0 ? (
                    <div className="showNoTask">
                        <div className="iconList"><ChecklistOutlined /></div>
                        <div className="message">Aucune tâche disponible</div>
                    </div>
                ) : (
                    <MUIDataTable
                        title={""}
                        data={tasks}
                        columns={columns}
                        options={{
                            ...options,
                            onSearchChange: (searchText) => {
                                setKeySearch(searchText)
                            },
                        }}
                    />
                )}
            </div>
        </div>
    )
}


export default Task
