import Layout from '../common/Layout';
import { useRef, useState, useEffect } from 'react';

function Community() {
	const input = useRef(null);
	const textarea = useRef(null);
	const [Posts, setPosts] = useState([]);

	const resetForm = () => {
		input.current.value = '';
		textarea.current.value = '';
	};

	const createPost = () => {
		if (!input.current.value.trim() || !textarea.current.value.trim()) {
			resetForm();
			return alert('제목과 본문을 모두 입력하세요');
		}
		setPosts([...Posts, { title: input.current.value, content: textarea.current.value }]);
		resetForm();
	};

	const deletePost = (index) => {
		setPosts(Posts.filter((_, idx) => idx !== index));
	};

	useEffect(() => {
		console.log(Posts);
	}, [Posts]);
	return (
		<Layout name={'Community'}>
			<div className='inputBox'>
				<input type='text' placeholder='제목을 입력하세요' ref={input} />
				<br />
				<textarea cols='30' rows='4' placeholder='본문을 입력하세요' ref={textarea}></textarea>
				<br />
				<button onClick={resetForm}>CANCEL</button>
				<button onClick={createPost}>WRITE</button>
			</div>

			<div className='showBox'>
				{Posts.map((post, idx) => {
					return (
						<article key={idx}>
							<h2>{post.title}</h2>
							<p>{post.content}</p>

							<div className='btnSet'>
								<button>EDIT</button>
								<button onClick={() => deletePost(idx)}>DELETE</button>
							</div>
						</article>
					);
				})}
			</div>
		</Layout>
	);
}

export default Community;
