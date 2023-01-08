import Layout from '../common/Layout';
import { useEffect, useState } from 'react';
import axios from 'axios';

function Gallery() {
	const [Items, setItems] = useState([]);

	const getFlickr = async (opt) => {
		const baseURL = 'https://www.flickr.com/services/rest/?format=json&nojsoncallback=1';
		const key = 'ae5dbef0587895ed38171fcda4afb648';
		const method_interest = 'flickr.interestingness.getList';
		const method_search = 'flickr.photos.search';
		const num = 20;
		let url = '';

		if (opt.type === 'interest') url = `${baseURL}&method=${method_interest}&api_key=${key}&per_page=${num}`;
		if (opt.type === 'search') url = `${baseURL}&method=${method_search}&api_key=${key}&per_page=${num}&tags=${opt.tags}`;

		const result = await axios.get(url);
		setItems(result.data.photos.photo);
	};

	useEffect(() => {
		getFlickr({ type: 'interest' });
		//getFlickr({type: 'search', tags: '하늘'})
	}, []);

	return (
		<Layout name={'Gallery'}>
			<div className='frame'>
				{Items.map((item, idx) => {
					return (
						<article key={idx}>
							<div className='inner'>
								<div className='pic'>
									<img src={`https://live.staticflickr.com/${item.server}/${item.id}_${item.secret}_m.jpg`} alt={item.title} />
								</div>
								<h2>{item.title}</h2>
							</div>
						</article>
					);
				})}
			</div>
		</Layout>
	);
}

export default Gallery;
