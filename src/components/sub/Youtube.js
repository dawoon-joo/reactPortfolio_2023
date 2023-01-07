import Layout from '../common/Layout';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Modal from '../common/Modal';

function Youtube() {
	const [Vids, setVids] = useState([]);
	useEffect(() => {
		const key = 'AIzaSyAkj4gHYVRHLVLiPqRy3wSveyrq6ff1SeU';
		const playlist = 'PLWKqsm200CTkG61cNeBTKl0Yc9ifFJYyc';
		const num = 7;
		const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&key=${key}&playlistId=${playlist}&maxResults=${num}`;

		axios.get(url).then((json) => {
			setVids(json.data.items);
		});
	}, []);
	return (
		<>
			<Layout name={'Youtube'}>
				{Vids.map((data) => {
					const tit = data.snippet.title;
					const desc = data.snippet.description;
					const date = data.snippet.publishedAt;
					return (
						<article key={data.id}>
							<h3>{tit.length > 30 ? tit.substr(0, 30) + '...' : tit}</h3>

							<div className='txt'>
								<p>{desc.length > 100 ? desc.substr(0, 100) + '...' : desc}</p>
								<span>{date.split('T')[0]}</span>
							</div>

							<div className='pic'>
								<img src={data.snippet.thumbnails.high.url} alt={data.snippet.title} />
							</div>
						</article>
					);
				})}
			</Layout>
			<Modal></Modal>
		</>
	);
}

export default Youtube;
