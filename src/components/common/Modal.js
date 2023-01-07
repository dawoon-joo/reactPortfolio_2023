function Modal(props) {
	return (
		<aside className='modal'>
			<div className='con'>{props.children}</div>
			<span className='close'>close</span>
		</aside>
	);
}

export default Modal;
