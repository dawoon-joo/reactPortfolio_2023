import Layout from '../common/Layout';
import { useEffect, useRef } from 'react';

function Location() {
	const container = useRef(null);
	const { kakao } = window;
	const options = {
		center: new kakao.maps.LatLng(33.450701, 126.570667),
		level: 3,
	};

	useEffect(() => {
		const map_instance = new kakao.maps.Map(container.current, options);
	}, []);
	return (
		<Layout name={'Location'}>
			<div id='map' ref={container}></div>
		</Layout>
	);
}

export default Location;
