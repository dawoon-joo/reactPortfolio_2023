function News({ Scrolled, currentPos }) {
	const base = -window.innerHeight / 3;
	let scroll = Scrolled - base - currentPos || 0;
	scroll < 0 && (scroll = 0);
	return (
		<section id='news' className='myScroll'>
			<h1>news</h1>
		</section>
	);
}

export default News;
