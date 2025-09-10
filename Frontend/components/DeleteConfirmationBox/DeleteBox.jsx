import './DeleteBox.css'
import { CgDanger } from "react-icons/cg";
const DeleteBox = ({name,setDelete}) => {
  return (
    <div className='delete-box'>
        <CgDanger size={50} className='delete-icon'/>
        <div className='delete-text'>
            <h3 className=''>Delete Product `{name}`</h3>
            <p className=''>Are you sure you want to delete?</p>
            <p>This action cannot be undone.</p>
        </div>
        <div className='delete-buttons'>
            <button onClick={()=>setDelete(true)} className='delete-yes'>Yes</button>
            <button onClick={()=>setDelete(false)} className='delete-no'>No</button>
        </div>

    </div>
  )
}

export default DeleteBox