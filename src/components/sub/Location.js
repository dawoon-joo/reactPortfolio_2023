import Layout from '../common/Layout';
import { useEffect, useRef, useState, useMemo } from 'react';

function Location() {
	const { kakao } = window;
	const [Traffic, setTraffic] = useState(false);
	const [Index, setIndex] = useState(0);
	const mapInstance = useRef(null);
	const container = useRef(null);
	const options = useRef(null);
	const info = useRef(null);

	info.current = [
		{
			title: 'DIRECT CONTACT',
			subtitle: 'head shop',
			description:
				'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quos ipsam ab reiciendis maiores iure omnis autem sapiente numquam architecto tempore.',
			latlng: new kakao.maps.LatLng(37.40211707077346, 127.10344953763003),
			imgUrl: `${process.env.PUBLIC_URL}/img/marker.png`,
			imgSize: new kakao.maps.Size(80, 80),
			imgPos: { offset: new kakao.maps.Point(40, 80) },
		},
		{
			title: 'MEDIA CONTACT',
			subtitle: 'branch',
			description:
				'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quos ipsam ab reiciendis maiores iure omnis autem sapiente numquam architecto tempore.',
			latlng: new kakao.maps.LatLng(37.5206868, 127.1214941),
			imgUrl: `${process.env.PUBLIC_URL}/img/marker.png`,
			imgSize: new kakao.maps.Size(80, 80),
			imgPos: { offset: new kakao.maps.Point(40, 80) },
		},
		{
			title: 'BETTER TOCENTHER',
			subtitle: 'branch',
			description:
				'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quos ipsam ab reiciendis maiores iure omnis autem sapiente numquam architecto tempore.',
			latlng: new kakao.maps.LatLng(37.5662952, 126.9779451),
			imgUrl: `${process.env.PUBLIC_URL}/img/marker.png`,
			imgSize: new kakao.maps.Size(80, 80),
			imgPos: { offset: new kakao.maps.Point(40, 80) },
		},
	];

	options.current = {
		center: info.current[Index].latlng,
		level: 3,
	};

	//marker
	const imageSrc = info.current[Index].imgUrl;
	const imageSize = info.current[Index].imgSize;
	const imageOption = info.current[Index].imgPos;

	const markerImage = useMemo(() => new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption), [imageSrc, imageOption, imageSize, kakao]);

	const marker = useMemo(() => {
		return new kakao.maps.Marker({
			position: info.current[Index].latlng,
			image: markerImage,
		});
	}, [kakao, info, Index, markerImage]);

	//type,zoomControl
	const mapTypeControl = useMemo(() => new kakao.maps.MapTypeControl(), [kakao]);
	const zoomControl = useMemo(() => new kakao.maps.ZoomControl(), [kakao]);

	useEffect(() => {
		container.current.innerHTML = '';
		mapInstance.current = new kakao.maps.Map(container.current, options.current);
		marker.setMap(mapInstance.current);
		mapInstance.current.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);
		mapInstance.current.addControl(zoomControl, kakao.maps.ControlPosition.LEFT);

		//zoom : true, false
		mapInstance.current.setZoomable(true);

		//resize center
		const setCenter = () => {
			mapInstance.current.setCenter(info.current[Index].latlng);
		};
		window.addEventListener('resize', setCenter);
		return () => {
			window.removeEventListener('resize', setCenter);
		};
	}, [Index, kakao, options, info, marker, mapTypeControl, zoomControl]);

	useEffect(() => {
		Traffic
			? mapInstance.current?.addOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC)
			: mapInstance.current?.removeOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);
	}, [Traffic, kakao]);

	return (
		<Layout name={'Location'}>
			<div className='inner'>
				<div className='mapBoxs'>
					<div className='txtBoxs'>
						<h3>CONTACT</h3>
						<h2>GET IN TOUCH</h2>
						<span>Lorem ipsum dolor sit amet.</span>
						<p>
							Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quos ipsam ab reiciendis maiores iure omnis autem sapiente numquam architecto
							tempore.
						</p>
					</div>
					<div id='map' ref={container}></div>
				</div>
				<nav>
					{/* <button onClick={() => setTraffic(!Traffic)}>{Traffic ? 'Traffic ON' : 'Traffic OFF'}</button> */}
					<ul className='branch'>
						{info.current.map((el, idx) => {
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
									<h2>{el.title}</h2>
									<h3>{el.subtitle}</h3>
									<p>{el.description}</p>
								</li>
							);
						})}
					</ul>
				</nav>
			</div>
		</Layout>
	);
}

export default Location;
