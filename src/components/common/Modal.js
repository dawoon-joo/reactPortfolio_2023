import { useEffect, forwardRef, useState, useImperativeHandle } from 'react';

const Modal = forwardRef((props, ref) => {
	const [Open, setOpen] = useState(false);

	useImperativeHandle(ref, () => {
		return {
			open: () => setOpen(true),
		};
	});

	useEffect(() => {
		document.body.style.overflow = 'hidden';

		return () => {
			document.body.style.overflow = 'auto';
		};
	}, []);
	return (
		<>
			{Open && (
				<aside className='modal'>
					<div className='con'>{props.children}</div>
					<span className='close' onClick={() => setOpen(false)}>
						close
					</span>
				</aside>
			)}
		</>
	);
});

export default Modal;
