import { useEffect, useState } from 'react';
import './Navbar.css';
import { NavLink } from 'react-router-dom';
import IconText from '../IconText/IconText';

const Navbar = ({ navItems }) => {
  const [isTop, setIsTop] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsTop(window.scrollY === 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = () => setMenuOpen(false);

  return (
    <nav className={`navBar ${!isTop ? 'navBar-change' : ''}`}>
      <div style={{marginLeft:"20px"}}><IconText text="Product Management App" /></div>
      <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)}>
        &#9776;
      </button>

      <ul className={`navList ${menuOpen ? 'active' : ''}`}>
        {navItems.map((navItem, index) => (
          <NavLink
            key={index}
            to={navItem.route}
            className={({ isActive }) => (isActive ? 'navItem-active' : 'navItem')}
            onClick={handleLinkClick}
          >
            {navItem.name}
          </NavLink>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
