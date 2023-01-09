import { motion, AnimatePresence } from 'framer-motion';
function Visual() {
	const path = process.env.PUBLIC_URL;

	return (
		<AnimatePresence>
			<figure id='visual' className='myScroll'>
				<motion.h1
					initial={{ opacity: 0, x: '-50%', y: '-60%', scale: 0 }}
					animate={{ opacity: 1, transition: { duration: 1, delay: 3 }, x: '-50%', y: '-100%', scale: 1 }}
					exit={{ opacity: 0, transition: { duration: 1 }, scale: 0 }}
				>
					PORTFOLIO
				</motion.h1>
				<article>
					<motion.span
						initial={{ opacity: 0, y: 320 }}
						animate={{ opacity: 1, y: 0, transition: { duration: 1 } }}
						exit={{ opacity: 0, y: 320, transition: { duration: 1 } }}
					>
						<img src={`${path}/img/s1_bg03.png`} alt='' />
					</motion.span>
					<motion.span
						initial={{ opacity: 0, y: 320 }}
						animate={{ opacity: 1, y: 0, transition: { duration: 1, delay: 1 } }}
						exit={{ opacity: 0, y: 320, transition: { duration: 1 } }}
					>
						<img src={`${path}/img/s1_bg02.png`} alt='' />
					</motion.span>
					<motion.span
						initial={{ opacity: 0, y: 320 }}
						animate={{ opacity: 1, y: 0, transition: { duration: 1, delay: 1.5 } }}
						exit={{ opacity: 0, y: 320, transition: { duration: 1 } }}
					>
						<img src={`${path}/img/s1_bg01.png`} alt='' />
					</motion.span>
				</article>
				<div className='bottom_bg'>
					<div className='bg'></div>
				</div>
			</figure>
		</AnimatePresence>
	);
}

export default Visual;
