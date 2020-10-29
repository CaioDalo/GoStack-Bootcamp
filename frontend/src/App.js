import React, {useState, useEffect} from 'react'
import api from './services/api'

import './App.css'

import Header from './components/Header'

/**
 * Componente
 * Propriedade
 * Estado e Imutabilidade
 */


function App () {
    const [projects, setProjects] = useState([])

    useEffect(() => {
        api.get('/projects').then(response => {
            setProjects(response.data)
        })
    }, [])

    async function addProject () {
        /* projects.push(`Novo Projeto ${Date.now()}`) > evitar usar push */
        const response = await api.post('projects', {
            title: `Novo Projeto ${Date.now()}`,
            owner: 'Caio Dalo'
        })

        const project = response.data

        setProjects([...projects, project])
    }

    return (
        <>
            <Header title="Projects"/>

            <ul>
                {projects.map(project => <li key={project.id}>{project.title}</li>)}
            </ul>

            <button type="button" onClick={addProject}>Adicionar projeto</button>
        </> 
    )
}

export default App