import React, { useEffect, useState, useRef } from "react";
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import Snackbar from '@mui/material/Snackbar';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { Alert } from "@mui/material";
import CustomMenu from "./Custommenu";
import ButtonFunction from "./ButtonFunction";



const Table1 = () => {




    const [task, setTask] = useState('')
    const [exceltask, setExceltask] = useState(false);
    const [alertexcel, setAlertExcel] = useState(false);
    const [taskexcel, setTaskexcel] = useState(``);
    const [lastknownId, setLastKnownID] = useState(0)
    console.log(lastknownId, "IDDDD")
    const [priority, setPriority] = useState('low')
    const [addedTasks, setAddedTasks] = useState([])
    const [modalOpen, setModalOpen] = useState(false);
    const [modalOpenexcel, setModalOpenexcel] = useState(false);

    const [addModalOpen, setAddModalOpen] = useState(false)
    const [columnName, setColumnName] = useState('')
    const [datatype, setDataType] = useState('')
    const [ishovering, setIshovering] = useState(null)
    const [toggleDelete, setToggleDelete] = useState(false);
    const [toggleheaderDelete, setToggleheaderDelete] = useState(false);
    const [toggleedit, setToggleedit] = useState(false);
    const defaultColumns = ['Task id', 'Task name', 'priority', 'Date planned']

    const [columns, setColumns] = useState(defaultColumns)
    const priorites = ['Low', 'Medium', 'High']
    const addrow = ['New Task','Bulk Insert','New Header'];
    const deleterow = ['Delete Task','Delete Header'];

    const [sortAscending, setSortAscending] = useState(true);
    const [taskid, setTaskid] = useState();
    const [datesplanned, setDatesplanned] = useState('')
    const [dateDisplay, setDateDisplay] = useState('');
    const [addtask, setAddtask] = useState(false);

    const [open, setOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alert5, setAlert5] = useState(false);
    const [alert1, setAlert1] = useState(false);
    const [alert2, setAlert2] = useState(false);
    const [alert3, setAlert3] = useState(false);
    const [shouldScroll, setShouldScroll] = useState(true);
    const [modaldelete, setModaldelete] = useState(false);
    const [task_name, setTask_name] = useState('')
    const [taskpriority, setTaskpriority] = useState('');
    const [task_id, setTask_id] = useState();
    const [text, setText] = useState(false)
    const [isAlertVisible, setIsAlertVisible] = React.useState(false);
    const [datetask, setDatetask] = useState('');
    const [hover, setHover] = useState(null);
    const [rowtask, setRowtask] = useState(false);
    const [editid, setEditid] = useState();
    const [edittaskname, setEdittaskname] = useState('');
    const [editpriority, setEditpriority] = useState('Low');
    const [editdate, setEditdate] = useState('');
    const [editrow, setEditrow] = useState(false);
    const [modaledit, setModaledit] = useState(false);
    const [edittaskid, setEdittaskid] = useState();
    const [modalvisible, setModalvisible] = useState(false);

    const [menuPosition, setMenuPosition] = useState({ xPos: '0px', yPos: '0px' });
    const [showMenu, setShowMenu] = useState(false);
    const [selectdTask, setSelectedTask] = useState({});
    const [isSelectall, setIsSelectAll] = useState(false)




    const validatetask_id = (tasskid) => {
        var regexp = /^\d$/;
        return regexp.test(tasskid)
    }
    const validatetasknames = (tassknames) => {
        var regexp1 = /^[A-Za-z\s]+[0-9\s]{0,79}$/;
        return regexp1.test(tassknames)
    }



    const handleSelectAll = () => {
        if (isSelectall) {
            console.log("CHECKED")
            setIsSelectAll(false)
            setCheckedTasks([])
            return
        }
        setIsSelectAll(true)
        const idArray = addedTasks.map(item => item.id);
        setCheckedTasks(idArray)

    }


    const [checkedTasks, setCheckedTasks] = useState([])

    const handleContextMenu = (event, task) => {
        console.log(task, 'taskrow');
        event.preventDefault();
        const xPos = `${event.pageX}px`;
        const yPos = `${event.pageY}px`;
        setMenuPosition({ xPos, yPos });
        setSelectedTask(task)
        setShowMenu(true);
    };
    const AddTask =(values)=>{
        console.log(values,typeof(values),'values');
     if(values==='New Task'){
        setModalOpen(true)
     }
     if(values ==='Bulk Insert'){
        setModalOpenexcel(true)
     }
if(values==='New Header'){
    setAddModalOpen(true)
}
    }

    const editFun = () => {
        editdata(selectdTask)
        setModaledit(true)
        setSelectedTask({})
    }

    const delFun = () => {
        datadelete(selectdTask.id)
        columnDelete(selectdTask)
        setSelectedTask({})

    }

    const handleHideMenu = () => {
        setShowMenu(false);
    };

    console.log(taskexcel, 'taskk')

    const availableDatatype = [{ name: 'number', value: "integer" }, { name: 'character', value: "varchar" }]

    const Tasks = async () => {
        console.log(taskid, task, priority, dateDisplay, 'list');

        if (taskid !== undefined && task !== '' && priority !== '' && dateDisplay !== '') {
            console.log(addtask, task, taskid, priority, dateDisplay, 'addtask');
            setAddtask(true);
            setAlert5(false);
            setAlert1(false);
            setAlert2(false);
            setAlert3(false)
        }
    }

    useEffect(() => {
        Tasks();
    }, [task, taskid, priority, dateDisplay])



    const handleClick = () => {

        if (taskid === '') {

            console.log("values is not added")
            setAlert5(true)
            setOpen(true);

            setAlertMessage("Values are not added");
            return

        }
        else if (!validatetask_id(taskid)) {
            setAlert5(true)
            setOpen(true);
            setAlertMessage("Enter Only Numbers ");
            return

        }
        else if (task === '') {
            console.log("values is not added")
            setAlert1(true)
            setOpen(true);

            setAlertMessage("Values are not added");
            return

        }
        else if (!validatetasknames(task)) {
            setAlert1(true)
            setOpen(true);

            setAlertMessage("Enter First Letter only Alphabets");
            return

        }
        else if (priority === '') {
            console.log("values is not added")
            setAlert2(true)
            setOpen(true);

            setAlertMessage("Values are not added");
            return

        }
        else if (dateDisplay === '') {
            console.log("values is not added")
            setAlert3(true)
            setOpen(true);

            setAlertMessage("Values are not added");
            return

        }



        if (addedTasks.length === 0) {
            const str2 = task[0].toUpperCase() + task.slice(1);
            console.log(str2, 'str');
            setAddedTasks([{ task_id: parseInt(taskid, 10), task_name: str2, priority: priority, date_planned: datesplanned }])

            addData(parseInt(taskid, 10), str2, priority, datesplanned)
            setTaskid('')
            setTask('')
            setPriority('')
            setDatesplanned('')
            setDateDisplay('')
            fetchAllData()

            return
        }
        const str3 = task.charAt(0).toUpperCase() + task.slice(1);
        let tempArr = [...addedTasks, { task_id: parseInt(taskid, 10), task_name: str3, priority: priority, date_planned: datesplanned }]
        setAddedTasks(tempArr)
        setTaskid('')
        setTask('')
        setPriority('')
        setDatesplanned('')
        setDateDisplay('')
        fetchAllData()

        addData(parseInt(taskid, 10), str3, priority, datesplanned)

        setAddtask(false)
        setAlert5(false)
        setModalOpen(false)

    }

    const taskpasteexcel = async () => {
        console.log('hello', taskexcel, typeof (taskexcel))
        if (taskexcel !== '') {
            console.log(taskexcel, 'excel', exceltask)
            setExceltask(true)
            setAlertExcel(false)
        }
    }
    useEffect(() => {
        taskpasteexcel()
    }, [taskexcel])


    const ADDbundletask = async () => {
        console.log('istax', taskexcel.length)

        if (taskexcel === '' || taskexcel.length === 0) {
            console.log('is empty', typeof (taskexcel))
            setAlertExcel(true)
            setOpen(true);

            setAlertMessage("Values are not added");
            return

        }
        const taskexc = [];

        const lines = taskexcel?.split('\n');

        for (let index = 0; index < lines.length - 1; index++) {
            const line = lines[index];
            console.log(line, 'lo')
            const [taskid, taskname, dateplanned] = line.split('\t');
            const values = [taskid, taskname, dateplanned];
            const undefinedIndexes = [];


            values.forEach((value, i) => {
                if (typeof value === 'undefined' || value.trim() === '') {
                    undefinedIndexes.push(i);
                }
            });

            if (undefinedIndexes.length === 0) {
                taskexc.push({
                    taskid,
                    taskname,
                    dateplanned
                });


            } else {
                console.log(`Undefined indexes in line ${index}:`, undefinedIndexes);
                alert(`${index + 1}th  row is deleted `)
            }
        }


        try {
            const requests = taskexc.map(async (item) => {

                const tasknames = item.taskname
                const capitalizedtaskname = tasknames.charAt(0).toUpperCase() + tasknames.slice(1);

                const response = await fetch("http://localhost:3004/task", {
                    method: 'post',
                    body: JSON.stringify({
                        "taskid": item.taskid,
                        "taskname": capitalizedtaskname,
                        "priority": "Medium",
                        "dateplanned": item.dateplanned,
                    }),
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to post task to the server');
                }

                const data = await response.json();
                return data;
            });

            const results = await Promise.all(requests);
        }

        catch (error) {
            console.log('Error:', error);
        }
        setTaskexcel([])
        fetchAllData()
        setModalOpenexcel(false)
    }


    // const action = (
    //     <React.Fragment>
    //         <Button color="primary" size="small" style={{ fontWeight: 600 }} onClick={() => { setToggleDelete(false); setShouldScroll(true); }}>
    //             Exit delete mode
    //         </Button>

    //     </React.Fragment>
    // );


    const fetchAllData = async () => {
        try {
            await fetch("http://localhost:3004/getalltasks", {
                method: 'get',
                headers: {

                    'Content-type': 'application/json; charset=UTF-8',
                },

            })
                .then((response) => response.json())
                .then((data) => {


                    setColumns(data.columns)
                    const tasks = data.tasks
                    if (data.tasks.length > 0) {
                        const lastId = tasks?.reduce((max, obj) => {
                            if (obj.taskid > max.taskid) {
                                return obj;
                            } else {
                                return max;
                            }
                        });
                        setLastKnownID(lastId.taskid)
                    }
                    else {
                        setLastKnownID(0)
                    }
                    setAddedTasks(data.tasks)

                })
        }
        catch (error) {

            console.log('error', error);
        }
    }

    useEffect(() => {
        fetchAllData()
    }, [])

    const addData = async (taskid, task, priority, datesplanned) => {

        try {
            console.log('values is added')
            await fetch("http://localhost:3004/task", {
                method: 'post',

                body: JSON.stringify({
                    "taskid": taskid,
                    "taskname": task,
                    "priority": priority,
                    "dateplanned": datesplanned,
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log(data, 'adddata')
                })
        }
        catch (error) {
            console.log('error', error);
        }
    }
    const addColumn = async (func) => {
        if (columns.includes(columnName)) {
            return
        }
        let temparr = [...columns, columnName]
        setColumns(temparr)

        try {
            const response = await fetch("http://localhost:3004/modifycolumn", {
                method: 'post',
                body: JSON.stringify({
                    "func": func,
                    "columnname": columnName,
                    "datatype": datatype,
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            });

            if (!response.ok) {
                throw new Error('Request failed with status ' + response.status);
            }

            const data = await response.json();
            console.log(data, 'response');
            setColumnName('');
            setDataType('');

        } catch (error) {
            console.error("An error occurred:", error);
        }
        setAddModalOpen(false);
        setColumnName('');
        setDataType('');
    }
    const addColumnModal = () => {
        return (
            <Modal
                open={addModalOpen}
                onClose={() => { setAddModalOpen(false); }}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >

                <Box sx={styles.modalStyle}>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: '93% 3%',
                        alignItems: 'center',
                        color: '#FFFFFF',
                        borderRadius: '4px 4px 0px 0px',
                        fontFamily: 'Roboto',
                        backgroundColor: '#1976D2',
                        padding: 4
                    }}>
                        <div style={{ fontFamily: 'Roboto', paddingLeft: 4 }}>Task</div>
                        <CloseIcon cursor="pointer" color="#FFFFFF" style={{ paddingRight: 4 }} onClick={() => { setAddModalOpen(false); setColumnName(''); setDataType(''); }} />


                    </div>

                    <div style={{ padding: 4 }}>
                        <div style={{ width: '80%', margin: 'auto', marginTop: 5 }}>

                            <TextField
                                style={{ width: '100%' }}
                                placeholder="Column name"
                                value={columnName}
                                onChange={(e) => { setColumnName(e.target.value) }}
                                fullWidth
                            />

                            <Select
                                value={datatype}
                                style={{ width: '100%', marginTop: 14 }}
                                onChange={(e) => setDataType(e.target.value)}
                                displayEmpty
                                inputProps={{ 'aria-label': 'Without label' }}
                            >
                                <MenuItem disabled value="">
                                    <em>Select the type</em>
                                </MenuItem>
                                {availableDatatype.map((type) => (
                                    <MenuItem value={type.value}>{type.name}</MenuItem>

                                ))}
                            </Select>

                        </div>
                        <div style={{ margin: 'auto', marginTop: 15, width: '80%', display: 'flex', justifyContent: 'end' }}>
                            <Button variant="contained" onClick={() => addColumn("add")}
                            >Add column</Button>
                        </div>
                    </div>
                </Box>
            </Modal>
        )
    }

    const editdata = (updaterow) => {
        const dateString = updaterow.date_planned;
        const parts = dateString.split('-');
        const form = `${parts[2]}-${parts[1]}-${parts[0]}`;
        setEdittaskname(updaterow.task_name);
        setEditpriority(updaterow.priority);
        setEditid(updaterow.id);
        setEditdate(form);
        setEdittaskid(updaterow.task_id);
    }

    const dataedit = async (id) => {
        const datestore = editdate
        const parts1 = datestore.split('-');
        const formdate = `${parts1[2]}-${parts1[1]}-${parts1[0]}`;
        const stringedit = edittaskname;
        const stredit = stringedit[0].toUpperCase() + stringedit.slice(1, stringedit.length);
        try {
            await fetch(`http://localhost:3004/task/${id}`, {
                method: 'put',

                body: JSON.stringify({
                    "task_id": edittaskid,
                    "task_name": stredit,
                    "priority": editpriority,
                    "date_planned": formdate,
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log(data, 'adddata')
                })
        }
        catch (error) {
            console.log('error', error);
        }
        fetchAllData()
        setModaledit(false)
    }

    const datadelete = async (columndata) => {
        try {
            await fetch(`http://localhost:3004/deletetask/${columndata}`, {
                method: 'delete',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            })
        }
        catch (error) {
            console.log('error', error);
        }
        handleButtonClick()
        fetchAllData()
        setModaldelete(false)
    }
    const handleButtonClick = () => {
        setIsAlertVisible(true);

        setTimeout(() => {
            setIsAlertVisible(false);
        }, 2000);
    }

    const columnDelete = async (columnName) => {
        setTask_name(columnName.task_name);
        setTaskpriority(columnName.priority);
        setTask_id(columnName.id);
        setDatetask(columnName.date_planned)
    }

    const columnstyle = (index) => {
        if (index === ishovering && toggleDelete) {
            return {
                // border: '1px solid black',
                // padding: 10,
                // backgroundColor: '#C61414',
                // cursor: 'pointer',
                // color: 'white',
                // position:'sticky'
                border: '1px solid black',
                padding: 10,
                backgroundColor: 'lightgrey',
                color: 'black',
                  top: -2,
                position: 'sticky',
                fontSize: 40,
                height:50,
                display: 'flex',
            }
        }
        return {
            border: '1px solid black',
            padding: 10,
            backgroundColor: 'lightgrey',
            color: 'black',
            top: -2,
            position: 'sticky',
            fontSize: 40,
            fontWeight:'bold'
        }
    }


    function convertToSnakeCase(inputString) {
        return inputString.toLowerCase().replace(/\s+/g, '_');
    }

    const handleDate = (e) => {
        setDateDisplay(e)
        const selectedDate = new Date(e);
        const day = selectedDate.getDate();
        const month = selectedDate.getMonth() + 1; // Months are zero-based
        const year = selectedDate.getFullYear();
        const formattedDate = `${day < 10 ? '0' + day : day}-${month < 10 ? '0' + month : month}-${year}`;
        setDatesplanned(formattedDate)

    };

    const handleSort = (column,index) => {
        console.log(column,index,activeSort,'rohith')
        if (index == activeSort) {
            return (
                <>
                    {!sortAscending ? (
                        <FontAwesomeIcon color="black" icon={faChevronDown}
                            style={{ marginLeft: 15, color: '#424949', fontSize: 15,cursor:'pointer' }} onClick={() => toggleSort1(convertToSnakeCase(column), index)} />)
                        :
                        (
                            <FontAwesomeIcon color="black" icon={faChevronUp}
                                style={{ marginLeft: 15, color: '#424949', fontSize: 15,cursor:'pointer' }} onClick={() => toggleSort1(convertToSnakeCase(column), index)} />)
                    }
                </>
            )
        }
        return (

        <FontAwesomeIcon color="black" icon={faChevronDown}
        style={{ marginLeft: 15, color: '#424949', fontSize: 15,cursor:'pointer' }} onClick={() => {toggleSort1(convertToSnakeCase(column), index);setActiveSort(index)}} />)

    }
    const [activeSort, setActiveSort] = useState(null)

    const toggleSort1 = (column, index) => {
        console.log('jjj', index, column)
        setSortAscending(!sortAscending);

        const sortedData = [...addedTasks].sort((a, b) => {
            if (sortAscending) {
                if (column === "date_planned") {



                    const [aDay, aMonth, aYear] = a.date_planned.split('-');
                    const [bDay, bMonth, bYear] = b.date_planned.split('-');

                    if (aYear !== bYear) {
                        return aYear - bYear;
                    }
                    if (aMonth !== bMonth) {
                        return aMonth - bMonth;
                    }
                    return aDay - bDay;
                } else {
                    if (typeof (a[column]) === 'string' && typeof (b[column])) {
                        console.log('column')
                        return a[column]?.localeCompare(b[column]);
                    }
                    else {
                        return a[column] - b[column];
                    }
                }
            } else {
                if (column === "date_planned") {


                    const [aDay, aMonth, aYear] = a.date_planned.split('-');
                    const [bDay, bMonth, bYear] = b.date_planned.split('-');
                    if (aYear !== bYear) {
                        return bYear - aYear;
                    }
                    if (aMonth !== bMonth) {
                        return bMonth - aMonth;
                    }
                    return bDay - aDay;
                } else {
                    if (typeof (a[column]) === 'string' && typeof (b[column])) {
                        return b[column]?.localeCompare(a[column]);
                    }
                    else {
                        return b[column] - a[column];
                    }
                }
            }
        });

        setAddedTasks(sortedData);
    };
    const handleCheckbox = (task) => {
        setIsSelectAll(false)
        if (checkedTasks.includes(task.id)) {
            let index = checkedTasks.indexOf(task.id);
            let updatedArr = [...checkedTasks]
            updatedArr.splice(index, 1)
            setCheckedTasks(updatedArr)
            return
        }
        if (checkedTasks.length === 0) {
            setCheckedTasks([task.id])
        }

        else {
            let tempArr = [...checkedTasks, task.id]
            setCheckedTasks(tempArr)
        }

    }



    const handleDelete = async () => {
        if (checkedTasks.length === 0) {
            setToggleDelete(!toggleDelete)
        }
        else {
            try {
                const response = await fetch("http://localhost:3004/deletetasks", {
                    method: 'post',
                    body: JSON.stringify({
                        "id": checkedTasks
                    }),
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                    },
                });
                setToggleDelete(!toggleDelete)
            }

            catch (error) {
                console.log('Error:', error);
            }
            fetchAllData()

        }
    }



    return (
        <div>
            <div style={{ width: '100%', height: 40, padding: 5, display: 'flex', justifyContent: 'center', flexDirection: 'row' }}>
                <img src={require('./newplan.png')} style={{ height: 60, width: 120, }} />

                <h1 style={{ fontSize: 45, letterSpacing: 1, color: '#34210E', wordSpacing: 5, marginTop: 2 }}>Production Tasks</h1>

            </div>
            <div style={{ width: '96%', margin: 'auto', display: 'flex', justifyContent: 'space-between', marginTop: 15, marginBottom: 10, padding: 5 }}
            >
                <ButtonFunction  AddTask={AddTask}/>
                <Button variant="contained"  style={{width:150}}  startIcon={<AddIcon />} onClick={() => {
                    setModalOpen(true);
                }}> task </Button>
                <Button variant="contained"  style={{width:150}} startIcon={<AddIcon />} onClick={() => {
                    setModalOpenexcel(true)
                    setExceltask(false)
                }}>Bulk Insert</Button>

                <div >
                    <Button variant="contained"  style={{width:150}}  startIcon={<AddIcon />} onClick={() => {
                        setAddModalOpen(true)
                    }}> Header</Button> </div>

                <div><Button variant="contained" style={{ backgroundColor: toggleheaderDelete ? '#C61414' : '#1976D2',
                width:150, marginLeft: '20px', wordSpacing: 4, color: '#fff' }}


                > Delete Header </Button>
                </div>

                <div><Button variant="contained" style={{ backgroundColor: toggleDelete ? '#C61414' : '#1976D2', 
                width:150,marginLeft: '20px', wordSpacing: 4, color: '#fff' }}
                    onClick={() => handleDelete()

                    }> Delete </Button>
                </div>

                <Modal
                    open={modalvisible}
                    onClose={() => { setModalvisible(false) }}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={styles.modalStyle1}>


                        <div style={{
                            textAlign: 'center', height: 30, marginTop: 15, justifyContent: 'center', alignItems: 'center',
                            cursor: 'pointer',
                        }} onClick={() => { setModaledit(true) }}>
                            Edit
                        </div>
                        <hr />
                        <div style={{ textAlign: 'center', height: 35, cursor: 'pointer' }}
                            onClick={() => { datadelete(task_id) }}>Delete</div>
                    </Box>

                </Modal>
                <Modal
                    open={modaledit}
                    onClose={() => { setModaledit(false) }}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >

                    <Box sx={styles.modalStyle}>

                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: '93% 3%',
                            alignItems: 'center',
                            color: '#FFFFFF',
                            borderRadius: '4px 4px 0px 0px',
                            fontFamily: 'Roboto',
                            backgroundColor: '#1976D2',
                            padding: 7,

                        }}>
                            <div style={{ paddingLeft: 4 }}>Task</div>
                            <CloseIcon cursor="pointer" style={{ paddingRight: 4 }} color="#000" onClick={() => { setModaledit(false) }} />

                        </div>

                        <div style={{ padding: 20 }}>
                            <div style={{ width: '75%', margin: 'auto', marginTop: 4 }}>

                                <TextField
                                    style={{ width: '100%', color: 'black', }}
                                    placeholder="Task ID"
                                    sx={{
                                        input: {
                                            color: 'black',
                                            "&::placeholder": {    // <----- Add this.
                                                opacity: 0.7,
                                            },
                                        },
                                        label: { color: 'blue' }
                                    }}

                                    value={edittaskid}
                                    onChange={(e) => { setEdittaskid(e.target.value) }}
                                    fullWidth
                                />
                                <TextField
                                    style={{ width: '100%', marginTop: 10, padding: 5 }}
                                    placeholder="Task Name"
                                    sx={{
                                        input: {
                                            color: 'black',
                                            "&::placeholder": {    // <----- Add this.
                                                opacity: 0.7,
                                            },
                                        },
                                        label: { color: 'blue' }
                                    }}

                                    value={edittaskname}
                                    onChange={(e) => { setEdittaskname(e.target.value) }}
                                    fullWidth
                                />

                                <Select
                                    value={editpriority}
                                    style={{ width: '100%', marginTop: 10, padding: 5 }}
                                    onChange={(e) => setEditpriority(e.target.value)}
                                    // displayEmpty
                                    inputProps={{ 'aria-label': 'Without label' }}
                                >
                                    <MenuItem disabled value="">
                                        Select the Priority
                                    </MenuItem>
                                    {priorites.map((priority) => (
                                        <MenuItem value={priority} >{priority}</MenuItem>

                                    ))}
                                </Select>

                                <TextField
                                    style={{ width: '100%', marginTop: 10, padding: 5 }}
                                    placeholder="date planned"
                                    type="date"

                                    value={editdate}
                                    onChange={(e) => setEditdate(e.target.value)}
                                    fullWidth
                                />

                            </div>

                            <div style={{ margin: 'auto', marginTop: 15, width: '80%', display: 'flex', justifyContent: 'end' }}>
                                <Button variant="contained" onClick={() => dataedit(editid)}>
                                    Update
                                </Button>
                            </div>

                        </div>
                    </Box>
                </Modal>

                <Modal
                    open={modalOpen}
                    onClose={() => { setModalOpen(false) }}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >

                    <Box sx={styles.modalStyle}>

                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: '93% 3%',
                            alignItems: 'center',
                            color: '#FFFFFF',
                            borderRadius: '4px 4px 0px 0px',
                            fontFamily: 'Roboto',
                            backgroundColor: '#1976D2',
                            padding: 7,

                        }}>
                            <div style={{ paddingLeft: 4 }}>Task</div>
                            <CloseIcon cursor="pointer" style={{ paddingRight: 4 }} color="#000" onClick={() => { setModalOpen(false) }} />

                        </div>

                        <div style={{ padding: 20 }}>
                            <div style={{ width: '75%', margin: 'auto', marginTop: 4 }}>

                                <TextField
                                    style={{ width: '100%', color: 'black', }}
                                    placeholder="Task ID"
                                    sx={{
                                        input: {
                                            color: 'black',
                                            "&::placeholder": {    // <----- Add this.
                                                opacity: 0.7,
                                            },
                                        },
                                        label: { color: 'blue' }
                                    }}

                                    value={taskid}
                                    onChange={(e) => { setTaskid(e.target.value) }}
                                    fullWidth
                                />{alert5 ?
                                    <Alert
                                        sx={{
                                            width: '80%',
                                            margin: 'auto',
                                            color: 'red',
                                            backgroundColor: 'white',
                                            padding: 1,
                                            lineHeight: .1

                                        }}
                                        icon={false}
                                        open={open}
                                    >
                                        {alertMessage}
                                    </Alert> : <></>}

                                <TextField
                                    style={{ width: '100%', marginTop: 10, padding: 5 }}
                                    placeholder="Task Name"
                                    sx={{
                                        input: {
                                            color: 'black',
                                            "&::placeholder": {    // <----- Add this.
                                                opacity: 0.7,
                                            },
                                        },
                                        label: { color: 'blue' }
                                    }}

                                    value={task}
                                    onChange={(e) => { setTask(e.target.value) }}
                                    fullWidth
                                />
                                {alert1 ?
                                    <Alert
                                        sx={{
                                            width: '80%',
                                            margin: 'auto',
                                            color: 'red',
                                            backgroundColor: 'white',
                                            padding: 1,
                                            lineHeight: .1

                                        }}
                                        icon={false}
                                        open={open}
                                    >
                                        {alertMessage}
                                    </Alert> : <></>}

                                <Select
                                    value={priority}
                                    defaultValue="Priority"
                                    placeholder="Priority"
                                    style={{ width: '100%', marginTop: 10, padding: 5 }}
                                    onChange={(e) => setPriority(e.target.value)}
                                >

                                    {priorites.map((priority) => (
                                        <MenuItem value={priority}>{priority}</MenuItem>

                                    ))}
                                </Select>
                                {alert2 ?
                                    <Alert
                                        sx={{
                                            width: '80%',
                                            margin: 'auto',
                                            color: 'red',
                                            backgroundColor: 'white',
                                            padding: 1,
                                            lineHeight: .1

                                        }}
                                        icon={false}
                                        open={open}
                                    >
                                        {alertMessage}
                                    </Alert> : <></>}

                                <TextField
                                    style={{ width: '100%', marginTop: 10, padding: 5 }}
                                    placeholder="date planned"
                                    type="date"

                                    value={dateDisplay}
                                    onChange={(e) => handleDate(e.target.value)}
                                    fullWidth
                                />
                                {alert3 ?
                                    <Alert
                                        sx={{
                                            width: '80%',
                                            margin: 'auto',
                                            color: 'red',
                                            backgroundColor: 'white',
                                            padding: 1,
                                            lineHeight: .1

                                        }}
                                        icon={false}
                                        open={open}>
                                        {alertMessage}
                                    </Alert> : <></>}

                            </div>
                            {addtask && (
                                <div style={{ margin: 'auto', marginTop: 15, width: '80%', display: 'flex', justifyContent: 'end' }}>
                                    <Button variant="contained" onClick={() => handleClick()}>
                                        Add task
                                    </Button>
                                </div>
                            )}
                        </div>
                    </Box>
                </Modal>

                {showMenu && <CustomMenu xPos={menuPosition.xPos} yPos={menuPosition.yPos} onHide={handleHideMenu}
                    editFun={editFun} delFun={delFun} />}

                <Modal
                    open={modalOpenexcel}
                    onClose={() => { setModalOpenexcel(false) }}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >

                    <Box sx={styles.modalStyle}>

                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: '93% 3%',
                            alignItems: 'center',
                            color: '#FFFFFF',
                            borderRadius: '4px 4px 0px 0px',
                            fontFamily: 'Roboto',
                            backgroundColor: '#1976D2',
                            padding: 7

                        }}>
                            <div style={{ paddingLeft: 4 }}>Task</div>
                            <CloseIcon cursor="pointer" style={{ paddingRight: 4 }} color="#000" onClick={() => { setModalOpenexcel(false); setTaskexcel([]); setExceltask(false) }} />

                        </div>

                        <div style={{ padding: 4 }}>
                            <div style={{ width: '80%', margin: 'auto', marginTop: 5 }}>

                                <TextField
                                    style={{ width: '100%' }}
                                    id="outlined-multiline-static"
                                    value={taskexcel}
                                    onChange={(e) => { setTaskexcel(e.target.value) }}
                                    label="Multiline"
                                    multiline
                                    rows={10}

                                />



                            </div>
                            {alertexcel ?
                                <Alert
                                    sx={{
                                        width: '80%',
                                        margin: 'auto',
                                        color: 'red',
                                        backgroundColor: 'white',
                                        padding: 1,
                                        lineHeight: .1

                                    }}
                                    icon={false}
                                    open={open}>
                                    {alertMessage}
                                </Alert> : <></>}
                            {exceltask && (
                                <div style={{ margin: 'auto', marginTop: 15, width: '80%', display: 'flex', justifyContent: 'end' }}>
                                    <Button variant="contained" onClick={() => ADDbundletask()}
                                    >Add bundleData</Button>
                                </div>
                            )}

                        </div>
                    </Box>
                </Modal>

            </div>

            {addColumnModal()}

            <div style={{ height: '68vh', overflowX: 'scroll', overflow: 'auto', marginTop: 10, backgroundColor: 'black' }}>
                <table style={{
                    borderColor: 'black', borderCollapse: 'collapse', backgroundColor: 'black',
                    fontFamily: 'Roboto', margin: 'auto', fontWeight: 600, overflowX: 'scroll', overflow: 'auto',
                }}>
                    
                    <tr style={{ backgroundColor: 'black', overflowX: 'scroll', position: 'sticky',zIndex:3}}>
               
                        {toggleDelete &&
                            <th style={{

                                border: '1px solid black',
                                padding: 10,
                                backgroundColor: 'lightgrey',
                                color: 'black',
                                  top: -2,

                                position: 'sticky',
                                fontSize: 40,
                                // display: 'flex',
                                whiteSpace:'nowrap',
                                zIndex:1,
                                overflow:'hidden'
                              

                            }}>
                            <div style={{position:'sticky',zIndex:0,overflow:'hidden'}}> <Checkbox
                                    checked={isSelectall}
                                    onChange={() => handleSelectAll()}
                                    style={{ color: 'black', fontSize: 30, paddingTop: 15, position: 'sticky',zIndex:0,overflow:'hidden' }}
/>
                 <>Select All</></div>



                            </th>}
                        {columns.map((column, index) => (
                            <th style={{
                                ...columnstyle(index),
                                whiteSpace: 'nowrap', fontWeight:'bolder' // Prevent line breaks in the header name
                            }}>

                                {column}
                                {handleSort(column,index)}
</th>
                        ))}

                    </tr>

                    {/* <div> */}
                    {addedTasks.map((task, index) => (



                        <tr style={{ backgroundColor: hover === index ? '#3D3B3B' : 'black', fontWeight: 400, cursor: 'pointer', }} onMouseEnter={() => setHover(index)}
                            onMouseLeave={() => setHover(null)}
                            onContextMenu={(e) => handleContextMenu(e, task)}
                        >
                            {toggleDelete &&
                                <th style={{ borderRight: '1px solid white' }}>
                                    {isSelectall ? (
                                        <Checkbox
                                            checked={true}
                                            onChange={() => handleCheckbox(task)}
                                            style={{ color: 'white' }}
                                        />) :
                                        (<Checkbox
                                            checked={checkedTasks.includes(task.id) ? true : false}
                                            onChange={() => handleCheckbox(task)}
                                            style={{ color: 'white' }}
                                        />)
                                    }

                                </th>}

                            {columns.map((column, columnIndex) => (
                                <td key={columnIndex} style={{
                                    padding: 8, color: task.priority === "Low" ? "green" : task.priority === "low" ? "green" : task.priority === "Medium" ? "yellow" : task.priority === "medium" ? "yellow" : "red",
                                    fontSize: 42, textAlign: 'right', borderRight: '1px solid white'
                                }}      >
                                    {task[convertToSnakeCase(column)]}


                                </td>
                            ))}

                        </tr>

                    ))}


                </table>
            </div>
            <div style={{
                height: '3vh', position: 'sticky', bottom: 0, width: '100%', display: 'flex',
                justifyContent: 'center', alignItems: 'center', color: 'black', marginTop: 10
            }}>
                {isAlertVisible ? <div style={{ color: 'green', fontSize: 20, alignItems: 'flex-start', textAlign: 'center', marginBottom: 3 }}>Successfuly Task Deleted....</div> : <></>}
                <div style={{ position: 'sticky', marginBottom: 3 }}><p> Copyright &#169; 2023. All rights reserved.</p></div>
            </div>
        </div>
    )
}
const styles = {
    modalStyle: {
        position: 'absolute',
        top: '40%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '35%',
        bgcolor: 'background.paper',
        boxShadow: 24,
        borderRadius: 2,

    },
    modalStyle1: {
        position: 'absolute',
        top: '40%',
        left: '50%',
        width: '10%',
        height: '20%',
        bgcolor: 'background.paper',
        boxShadow: 24,

    },

}
export default Table1