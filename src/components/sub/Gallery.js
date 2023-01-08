import Layout from '../common/Layout';
import { useEffect, useState } from 'react';
import axios from 'axios';

function Gallery() {
	const baseURL = 'https://www.flickr.com/services/rest/?format=json&nojsoncallback=1';
	const key = 'ec83e1d0a8cc7a5614d5dcc5a56671ca';
	const method_interest = 'flickr.interestingness.getList';
	const num = 20;
	const url = `${baseURL}&method=${method_interest}&api_key=${key}&per_page=${num}`;

	const [Items, setItems] = useState([]);

	useEffect(() => {
		axios.get(url).then((json) => {
			console.log(json.data.photos.photo);
			setItems(json.data.photos.photo);
		});
	}, []);

	return (
		<Layout name={'Gallery'}>
			<p>Gallery</p>
		</Layout>
	);
}

export default Gallery;
