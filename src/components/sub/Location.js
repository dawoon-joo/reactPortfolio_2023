import Layout from '../common/Layout';
import { useEffect, useRef, useState } from 'react';

function Location() {
	const { kakao } = window;
	const info = [
		{
			title: '넥슨 본사',
			latlng: new kakao.maps.LatLng(37.40211707077346, 127.10344953763003),
			imgUrl: `${process.env.PUBLIC_URL}/img/marker1.png`,
			imgSize: new kakao.maps.Size(232, 99),
			imgPos: { offset: new kakao.maps.Point(116, 99) },
		},
		{
			title: '올림픽 공원',
			latlng: new kakao.maps.LatLng(37.5206868, 127.1214941),
			imgUrl: `${process.env.PUBLIC_URL}/img/marker2.png`,
			imgSize: new kakao.maps.Size(232, 99),
			imgPos: { offset: new kakao.maps.Point(116, 99) },
		},
		{
			title: '서울 시청',
			latlng: new kakao.maps.LatLng(37.5662952, 126.9779451),
			imgUrl: `${process.env.PUBLIC_URL}/img/marker3.png`,
			imgSize: new kakao.maps.Size(232, 99),
			imgPos: { offset: new kakao.maps.Point(116, 99) },
		},
	];
	const [Traffic, setTraffic] = useState(false);
	const [Index, setIndex] = useState(0);
	const mapInstance = useRef(null);
	const container = useRef(null);
	const options = {
		center: info[Index].latlng,
		level: 3,
	};

	//marker
	const imageSrc = info[Index].imgUrl;
	const imageSize = info[Index].imgSize;
	const imageOption = info[Index].imgPos;

	const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);

	const marker = new kakao.maps.Marker({
		position: info[Index].latlng,
		image: markerImage,
	});

	//type,zoomControl
	const mapTypeControl = new kakao.maps.MapTypeControl();
	const zoomControl = new kakao.maps.ZoomControl();

	useEffect(() => {
		mapInstance.current = new kakao.maps.Map(container.current, options);
		marker.setMap(mapInstance.current);
		mapInstance.current.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);
		mapInstance.current.addControl(zoomControl, kakao.maps.ControlPosition.LEFT);

		//resize center
		const setCenter = () => {
			mapInstance.current.setCenter(info[Index].latlng);
		};
		window.addEventListener('resize', setCenter);
		return () => {
			window.removeEventListener('resize', setCenter);
		};
	}, [Index]);

	useEffect(() => {
		Traffic
			? mapInstance.current?.addOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC)
			: mapInstance.current?.removeOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);
	}, [Traffic]);

	return (
		<Layout name={'Location'}>
			<div id='map' ref={container}></div>
			<nav>
				<button onClick={() => setTraffic(!Traffic)}>{Traffic ? 'Traffic ON' : 'Traffic OFF'}</button>
				<ul className='branch'>
					{info.map((el, idx) => {
						let isOn = '';
						Index === idx && (isOn = 'on');
						return (
							<li
								key={idx}
								className={isOn}
								onClick={() => {
									//각 버튼 클릭시 클릭한 순번으로 Index state변경
									setIndex(idx);
									setTraffic(false);
								}}
							>
								{el.title}
							</li>
						);
					})}
				</ul>
			</nav>
		</Layout>
	);
}

export default Location;
