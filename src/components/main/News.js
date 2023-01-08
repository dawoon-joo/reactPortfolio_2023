import { useRef } from 'react';

function News({ Scrolled, currentPos }) {
	const getLocalData = () => {
		const data = localStorage.getItem('post');
		return JSON.parse(data);
	};
	const data = useRef(getLocalData());
	const base = -window.innerHeight / 3;
	let scroll = Scrolled - base - currentPos || 0;
	scroll < 0 && (scroll = 0);
	return (
		<section id='news' className='myScroll'>
			<h1>news</h1>
			{data.current.map((data, idx) => {
				if (idx >= 3) return null;

				return (
					<article key={idx}>
						<h5>{data.title}</h5>
						<p>{data.content}</p>
					</article>
				);
			})}
		</section>
	);
}

export default News;
