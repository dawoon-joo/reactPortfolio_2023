import Layout from '../common/Layout';
import axios from 'axios';
import { useEffect, useState } from 'react';

function Department() {
	const path = process.env.PUBLIC_URL;
	const [Member, setMember] = useState([]);

	useEffect(() => {
		axios.get(`${path}/DB/members.json`).then((json) => {
			setMember(json.data.members);
		});
	}, []);

	useEffect(() => {}, [Member]);

	return (
		<Layout name={'Department'}>
			{Member.map((data, idx) => {
				return (
					<article key={idx}>
						<div className='inner'>
							<div className='pic'>
								<img src={`${path}/img/${data.pic}`} alt={data.name} />
							</div>
							<h3>{data.name}</h3>
							<p>{data.position}</p>
						</div>
					</article>
				);
			})}
		</Layout>
	);
}

export default Department;
