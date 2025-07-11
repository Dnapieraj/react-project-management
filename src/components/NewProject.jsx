import { useRef } from 'react'
import Modal from './Modal'
import Input from './Input'
export default function NewProject({ onAdd, onCancel }) {
	const modal = useRef()
	const title = useRef()
	const description = useRef()
	const dueDate = useRef()

	const handleSave = () => {
		const enteredTitle = title.current.value
		const enteredDescription = description.current.value
		const enteredDueDate = dueDate.current.value

		if (enteredTitle.trim() === '' || enteredDescription.trim() === '' || enteredDueDate.trim() === '') {
			modal.current.open()
			return
		}

		onAdd({
			title: enteredTitle,
			description: enteredDescription,
			dueDate: enteredDueDate,
		})
	}

	return (
		<>
			<Modal ref={modal} buttonCaption="Okay">
				<h2 className="text-xl font-bold text-stone-700 mt-4 mb-4 text-center">Invalid Input</h2>
				<p className="text-stone-600 mb-4 text-center">Oops ... looks like you forgot to enter a value.</p>
				<p className="text-stone-600 mb-4 text-center">
					Please make sure you provide a valid value for every input field.
				</p>
			</Modal>
			<div className="w-[35rem]">
				<menu className="flex items-center justify-end gap-4 my-4">
					<li>
						<button className="text-stone-800 hover:text-stone-950" onClick={onCancel}>
							Cancel
						</button>
					</li>
					<li>
						<button
							className=" px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:bg-stone-950"
							onClick={handleSave}>
							Save
						</button>
					</li>
				</menu>
				<div>
					<Input type="text" ref={title} label="Title" />
					<Input ref={description} label="Description" textarea />
					<Input type="date" ref={dueDate} label="Due Date" />
				</div>
			</div>
		</>
	)
}
