function News({ Scrolled, currentPos }) {
	const scroll = Scrolled - currentPos;
	return (
		<section id='news' className='myScroll'>
			<h1>news</h1>
		</section>
	);
}

export default News;
