import { useSelector } from 'react-redux';

function Vids({ Scrolled, currentPos }) {
	const Vids = useSelector((store) => store.youtube.data);

	const base = -window.innerHeight / 3;
	let scroll = Scrolled - base - currentPos || 0;
	scroll < 0 && (scroll = 0);

	return (
		<section id='vids' className='myScroll'>
			<h1>youtube</h1>
			<div className='youtubeWrap'>
				{Vids.map((data, idx) => {
					return (
						<article key={idx}>
							<div className='pic'>
								<img src={data.snippet.thumbnails.high.url} alt={data.snippet.title} />
							</div>
						</article>
					);
				})}
			</div>
		</section>
	);
}

export default Vids;
