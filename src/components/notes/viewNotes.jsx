import { Link } from 'react-router-dom';
import { useState } from 'react';
import { getFirst50words, toTitleCase } from '../../store/utils/utils';
import userIcon from '../../images/user-icon.png';
// import UserNote from '../../pages/Notes/UserNote';
import useContextGetter from '../../hooks/useContextGetter';
import { countWords } from '../../store/utils/utils';
import { Alert, Modal } from 'react-bootstrap';
import './notes.css';

const ViewNote = ({ notes, url, loggedUser }) => {
	const [noteToEdit, setNoteToEdit] = useState(null);
	const [showModal, setShowModal] = useState(false);
	const [noteToDelete, setNoteToDelete] = useState(null);
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [alertMessage, setAlertMessage] = useState({
		message: '',
		variant: '',
	});
	const { dispatch } = useContextGetter();

	const edit = e => {
		e.preventDefault();
		if (countWords(noteToEdit.note) < 20) {
			setAlertMessage({
				message: 'Please provide a note',
				variant: 'danger',
			});
			return true;
		}

		if (!noteToEdit.title) {
			setAlertMessage({
				message: 'Please provide a title',
				variant: 'danger',
			});
			return true;
		}
		editNote();
	};

	//Set note to edit to null
	const cancel = () => {
		setNoteToEdit(null);
		setShowModal(false);
	};

	const editNote = () => {
		setAlertMessage({ message: 'sending request...', variant: 'info' });
		let newnote = {
			id: noteToEdit._id,
			title: noteToEdit.title,
			note: noteToEdit.note,
			userid: noteToEdit.userid,
			useremail: noteToEdit.useremail,
		};

		fetch(`https://staging-express-api.herokuapp.com/notes`, {
			method: 'PUT',
			headers: {
				'Content-type': 'application/json',
			},
			body: JSON.stringify(newnote),
		})
			.then(res => res.json())
			.then(result => {
				dispatch({
					type: 'EDIT_NOTE',
					payload: result.data,
				});
				setAlertMessage({
					message: result.message,
					variant: 'success',
				});
				cancel();
			})
			.catch(err => {
				console.log('this error occurred', err);
				setAlertMessage({
					message: 'An error occured, please try again',
					variant: 'danger',
				});
			});
	};

	const handleEdit = note => {
		setNoteToEdit(note);
		setShowModal(true);
	};

	const handleDelete = note => {
		setNoteToDelete(note);
		setShowDeleteModal(true);
	};

	//Set note to delete to null
	const cancelDelete = () => {
		setNoteToEdit(null);
		setShowDeleteModal(false);
	};

	const deleteNote=(e)=>{
		e.preventDefault();
		setAlertMessage({ message: 'sending request...', variant: 'info' });
		const note={id: noteToDelete._id}

		fetch(`https://staging-express-api.herokuapp.com/notes`, {
			method: 'DELETE',
			headers: {
				'Content-type': 'application/json',
			},
			body: JSON.stringify(note),
		})
			.then(res => res.json())
			.then(result => {
				dispatch({
					type: 'DELETE_NOTE',
					payload: note,
				});
				setAlertMessage({
					message: result.message,
					variant: 'success',
				});
				cancelDelete();
			})
			.catch(err => {
				console.log('this error occurred', err);
				setAlertMessage({
					message: 'An error occured, please try again',
					variant: 'danger',
				});
			});

	}
	const handleFormData = e => {
		e.preventDefault();
		setNoteToEdit(prev => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
	};
	return (
		<div className="container">
			{!notes.length && (
				<p className="text-info lead">
					Notes will be available soon!!! You can also add lessons you
					have learnt{' '}
					<Link to="/user/notes" className="add-note">
						here.
					</Link>
				</p>
			)}
			<div className="row">
				<div className="col-md-9 note">
					{notes.map(note => {
						return (
							<div className="my-5 px-3" key={note._id}>
								<h2 className="title">{`${toTitleCase(
									note.title,
								)}`}</h2>
								<p className="">{`${getFirst50words(
									note.note,
									30,
								)}...`}</p>
								<div className="media">
									<img
										className="mr-3 note-avatar"
										src={userIcon}
										alt="Note owner"
									/>
									<div className="media-body">
										{note.hasOwnProperty('useremail') && (
											<h6 className="mt-0 font-weight-bold">
												<em>
													{note.hasOwnProperty(
														'useremail',
													)
														? note.useremail
														: ''}
												</em>
											</h6>
										)}
										<small className="mt-0">
											{new Date(
												note.createdAt,
											).toLocaleString()}
										</small>
									</div>
								</div>
								<Link
									className="btn btn-sm mt-3 see-more"
									to={`${url}/${note._id}`}
									role="button"
								>
									See more
								</Link>{' '}
								&nbsp;
								{loggedUser &&
									note.useremail === loggedUser.email && (
										<>
											<span
												className="btn btn-sm mt-3"
												role="button"
												onClick={() => {
													handleEdit(note);
												}}
											>
												Edit
											</span>
											<span
												className="btn btn-sm ml-2 mt-3"
												role="button"
												onClick={() => {
													handleDelete(note);
												}}
											>
												Delete
											</span>
										</>
									)}
							</div>
						);
					})}
				</div>
				<div className="col-md-3">
					<div className="note-side py-3 px-2">
						<h2>Latest Notes</h2>
						{notes.slice(0, 10).map(note => {
							return (
								<div className="py-2 px-2" key={note._id}>
									<Link
										className="text-primary"
										to={`${url}/${note._id}`}
										role="button"
									>
										{`${toTitleCase(note.title)}`}
									</Link>
								</div>
							);
						})}
					</div>
					{/* <UserNote /> */}
				</div>
			</div>

			{/* Edit modal */}
			<Modal show={showModal} className="">
				<div className="edit-form-container">
					<div className="">
						<h5 id="edit-note-title">Edit my note</h5>
					</div>
					<div className="modal-body">
						<form id="editform" onSubmit={edit}>
							{alertMessage.message ? (
								<Alert variant={alertMessage.variant}>
									{alertMessage.message}
								</Alert>
							) : (
								''
							)}
							<input
								className="edit-note-fields"
								name="title"
								id="title"
								defaultValue={
									noteToEdit && `${noteToEdit.title}`
								}
								placeholder="Title"
								onBlur={handleFormData}
							/>
							<textarea
								id="note"
								name="note"
								placeholder="note"
								className="edit-note-fields"
								defaultValue={
									noteToEdit && `${noteToEdit.note}`
								}
								onBlur={handleFormData}
							></textarea>

							<div className="mt-3">
								<button
									className="btn btn-sm btn-add-note"
									type="submit"
								>
									Edit Note
								</button>
								<button
									className="btn btn-sm btn-add-note"
									type="button"
									onClick={cancel}
								>
									Cancel
								</button>
							</div>
						</form>
					</div>
				</div>
			</Modal>

			{/* Delete modal */}
			<Modal show={showDeleteModal} className="">
				<div className="edit-form-container">
					<div className="">
						<h5 id="edit-note-title">Delete my note</h5>
					</div>
					<div className="modal-body">
						<form id="editform" onSubmit={deleteNote}>
							{alertMessage.message ? (
								<Alert variant={alertMessage.variant}>
									{alertMessage.message}
								</Alert>
							) : (
								''
							)}
							<div className="">
								<h5 id="delete-note-text">
									Are you sure you want to delete this note?
								</h5>
							</div>

							<div className="my-5 px-3">
								<h2 className="title">{noteToDelete && `${toTitleCase(
									noteToDelete.title,
								)}`}</h2>
								<p className="">{noteToDelete && `${getFirst50words(
									noteToDelete.note,
									30,
								)}...`}</p>
								<div className="media">
									<img
										className="mr-3 note-avatar"
										src={userIcon}
										alt="Note owner"
									/>
									<div className="media-body">
										{noteToDelete && noteToDelete.hasOwnProperty('useremail') && (
											<h6 className="mt-0 font-weight-bold">
												<em>
													{noteToDelete && noteToDelete.hasOwnProperty(
														'useremail',
													)
														? noteToDelete.useremail
														: ''}
												</em>
											</h6>
										)}
										<small className="mt-0">
											{noteToDelete && new Date(
												noteToDelete.createdAt,
											).toLocaleString()}
										</small>
									</div>
								</div>

							<div className="mt-3">
								<button
									className="btn btn-sm btn-add-note"
									type="submit"
								>
									Delete
								</button>
								<button
									className="btn btn-sm btn-add-note"
									type="button"
									onClick={cancelDelete}
								>
									Cancel
								</button>
							</div>
							</div>
							</form>
							</div>
							</div>			
			</Modal>
		</div>
	);
};

export default ViewNote;
