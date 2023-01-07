function Modal(props) {
	return (
		<aside className='modal'>
			<div className='con'>{props.children}</div>
			<span
				className='close'
				onClick={() => {
					props.setOpen(false);
				}}
			>
				close
			</span>
		</aside>
	);
}

export default Modal;
