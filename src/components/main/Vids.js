function Vids({ Scrolled, currentPos }) {
	const base = -window.innerHeight / 3;
	let scroll = Scrolled - base - currentPos || 0;
	scroll < 0 && (scroll = 0);
	return (
		<section id='vids' className='myScroll'>
			<h1>vids</h1>
		</section>
	);
}

export default Vids;
