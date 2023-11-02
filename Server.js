const express = require('express');
const cors = require('cors');
const app = express();
const pool =require('./dbConnector');



app.use(cors());
app.use(express.json());
function convertToSnakeCase(inputString) {
    return inputString.toLowerCase().replace(/\s+/g, '_');
  }
  function convertToRegularCase(inputString) {
    return inputString.replace(/_./g, match => match.charAt(1).toUpperCase());
  }
  function convertUnderscoreToSpace(inputString) {
    return inputString.replace(/_/g, ' ');
  }
  app.post('/updateTask', async (req, res) => {
   
    try {
    
      const { task} = req.body;
      const id = task.id
      delete task.id
      const valuesArray = Object.values(task);
const keysArray = Object.keys(task).map(key => key);
const columnValuePairs = keysArray.map((key, index) => `"${key}"= $${index + 1}`).join(', ');
console.log(columnValuePairs,'colpairs');
// console.log("task",columnValuePairs)
const query =  `UPDATE task SET ${columnValuePairs} WHERE id = ${id}`
      const update = await pool.query(query,valuesArray);
  
        res.status(200).send('Success');
      
    } catch (err) {
      console.log(err, "ERROR STATUS");
    }
  });
  
app.post('/task',async(req,res)=>{
    try{
       
        const{valueObject}=req.body;
        // console.log(valueObject,'valid');
        const valuesArray = Object.values(valueObject);
     console.log(valueObject,'valid');

        const keysArray = Object.keys(valueObject).map(key =>`"${key}"`);
        console.log('keysarray',keysArray)
        const columnNames = keysArray.join(', ');
        const placeholders = valuesArray.map((_, index) => `$${index + 1}`).join(', ');
       console.log(columnNames,placeholders,'cppp',keysArray);
        const query = `INSERT INTO task (${columnNames}) VALUES(${placeholders})`;
        
        await pool.query(query, valuesArray);
        
        res.json("SUCCESS")
         
    }
    catch(err){
        console.log(err,"ERROR STATUS");

       
    }
 })

   

app.post('/dragcolvalue', async (req, res) => {
  try {
    const { taskcolumn } = req.body;
   
    console.log(taskcolumn,'columnsss')
    // Delete all existing data from the table
    await pool.query('DELETE FROM columns');
    
    const valuesPart = taskcolumn.map(value => `('${value}')`).join(',');
    const query = `INSERT INTO columns (columnnames) VALUES ${valuesPart}`;

    await pool.query(query);

    res.json("SUCCESS");
  } catch (e) {
    console.log(e, 'error');
    res.status(500).json("Error occurred");
  }
});


   



 app.get('/getalltasks',async(req,res)=>{
    try{
        // await pool.query("create table if not exists column_names (id serial primary key , column_names varchar)" )

        await pool.query(`create table if not exists task (id serial primary key,"Task id" BIGINT,"Task name" varchar,"Priority" varchar,"Date planned" varchar)`)
        
        const tasks =await pool.query( "select * from task");
        console.log('works');
        await pool.query ('create table if not exists columns (id serial primary key,columnnames varchar unique) ')
        const result = await pool.query('SELECT COUNT(*) FROM columns WHERE columnnames IS NULL');

      
        
      
        const columns  = await pool.query("SELECT column_name FROM information_schema.columns WHERE table_name = 'task'")
        const columnOrder = await pool.query('select columnnames from columns')
        console.log(columnOrder.rows.length,'rws');
        if(columnOrder.rows.length==0){
          await pool.query(`Insert into columns (columnnames) values('Task id'),('Task name'),('Priority'),('Date planned')`)
        }
        var columnNames
        var columnNames = columnOrder.rows.map((object)=>object.columnnames)
        
 
      
        // columnNames.shift()
        const responseData = {
            tasks: tasks.rows,
            columns: columnNames,
           
          };

          
        res.json(responseData)
        
      
         
    }
    catch(err){
        console.log(err,"INSERT ERROR ");

       
    }
 })

 app.post('/modifycolumn',async(req,res)=>{
    try{
       
        const{func,columnname,datatype,existingColumns}=req.body;

        var taskTableResponse = null
        var columnTableResponse = null
        console.log(existingColumns,'columnsavailable')
        
        if(func==='add'){
          existingColumns.push(columnname)
          console.log(existingColumns,'addedcolumns')
          const valuesPart = existingColumns.map(value => `('${value}')`).join(',');
          await pool.query('delete from columns')
            taskTableResponse = await pool.query( `ALTER TABLE task ADD "${columnname}" VARCHAR;`)
            await pool.query( `INSERT INTO columns (columnnames) VALUES ${valuesPart}`)
        }
        if(func==='delete')
        {
          console.log(existingColumns,'test',columnname)
          var columnIndex = existingColumns.indexOf(columnname)
          existingColumns.splice(columnIndex,1)
         
          const valuesPart = existingColumns.map(value => `('${value}')`).join(',');
          await pool.query('delete from columns')
            taskTableResponse = await pool.query( ` ALTER TABLE task DROP COLUMN "${columnname}"`)                       
            await pool.query( `INSERT INTO columns (columnnames) VALUES ${valuesPart}`)
        }
        res.status(200).send('Success');
         
    }
    
    catch(err){
        console.log(err,"ERROR STATUS");

       
    }
 })
 app.post('/deletetasks',async(req,res)=>{
    const {id} = req.body
   
   try{
    await pool.query(`delete from task where id IN (${[...id]})`)
    res.status(200).send('Success');
   }
   catch(e)
   {
    res.status(200).send('Error');
   }
 })
app.listen(3004,()=>{
    console.log(' 3004 port connected');
  })