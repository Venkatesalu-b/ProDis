import React,{useEffect,useRef,useState} from "react";
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Input from "antd/es/input/Input";

const ButtonFunction = ({AddTask})=>{

const addrow = ['New Task','Bulk Insert','New Header'];
const deleterow = ['Delete Task','Delete Header'];
const [inserttask,setInserttask] = useState('');



return(
    <>
      <Select
                                    value={inserttask}
                                    style={{ width: '12%',height:40, cursor:'pointer', }}
                                    onChange={(e) => setInserttask(e.target.value)}
                                    displayEmpty
                                    inputProps={{ 'aria-label': 'Without label' }}
                                     
                                >

<MenuItem disabled value = ''>
                                        Add Task
                                    </MenuItem>
                                    {addrow.map((addbtn) => (
                                        <MenuItem value={addbtn} onClick={()=>AddTask(addbtn)}>{addbtn}</MenuItem>

                                    ))}
                                </Select>
    </>
)

}
export default ButtonFunction