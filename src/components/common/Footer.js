import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAudioDescription } from '@fortawesome/free-solid-svg-icons';
import { faCreditCard } from '@fortawesome/free-solid-svg-icons';
function Footer() {
	return (
		<footer>
			<div className='inner'>
				<h1>Portfolio</h1>
				<ul className='top_box'>
					<li>
						<NavLink to='/'>ABOUT</NavLink>
					</li>
					<li>
						<NavLink to='/'>PRODUCTS</NavLink>
					</li>
					<li>
						<NavLink to='/'>BLOG</NavLink>
					</li>
					<li>
						<NavLink to='/'>SHOP</NavLink>
					</li>
					<li>
						<NavLink to='/'>CONTACTS</NavLink>
					</li>
				</ul>
				<address>
					address : Lorem ipsum dolor sit amet consectetur.
					<br />
					Tel : +82-2-2100-2114 FAX : +82-2-2100-7999
				</address>
				<p>Copyright &copy; 2022 DECODELAB ALL Right reserved.</p>
				<ul className='bottom_box'>
					<li>
						<FontAwesomeIcon icon={faAudioDescription} />
					</li>
					<li>
						<FontAwesomeIcon icon={faCreditCard} />
					</li>
				</ul>
			</div>
		</footer>
	);
}

export default Footer;
