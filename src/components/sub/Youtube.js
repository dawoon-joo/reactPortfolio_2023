import Layout from '../common/Layout';
import { useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import Modal from '../common/Modal';

function Youtube() {
	const modal = useRef(null);
	const play = useRef(null);
	const [Index, setIndex] = useState(0);

	const Vids = useSelector((store) => store.youtube.data);

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

							<div className='pic' ref={play}>
								<div className='boxs'>
									<img src={data.snippet.thumbnails.high.url} alt={data.snippet.title} />
									<button
										onClick={() => {
											setIndex(idx);
											modal.current.open();
										}}
									></button>
								</div>
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
