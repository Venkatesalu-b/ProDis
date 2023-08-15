import React,{useEffect,useRef,useState} from "react";


const CustomMenu = ({ xPos, yPos ,onHide,editFun,delFun}) => {
    const menuStyles = {
      position: 'absolute',
      top: yPos,
      left: xPos,
      backgroundColor: '#f1f1f1',
      padding: 3,
      width:100,
      boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.3)',
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
          if (menuRef.current && !menuRef.current.contains(event.target)) {
            onHide();
          }
        };
    
        document.addEventListener('click', handleClickOutside);
    
        return () => {
          document.removeEventListener('click', handleClickOutside);
        };
      }, [onHide]);
    const menuRef = useRef(null);
    return (
      <div style={menuStyles}  ref={menuRef}>
    <div style={{cursor:'pointer'}} onClick={()=>{editFun();onHide()}}>Edit</div>
    <hr />
    <div style={{cursor:'pointer'}} onClick={()=>{delFun();onHide()}}>Delete</div>
      </div>
    );
  };
  export default CustomMenu