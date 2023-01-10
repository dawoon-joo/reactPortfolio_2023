import { useSelector } from 'react-redux';
import { useRef, useEffect } from 'react';
import Anime from '../../asset/anime';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleRight } from '@fortawesome/free-solid-svg-icons';
import { faCircleLeft } from '@fortawesome/free-solid-svg-icons';

function Vids({ Scrolled, currentPos }) {
	const Vids = useSelector((store) => store.youtube.data);
	const base = -window.innerHeight / 3;
	let scroll = Scrolled - base - currentPos || 0;
	scroll < 0 && (scroll = 0);

	//slide
	const slide = useRef(null);
	const init = () => {
		const panel = slide.current.children[0];
		const lis = panel.querySelectorAll('article');
		const len = lis.length;
		panel.style.width = 100 * len + '%';
		lis.forEach((el) => {
			el.style.width = 100 / len + '%';
		});
		panel.prepend(panel.lastElementChild);
	};
	const nextSlide = () => {
		const panel = slide.current.children[0];

		new Anime(panel, {
			prop: 'margin-left',
			value: '-200%',
			duration: 500,
			callback: () => {
				panel.append(panel.firstElementChild);
				panel.style.marginLeft = '-100%';
			},
		});
	};
	const prevSlide = () => {
		const panel = slide.current.children[0];

		new Anime(panel, {
			prop: 'margin-left',
			value: '0%',
			duration: 500,
			callback: () => {
				panel.prepend(panel.lastElementChild);
				panel.style.marginLeft = '-100%';
			},
		});
	};

	useEffect(() => {
		init();
	}, [Vids]);

	return (
		<section id='vids' className='myScroll'>
			<div className='inner'>
				<h1>
					THRIVE IN GREAT <br /> COMPANY.EXPLORE <br />
					CAREERS AT BAIN
				</h1>
				<NavLink className='circle' to='/youtube'>
					<div className='bg'>Youtube view more</div>
				</NavLink>
				<div className='youtubeWrap' ref={slide}>
					<div className='panel'>
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
					<div className='btnWrap'>
						<button className='prev' onClick={prevSlide}>
							<FontAwesomeIcon icon={faCircleLeft} />
						</button>
						<button className='next' onClick={nextSlide}>
							<FontAwesomeIcon icon={faCircleRight} />
						</button>
					</div>
				</div>
			</div>
		</section>
	);
}

export default Vids;
