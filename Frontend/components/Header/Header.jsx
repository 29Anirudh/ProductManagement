import './Header.css'
const Header = ({title,subtitle}) => {
  return (
    <div className="header">
        <h1 className="header-title">{title}</h1>
        <p className="header-subtitle">{subtitle}</p>
    </div>
  )
}

export default Header