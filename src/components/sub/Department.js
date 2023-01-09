import Layout from '../common/Layout';
import axios from 'axios';
import { useEffect, useState, useRef } from 'react';
import Anime from '../../asset/anime';

function Department() {
	const path = process.env.PUBLIC_URL;
	const [Member, setMember] = useState([]);
	const slide = useRef(null);

	const init = () => {
		const panel = slide.current.children[0];
		const lis = panel.querySelectorAll('li');
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
		axios.get(`${path}/DB/members.json`).then((json) => {
			setMember(json.data.members);
		});
	}, [path]);

	useEffect(() => {}, [Member]);

	return (
		<Layout name={'Department'}>
			<div id='slider' ref={slide}>
				<ul className='panel'>
					<li className='s1'>1</li>
					<li className='s2'>2</li>
					<li className='s3'>3</li>
				</ul>

				<button className='prev' onClick={prevSlide}>
					prev
				</button>
				<button className='next' onClick={nextSlide}>
					next
				</button>
			</div>
			{Member.map((data, idx) => {
				return (
					<article key={idx}>
						<div className='inner'>
							<div className='pic'>
								<img src={`${path}/img/${data.pic}`} alt={data.name} />
							</div>
							<h3>{data.name}</h3>
							<p>{data.position}</p>
						</div>
					</article>
				);
			})}
		</Layout>
	);
}

export default Department;
