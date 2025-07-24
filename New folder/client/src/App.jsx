import {BrowserRouter, Routes, Route} from "react-router-dom";
import Layout from "./Layout";
import Home from "./pages/Home";
import AdminDashBoard from "./pages/AdminDashBoard";
import Createuser from "./pages/CreateUser";
import AssignTask from './pages/AssignTask';
import UserTaskAssign from "./pages/UserTaskAssign";
import UserDashboard from "./pages/UserDashboard";
import MyTask from './pages/MyTask';
import Changepassword from "./pages/Changepassword";
import DisplayTask from "./pages/DisplayTask";

const App=()=>{
  return(
    <>
    <BrowserRouter>
       <Routes>
        <Route path="/" element={<Layout/>}>
         <Route index element={<Home/>} />
         <Route path="home" element={<Home/>}/>
         <Route path="admindashboard" element={<AdminDashBoard/>}>
         <Route path="createuser" element={<Createuser/>}/>
         <Route path="assigntask" element={<AssignTask/>}/>
         <Route path="usertaskassign/:id" element={<UserTaskAssign/>}/>
         <Route path="displaytask" element={<DisplayTask/>}/>
       
         </Route>
         <Route path="userdashboard" element={<UserDashboard/>}>
         <Route index element={<MyTask/>}/>
          <Route path="mytask" element={<MyTask/>}/>
          <Route path="changepassword" element={<Changepassword/>}/>
         
         
         </Route>
        
         
        </Route>

       </Routes>
    
    </BrowserRouter>
     
    </>
  )
}

export default App;