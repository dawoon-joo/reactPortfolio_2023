import { useEffect, useRef } from 'react';
function Layout(props) {
	const frame = useRef('null');

	useEffect(() => {
		frame.current.classList.add('on');
		window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
	}, []);

	return (
		<section className={`content ${props.name}`} ref={frame}>
			<figure>
				<div className='inner'>
					<p>
						PRESENTAION
						<br />
						TITLE
						<span>YOUR NAME</span>
					</p>
				</div>
			</figure>
			<div className='inner'>
				<h1>{props.name}</h1>
				{props.children}
			</div>
		</section>
	);
}

export default Layout;
