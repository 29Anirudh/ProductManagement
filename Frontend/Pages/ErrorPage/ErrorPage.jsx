import './ErrorPage.css'
import { useLocation } from 'react-router-dom'
import { useEffect } from 'react';
const ErrorPage = () => {
    const location=useLocation();
    useEffect(() => {
      window.scrollTo(0, 0); 
    }, []);
  return (
    <div className="error-page">
        <span className='error-main error-lg'>(Error)</span>
        <span className='error-main'>Route '{location.pathname}' not found.</span>
        <span className='error-text'>You can use the routes mentioned in the NAVBAR</span>
    </div>
  )
}

export default ErrorPage