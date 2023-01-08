import Layout from '../common/Layout';
import { useRef, useState, useEffect } from 'react';
import axios from 'axios';

function Community() {
	const input = useRef(null);
	const textarea = useRef(null);
	const [Posts, setPosts] = useState([]);
	const [Allowed, setAllowed] = useState(true);
	const inputEdit = useRef(null);
	const textareaEdit = useRef(null);

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

	const updatePost = (index) => {
		if (!inputEdit.current.value.trim() || !textareaEdit.current.value.trim()) {
			return alert('수정할 제목과 본문을 모두 입력하세요.');
		}

		setPosts(
			Posts.map((post, idx) => {
				if (idx === index) {
					post.title = inputEdit.current.value;
					post.content = textareaEdit.current.value;
					post.enableUpdate = false;
				}
				return post;
			})
		);

		setAllowed(true);
	};

	const enableUpdate = (index) => {
		if (!Allowed) return;
		setAllowed(false);
		setPosts(
			Posts.map((post, idx) => {
				if (idx === index) post.enableUpdate = true;
				return post;
			})
		);
	};

	const disableUpdate = (index) => {
		setAllowed(true);
		setPosts(
			Posts.map((post, idx) => {
				if (idx === index) post.enableUpdate = false;
				return post;
			})
		);
	};

	useEffect(() => {
		axios.get(`${process.env.PUBLIC_URL}/DB/dummyPosts.json`).then((json) => {
			setPosts(json.data.posts);
		});
	}, []);
	return (
		<Layout name={'Community'}>
			<div className='inputBox'>
				<input type='text' placeholder='제목을 입력하세요' ref={input} />
				<br />
				<textarea cols='30' rows='4' placeholder='본문을 입력하세요' ref={textarea}></textarea>
				<br />
				<div className='btnSet'>
					<button onClick={resetForm}>CANCEL</button>
					<button onClick={createPost}>WRITE</button>
				</div>
			</div>

			<div className='showBox'>
				{Posts.map((post, idx) => {
					return (
						<article key={idx}>
							{post.enableUpdate ? (
								//수정 모드
								<>
									<div className='txt'>
										<h2>
											<input type='text' defaultValue={post.title} ref={inputEdit} />
											<br />
											<textarea cols='30' rows='4' defaultValue={post.content} ref={textareaEdit}></textarea>
											<br />
										</h2>
									</div>

									<div className='btnSet'>
										<button onClick={() => disableUpdate(idx)}>CANCEL</button>
										<button onClick={() => updatePost(idx)}>UPDATED</button>
									</div>
								</>
							) : (
								//출력 모드
								<>
									<div className='txt'>
										<h2>{post.title}</h2>
										<p>{post.content}</p>
									</div>

									<div className='btnSet'>
										<button onClick={() => enableUpdate(idx)}>EDIT</button>
										<button onClick={() => deletePost(idx)}>DELETE</button>
									</div>
								</>
							)}
						</article>
					);
				})}
			</div>
		</Layout>
	);
}

export default Community;
