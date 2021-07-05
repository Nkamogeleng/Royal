/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { toTitleCase } from '../../store/utils/utils';
import userIcon from '../../images/user-icon.png';
import { getSingelNote } from '../../store/utils/NotesFromDb';
import Spinner from '../spinner';
import useContextGetter from '../../hooks/useContextGetter';

import './notes.css';

const Note = () => {
	let params = useParams();
	const [classNote, setClassNote] = useState(null);
	const history = useHistory();
  const {
    // eslint-disable-next-line no-unused-vars
    state: { notes },
  } = useContextGetter();

	let noteLoaded = false;
	useEffect(() => {
      let note = notes.filter((item) => item._id === params.noteId)[0];
      if(!note){
        setTimeout(async()=>{
            note = await getSingelNote(params.noteId);
        })
      }		
			setClassNote(note);

		return (noteLoaded = true);
	}, [noteLoaded]);
	return (
		<div className="container">
			<div className="row">
			<div className="col-md-2"></div>
				<div className="col-md-8 note">
					{!classNote && <Spinner />}
					{classNote && (
						<div className="">
							<h1 className="mt-5 note-title">{`${toTitleCase(
								classNote.title,
							)}`}</h1>
							
							<hr className="my-4" />
							<p>{classNote.note}</p>
							<div className="media">
								<img
									className="mr-3 note-avatar"
									src={userIcon}
									alt="Note owner"
								/>
								<div className="media-body py-2">
									{classNote.hasOwnProperty('useremail') && (
										<h6 className="mt-0 font-weight-bold">
											<em>
												{new Date(
													classNote.createdAt,
												).toLocaleString()}
											</em>
										</h6>
									)}
									<small>
										{new Date(
											classNote.createdAt,
										).toLocaleString()}
									</small>
								</div>
							</div>
							<button
								className="btn btn-sm btn-info my-4 px-3"
								onClick={() => {
									history.goBack();
								}}
							>
								Back
							</button>
						</div>
					)}
				</div>
        <div className="col-md-2">
					</div>
			</div>
		</div>
	);
};
export default Note;
