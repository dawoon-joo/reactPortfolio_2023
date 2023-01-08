import Layout from '../common/Layout';
import axios from 'axios';
import { useEffect, useState, useRef } from 'react';
import Modal from '../common/Modal';

function Youtube() {
	const modal = useRef(null);
	const [Vids, setVids] = useState([]);
	const [Index, setIndex] = useState(0);
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
				{Vids.map((data, idx) => {
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

							<div
								className='pic'
								onClick={() => {
									setIndex(idx);
									modal.current.open();
								}}
							>
								<img src={data.snippet.thumbnails.high.url} alt={data.snippet.title} />
							</div>
						</article>
					);
				})}
			</Layout>
			<Modal ref={modal}>
				<iframe title={Vids[0]?.id} src={`https://www.youtube.com/embed/${Vids[Index]?.snippet.resourceId.videoId}`}></iframe>
			</Modal>
		</>
	);
}

export default Youtube;
