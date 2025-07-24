// import React, { useEffect, useState } from 'react'
// import Nav from 'react-bootstrap/Nav';
// import { Link, useNavigate } from 'react-router-dom'

// import { Outlet } from 'react-router-dom';


// const UserDashboard = () => {
//     const [username,Setusername] = useState("");
//     const [email,Setemail] =  useState("");
//     const navigate= useNavigate();
//     useEffect(()=>{

//       if(!localStorage.getItem("username")){
//         navigate("/home ")
//       }




//         Setusername(localStorage.getItem("username"))
//         Setemail(localStorage.getItem("useremail"))
//     },[])



//     const userlogout=()=>{
//       localStorage.clear()
//       navigate("/home")
//     }



//   return (
//     <>
//     <div id="userdisplaylogin">
//             Welcome to : {username} Email: {email} | <a href="" onClick={userlogout}>Logout</a> 
//     </div>

//     <div id='userDashboardData'>
//             <div id='userleftmenu'>

//             <Nav defaultActiveKey="/home" className="flex-column">
//       <Nav.Link as={Link} to="mytask">My Task</Nav.Link>
//       <Nav.Link as={Link} to="changepassword">Change Password</Nav.Link>

//         </Nav>
//             </div>
//             <div id='userrightmenu'>

//                 <Outlet/>
//             </div>

//     </div>
    
    
    
//     </>
//   )
// }

// export default UserDashboard

import React, { useEffect, useState } from 'react'
import Nav from 'react-bootstrap/Nav';
import { Link, useNavigate } from 'react-router-dom'
import { Outlet } from 'react-router-dom';

const UserDashboard = () => {
    const [username, Setusername] = useState("");
    const [email, Setemail] = useState("");
    const navigate = useNavigate();
    
    useEffect(() => {
        if (!localStorage.getItem("username")) {
            navigate("/home")
        }

        Setusername(localStorage.getItem("username"))
        Setemail(localStorage.getItem("useremail"))
    }, [])

    const userlogout = () => {
        localStorage.clear()
        navigate("/home")
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
                    <div className="text-sm text-gray-600">
                        Welcome, <span className="font-semibold text-indigo-600">{username}</span> | 
                        <span className="text-gray-500 ml-2">{email}</span>
                    </div>
                    <button 
                        onClick={userlogout}
                        className="px-4 py-2 text-sm text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        Logout
                    </button>
                </div>
            </header>

            {/* Dashboard Layout */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <div className="flex flex-col md:flex-row gap-6">
                    {/* Sidebar */}
                    <div className="w-full md:w-64 flex-shrink-0">
                        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                            <nav className="space-y-2">
                                <Link 
                                    to="mytask"
                                    className="block px-4 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
                                >
                                    My Task
                                </Link>
                                <Link 
                                    to="changepassword"
                                    className="block px-4 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
                                >
                                    Change Password
                                </Link>
                            </nav>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="flex-1">
                        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                            <Outlet />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserDashboard