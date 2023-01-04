import Header from '../common/Header';
import News from './News';
import Pics from './Pics';
import Vids from './Vids';
import Visual from './Visual';
import { useRef, useEffect } from 'react';

function Main() {
	const main = useRef(null);
	const pos = useRef([]);

	const getPos = () => {
		pos.current = [];
		const secs = main.current.querySelectorAll('.myScroll');
		for (const sec of secs) pos.current.push(sec.offsetTop);
		console.log(pos.current);
	};

	useEffect(() => {
		getPos();
		window.addEventListener('resize', getPos);
	}, []);

	return (
		<main ref={main}>
			<Header type={'main'} />
			<Visual />
			<News />
			<Pics />
			<Vids />
		</main>
	);
}

export default Main;
