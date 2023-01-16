import { NavLink } from 'react-router-dom';
import { useEffect, useRef } from 'react';
function Visual() {
	const main = useRef(null);
	const motion = () => {
		const boxs = main.current.querySelectorAll('article');
		boxs.forEach((box, idx) => {
			const h1 = box.querySelector('h1');
			const txt = h1.innerText;
			let tags = '';

			for (const el of txt) tags += `<span>${el}</span>`;
			h1.innerHTML = tags;

			const span = h1.querySelectorAll('span');
			span.forEach((el, idx) => {
				el.style.transitionDelay = 0.1 * idx + 's';
			});
		});
	};
	const btnMotion = () => {
		const btns = main.current.querySelectorAll('ul li');
		const boxs = main.current.querySelectorAll('article');
		btns.forEach((btn, idx) => {
			btn.addEventListener('click', (e) => {
				e.preventDefault();

				main.current.className = `bg${idx + 1} upper`;

				for (const el of btns) el.classList.remove('on');
				btns[idx].classList.add('on');

				for (const el of boxs) el.classList.remove('on');
				boxs[idx].classList.add('on');
			});
		});
	};
	useEffect(() => {
		motion();
		btnMotion();
	}, []);
	return (
		<figure id='visual'>
			<div className='inner'>
				<main className='bg1' ref={main}>
					<ul>
						<li className='on'>
							<NavLink to='/'>DESIGNER</NavLink>
						</li>
						<li>
							<NavLink to='/'>DEVELOPER</NavLink>
						</li>
					</ul>

					<article className='on'>
						<h1>DESIGNER</h1>
						<p>
							<span>We work with the best talent across the globe.</span>
						</p>
						<br />
						<p>
							<span>source for childrens music</span>
						</p>
					</article>
					<article>
						<h1>DEVELOPER</h1>
						<p>
							<span>Our music is already playing practically everywhere.</span>
						</p>
						<br />
						<p>
							<span>Driven by the desire to enable better music for children.</span>
						</p>
					</article>
				</main>
			</div>
		</figure>
	);
}

export default Visual;
