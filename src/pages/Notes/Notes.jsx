// import notes from "./../assets/data/notes.json";
import { useRouteMatch, Switch, Route } from 'react-router-dom';
import useContextGetter from '../../hooks/useContextGetter';


import ViewNote from '../../components/notes/viewNotes';
import Note from '../../components/notes/note';
import Header from '../../components/header/header';

function Notes() {
	const {
		state: { userData, notes },
	} = useContextGetter();
	let match = useRouteMatch();

	return (
		<main className="mt-3">
			<Header pageTitle={`View Notes`}/>
			<Switch>
				<Route path={`${match.path}/:noteId`}>
					<Note />
				</Route>
				<Route path={match.path}>
					<div className="my-2"></div>
					<ViewNote notes={notes} url={match.url} loggedUser={userData}/>
				</Route>
			</Switch>
		</main>
	);
}

export default Notes;
