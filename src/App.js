import { Route, Switch } from 'react-router-dom';
import { useRef } from 'react';
//common
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import Menu from './components/common/Menu';

//main
import Main from './components/main/Main';

//sub
import Community from './components/sub/Community';
import Department from './components/sub/Department';
import Gallery from './components/sub/Gallery';
import Location from './components/sub/Location';
import Members from './components/sub/Members';
import Youtube from './components/sub/Youtube';

import './scss/style.scss';

import { fetchYoutube } from './redux/youtubeSlice';
import { fetchFlickr } from './redux/flickrSlice';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

function App() {
	const dispatch = useDispatch();
	const menuOpen = useRef(null);

	useEffect(() => {
		dispatch(fetchYoutube());
		dispatch(fetchFlickr({ type: 'user', user: '192929270@N04' }));
	}, [dispatch]);
	return (
		<>
			<Switch>
				<Route exact path='/' render={() => <Main menuOpen={menuOpen} />} />
				<Route path='/' render={() => <Header type={'sub'} menuOpen={menuOpen} />} />
			</Switch>

			<Route path='/department' component={Department} />
			<Route path='/youtube' component={Youtube} />
			<Route path='/gallery' component={Gallery} />
			<Route path='/community' component={Community} />
			<Route path='/location' component={Location} />
			<Route path='/members' component={Members} />
			<Footer />
			<Menu ref={menuOpen} />
		</>
	);
}

export default App;
