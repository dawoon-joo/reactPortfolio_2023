import { Route, Switch } from 'react-router-dom';
//common
import Header from './components/common/Header';
import Footer from './components/common/Footer';
//main
import Visual from './components/main/Visual';
import Content from './components/main/Content';
//sub
import Community from './components/sub/Community';
import Department from './components/sub/Department';
import Gallery from './components/sub/Gallery';
import Location from './components/sub/Location';
import Members from './components/sub/Members';
import Youtube from './components/sub/Youtube';

import './scss/style.scss';

function App() {
	return (
		<>
			{/* switch는 더 자세하게 작성된 내용을 먼저 적용한다 */}
			<Switch>
				<Route exact path='/'>
					{/* 메인에만 적용되는 header */}
					<Header type={'main'} />
					<Visual />
					<Content />
				</Route>

				<Route path='/'>
					<Header type={'sub'} />
				</Route>
			</Switch>

			<Route path='/department' component={Department} />

			<Route path='/youtube' component={Youtube} />

			<Route path='/gallery' component={Gallery} />

			<Route path='/community' component={Community} />

			<Route path='/location' component={Location} />

			<Route path='/members' component={Members} />

			<Footer />
		</>
	);
}

export default App;
