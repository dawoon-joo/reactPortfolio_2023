import Layout from '../common/Layout';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';

function Members() {
	const history = useHistory();
	const initVal = {
		userid: '',
		email: '',
		pwd1: '',
		pwd2: '',
		comments: '',
	};
	const [Val, setVal] = useState(initVal);
	const [Err, setErr] = useState({});
	const [Submit, setSubmit] = useState(false);

	const check = (value) => {
		const errs = {};
		const eng = /[a-zA-Z]/;
		const num = /[0-9]/;
		const spc = /[~!@#$%^&*()_+]/;
		if (value.userid.length < 5) {
			errs.userid = '아이디를 5글자 이상 입력하세요';
		}
		if (value.pwd1.length < 5 || !eng.test(value.pwd1) || !num.test(value.pwd1) || !spc.test(value.pwd1)) {
			errs.pwd1 = '비밀번호는 다섯글자 이상, 영문, 숫자, 특수문자를 모두 포함하세요';
		}
		if (!value.pwd2 || value.pwd1 !== value.pwd2) {
			errs.pwd2 = '두개의 비밀번호를 동일하게 입력하세요';
		}
		if (value.email.length < 8 || !/@/.test(value.email)) {
			errs.email = '이메일은 8글자 이상입력, @를 포함하세요.';
		}
		if (Val.comments.length < 20) {
			errs.comments = '남기는 말은 20글자 이상 입력하세요';
		}
		return errs;
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setVal({ ...Val, [name]: value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setErr(check(Val));
		setSubmit(true);
	};

	const handleReset = () => {
		setSubmit(false);
		setErr({});
		setVal(initVal);
	};

	useEffect(() => {
		const len = Object.keys(Err).length;
		if (len === 0 && Submit) {
			alert('회원가입이 완료되었습니다.');
			history.push('/');
		}
	}, [Err, Submit, history]);

	return (
		<Layout name={'Members'}>
			<div className='boxWrap'>
				<form action='' onSubmit={handleSubmit}>
					<fieldset>
						<legend className='h'>회원가입 폼 양식</legend>
						<table border='1'>
							<tbody>
								{/* user id */}
								<tr>
									<th scope='row'>
										<label htmlFor='userid'>USER ID</label>
									</th>
									<td>
										<input type='text' name='userid' id='userid' placeholder='아이디를 입력하세요' value={Val.userid} onChange={handleChange} />
										<span className='err'>{Err.userid}</span>
									</td>
								</tr>

								{/* password */}
								<tr>
									<th scope='row'>
										<label htmlFor='pwd1'>PASSWORD</label>
									</th>
									<td>
										<input type='password' name='pwd1' id='pwd1' placeholder='비밀번호를 입력하세요' value={Val.pwd1} onChange={handleChange} />
										<span className='err'>{Err.pwd1}</span>
									</td>
								</tr>

								{/* re password */}
								<tr>
									<th scrope='row'>
										<label htmlFor='pwd2'>RE PASSWORD</label>
									</th>
									<td>
										<input type='password' name='pwd2' id='pwd2' placeholder='비밀번호를 재입력하세요' value={Val.pwd2} onChange={handleChange} />
										<span className='err'>{Err.pwd2}</span>
									</td>
								</tr>

								{/* email */}
								<tr>
									<th scope='row'>
										<label htmlFor='email'>E-MAIL</label>
									</th>
									<td>
										<input type='text' name='email' id='email' placeholder='이메일 주소를 입력하세요' value={Val.email} onChange={handleChange} />
										<span className='err'>{Err.email}</span>
									</td>
								</tr>

								{/* comments */}
								<tr>
									<th scope='row'>
										<label htmlFor='comments'>COMMENTS</label>
									</th>
									<td>
										<textarea
											name='comments'
											id='comments'
											cols='30'
											rows='5'
											value={Val.comments}
											onChange={handleChange}
											placeholder='남기는 말을 입력하세요.'
										></textarea>
										<span className='err'>{Err.comments}</span>
									</td>
								</tr>

								<tr>
									<th colSpan='2'>
										<input type='reset' defaultValue='Cancel' onClick={handleReset} />
										<input type='submit' defaultValue='Send' />
									</th>
								</tr>
							</tbody>
						</table>
					</fieldset>
				</form>
				<div className='txtBox'>
					<h2>Lorem, ipsum dolor.</h2>
					<p>
						Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laborum, libero sapiente earum inventore nam quia praesentium doloribus nemo
						aspernatur quibusdam suscipit quidem. Facilis quia consequuntur reiciendis veniam recusandae modi cum.
					</p>
					<span>Lorem, ipsum dolor.</span>
					<span>Lorem, ipsum dolor.</span>
					<span>Lorem, ipsum dolor.</span>
				</div>
			</div>
			<div className='txtWrap'>
				<article>
					<h2>Lorem, ipsum dolor.</h2>
					<p>E: wnekdns5015@gmail.com</p>
					<p>P: 010-2638-3054</p>
					<FontAwesomeIcon icon={faTwitter} />
					<FontAwesomeIcon icon={faFacebook} />
					<FontAwesomeIcon icon={faInstagram} />
				</article>
				<article>
					<h2>Lorem, ipsum dolor.</h2>
					<p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Unde, enim!</p>
				</article>
				<article>
					<h2>Lorem, ipsum dolor.</h2>
					<h3>Lorem ipsum dolor sit amet.</h3>
					<p>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur tempore sit ea expedita iste maxime minima! Eaque reiciendis quia quasi.
					</p>
				</article>
			</div>
		</Layout>
	);
}

export default Members;
