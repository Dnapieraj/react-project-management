import ProjectsSidebar from './components/ProjectsSidebar'
import NewProject from './components/NewProject'
import NoProjectSelected from './components/NoProjectSelected'
import { useState } from 'react'

function App() {
	const [projectsState, setProjectState] = useState({
		selectedProjectId: undefined,
		projects: [],
	})
	const handleStartAddProject = () => {
		setProjectState(prevState => {
			return {
				...prevState,
				selectedProjectId: null,
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

	let content
	if (projectsState.selectedProjectId === null) {
		content = <NewProject onAdd={handleAddProject} />
	} else if (projectsState.selectedProjectId === undefined) {
		content = <NoProjectSelected onStartAddProject={handleStartAddProject} />
	}
	return (
		<main className="h-screen  flex gap-8 ">
			<ProjectsSidebar onStartAddProject={handleStartAddProject} projects={projectsState.projects} />
			{content}
		</main>
	)
}

export default App
