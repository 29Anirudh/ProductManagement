import { useEffect } from 'react';
import './Notification.css'
import {motion,AnimatePresence} from "framer-motion";
import { IoMdClose } from "react-icons/io";
const Notification = ({notification,closeNotification,duration=3000}) => {
    useEffect(()=>{
        if(!notification.message)return;
        const timer=setTimeout(()=>{
            closeNotification();
        },duration);
        return()=>clearTimeout(timer);
    },[closeNotification,notification.message,duration]);
  return (
    <AnimatePresence>
        {notification.message&&(
            <motion.div className={`notification ${notification.type}`} initial={{opacity:0,y:-30}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-30}} transition={{duration:0.3}}>
                {notification.message}
                <IoMdClose className='notification-cross' onClick={closeNotification}/>
            </motion.div>)
        }
        
    </AnimatePresence>
  )
}

export default Notification