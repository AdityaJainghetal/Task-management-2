import axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react'
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';



const MyTask = () => {
  const [mydata,setMydata] = useState([])
 
 const loadData=async()=>{
  let api=`http://localhost:8000/user/usertaskdisplay?id=${localStorage.getItem("uid")}`;

  const response = await axios.get(api)
  console.log(response.data)
  setMydata(response.data)
 }

 useEffect(()=>{
  loadData()
 },[])

 const taskStatusChange=async(id)=>{
  let api="http://localhost:8000/user/taskstatuschange";
  const response = await axios.post(api, {id:id})
  console.log(response.data);
  loadData()
 }



 
 let sno=0;
    const ans = mydata.map((key)=>{
      sno++;
      return(
        <>
        <tr>
          <td>{sno}</td>
          <td>{key.tasktitle}</td>
          <td>{key.taskdetail}</td>
          <td>{key.taskduration}</td>
          <td>
          <Button variant="primary" onClick={()=>{taskStatusChange(key._id)}}>{key.status}</Button>

          </td>
        </tr>
        
        
        </>

      )
    })


  return (
    <>
    <h1>MyTask</h1>
    <Table striped bordered hover size="sm">
      <thead>
        <tr>
          <th>#</th>
          <th>Task title</th>
          <th>Task detail</th>
          <th>Task time duration in hours</th>
        </tr>
      </thead>
      <tbody>
      {ans}
      </tbody>

      </Table>  
    
     </>
  )
}

export default MyTask