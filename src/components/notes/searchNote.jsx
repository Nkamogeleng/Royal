import { Link } from 'react-router-dom';
import { useState, useRef } from 'react';
import { searchNote } from '../../store/utils/NotesFromDb';
import { toTitleCase } from '../../store/utils/utils';
import userIcon from '../../images/user-icon.png';
import './searchNote.css'
// import Spinner from '../spinner';

const SearchNote = ({ url }) => {
	const [notes, setNotes] = useState([]);
	// const [closeResult, setCloseResult]=  useState(false);
	const searchRef = useRef(null);

	const handleSearch = (e) => {
		e.preventDefault();
		console.log(searchRef.current.value);


		if(!searchRef.current.value){
			setNotes([]);
			return true;
		}

		setTimeout(async () => {
			const notes = await searchNote(searchRef.current.value);
			
			if(notes.length<1){
			
				handleClose();
				return true;
			}

			setNotes(notes);
			// handleClose();
		});
	};

	const handleClose=()=>{
		setNotes([]);
	}
	return (
		<div id="search"> 
			<div className="row">
				<div className="col-sm-12">
					<form>
						<div className="input-group mb-3">
							<input
								type="text"
								className="form-control"
								placeholder="Title or topic"
								aria-label="Title or topic"
								aria-describedby="search-btn"
								onBlur={handleSearch}
								ref={searchRef}
							/>
							<div className="input-group-append">
								<button
								type="button"
									className="btn input-group-text"
									id="search_btn"
									onClick={handleSearch}
								>
									Search
								</button>
							</div>
						</div>
					</form>
				
				<div  id="viewsearch" style={(notes.length>0)?{display:"block"}:{display:"none"}}>
					{(notes.length>0)? (
						<span className="btn btn-info" onClick={handleClose}>X</span>
					):""}
					
					{notes.map(note => {
						return (
							<div className="py-2 px-2" key={note._id}>
								<Link
									className="text-info"
									to={`/notes/${note._id}`}
									role="button"
									onClick={handleClose}
								>
									{`${toTitleCase(note.title)}`}
								</Link>
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
							</div>
						);
					})}
				</div>
			</div>
			</div>
		</div>
	);
};

export default SearchNote;
