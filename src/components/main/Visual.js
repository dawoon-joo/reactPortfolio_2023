import { motion, AnimatePresence } from 'framer-motion';
function Visual() {
	const path = process.env.PUBLIC_URL;

	return (
		<AnimatePresence>
			<figure id='visual' className='myScroll'>
				<div className='inner'></div>
			</figure>
		</AnimatePresence>
	);
}

export default Visual;
