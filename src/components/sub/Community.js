import Layout from '../common/Layout';
import { useRef, useState, useEffect } from 'react';

function Community() {
	const getLocalData = () => {
		const dummyPosts = [
			{
				title: 'The standard Lorem Ipsum passage.',
				content:
					'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
			},
			{
				title: '1914 translation by H. Rackham',
				content:
					'On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain.',
			},
			{
				title: 'It is a long established fact.',
				content:
					"The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy.",
			},
			{
				title: 'Contrary to popular belief.',
				content:
					'The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form',
			},
			{
				title: 'Lorem Ipsum is simply dummy text.',
				content:
					' It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
			},
			{
				title: 'The standard chunk of Lorem Ipsum used',
				content:
					"There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. ",
			},
		];
		//처음 컴포넌트 함수가 실행되자마자 로컬스토리지로부터 post키값으로 데이터를 가지고옴
		const data = localStorage.getItem('post');

		if (data) {
			//데이터가 있으면 해당 데이터를 객체형식으로 parsing해서 리턴
			return JSON.parse(data);
		} else {
			return dummyPosts;
		}
	};

	const input = useRef(null);
	const textarea = useRef(null);
	const inputEdit = useRef(null);
	const textareaEdit = useRef(null);
	const [Posts, setPosts] = useState(getLocalData());
	const [Allowed, setAllowed] = useState(true);

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
		console.log('update');
		localStorage.setItem('post', JSON.stringify(Posts));
	}, [Posts]);
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
