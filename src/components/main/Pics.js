function Pics({ Scrolled, currentPos }) {
	const base = -window.innerHeight / 3;
	let scroll = Scrolled - base - currentPos || 0;
	scroll < 0 && (scroll = 0);
	return (
		<section id='pics' className='myScroll'>
			<h1>pics</h1>
		</section>
	);
}

export default Pics;
