import { useSelector } from 'react-redux';

function Pics({ Scrolled, currentPos }) {
	const Pics = useSelector((store) => store.flickr.data);

	const base = -window.innerHeight / 3;
	let scroll = Scrolled - base - currentPos || 0;
	scroll < 0 && (scroll = 0);
	return (
		<section id='pics' className='myScroll'>
			<h1>pics</h1>
			<div className='flickrWrap'>
				{Pics.map((item, idx) => {
					return (
						<article key={idx}>
							<div className='pic'>
								<img src={`https://live.staticflickr.com/${item.server}/${item.id}_${item.secret}_m.jpg`} alt={item.title} />
							</div>
						</article>
					);
				})}
			</div>
		</section>
	);
}

export default Pics;
