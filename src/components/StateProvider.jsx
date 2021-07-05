import { createContext, useReducer, useEffect } from 'react';
import NotesFromDb from '../store/utils/NotesFromDb';

export const AppContext = createContext();

// reducer function
function reducer(state, action) {
	// create a copy of your state
	let stateCopy = { ...state };

	// set the name on our state copy to action
	stateCopy.action = action;

	if (action.type === 'NEW_NOTE') {
		stateCopy.notes.unshift(action.payload);
	}

	if (action.type === 'EDIT_NOTE') {
		stateCopy.notes = stateCopy.notes.map(note => {
			if (note._id === action.payload._id) {
				note = action.payload;
			}
			return note;
		});
	}

	if (action.type === 'DELETE_NOTE') {
		stateCopy.notes = stateCopy.notes.filter(
			item => item._id !== action.payload.id,
		);
	}

	if (action.type === 'SET_NOTE') {
		stateCopy.notes = action.payload;
	}

	// if action.type is ALERT_MESSAGE
	//set alert message object
	if (action.type === 'ALERT_MESSAGE') {
		stateCopy.alertMessage = action.payload;
	}

	return stateCopy;
}

const initialState = {
	isLoggedIn: false,
	userData: {
		id: '60cdca643e891200091665bc',
		email: 'anyebe@gmail.com',
	},
	alertMessage: {
		message: '',
		variant: '',
	},
	notes: [],
};

function StateProvider({ children }) {
	const [appstate, dispatch] = useReducer(reducer, initialState);

	const contextObject = {
		state: appstate,
		dispatch: dispatch,
	};

	useEffect(() => {
		const timer = setTimeout(async () => {
			const notes = await NotesFromDb();
			dispatch({
				type: 'SET_NOTE',
				payload: notes,
			});
		}, 500);
		return () => clearTimeout(timer);
	}, []);

	return (
		<AppContext.Provider value={contextObject}>
			{children}
		</AppContext.Provider>
	);
}

export default StateProvider;
