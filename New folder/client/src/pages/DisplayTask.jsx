// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import Button from 'react-bootstrap/Button';
// import compimg from "../Images/img1.jpg";
// import incompimg from "../Images/img2.jpg";

// const DisplayTask = () => {
//     const [mydata, setMyData] = useState([]);

//     const loadData = async () => {
//         let api = "http://localhost:8000/admin/displaytaskuser";

//         try {
//             const response = await axios.get(api);
//             console.log(response.data);
//             setMyData(response.data);
//         } catch (error) {
//             console.log(error);
//         }
//     };

//     useEffect(() => {
//         loadData();
//     }, []);

//     const deluser = async (id) => {
//         let api = `http://localhost:8000/admin/deleteusertask/?id=${id}`;

//         try {
//             await axios.get(api);
//             alert("Task successfully deleted");
//             loadData();
//         } catch (error) {
//             console.log(error);
//         }
//     };

//     const ans = mydata.map((key, index) => {
//         return (
//             <tr key={key._id} className="hover:bg-gray-100 transition duration-200">
//                 <td className="p-4 text-center">{key.status === "Complete" ? (<img src={compimg} width="30" height="20" alt="Complete" />) : (<img src={incompimg} width="30" height="20" alt="Incomplete" />)}</td>
//                 <td className="p-4 text-center">{key.userid.username}</td>
//                 <td className="p-4 text-center">{key.userid.designation}</td>
//                 <td className="p-4 text-center">{key.userid.email}</td>
//                 <td className="p-4 text-center">{key.tasktitle}</td>
//                 <td className="p-4 text-center">{key.taskdetail}</td>
//                 <td className="p-4 text-center">{key.taskduration}</td>
//                 <td className="p-4 text-center">
//                     <Button variant="danger" onClick={() => { deluser(key._id) }}>Delete</Button>
//                 </td>
//             </tr>
//         );
//     });

//     return (
//         <div className="container mx-auto p-6">
            
//             <div className="overflow-x-auto">
//                 <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
//                     <thead>
//                         <tr className="bg-gray-700">
//                             <th className="p-4 text-left text-white">#</th>
//                             <th className="p-4 text-left text-white" >Username</th>
//                             <th className="p-4 text-left text-white">Designation</th>
//                             <th className="p-4 text-left text-white">Email</th>
//                             <th className="p-4 text-left text-white">Task Title</th>
//                             <th className="p-4 text-left text-white">Task Detail</th>
//                             <th className="p-4 text-left text-white">Task Duration</th>
//                             <th className="p-4 text-left text-white">Delete</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {ans}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
// };

// export default DisplayTask;

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Button, Modal, Form } from 'react-bootstrap';
// import { FiEdit, FiTrash2, FiCheck, FiX, FiClock, FiCalendar } from 'react-icons/fi';
// import compimg from "../Images/img1.jpg";
// import incompimg from "../Images/img2.jpg";

// const DisplayTask = () => {
//     const [tasks, setTasks] = useState([]);
//     const [showEditModal, setShowEditModal] = useState(false);
//     const [currentTask, setCurrentTask] = useState(null);
//     const [loading, setLoading] = useState(false);

//     const loadData = async () => {
//         try {
//             const response = await axios.get("http://localhost:8000/admin/displaytaskuser");
//             setTasks(response.data);
//         } catch (error) {
//             console.error("Error loading tasks:", error);
//         }
//     };

//     useEffect(() => {
//         loadData();
//     }, []);

//     const deleteTask = async (id) => {
//         if (window.confirm("Are you sure you want to delete this task?")) {
//             try {
//                 await axios.delete(`http://localhost:8000/admin/deleteusertask/?id=${id}`);
//                 message.success("Task deleted successfully");
//                 loadData();
//             } catch (error) {
//                 console.error("Error deleting task:", error);
//                 message.error("Failed to delete task");
//             }
//         }
//     };

//     const handleEditClick = (task) => {
//         setCurrentTask(task);
//         setShowEditModal(true);
//     };

//     const handleUpdateTask = async () => {
//         try {
//             setLoading(true);
//             await axios.put(`http://localhost:8000/admin/updatetask/${currentTask._id}`, currentTask);
//             message.success("Task updated successfully");
//             setShowEditModal(false);
//             loadData();
//         } catch (error) {
//             console.error("Error updating task:", error);
//             message.error("Failed to update task");
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setCurrentTask(prev => ({
//             ...prev,
//             [name]: value
//         }));
//     };

//     return (
//         <div className="container mx-auto p-6">
//             <h1 className="text-2xl font-bold mb-6 text-gray-800">Task Management Dashboard</h1>
            
//             <div className="overflow-x-auto bg-white rounded-lg shadow-md">
//                 <table className="min-w-full">
//                     <thead className="bg-gray-800 text-white">
//                         <tr>
//                             <th className="p-4 text-left">Status</th>
//                             <th className="p-4 text-left">Username</th>
//                             <th className="p-4 text-left">Designation</th>
//                             <th className="p-4 text-left">Email</th>
//                             <th className="p-4 text-left">Task Title</th>
//                             <th className="p-4 text-left">Task Detail</th>
//                             <th className="p-4 text-left">Duration</th>
//                             <th className="p-4 text-left">Priority</th>
//                             <th className="p-4 text-left">Due Date</th>
//                             <th className="p-4 text-left">Actions</th>
//                         </tr>
//                     </thead>
//                     <tbody className="divide-y divide-gray-200">
//                         {tasks.map((task) => (
//                             <tr key={task._id} className="hover:bg-gray-50 transition-colors">
//                                 <td className="p-4">
//                                     {task.status === "Complete" ? (
//                                         <img src={compimg} width="30" height="30" alt="Complete" className="mx-auto" />
//                                     ) : (
//                                         <img src={incompimg} width="30" height="30" alt="Incomplete" className="mx-auto" />
//                                     )}
//                                 </td>
//                                 <td className="p-4">{task.userid?.username || 'N/A'}</td>
//                                 <td className="p-4">{task.userid?.designation || 'N/A'}</td>
//                                 <td className="p-4">{task.userid?.email || 'N/A'}</td>
//                                 <td className="p-4 font-medium">{task.tasktitle}</td>
//                                 <td className="p-4 text-gray-600">{task.taskdetail}</td>
//                                 <td className="p-4">{task.taskduration}</td>
//                                 <td className="p-4">
//                                     <span className={`px-2 py-1 rounded-full text-xs ${
//                                         task.priority === 'High' ? 'bg-red-100 text-red-800' :
//                                         task.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
//                                         'bg-green-100 text-green-800'
//                                     }`}>
//                                         {task.priority}
//                                     </span>
//                                 </td>
//                                 <td className="p-4">
//                                     {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'N/A'}
//                                 </td>
//                                 <td className="p-4 flex space-x-2">
//                                     <Button 
//                                         variant="outline-primary" 
//                                         size="sm" 
//                                         onClick={() => handleEditClick(task)}
//                                     >
//                                         <FiEdit className="mr-1" /> Edit
//                                     </Button>
//                                     <Button 
//                                         variant="outline-danger" 
//                                         size="sm" 
//                                         onClick={() => deleteTask(task._id)}
//                                     >
//                                         <FiTrash2 className="mr-1" /> Delete
//                                     </Button>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>

//             {/* Edit Task Modal */}
//             <Modal show={showEditModal} onHide={() => setShowEditModal(false)} size="lg">
//                 <Modal.Header closeButton>
//                     <Modal.Title>Edit Task</Modal.Title>
//                 </Modal.Header>
//                 <Modal.Body>
//                     {currentTask && (
//                         <Form>
//                             <Form.Group className="mb-3">
//                                 <Form.Label>Task Title</Form.Label>
//                                 <Form.Control
//                                     type="text"
//                                     name="tasktitle"
//                                     value={currentTask.tasktitle}
//                                     onChange={handleInputChange}
//                                 />
//                             </Form.Group>

//                             <Form.Group className="mb-3">
//                                 <Form.Label>Task Description</Form.Label>
//                                 <Form.Control
//                                     as="textarea"
//                                     rows={3}
//                                     name="taskdetail"
//                                     value={currentTask.taskdetail}
//                                     onChange={handleInputChange}
//                                 />
//                             </Form.Group>

//                             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
//                                 <Form.Group>
//                                     <Form.Label>Status</Form.Label>
//                                     <Form.Select
//                                         name="status"
//                                         value={currentTask.status}
//                                         onChange={handleInputChange}
//                                     >
//                                         <option value="Not Started">Not Started</option>
//                                         <option value="In Progress">In Progress</option>
//                                         <option value="Completed">Completed</option>
//                                         <option value="On Hold">On Hold</option>
//                                     </Form.Select>
//                                 </Form.Group>

//                                 <Form.Group>
//                                     <Form.Label>Priority</Form.Label>
//                                     <Form.Select
//                                         name="priority"
//                                         value={currentTask.priority}
//                                         onChange={handleInputChange}
//                                     >
//                                         <option value="Low">Low</option>
//                                         <option value="Medium">Medium</option>
//                                         <option value="High">High</option>
//                                         <option value="Urgent">Urgent</option>
//                                     </Form.Select>
//                                 </Form.Group>
//                             </div>

//                             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
//                                 <Form.Group>
//                                     <Form.Label>Duration</Form.Label>
//                                     <Form.Control
//                                         type="text"
//                                         name="taskduration"
//                                         value={currentTask.taskduration}
//                                         onChange={handleInputChange}
//                                     />
//                                 </Form.Group>

//                                 <Form.Group>
//                                     <Form.Label>Due Date</Form.Label>
//                                     <Form.Control
//                                         type="date"
//                                         name="dueDate"
//                                         value={currentTask.dueDate ? currentTask.dueDate.split('T')[0] : ''}
//                                         onChange={handleInputChange}
//                                     />
//                                 </Form.Group>
//                             </div>
//                         </Form>
//                     )}
//                 </Modal.Body>
//                 <Modal.Footer>
//                     <Button variant="secondary" onClick={() => setShowEditModal(false)}>
//                         Cancel
//                     </Button>
//                     <Button variant="primary" onClick={handleUpdateTask} disabled={loading}>
//                         {loading ? 'Saving...' : 'Save Changes'}
//                     </Button>
//                 </Modal.Footer>
//             </Modal>
//         </div>
//     );
// };

// export default DisplayTask;



// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Button, Modal, Form, Badge } from 'react-bootstrap';
// import { 
//   FiEdit, 
//   FiTrash2, 
//   FiCheck, 
//   FiClock, 
//   FiCalendar,
//   FiUser,
//   FiInfo,
//   FiDatabase
// } from 'react-icons/fi';
// import { format, formatDistanceToNow } from 'date-fns';



// const DisplayTask = () => {
//     const [tasks, setTasks] = useState([]);
//     const [showEditModal, setShowEditModal] = useState(false);
//     const [showDetailModal, setShowDetailModal] = useState(false);
//     const [currentTask, setCurrentTask] = useState(null);
//     const [loading, setLoading] = useState(false);
//     const [deleting, setDeleting] = useState(false);

//     const loadData = async () => {
//         try {
//             const response = await axios.get("http://localhost:8000/admin/displaytaskuser");
//             setTasks(response.data);
//         } catch (error) {
//             console.error("Error loading tasks:", error);
//         }
//     };

//     useEffect(() => {
//         loadData();
//     }, []);

// const deleteTask = async (id) => {
//     if (window.confirm("Are you sure you want to delete this task?")) {
//         setDeleting(true);
//         try {
//             await axios.delete(`http://localhost:8000/admin/deleteusertask`, {
//                 data: { id }
//             });
//             toast.success("Task deleted successfully");
//             loadData();
//         } catch (error) {
//             toast.error(error.response?.data?.message || "Failed to delete task");
//         } finally {
//             setDeleting(false);
//         }
//     }
// };


//     const handleEditClick = (task) => {
//         setCurrentTask(task);
//         setShowEditModal(true);
//     };

//     const handleDetailClick = (task) => {
//         setCurrentTask(task);
//         setShowDetailModal(true);
//     };

//     const handleUpdateTask = async () => {
//         try {
//             setLoading(true);
//             await axios.put(`http://localhost:8000/admin/updatetask/${currentTask._id}`, currentTask);
//             alert("Task updated successfully");
//             setShowEditModal(false);
//             loadData();
//         } catch (error) {
//             console.error("Error updating task:", error);
//             alert("Failed to update task");
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setCurrentTask(prev => ({
//             ...prev,
//             [name]: value
//         }));
//     };

//     const getStatusBadge = (status) => {
//         switch(status) {
//             case 'Completed':
//                 return <Badge bg="success">{status}</Badge>;
//             case 'In Progress':
//                 return <Badge bg="primary">{status}</Badge>;
//             case 'On Hold':
//                 return <Badge bg="warning" text="dark">{status}</Badge>;
//             default:
//                 return <Badge bg="secondary">{status}</Badge>;
//         }
//     };

//     const getPriorityBadge = (priority) => {
//         switch(priority) {
//             case 'High':
//                 return <Badge bg="danger">{priority}</Badge>;
//             case 'Medium':
//                 return <Badge bg="warning" text="dark">{priority}</Badge>;
//             case 'Urgent':
//                 return <Badge bg="danger" className="animate-pulse">{priority}</Badge>;
//             default:
//                 return <Badge bg="info">{priority}</Badge>;
//         }
//     };

//     return (
//         <div className="container mx-auto p-6">
//             <h1 className="text-2xl font-bold mb-6 text-gray-800">Task Management Dashboard</h1>
            
//             <div className="overflow-x-auto bg-white rounded-lg shadow-md">
//                 <table className="min-w-full">
//                     <thead className="bg-gray-800 text-white">
//                         <tr>
//                             <th className="p-4 text-left">Status</th>
//                             <th className="p-4 text-left">Task Title</th>
//                             <th className="p-4 text-left">Assigned To</th>
//                             <th className="p-4 text-left">Duration</th>
//                             <th className="p-4 text-left">Created</th>
//                             <th className="p-4 text-left">Actions</th>
//                         </tr>
//                     </thead>
//                     <tbody className="divide-y divide-gray-200">
//                         {tasks.map((task) => (
//                             <tr key={task._id} className="hover:bg-gray-50 transition-colors">
//                                 <td className="p-4">
//                                     {getStatusBadge(task.status)}
//                                 </td>
//                                 <td className="p-4 font-medium">{task.tasktitle}</td>
//                                 <td className="p-4">
//                                     <div className="flex items-center">
//                                         <FiUser className="mr-2 text-gray-500" />
//                                         {task.userid?.username || 'N/A'}
//                                     </div>
//                                 </td>
//                                 <td className="p-4">
//                                     <div className="flex items-center">
//                                         <FiClock className="mr-2 text-gray-500" />
//                                         {task.taskduration}
//                                     </div>
//                                 </td>
//                                 <td className="p-4">
//                                     <div className="flex items-center">
//                                         <FiCalendar className="mr-2 text-gray-500" />
//                                         {format(new Date(task.createdAt), 'MMM dd, yyyy')}
//                                     </div>
//                                 </td>
//                                 <td className="p-4 flex space-x-2">
//                                     <Button 
//                                         variant="outline-info" 
//                                         size="sm" 
//                                         onClick={() => handleDetailClick(task)}
//                                         className="flex items-center"
//                                     >
//                                         <FiInfo className="mr-1" /> Details
//                                     </Button>
//                                     <Button 
//                                         variant="outline-primary" 
//                                         size="sm" 
//                                         onClick={() => handleEditClick(task)}
//                                         className="flex items-center"
//                                     >
//                                         <FiEdit className="mr-1" /> Edit
//                                     </Button>
//                                     <Button 
//                                         // variant="outline-danger" 
//                                         // size="sm" 
//                                         // onClick={() => deleteTask(task._id)}
//                                         // className="flex items-center"
                                       
//     onClick={() => deleteTask(task._id)} 
//     disabled={deleting}
//     className="btn btn-danger"
// >
//     {deleting ? 'Deleting...' : 'Delete'}
//                                       <FiTrash2 className="mr-1" /> Delete
//                                     </Button>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>

//             {/* Edit Task Modal */}
//             <Modal show={showEditModal} onHide={() => setShowEditModal(false)} size="lg">
//                 <Modal.Header closeButton>
//                     <Modal.Title>Edit Task</Modal.Title>
//                 </Modal.Header>
//                 <Modal.Body>
//                     {currentTask && (
//                         <Form>
//                             <Form.Group className="mb-3">
//                                 <Form.Label>Task Title</Form.Label>
//                                 <Form.Control
//                                     type="text"
//                                     name="tasktitle"
//                                     value={currentTask.tasktitle}
//                                     onChange={handleInputChange}
//                                 />
//                             </Form.Group>

//                             <Form.Group className="mb-3">
//                                 <Form.Label>Task Description</Form.Label>
//                                 <Form.Control
//                                     as="textarea"
//                                     rows={3}
//                                     name="taskdetail"
//                                     value={currentTask.taskdetail}
//                                     onChange={handleInputChange}
//                                 />
//                             </Form.Group>

//                             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
//                                 <Form.Group>
//                                     <Form.Label>Status</Form.Label>
//                                     <Form.Select
//                                         name="status"
//                                         value={currentTask.status}
//                                         onChange={handleInputChange}
//                                     >
//                                         <option value="Not Started">Not Started</option>
//                                         <option value="In Progress">In Progress</option>
//                                         <option value="Completed">Completed</option>
//                                         <option value="On Hold">On Hold</option>
//                                     </Form.Select>
//                                 </Form.Group>

//                                 <Form.Group>
//                                     <Form.Label>Priority</Form.Label>
//                                     <Form.Select
//                                         name="priority"
//                                         value={currentTask.priority}
//                                         onChange={handleInputChange}
//                                     >
//                                         <option value="Low">Low</option>
//                                         <option value="Medium">Medium</option>
//                                         <option value="High">High</option>
//                                         <option value="Urgent">Urgent</option>
//                                     </Form.Select>
//                                 </Form.Group>
//                             </div>

//                             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
//                                 <Form.Group>
//                                     <Form.Label>Duration</Form.Label>
//                                     <Form.Control
//                                         type="text"
//                                         name="taskduration"
//                                         value={currentTask.taskduration}
//                                         onChange={handleInputChange}
//                                     />
//                                 </Form.Group>

//                                 <Form.Group>
//                                     <Form.Label>Due Date</Form.Label>
//                                     <Form.Control
//                                         type="date"
//                                         name="dueDate"
//                                         value={currentTask.dueDate ? currentTask.dueDate.split('T')[0] : ''}
//                                         onChange={handleInputChange}
//                                     />
//                                 </Form.Group>
//                             </div>
//                         </Form>
//                     )}
//                 </Modal.Body>
//                 <Modal.Footer>
//                     <Button variant="secondary" onClick={() => setShowEditModal(false)}>
//                         Cancel
//                     </Button>
//                     <Button variant="primary" onClick={handleUpdateTask} disabled={loading}>
//                         {loading ? 'Saving...' : 'Save Changes'}
//                     </Button>
//                 </Modal.Footer>
//             </Modal>

//             {/* Task Detail Modal */}
//             <Modal show={showDetailModal} onHide={() => setShowDetailModal(false)} size="lg">
//                 <Modal.Header closeButton>
//                     <Modal.Title>Task Details</Modal.Title>
//                 </Modal.Header>
//                 <Modal.Body>
//                     {currentTask && (
//                         <div className="space-y-4">
//                             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                                 <div>
//                                     <h5 className="font-bold text-gray-600">Task Title</h5>
//                                     <p>{currentTask.tasktitle}</p>
//                                 </div>
//                                 <div>
//                                     <h5 className="font-bold text-gray-600">Status</h5>
//                                     <p>{getStatusBadge(currentTask.status)}</p>
//                                 </div>
//                             </div>

//                             <div>
//                                 <h5 className="font-bold text-gray-600">Description</h5>
//                                 <p className="whitespace-pre-line">{currentTask.taskdetail || 'No description provided'}</p>
//                             </div>

//                             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                                 <div>
//                                     <h5 className="font-bold text-gray-600">Priority</h5>
//                                     <p>{getPriorityBadge(currentTask.priority)}</p>
//                                 </div>
//                                 <div>
//                                     <h5 className="font-bold text-gray-600">Duration</h5>
//                                     <p>{currentTask.taskduration}</p>
//                                 </div>
//                                 <div>
//                                     <h5 className="font-bold text-gray-600">Due Date</h5>
//                                     <p>{currentTask.dueDate ? format(new Date(currentTask.dueDate), 'MMM dd, yyyy') : 'Not set'}</p>
//                                 </div>
//                             </div>

//                             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                                 <div>
//                                     <h5 className="font-bold text-gray-600">Assigned To</h5>
//                                     <div className="flex items-center">
//                                         <FiUser className="mr-2" />
//                                         {currentTask.userid?.username || 'N/A'}
//                                     </div>
//                                     <div className="text-sm text-gray-500 ml-6">
//                                         {currentTask.userid?.email || ''}
//                                     </div>
//                                 </div>
//                                 <div>
//                                     <h5 className="font-bold text-gray-600">Designation</h5>
//                                     <p>{currentTask.userid?.designation || 'N/A'}</p>
//                                 </div>
//                             </div>

//                             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                                 <div>
//                                     <h5 className="font-bold text-gray-600">Created</h5>
//                                     <div className="flex items-center">
//                                         <FiCalendar className="mr-2" />
//                                         {format(new Date(currentTask.createdAt), 'MMM dd, yyyy HH:mm')}
//                                     </div>
//                                     <div className="text-sm text-gray-500 ml-6">
//                                         ({formatDistanceToNow(new Date(currentTask.createdAt))} ago)
//                                     </div>
//                                 </div>
//                                 <div>
//                                     <h5 className="font-bold text-gray-600">Last Updated</h5>
//                                     <div className="flex items-center">
//                                         <FiDatabase className="mr-2" />
//                                         {format(new Date(currentTask.updatedAt), 'MMM dd, yyyy HH:mm')}
//                                     </div>
//                                     <div className="text-sm text-gray-500 ml-6">
//                                         ({formatDistanceToNow(new Date(currentTask.updatedAt))} ago)
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     )}
//                 </Modal.Body>
//                 <Modal.Footer>
//                     <Button variant="secondary" onClick={() => setShowDetailModal(false)}>
//                         Close
//                     </Button>
//                 </Modal.Footer>
//             </Modal>
//         </div>
//     );
// };

// export default DisplayTask;



import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Modal, Form, Badge } from 'react-bootstrap';
import { 
  FiEdit, 
  FiTrash2, 
  FiCheck, 
  FiClock, 
  FiCalendar,
  FiUser,
  FiInfo,
  FiDatabase
} from 'react-icons/fi';
import { format, formatDistanceToNow } from 'date-fns';
import { toast } from 'react-toastify';

const DisplayTask = () => {
    const [tasks, setTasks] = useState([]);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [currentTask, setCurrentTask] = useState(null);
    const [loading, setLoading] = useState(false);
    const [deleting, setDeleting] = useState(false);

    const loadData = async () => {
        try {
            const response = await axios.get("http://localhost:8000/admin/displaytaskuser");
            setTasks(response.data);
        } catch (error) {
            console.error("Error loading tasks:", error);
            toast.error("Failed to load tasks");
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    const deleteTask = async (id) => {
        if (window.confirm("Are you sure you want to delete this task?")) {
            setDeleting(true);
            try {
                await axios.delete(`http://localhost:8000/admin/deleteusertask`, {
                    data: { id }
                });
                toast.success("Task deleted successfully");
                loadData();
            } catch (error) {
                console.error("Error deleting task:", error);
                toast.error(error.response?.data?.message || "Failed to delete task");
            } finally {
                setDeleting(false);
            }
        }
    };

    const handleEditClick = (task) => {
        setCurrentTask(task);
        setShowEditModal(true);
    };

    const handleDetailClick = (task) => {
        setCurrentTask(task);
        setShowDetailModal(true);
    };

    const handleUpdateTask = async () => {
        try {
            setLoading(true);
            await axios.put(`http://localhost:8000/admin/updatetask/${currentTask._id}`, currentTask);
            toast.success("Task updated successfully");
            setShowEditModal(false);
            loadData();
        } catch (error) {
            console.error("Error updating task:", error);
            toast.error("Failed to update task");
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCurrentTask(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const getStatusBadge = (status) => {
        switch(status) {
            case 'Completed':
                return <Badge bg="success">{status}</Badge>;
            case 'In Progress':
                return <Badge bg="primary">{status}</Badge>;
            case 'On Hold':
                return <Badge bg="warning" text="dark">{status}</Badge>;
            default:
                return <Badge bg="secondary">{status}</Badge>;
        }
    };

    const getPriorityBadge = (priority) => {
        switch(priority) {
            case 'High':
                return <Badge bg="danger">{priority}</Badge>;
            case 'Medium':
                return <Badge bg="warning" text="dark">{priority}</Badge>;
            case 'Urgent':
                return <Badge bg="danger" className="animate-pulse">{priority}</Badge>;
            default:
                return <Badge bg="info">{priority}</Badge>;
        }
    };

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6 text-gray-800">Task Management Dashboard</h1>
            
            <div className="overflow-x-auto bg-white rounded-lg shadow-md">
                <table className="min-w-full">
                    <thead className="bg-gray-800 text-white">
                        <tr>
                            <th className="p-4 text-left">Status</th>
                            <th className="p-4 text-left">Task Title</th>
                            <th className="p-4 text-left">Assigned To</th>
                            <th className="p-4 text-left">Duration</th>
                            <th className="p-4 text-left">Created</th>
                            <th className="p-4 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {tasks.map((task) => (
                            <tr key={task._id} className="hover:bg-gray-50 transition-colors">
                                <td className="p-4">
                                    {getStatusBadge(task.status)}
                                </td>
                                <td className="p-4 font-medium">{task.tasktitle}</td>
                                <td className="p-4">
                                    <div className="flex items-center">
                                        <FiUser className="mr-2 text-gray-500" />
                                        {task.userid?.username || 'N/A'}
                                    </div>
                                </td>
                                <td className="p-4">
                                    <div className="flex items-center">
                                        <FiClock className="mr-2 text-gray-500" />
                                        {task.taskduration}
                                    </div>
                                </td>
                                <td className="p-4">
                                    <div className="flex items-center">
                                        <FiCalendar className="mr-2 text-gray-500" />
                                        {format(new Date(task.createdAt), 'MMM dd, yyyy')}
                                    </div>
                                </td>
                                <td className="p-4 flex space-x-2">
                                    <Button 
                                        variant="outline-info" 
                                        size="sm" 
                                        onClick={() => handleDetailClick(task)}
                                        className="flex items-center"
                                    >
                                        <FiInfo className="mr-1" /> Details
                                    </Button>
                                    <Button 
                                        variant="outline-primary" 
                                        size="sm" 
                                        onClick={() => handleEditClick(task)}
                                        className="flex items-center"
                                    >
                                        <FiEdit className="mr-1" /> Edit
                                    </Button>
                                    <Button 
                                        variant="outline-danger" 
                                        size="sm" 
                                        onClick={() => deleteTask(task._id)}
                                        disabled={deleting}
                                        className="flex items-center"
                                    >
                                        <FiTrash2 className="mr-1" /> 
                                        {deleting ? 'Deleting...' : 'Delete'}
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Edit Task Modal */}
            <Modal show={showEditModal} onHide={() => setShowEditModal(false)} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Edit Task</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {currentTask && (
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label>Task Title</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="tasktitle"
                                    value={currentTask.tasktitle}
                                    onChange={handleInputChange}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Task Description</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    name="taskdetail"
                                    value={currentTask.taskdetail}
                                    onChange={handleInputChange}
                                />
                            </Form.Group>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                                <Form.Group>
                                    <Form.Label>Status</Form.Label>
                                    <Form.Select
                                        name="status"
                                        value={currentTask.status}
                                        onChange={handleInputChange}
                                    >
                                        <option value="Not Started">Not Started</option>
                                        <option value="In Progress">In Progress</option>
                                        <option value="Completed">Completed</option>
                                        <option value="On Hold">On Hold</option>
                                    </Form.Select>
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label>Priority</Form.Label>
                                    <Form.Select
                                        name="priority"
                                        value={currentTask.priority}
                                        onChange={handleInputChange}
                                    >
                                        <option value="Low">Low</option>
                                        <option value="Medium">Medium</option>
                                        <option value="High">High</option>
                                        <option value="Urgent">Urgent</option>
                                    </Form.Select>
                                </Form.Group>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                                <Form.Group>
                                    <Form.Label>Duration</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="taskduration"
                                        value={currentTask.taskduration}
                                        onChange={handleInputChange}
                                    />
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label>Due Date</Form.Label>
                                    <Form.Control
                                        type="date"
                                        name="dueDate"
                                        value={currentTask.dueDate ? currentTask.dueDate.split('T')[0] : ''}
                                        onChange={handleInputChange}
                                    />
                                </Form.Group>
                            </div>
                        </Form>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowEditModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleUpdateTask} disabled={loading}>
                        {loading ? 'Saving...' : 'Save Changes'}
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Task Detail Modal */}
            <Modal show={showDetailModal} onHide={() => setShowDetailModal(false)} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Task Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {currentTask && (
                        <div className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <h5 className="font-bold text-gray-600">Task Title</h5>
                                    <p>{currentTask.tasktitle}</p>
                                </div>
                                <div>
                                    <h5 className="font-bold text-gray-600">Status</h5>
                                    <p>{getStatusBadge(currentTask.status)}</p>
                                </div>
                            </div>

                            <div>
                                <h5 className="font-bold text-gray-600">Description</h5>
                                <p className="whitespace-pre-line">{currentTask.taskdetail || 'No description provided'}</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <h5 className="font-bold text-gray-600">Priority</h5>
                                    <p>{getPriorityBadge(currentTask.priority)}</p>
                                </div>
                                <div>
                                    <h5 className="font-bold text-gray-600">Duration</h5>
                                    <p>{currentTask.taskduration}</p>
                                </div>
                                <div>
                                    <h5 className="font-bold text-gray-600">Due Date</h5>
                                    <p>{currentTask.dueDate ? format(new Date(currentTask.dueDate), 'MMM dd, yyyy') : 'Not set'}</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <h5 className="font-bold text-gray-600">Assigned To</h5>
                                    <div className="flex items-center">
                                        <FiUser className="mr-2" />
                                        {currentTask.userid?.username || 'N/A'}
                                    </div>
                                    <div className="text-sm text-gray-500 ml-6">
                                        {currentTask.userid?.email || ''}
                                    </div>
                                </div>
                                <div>
                                    <h5 className="font-bold text-gray-600">Designation</h5>
                                    <p>{currentTask.userid?.designation || 'N/A'}</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <h5 className="font-bold text-gray-600">Created</h5>
                                    <div className="flex items-center">
                                        <FiCalendar className="mr-2" />
                                        {format(new Date(currentTask.createdAt), 'MMM dd, yyyy HH:mm')}
                                    </div>
                                    <div className="text-sm text-gray-500 ml-6">
                                        ({formatDistanceToNow(new Date(currentTask.createdAt))} ago)
                                    </div>
                                </div>
                                <div>
                                    <h5 className="font-bold text-gray-600">Last Updated</h5>
                                    <div className="flex items-center">
                                        <FiDatabase className="mr-2" />
                                        {format(new Date(currentTask.updatedAt), 'MMM dd, yyyy HH:mm')}
                                    </div>
                                    <div className="text-sm text-gray-500 ml-6">
                                        ({formatDistanceToNow(new Date(currentTask.updatedAt))} ago)
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowDetailModal(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default DisplayTask;