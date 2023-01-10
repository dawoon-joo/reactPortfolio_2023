import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
function Pics({ Scrolled, currentPos }) {
	const Pics = useSelector((store) => store.flickr.data);

	const base = -window.innerHeight / 3;
	let scroll = Scrolled - base - currentPos || 0;
	scroll < 0 && (scroll = 0);
	return (
		<section id='pics' className='myScroll'>
			<div className='inner'>
				<h1>
					OUR LEADERSHIP AND
					<br />
					PEOPLE WHO CARE ABOUT
					<br />
					YOU AND YOUR SUCCESS
				</h1>
				<div className='txtBox'>
					<p>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi, omnis explicabo. Numquam quo rerum vel impedit est vero eos incidunt
						possimus, sit recusandae id quos dignissimos nemo, optio voluptatum? Porro modi odio qui voluptatibus rem repellat, voluptate quis! Error,
						impedit.
					</p>
					<NavLink to='/'>Portfolio</NavLink>
				</div>
				<div className='flickrWrap'>
					{Pics.map((item, idx) => {
						if (idx > 4) return null;
						return (
							<article key={idx}>
								<div className='pic'>
									<img src={`https://live.staticflickr.com/${item.server}/${item.id}_${item.secret}_m.jpg`} alt={item.title} />
								</div>
							</article>
						);
					})}
				</div>
			</div>
		</section>
	);
}

export default Pics;
