import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import StateProvider from './components/StateProvider';
import ScrollToTop from './components/ScrollToTop';

// Style import
import './css/App.css';

import Notes from './pages/Notes/Notes';
import UserNote from './pages/Notes/UserNote';
import ContactUs from './pages/Contact/Contact';
import About from './pages/About/About';

// import LoginRegister from './pages/login/App';
import Login from '../src/pages/login/login';
import Register from '../src/pages/login/register';

import Layout from './layouts/layout';
import Landing from './pages/landing/Landing';

// Font awesome import
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
library.add(fas);

function App() {
	return (
		<StateProvider>
			<Router>
				<ScrollToTop />
				<Switch>
						<Route path="/login">
							<Login />
						</Route>
						<Route exact path="/register">
							<Register />
						</Route>
						<Layout>
						<Route exact path="/">
							<Landing />
						</Route>
						<Route exact path="/user/notes">
							<UserNote />
						</Route>
						<Route path="/notes">
							<Notes />
						</Route>
						<Route exact path="/contact">
							<ContactUs />
						</Route>
						<Route exact path="/about">
							<About />
						</Route>
					</Layout>
				</Switch>
			</Router>
		</StateProvider>
	);
}

export default App;
