import ProjectsSidebar from './components/ProjectsSidebar'
import NewProject from './components/NewProject'
import NoProjectSelected from './components/NoProjectSelected'
import { useState } from 'react'
import SelectedProject from './components/SelectedProject'

function App() {
	const [projectsState, setProjectState] = useState({
		selectedProjectId: undefined,
		projects: [],
		tasks: [],
	})

	const handleAddTask = text => {
		setProjectState(prevState => {
			const taskId = Math.random()
			const newTask = {
				text: text,
				projectId: prevState.selectedProjectId,
				id: taskId,
			}
			return {
				...prevState,
				tasks: [newTask, ...prevState.tasks],
			}
		})
	}

	const handleDeleteTask = () => {}

	const handleSelectProject = id => {
		setProjectState(prevState => {
			return {
				...prevState,
				selectedProjectId: id,
			}
		})
	}

	const handleStartAddProject = () => {
		setProjectState(prevState => {
			return {
				...prevState,
				selectedProjectId: null,
			}
		})
	}

	const handleCancelAddProject = () => {
		setProjectState(prevState => {
			return {
				...prevState,
				selectedProjectId: undefined,
			}
		})
	}

	const handleAddProject = projectData => {
		setProjectState(prevState => {
			const projectId = Math.random()
			const newProject = {
				...projectData,
				id: projectId,
			}
			return {
				...prevState,
				selectedProjectId: undefined,
				projects: [...prevState.projects, newProject],
			}
		})
	}

	const handleDeleteProject = () => {
		setProjectState(prevState => {
			return {
				...prevState,
				selectedProjectId: undefined,
				projects: prevState.projects.filter(project => {
					project.id !== prevState.selectedProjectId
				}),
			}
		})
	}

	const selectedProject = projectsState.projects.find(project => project.id === projectsState.selectedProjectId)

	let content = (
		<SelectedProject
			project={selectedProject}
			onDelete={handleDeleteProject}
			onAddTask={handleAddTask}
			onDeleteTask={handleDeleteTask}
			tasks={projectsState.tasks}
		/>
	)

	if (projectsState.selectedProjectId === null) {
		content = <NewProject onAdd={handleAddProject} onCancel={handleCancelAddProject} />
	} else if (projectsState.selectedProjectId === undefined) {
		content = <NoProjectSelected onStartAddProject={handleStartAddProject} />
	}

	return (
		<main className="h-screen  flex gap-8 ">
			<ProjectsSidebar
				onSelectProject={handleSelectProject}
				onStartAddProject={handleStartAddProject}
				projects={projectsState.projects}
			/>
			{content}
		</main>
	)
}

export default App
