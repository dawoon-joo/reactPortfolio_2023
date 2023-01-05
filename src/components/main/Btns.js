import { useEffect, useRef } from 'react';
import Anime from '../../asset/anime';

function Btns() {
	const pos = useRef([]);
	const num = useRef(4);
	const btnRef = useRef(null);
	const speed = useRef(500);

	const getPos = () => {
		pos.current = [];
		const secs = btnRef.current.parentElement.querySelectorAll('.myScroll');
		for (const sec of secs) pos.current.push(sec.offsetTop);
		console.log(pos.current);
	};

	//버튼, 박스 활성화 함수
	const activation = () => {
		const btns = btnRef.current.children;
		const secs = btnRef.current.parentElement.querySelectorAll('.myScroll');
		const scroll = window.scrollY;
		const base = -window.innerHeight / 3;

		pos.current.forEach((pos, idx) => {
			if (scroll >= pos + base) {
				for (const btn of btns) btn.classList.remove('on');
				for (const sec of secs) sec.classList.remove('on');
				btns[idx].classList.add('on');
				secs[idx].classList.add('on');
			}
		});
	};

	useEffect(() => {
		new Anime(window, {
			prop: 'scroll',
			value: pos.current[0],
			duration: 0,
		});
		getPos();
		window.addEventListener('resize', getPos);
		window.addEventListener('scroll', activation);

		return () => {
			window.removeEventListener('resize', getPos);
			window.removeEventListener('scroll', activation);
		};
	}, []);
	return (
		<ul className='scroll_navi' ref={btnRef}>
			{Array(num.current)
				.fill()
				.map((_, idx) => {
					// 현재 반복도는 순번이 0번째이면 해당 li에만 on클래스를 추가
					let isOn = '';
					idx === 0 && (isOn = 'on');
					return (
						<li
							key={idx}
							className={isOn}
							onClick={() => {
								new Anime(window, {
									prop: 'scroll',
									value: pos.current[idx],
									duration: speed.current,
								});
							}}
						></li>
					);
				})}
		</ul>
	);
}

export default Btns;
