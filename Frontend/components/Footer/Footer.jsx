import { NavLink } from "react-router-dom"
import IconText from "../IconText/IconText"
import './Footer.css'
const Footer = ({navItems}) => {
  return (
    <div className="footer">
        <div className="footer-main">
            <IconText text='Product Management App'/>
            <span className="footer-subtext">Discover amazing products designed to enhance your lifestyle and productivity. Quality products, competitive prices, exceptional service</span>
        </div>
        <div className="footer-menu">
            <span className="footer-menu-head">Quick Links</span>
            <ul className="footer-menu-list">
                {navItems.map((navItem,index)=>(
                    <NavLink to={navItem.route} key={index} className="footer-menu-li">{navItem.name}</NavLink>
                ))}
            </ul>
        </div>
        <div>
            
        </div>
    </div>
  )
}

export default Footer