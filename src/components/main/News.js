import { useRef, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightToBracket } from '@fortawesome/free-solid-svg-icons';

function News({ Scrolled, currentPos }) {
	const getLocalData = () => {
		const dummyPosts = [
			{
				title: 'The standard Lorem Ipsum passage.',
				content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
			},
			{
				title: '1914 translation by H. Rackham',
				content:
					'On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire',
			},
			{
				title: 'It is a long established fact.',
				content:
					"The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
			},
			{
				title: 'Contrary to popular belief.',
				content:
					'The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form',
			},
			{
				title: 'Lorem Ipsum is simply dummy text.',
				content:
					' It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages',
			},
			{
				title: 'The standard chunk of Lorem Ipsum used',
				content:
					'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour ',
			},
		];

		const data = localStorage.getItem('post');

		if (data) return JSON.parse(data);
		else return dummyPosts;
	};
	const data = useRef(getLocalData());
	const base = -window.innerHeight / 3;
	let scroll = Scrolled - base - currentPos || 0;
	scroll < 0 && (scroll = 0);

	useEffect(() => {
		localStorage.setItem('post', JSON.stringify(data.current));
	}, []);

	return (
		<section id='news' className='myScroll'>
			<div className='inner'>
				<h1>
					AWARDS AND <br /> RECOGNITION
				</h1>
				<div className='wrap'>
					{data.current.map((data, idx) => {
						if (idx >= 5) return null;

						return (
							<article key={idx}>
								<h5>{data.title}</h5>
								<p>{data.content}</p>
								<NavLink to='/community'>
									<FontAwesomeIcon icon={faRightToBracket} />
								</NavLink>
							</article>
						);
					})}
				</div>
			</div>
		</section>
	);
}

export default News;
