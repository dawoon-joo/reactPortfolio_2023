import Header from '../common/Header';
import Btns from './Btns';
import News from './News';
import Pics from './Pics';
import Vids from './Vids';
import Visual from './Visual';

import { useState } from 'react';

function Main({ menuOpen }) {
	const [Scrolled, setScrolled] = useState(0);
	const [Pos, setPos] = useState([]);

	return (
		<main>
			<Header type={'main'} menuOpen={menuOpen} />
			<Visual />
			<Pics Scrolled={Scrolled} currentPos={Pos[1]} />
			<News Scrolled={Scrolled} currentPos={Pos[2]} />
			<Vids Scrolled={Scrolled} currentPos={Pos[3]} />
			<Btns setScrolled={setScrolled} setPos={setPos} />
		</main>
	);
}

export default Main;
