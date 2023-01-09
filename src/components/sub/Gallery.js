import Layout from '../common/Layout';
import { useEffect, useState, useRef } from 'react';
import Masonry from 'react-masonry-component';
import Modal from '../common/Modal';
import { fetchFlickr } from '../../redux/flickrSlice';
import { useSelector, useDispatch } from 'react-redux';

function Gallery() {
	const dispatch = useDispatch();
	const myId = '192929270@N04';
	const masonryOptions = { transitionDuration: '0.5s' };
	const frame = useRef(null);
	const input = useRef(null);
	const modal = useRef(null);

	const [Init, setInit] = useState(true);
	const [Loading, setLoading] = useState(true);
	const [Index, setIndex] = useState(0);
	const Items = useSelector((store) => store.flickr.data);

	const showInterest = () => {
		dispatch(fetchFlickr({ type: 'interest' }));
		frame.current.classList.remove('on');
		setLoading(true);
	};

	const showSearch = () => {
		const result = input.current.value.trim();
		if (!result) return alert('검색어를 입력하세요');
		input.current.value = '';
		dispatch(fetchFlickr({ type: 'search', tags: result }));
		frame.current.classList.remove('on');
		setLoading(true);
	};

	const showUser = (e) => {
		dispatch(fetchFlickr({ type: 'user', user: e.target.innerText }));
		frame.current.classList.remove('on');
		setLoading(true);
	};

	const showMine = () => {
		dispatch(fetchFlickr({ type: 'user', user: myId }));
		frame.current.classList.remove('on');
		setLoading(true);
	};

	useEffect(() => {
		setInit(false);
	}, []);

	useEffect(() => {
		if (!Init && Items.length === 0) {
			alert('검색한 해당 이미지가 없습니다.');
			// dispatch(fetchFlickr({ type: 'user', user: myId }));
		}
		setTimeout(() => {
			frame.current.classList.add('on');
			setLoading(false);
		}, 500);
	}, [Items, dispatch]);

	return (
		<>
			<Layout name={'Gallery'}>
				<div className='controls'>
					<div className='searchBox'>
						<input type='text' ref={input} placeholder='검색어를 입력하세요' onKeyUp={(e) => e.key === 'Enter' && showSearch()} />
						<button onClick={showSearch}>Search</button>
					</div>

					<nav>
						<button onClick={showInterest}>Interest Gallery</button>
						<button onClick={showMine}>My Gallery</button>
					</nav>
				</div>
				{Loading && <img className='loading' src={`${process.env.PUBLIC_URL}/img/loading.gif`} alt='로딩이미지' />}
				<div className='frame' ref={frame}>
					<Masonry elementType='div' options={masonryOptions}>
						{Items.map((item, idx) => {
							return (
								<article key={idx}>
									<div className='inner'>
										<div
											className='pic'
											onClick={() => {
												setIndex(idx);
												modal.current.open();
											}}
										>
											<img src={`https://live.staticflickr.com/${item.server}/${item.id}_${item.secret}_m.jpg`} alt={item.title} />
										</div>
										<h2>{item.title}</h2>
										<div className='profile'>
											<img
												src={`http://farm${item.farm}.staticflickr.com/${item.server}/buddyicons/${item.owner}.jpg`}
												alt={item.owner}
												onError={(e) => e.target.setAttribute('src', 'https://www.flickr.com/images/buddyicon.gif')}
											/>
											<span onClick={showUser}>{item.owner}</span>
										</div>
									</div>
								</article>
							);
						})}
					</Masonry>
				</div>
			</Layout>

			<Modal ref={modal}>
				<img
					src={`https://live.staticflickr.com/${Items[Index]?.server}/${Items[Index]?.id}_${Items[Index]?.secret}_b.jpg`}
					alt={Items[Index]?.title}
				/>
			</Modal>
		</>
	);
}

export default Gallery;
