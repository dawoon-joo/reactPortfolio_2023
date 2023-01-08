import { useEffect, forwardRef, useState, useImperativeHandle } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Modal = forwardRef((props, ref) => {
	const [Open, setOpen] = useState(false);

	useImperativeHandle(ref, () => {
		return {
			open: () => setOpen(true),
		};
	});

	useEffect(() => {
		Open ? (document.body.style.overflow = 'hidden') : (document.body.style.overflow = 'auto');
	}, [Open]);
	return (
		<AnimatePresence>
			{Open && (
				<motion.aside
					className='modal'
					initial={{ opacity: 0, scale: 0, rotate: 45 }}
					animate={{ opacity: 1, scale: 1, rotate: 0, transition: { duration: 1 } }}
					exit={{ opacity: 0, x: '50%', transition: { duration: 0.5, delay: 0.5 } }}
				>
					<motion.div className='con' initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 1 } }} exit={{ opacity: 0 }}>
						{props.children}
					</motion.div>
					<motion.span
						initial={{ opacity: 0, x: 100 }}
						animate={{ opacity: 1, x: 0, transition: { delay: 1 } }}
						exit={{ opacity: 0, x: 100 }}
						className='close'
						onClick={() => setOpen(false)}
					>
						close
					</motion.span>
				</motion.aside>
			)}
		</AnimatePresence>
	);
});

export default Modal;
