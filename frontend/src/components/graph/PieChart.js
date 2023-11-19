import { Chart } from "react-google-charts";
import React, { useState, useEffect } from 'react'
import axios from "axios"

const PieCharte = () => {
    const [tasks, setTasks] = useState([])
    const [tasksInProgress, setInProgress] = useState([])
    const [tasksBlocked, setBlocked] = useState([])
    const [tasksFinished, setFinish] = useState([])

    const fetchTaskList = async () => {
        try {
            const getTasks = await axios.get('https://localhost:7152/api/Tasks')
            setTasks(getTasks.data.$values)
            setInProgress(tasks.filter(task => task.status === 0))
            setBlocked(tasks.filter(task => task.status === 1))
            setFinish(tasks.filter(task => task.status === 2))
        } catch (error) {
            console.error('Erreur lors de la récupération des données:', error)
        }
    }

    useEffect(() => {
        fetchTaskList();
    }, [tasks])

    const data = [
        ["Status", "nb"],
        ["En cours", tasksInProgress.length],
        ["Bloqué", tasksBlocked.length],
        ["Terminé", tasksFinished.length],
    ]

    const options = {
        title: "",
        pieHole: 0.4,
        is3D: false,
    };

    return (
        <Chart
            chartType="PieChart"
            width="100%"
            height="500px"
            data={data}
            options={options}
        />
    )
}

export default PieCharte
