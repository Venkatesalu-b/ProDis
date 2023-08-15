import React, { useEffect, useState } from "react";
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import { Remove } from "@mui/icons-material";
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
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import CustomMenu from "./Custommenu";
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';


const Table1 = () => {
    const [taskexcel, setTaskexcel] = useState(``);
    const [addedTasks, setAddedTasks] = useState([])
    const [modalOpen, setModalOpen] = useState(false);
    const [modalOpenexcel, setModalOpenexcel] = useState(false);
    const [addModalOpen, setAddModalOpen] = useState(false)
    const [columnName, setColumnName] = useState('')
    const [toggleDelete, setToggleDelete] = useState(false);
    const [toggleColDelete, setToggleColDelete] = useState(false)
    const defaultColumns = ['task_id', 'task_name', 'priority', 'date_planned']
    const snackText = "Click on the - symbol near column name to delete the column."
    const [snackbarText, setSnackbarText] = useState(snackText)
    const [alertBar, setAlertBar] = useState(false)
    const [alertbarText, setAlertbarText] = useState('')
    const [columns, setColumns] = useState(defaultColumns)
    const priorites = ['Low', 'Medium', 'High']
    const [sortAscending, setSortAscending] = useState(true);
    const [activeSort, setActiveSort] = useState(null)
    const [modaledit, setModaledit] = useState(false);
    const [isSelectall, setIsSelectAll] = useState(false)
    const [checkedTasks, setCheckedTasks] = useState([])
    const [editData, setEditdata] = useState({})
    const [deleteModal, setDeleteModal] = useState(false)
    const [stateObj, setStateObj] = useState({})
    const [isbuttonVisible, setIsButtonVisible] = useState(false)
    const [menuPosition, setMenuPosition] = useState({ xPos: '0px', yPos: '0px' });
    const [showMenu, setShowMenu] = useState(false);

    const handleSelectAll = () => {
        if (isSelectall && checkedTasks.length === 0) {
            setIsSelectAll(false)
            setCheckedTasks([])
            return
        }
        setIsSelectAll(true)
        const idArray = addedTasks.map(item => item.id);
        setCheckedTasks(idArray)

    }
    const handleCheckbox = (task) => {
        setIsSelectAll(false)
        if (checkedTasks.includes(task.id)) {
            let index = checkedTasks.indexOf(task.id);
            let updatedArr = [...checkedTasks]
            updatedArr.splice(index, 1)
            console.log(updatedArr, "DELTE!")
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
    const [isColButton, setIsColButton] = useState(false)

    useEffect(() => {
        const objLength = Object.keys(stateObj)?.length;
        const editObjLength = Object.keys(editData)?.length;

        if (columnName !== '') {
            setIsColButton(true)
        }
        else {
            setIsColButton(false)
        }


        // for (let key in stateObj) {
        //     console.log(key,"DEBUGGING",stateObj.hasOwnProperty(key) && stateObj[key] === undefined || stateObj[key] === '' &&
        //     objLength !== columns.length || stateObj.date_planned&&stateObj?.date_planned[0]!=='u')

        //     if (stateObj.hasOwnProperty(key) && stateObj[key] === undefined || stateObj[key] === '' &&
        //     objLength !== columns.length || stateObj.date_planned&&stateObj?.date_planned[0]!=='u'
        //     ) {

        //         setIsButtonVisible(false)

        //     }
        //     else {
        //         console.log("DEBUGGING23")
        //         setIsButtonVisible(true)
        //     }
        // }
        // if (editObjLength === columns.length && editData.date_planned&&editData?.date_planned[0]!=='u') {
        //     console.log("DEBUGGING2")
        //     const objLength = Object.keys(stateObj)?.length;
        //     setIsButtonVisible(true)

        // }
        // for (let key in editData) {
        //     if (editData.hasOwnProperty(key) && editData[key] !== undefined && editData[key] !== '') {
        //         console.log("DEBUGGING1")
        //         setIsButtonVisible(true)
        //     }
        // }

        buttonVisibility()


    }, [stateObj, columnName, editData])
    const buttonVisibility = () => {
        console.log(stateObj, "STTEOBJJJ")
        const objLength = Object.keys(stateObj).length;

        if (stateObj.date_planned && stateObj.date_planned[0] === 'u') {
            console.log("STATEOBJJ", stateObj.date_planned[0])
            setIsButtonVisible(false);
            return
        }

        for (let key in stateObj) {
            if (stateObj.hasOwnProperty(key)) {
                if (typeof stateObj[key] === 'undefined' || stateObj[key] === '') {

                    setIsButtonVisible(false);
                    return
                }
            }
        }

        if (objLength !== columns.length) {
            setIsButtonVisible(false)
            return
        }
        setIsButtonVisible(true)
        return
    }
    const ibility = () => {
        const objLength = Object.keys(stateObj).length;

        if (stateObj.date_planned && stateObj.date_planned[0] === 'u') {
            console.log("STATEOBJJ", stateObj.date_planned[0])
            setIsButtonVisible(false);
            return
        }

        for (let key in stateObj) {
            if (stateObj.hasOwnProperty(key)) {
                if (typeof stateObj[key] === 'undefined' || stateObj[key] === '') {

                    setIsButtonVisible(false);
                    return
                }
            }
        }

        if (objLength !== columns.length) {
            setIsButtonVisible(false)
            return
        }
        setIsButtonVisible(true)
        return
    }
    const validate = (validatingArea, obj) => {
        const objLength = Object.keys(obj).length;
        if (validatingArea === 'addColumn' && columnName === '') {
            setAlertBar(true)
            setAlertbarText("Please enter a column name")
            return false
        }
        // if (validatingArea === 'addColumn') {
        //     if (!(/^[a-zA-Z0-9]+$/.test(columnName))) {

        //         setAlertBar(true)
        //         setAlertbarText("column names can only have alphabetic or alphanumeric characters")
        //         return false
        //     }
        //     return true
        // }

        if (validatingArea === 'Bundle') {
            if (objLength !== columns.length) {
                setAlertBar(true)
                setAlertbarText("Adding bundle value failed row(s) has empty value ")
                return false
            }
            else {
                for (let key in obj) {
                    if (obj.hasOwnProperty(key) && obj[key] === undefined || obj[key] === '') {
                        setAlertBar(true)
                        setAlertbarText("Adding bundle value failed row(s) has empty value")
                        return false;
                    }
                }
            }


        }
        if (objLength !== columns.length || obj.date_planned[0] === 'u') {
            setAlertBar(true)
            setAlertbarText("All fields must be filled")
            return false
        }
        if (isNaN(obj.task_id)) {
            setAlertBar(true)
            setAlertbarText("Task id should only contain number")
            return false
        }
        for (let key in obj) {
            if (obj.hasOwnProperty(key) && obj[key] === undefined || obj[key] === '') {
                setAlertBar(true)
                setAlertbarText("All fields must be filled")
                return false;
            }
        }
        setAlertBar(false)
        return true;
    }
    console.log(stateObj, "STATECHECK")
    const handleAddClick = () => {
        var isvalidated = validate(false, stateObj)
        if (!isvalidated) {
            return
        }
        addData(stateObj)
        setModalOpen(false)
        fetchAllData()

    }
    const addBundleTask = async () => {

        if (taskexcel === '' || taskexcel.length === 0) {
            return
        }
        const lines = taskexcel?.split('\n');
        var columnNamesAvail = [...columns]
        var addedValues = []

        for (let index = 0; index < lines.length - 1; index++) {
            const line = lines[index];
            columnNamesAvail = line.split('\t');
            let objValue = {}
            for (var i = 0; i < columns.length; i++) {
                objValue[columns[i]] = columnNamesAvail[i]
            }

            var isvalid = validate('Bundle', objValue)
            if (!isvalid) {
                return
            }

            addedValues.push(objValue)
        }
        try {
            const requests = addedValues.map(async (item) => {
                const response = await fetch("http://localhost:3004/task", {
                    method: 'post',
                    body: JSON.stringify({
                        "valueObject": item
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
            await Promise.all(requests);
        }
        catch (error) {
            console.log('Error:', error);
        }
        setTaskexcel([])
        fetchAllData()
        setModalOpenexcel(false)
    }

    function convertUnderscoreToSpace(inputString) {
        var string1 = inputString.replaceAll("_", ' ');
        return string1.charAt(0).toUpperCase() + string1.slice(1);
    }
    function converttoSnakecase(inputString) {
        var string1 = inputString?.replace(" ", '_');
        return string1?.toLowerCase()
    }
    const actionForAlert = (
        <React.Fragment>
            <Button color="primary" size="small" style={{ fontWeight: 600 }} onClick={() => { setToggleColDelete(false); }}>
                Exit delete mode
            </Button>

        </React.Fragment>
    );
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
                    setAddedTasks(data.tasks)

                })
        }
        catch (error) {

            console.log('error::', error);
        }
    }
    useEffect(() => {
        fetchAllData()
    }, [])

    const addData = async () => {
        try {
            await fetch("http://localhost:3004/task", {
                method: 'post',
                body: JSON.stringify({
                    "valueObject": stateObj
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log('DataAdded :::', data)
                })
        }
        catch (error) {
            console.log('error:', error);
        }
        setStateObj({})
    }
    const addColumn = async (func) => {
        // var isValid = validate('addColumn', columnName)
        // if (!isValid) {
        //     return
        // }
        
        if (columns.includes(converttoSnakecase(columnName))) {
            setAlertBar(true)
            setAlertbarText("Column names cannot be same ")
            return
        }
        let temparr = [...columns, columnName]
        setColumns(temparr)
        setAlertBar(false)
        try {
            const response = await fetch("http://localhost:3004/modifycolumn", {
                method: 'post',
                body: JSON.stringify({
                    "func": func,
                    "columnname": converttoSnakecase(columnName),
                    "datatype": 'varchar',
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            });
            if (!response.ok) {
                throw new Error('Request failed with status ' + response.status);
            }
            setAddModalOpen(false)
        } catch (error) {
            console.error("An error occurred:", error);
        }
        fetchAllData()
        setColumnName('')
        setAddModalOpen(false)


    }
    console.log(isbuttonVisible, "BUTTONVISIBILITY")
    const addColumnModal = () => {
        return (
            <Modal
                open={addModalOpen}
                onClose={() => { setAddModalOpen(false); setAlertBar(false); }}
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
                        <CloseIcon cursor="pointer" color="#FFFFFF" style={{ paddingRight: 4 }} onClick={() => { setAddModalOpen(false); setAlertBar(false) }} />

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
                        </div>
                        <div style={{ margin: 'auto', marginTop: 15, width: '80%', display: 'flex', justifyContent: 'end' }}>
                            {isColButton && <Button variant="contained" onClick={() => addColumn("add")}
                            >Add column</Button>}
                        </div>
                    </div>
                </Box>
            </Modal>
        )
    }


    const editFun = () => {
        setModaledit(true)

    }
    const delFun = () => {
        setCheckedTasks([editData.id])
        handleDelete(false, [editData.id])
    }
    const columnDeleteFun = async () => {
        let func = "delete"
        if (toggleColDelete) {
            if (defaultColumns.includes(columnName)) {
                setSnackbarText("Can't delete default columns")
                setTimeout(() => { setSnackbarText(snackText) }, 2000)
                return
            }
            try {
                let updatedArray = columns.filter(value => value !== columnName);
                setColumns(updatedArray)
                await fetch("http://localhost:3004/modifycolumn", {
                    method: 'post',
                    body: JSON.stringify({
                        "func": func,
                        "columnname": columnName,
                        "datatype": 'VARCHAR',
                    }),
                    headers: {

                        'Content-type': 'application/json; charset=UTF-8',
                    },

                })
            }
            catch (error) {

                console.log('error', error);
            }
        }

    }
    const columnstyle = (index) => {

        return {
            border: '2px solid black',
            padding: 10,
            backgroundColor: 'lightgrey',
            color: 'black',
            top: -2,
            position: 'sticky',
            fontSize: 40,

        }
    }
    function convertToSnakeCase(inputString) {
        return inputString.toLowerCase().replace(/\s+/g, '_');
    }
    const handleDelete = async (optionDelete, id) => {
        if (optionDelete && checkedTasks.length === 0) {
            setToggleDelete(!toggleDelete)
        }
        else {
            try {
                const response = await fetch("http://localhost:3004/deletetasks", {
                    method: 'post',
                    body: JSON.stringify({
                        "id": id || checkedTasks
                    }),
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                    },
                });
                setToggleDelete(false)
            }

            catch (error) {
                setIsSelectAll(false)
                console.log('Error:', error);
            }


            setIsSelectAll(false)
            fetchAllData()
            setCheckedTasks([])
            setEditdata({})
        }
        setIsSelectAll(false)
    }

    const handleContextMenu = (event, taskValue, id) => {
        event.preventDefault();
        const xPos = `${event.pageX}px`;
        const yPos = `${event.pageY}px`;
        setMenuPosition({ xPos, yPos });
        var task = { ...taskValue }
        console.log("TASKK", task)

        const dateFormat = task?.date_planned?.split('-');
        const formattedDate = `${dateFormat[2]}-${dateFormat[1]}-${dateFormat[0]}`;
        task.date_planned = formattedDate;
        console.log("TASKK", task)
        setEditdata(task);
        setToggleColDelete(false)
        setToggleDelete(false)

        setShowMenu(true);
    };

    const handleHideMenu = () => {
        setShowMenu(false);
    };
    const handleSort = (column, index) => {
        if (index === activeSort) {
            return (
                <>
                    {!sortAscending ? (
                        <FontAwesomeIcon color="black" icon={faChevronDown}
                            style={{ marginLeft: 15, color: '#424949', fontSize: 15, cursor: 'pointer' }} onClick={() => toggleSort1(convertToSnakeCase(column), index)} />)
                        :
                        (
                            <FontAwesomeIcon color="black" icon={faChevronUp}
                                style={{ marginLeft: 15, color: '#424949', fontSize: 15, cursor: 'pointer' }} onClick={() => toggleSort1(convertToSnakeCase(column), index)} />)
                    }
                </>
            )
        }
        return (

            <FontAwesomeIcon color="black" icon={faChevronDown}
                style={{ marginLeft: 15, color: '#424949', fontSize: 15, cursor: 'pointer' }} onClick={() => { toggleSort1(convertToSnakeCase(column), index); setActiveSort(index) }} />)

    }
    const toggleSort1 = (column, index) => {
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

    const handleState = (key, value) => {

        let valueC = value
        if (key === "task_id") {
            valueC = parseInt(value, 10)
        }
        if (key === "date_planned") {
            const [year, month, day] = value.split('-');
            valueC = `${day}-${month}-${year}`;
        }
        setStateObj(prevState => ({
            ...prevState,
            [key]: valueC
        }));
    };
    const handleEditState = (key, value) => {

        setEditdata(prevState => ({
            ...prevState,
            [key]: value
        }));
    }
    console.log("VALUEE", editData)
    const [colHover, setColHover] = useState(null)

    const handleClear = () => {
        setStateObj({})
    }


    const updateTask = async () => {
        var typeChange = { ...editData }
        const [year, month, day] = typeChange.date_planned.split('-');
        var dateFormatted = `${day}-${month}-${year}`;
        var taskid = parseInt(typeChange.task_id)
        typeChange.date_planned = dateFormatted
        typeChange.task_id = taskid
        try {
            const response = await fetch("http://localhost:3004/updateTask", {
                method: 'post',
                body: JSON.stringify({
                    "task": typeChange
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            });
        }

        catch (error) {
            console.log('Error:', error);
        }
        fetchAllData()
        setEditdata({})
     setModaledit(false)

    }



    return (
        <div>
            <div style={{ width: '100%', height: 50, padding: 5, display: 'flex', justifyContent: 'center', flexDirection: 'row' }}>

                <h1 style={{ fontSize: 45, letterSpacing: 1, color: '#34210E', wordSpacing: 5, marginTop: 2 }}>Production Tasks</h1>

            </div>
            {showMenu && <CustomMenu xPos={menuPosition.xPos} yPos={menuPosition.yPos} editFun={editFun} onHide={handleHideMenu} delFun={delFun} />}
            <div style={{ width: '97%', margin: 'auto', display: 'flex', justifyContent: 'space-between', marginTop: 15, marginBottom: 10, padding: 5 }}>
                <Button variant="contained" startIcon={<AddIcon />} style={{ width: 150 }} onClick={() => {
                    setToggleColDelete(false); setModalOpen(true); setToggleDelete(false)
                }}>Add Task</Button>
                <Button variant="contained" startIcon={<AddIcon />} onClick={() => {
                    setModalOpenexcel(true); setToggleColDelete(false); setToggleDelete(false)
                }}>Bulk Insert</Button>
                <div >
                    <Button variant="contained" startIcon={<AddIcon />} onClick={() => {
                        setAddModalOpen(true); setToggleColDelete(false); setToggleDelete(false)
                    }}>Add Header</Button> </div>

                <div><Button variant="contained" startIcon={<Remove />} style={{ backgroundColor: toggleColDelete ? '#C61414' : '#1976D2', marginLeft: '20px', wordSpacing: 4 }} onClick={() => {
                    setToggleColDelete(!toggleColDelete)
                }}>Delete Column</Button>
                </div>

                <div><Button variant="contained" startIcon={<Remove />} style={{ backgroundColor: toggleDelete ? '#C61414' : '#1976D2', marginLeft: '20px', wordSpacing: 4, color: '#fff', width: 160 }} onClick={() => {
                    handleDelete(true)

                }}> Delete Task</Button>
                </div>
                <Snackbar
                    open={toggleColDelete}
                    autoHideDuration={undefined}
                    message={snackbarText}
                    action={actionForAlert}
                />
                <Snackbar
                    open={alertBar}
                    autoHideDuration={3000}
                    onClose={() => setAlertBar(false)}
                    message={alertbarText}

                />
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
                            <div style={{ paddingLeft: 4 }}> Edit Task</div>
                            <CloseIcon cursor="pointer" style={{ paddingRight: 4 }} color="#000" onClick={() => { setModaledit(false) }} />

                        </div>

                        <div style={{ padding: 20 }}>
                            <div style={{ width: '75%', margin: 'auto', marginTop: 4 }}>
                                {columns.map((colName) => (
                                    colName === "priority" ? (<Select
                                        value={editData[colName]}
                                        style={{ width: '100%', marginTop: 10, padding: 5 }}
                                        onChange={(e) => handleEditState(colName, e.target.value)}
                                        inputProps={{ 'aria-label': 'Without label' }}

                                    >
                                        {priorites.map((priority) => (
                                            <MenuItem value={priority}>{priority}</MenuItem>

                                        ))}
                                    </Select>) : (
                                        <TextField
                                            style={{ width: '100%', marginTop: 10, padding: 5 }}
                                            type={colName === "date_planned" ? 'date' : 'text'}
                                            placeholder={"Enter " + convertUnderscoreToSpace(colName)}
                                            sx={{
                                                input: {
                                                    color: 'black',
                                                    "&::placeholder": {    // <----- Add this.
                                                        opacity: 0.7,
                                                    },
                                                },
                                                label: { color: 'blue' }
                                            }}
                                            value={editData[colName]}
                                            onChange={(e) => { handleEditState(colName, e.target.value) }}
                                            fullWidth
                                        />)))}
                            </div>
                            <div style={{ margin: 'auto', marginTop: 15, width: '80%', display: 'flex', justifyContent: 'end' }}>
                         <Button variant="contained"
                                    onClick={() => { updateTask() }}
                                >
                                    Update
                                </Button>
                            </div>
                        </div>
                    </Box>
                </Modal>

                <Modal
                    open={deleteModal}
                    onClose={() => { setDeleteModal(false); setColumnName('') }}
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
                            <div style={{ paddingLeft: 4 }}>Delete Column</div>
                            <CloseIcon cursor="pointer" style={{ paddingRight: 4 }} color="#000" onClick={() => { setDeleteModal(false) }} />

                        </div>
                        <div>
                            <p style={{ fontSize: 20, textAlign: 'center' }}>Are you sure you want to delete the column?</p>
                            <div style={{ flexDirection: 'row', display: 'flex', justifyContent: 'end', padding: 10 }}>
                                <Button variant="contained" style={{ marginRight: 30 }}
                                    onClick={() => { setColumnName(''); setDeleteModal(false) }}
                                >
                                    Cancel
                                </Button>
                                <Button variant="contained" style={{ marginRight: 30, backgroundColor: '#D2200B' }}
                                    onClick={() => { columnDeleteFun(); setDeleteModal(false); setColumnName('') }}
                                >
                                    Delete
                                </Button>
                            </div>
                        </div>

                    </Box>
                </Modal>


                <Modal
                    open={modalOpen}
                    onClose={() => { setModalOpen(false); setIsButtonVisible(false); setStateObj({}) }}
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
                            <CloseIcon cursor="pointer" style={{ paddingRight: 4 }} color="#000" onClick={() => { setModalOpen(false); setIsButtonVisible(false); setStateObj({}) }} />

                        </div>

                        <div style={{ padding: 15, height: 300, overflowY: 'auto' }}>
                            <div style={{ width: '75%', margin: 'auto', marginTop: 4 }}>
                                {columns.map((colName) => (
                                    colName === "priority" ? (<Select
                                        value={stateObj[colName] || ''}
                                        style={{ width: '100%', marginTop: 10, padding: 5 }}
                                        onChange={(e) => handleState(colName, e.target.value)}
                                        inputProps={{ 'aria-label': 'Without label' }}
                                        displayEmpty
                                    >
                                        <MenuItem disabled value="">Priority</MenuItem>

                                        {priorites.map((priority) => (
                                            <MenuItem value={priority}>{priority}</MenuItem>
                                        ))}
                                    </Select>) : (
                                        <TextField
                                            style={{ width: '100%', marginTop: 10, padding: 5 }}
                                            type={colName === "date_planned" ? 'date' : 'text'}
                                            placeholder={"Enter " + convertUnderscoreToSpace(colName)}
                                            sx={{
                                                input: {
                                                    color: 'black',
                                                    "&::placeholder": {    // <----- Add this.
                                                        opacity: 0.7,
                                                    },
                                                },
                                                label: { color: 'blue' }
                                            }}
                                            value={stateObj[colName] || ''}
                                            onChange={(e) => { handleState(colName, e.target.value) }}
                                            fullWidth
                                        />)
                                ))}
                            </div>
                            <div style={{ flexDirection: 'row', display: 'flex', justifyContent: 'center', justifyItems: 'flex-end', }}>
                                <div style={{ margin: 'auto', marginTop: 15, width: '80%', display: 'flex', justifyContent: 'end', marginLeft: 80 }}>
                                    {isbuttonVisible && <Button variant="contained" style={{ backgroundColor: '#F68639' }} onClick={() => setStateObj({})}>
                                        Clear
                                    </Button>}
                                </div>

                                <div style={{ margin: 'auto', marginTop: 15, width: '80%', display: 'flex', justifyContent: 'end', marginRight: 40 }}>
                                    {isbuttonVisible && <Button variant="contained" onClick={() => handleAddClick()}>
                                        Add task
                                    </Button>}
                                </div>
                            </div>
                        </div>
                    </Box>
                </Modal>
                <Modal
                    open={modalOpenexcel}
                    onClose={() => { setModalOpenexcel(false); setIsButtonVisible(false) }}
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
                            <CloseIcon cursor="pointer" style={{ paddingRight: 4 }} color="#000" onClick={() => { setModalOpenexcel(false) }} />

                        </div>

                        <div style={{ padding: 4 }}>
                            <div style={{ width: '80%', margin: 'auto', marginTop: 5, overflowY: 'auto', overflowX: 'auto' }}>

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
                            <div style={{ margin: 'auto', marginTop: 15, width: '80%', display: 'flex', justifyContent: 'end' }}>
                                <Button variant="contained" onClick={() => addBundleTask()}
                                >Add bundleData</Button>
                            </div>

                        </div>
                    </Box>
                </Modal>

            </div>

            {addColumnModal()}
            <div style={{ height: '68vh', overflowX: 'scroll', overflow: 'auto', marginTop: 10, backgroundColor: 'black' }}>
                <table style={{
                    borderColor: 'black', borderCollapse: 'collapse', backgroundColor: 'black',
                    fontFamily: 'Roboto', width: '100%', fontWeight: 600, overflowX: 'scroll', overflow: 'auto',borderBottom:'1px solid white'
                }}>
                    <tr style={{ backgroundColor: 'black', overflowX: 'scroll', position: 'sticky', zIndex: 3 }}>
                        {toggleDelete &&
                            <th style={{

                                border: '1px solid black',
                                padding: 10,
                                backgroundColor: 'lightgrey',
                                color: 'black',
                                top: -2,
                                position: 'sticky',
                                fontSize: 40,
                                whiteSpace: 'nowrap',
                                zIndex: 1,
                                overflow: 'hidden'
                            }}>
                                <div style={{ position: 'sticky', zIndex: 0, overflow: 'hidden' }}> <Checkbox
                                    checked={isSelectall}
                                    onChange={() => handleSelectAll()}
                                    style={{ color: 'black', fontSize: 30, paddingTop: 15, position: 'sticky', zIndex: 0, overflow: 'hidden' }}
                                />
                                    <>Select All</></div>
                            </th>}
                        {columns.map((column, index) => (
                            <th
                                key={index}
                                style={{
                                    ...columnstyle(index),
                                    whiteSpace: 'nowrap'
                                }}
                                onClick={() => setColumnName(column)}
                                onMouseEnter={() => setColHover(index)}
                                onMouseLeave={() => setColHover(null)}
                            >                              {!defaultColumns.includes(column) && toggleColDelete &&
                                <RemoveCircleIcon
                                    style={{ color: 'red', cursor: 'pointer' }}
                                    onClick={() => { setDeleteModal(true) }}
                                />
                                }
                                {convertUnderscoreToSpace(column)}
                                {handleSort(column, index)}


                            </th>
                        ))}

                    </tr>
                    {addedTasks.map((task, index) => (
                        <tr
                            key={index}
                            style={{ backgroundColor: 'black', fontWeight: 400, cursor: 'pointer',borderBottom:'1px solid white' }}
                            onContextMenu={(e) => handleContextMenu(e, task)}>
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
                                <td
                                    key={columnIndex} style={{
                                        padding: 8, color: task.priority === "Low" ? "green" : task.priority === "low" ? "green" : task.priority === "Medium" ? "yellow" : task.priority === "medium" ? "yellow" : "red",
                                        fontSize: 42, textAlign: 'right', borderRight: '1px solid white'
                                    }}> 

                                    {console.log(column, "COLUMN IN RENDERING")}
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
        height:'75vh',
        overflowY:'auto'
    },
}
export default Table1