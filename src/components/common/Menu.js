import { useState, forwardRef, useImperativeHandle, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faSpotify } from '@fortawesome/free-brands-svg-icons';

const Menu = forwardRef((props, ref) => {
	const [Open, setOpen] = useState(false);
	const active = { color: 'orange' };

	useImperativeHandle(ref, () => {
		return { toggle: () => setOpen(!Open) };
	});

	useEffect(() => {
		window.addEventListener('resize', () => {
			if (window.innerWidth >= 1200) setOpen(false);
		});
	}, []);

	return (
		<AnimatePresence>
			{Open && (
				<motion.nav
					id='mobilePanel'
					initial={{ opacity: 0, x: -320 }}
					animate={{ opacity: 1, x: 0, transition: { duration: 0.5 } }}
					exit={{ opacity: 0, x: -320, transition: { duration: 0.5 } }}
					onClick={() => {
						setOpen(false);
					}}
				>
					<h1>
						<Link to='/'>DCODELAB</Link>
					</h1>

					<ul id='gnbMo'>
						<li>
							<NavLink to='/department' activeStyle={active}>
								Department
							</NavLink>
						</li>
						<li>
							<NavLink to='/community' activeStyle={active}>
								Community
							</NavLink>
						</li>
						<li>
							<NavLink to='/gallery' activeStyle={active}>
								Gallery
							</NavLink>
						</li>
						<li>
							<NavLink to='/youtube' activeStyle={active}>
								Youtube
							</NavLink>
						</li>
						<li>
							<NavLink to='/members' activeStyle={active}>
								Member
							</NavLink>
						</li>
						<li>
							<NavLink to='/location' activeStyle={active}>
								Location
							</NavLink>
						</li>
					</ul>

					<ul className='brands'>
						<li>
							<FontAwesomeIcon icon={faYoutube} />
						</li>
						<li>
							<FontAwesomeIcon icon={faTwitter} />
						</li>
						<li>
							<FontAwesomeIcon icon={faSpotify} />
						</li>
					</ul>
				</motion.nav>
			)}
		</AnimatePresence>
	);
});

export default Menu;
