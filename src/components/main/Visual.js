import { motion, AnimatePresence } from 'framer-motion';
function Visual() {
	return (
		<AnimatePresence>
			<figure id='visual'>
				<div className='inner'></div>
			</figure>
		</AnimatePresence>
	);
}

export default Visual;
