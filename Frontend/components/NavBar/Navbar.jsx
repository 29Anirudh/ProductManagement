import { useEffect, useState } from 'react';
import './Navbar.css';
import { CiSearch } from "react-icons/ci";
import { NavLink, useNavigate } from 'react-router-dom';
import IconText from '../IconText/IconText';

const Navbar = ({ navItems }) => {
  const [isTop, setIsTop] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsTop(window.scrollY === 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = () => setMenuOpen(false);

  const handleSearchSubmit = () => {
    if (search.trim()) {
      navigate(`/search-product?query=${search}`);
      setSearchOpen(false);
    }
  };

  return (
    <nav className={`navBar ${!isTop ? 'navBar-change' : ''}`}>
      <div style={{ marginLeft: "20px" }}>
        <IconText text="Product Management App" />
      </div>
      {/* This is only for mobile screens  */}
      <div className="nav-actions">
        <button className="search-toggle" onClick={() => {setSearchOpen(!searchOpen);setMenuOpen(false)}}>
          <CiSearch size={25} />
        </button>
        <button className="menu-button" onClick={() => {setMenuOpen(!menuOpen);setSearchOpen(false)}}>
          &#9776;
        </button>
      </div>

      <div className="nav-right">
        <div className="search-bar desktop-only">
          <input
            type="text"
            placeholder="Search Products.."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearchSubmit()}
            className="search-bar-input"
          />
          <CiSearch
            size={20}
            className="search-bar-button"
            onClick={handleSearchSubmit}
          />
        </div>

        <ul className={`navList ${menuOpen ? 'active' : ''}`}>
          {navItems.map((navItem, index) => (
            <NavLink
              key={index}
              to={navItem.route}
              className={({ isActive }) =>
                isActive ? 'navItem-active' : 'navItem'
              }
              onClick={handleLinkClick}
            >
              {navItem.name}
            </NavLink>
          ))}
        </ul>
      </div>

      {searchOpen && (
        <div className="mobile-search">
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearchSubmit()}
            className="mobile-search-input"
          />
          <button className="mobile-search-btn" onClick={handleSearchSubmit}>
            <CiSearch size={20} />
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
