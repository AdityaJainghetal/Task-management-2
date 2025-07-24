// import React, { useState } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import axios from 'axios';
// import { message } from 'antd';

// const UserTaskAssign = () => {
//     const { id } = useParams();
//     const [tasktitle, setTaskTitle] = useState("");
//     const [taskdetail, setTaskDetail] = useState("");
//     const [taskduration, settaskduration] = useState("");
//     const navigate = useNavigate();

//     const taskAssignToUser  = async () => {
//         try {
//             let api = "http://localhost:8000/admin/assigntask";
//             const response = await axios.post(api, { id: id, tasktitle: tasktitle, taskdetail: taskdetail, taskduration: taskduration });
//             console.log(response.data);
//             message.success(response.data.msg);
//             navigate("../assigntask");
//         } catch (error) {
//             console.log(error);
//         }
//     };

//     return (
//         <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
//             <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
//                 {/* <h1 className="text-2xl font-bold mb-6 text-center">Assign New Task to User: {id}</h1> */}
//                 <form>
//                     <div className="mb-4">
//                         <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="tasktitle">Enter Task Title</label>
//                         <input
//                             type="text"
//                             id="tasktitle"
//                             value={tasktitle}
//                             onChange={(e) => setTaskTitle(e.target.value)}
//                             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:ring-blue-500"
//                             placeholder="Task Title"
//                         />
//                     </div>
//                     <div className="mb-4">
//                         <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="taskdetail">Enter Description</label>
//                         <textarea
//                             id="taskdetail"
//                             rows="3"
//                             value={taskdetail}
//                             onChange={(e) => setTaskDetail(e.target.value)}
//                             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:ring-blue-500"
//                             placeholder="Task Description"
//                         />
//                     </div>
//                     <div className="mb-4">
//                         <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="taskduration">Expected Time Duration</label>
//                         <input
//                             type="time"
//                             id="taskduration"
//                             value={taskduration}
//                             onChange={(e) => settaskduration(e.target.value)}
//                             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:ring-blue-500"
//                         />
//                     </div>
//                     <button
//                         type="button"
//                         onClick={taskAssignToUser }
//                         className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105"
//                     >
//                         Assign Task
//                     </button>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default UserTaskAssign;



// import React, { useState } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import axios from 'axios';
// import { message, Select, DatePicker, TimePicker } from 'antd';
// import dayjs from 'dayjs';
// import { FiUser, FiCalendar, FiClock, FiAlertCircle } from 'react-icons/fi';

// const { Option } = Select;
// const { RangePicker } = DatePicker;

// const UserTaskAssign = () => {
//     const { id } = useParams();
//     const navigate = useNavigate();
    
//     // State for form fields
//     const [formData, setFormData] = useState({
//         tasktitle: '',
//         taskdetail: '',
//         priority: 'Medium',
//         status: 'Not Started',
//         durationType: 'hours',
//         durationValue: 1,
//         dueDate: null,
//         startTime: null,
//         endTime: null
//     });
    
//     const [errors, setErrors] = useState({});
//     const [loading, setLoading] = useState(false);

//     // Handle form field changes
//     const handleChange = (name, value) => {
//         setFormData(prev => ({
//             ...prev,
//             [name]: value
//         }));
//         // Clear error when field is edited
//         if (errors[name]) {
//             setErrors(prev => ({
//                 ...prev,
//                 [name]: null
//             }));
//         }
//     };

//     // Validate form fields
//     const validateForm = () => {
//         const newErrors = {};
        
//         if (!formData.tasktitle.trim()) {
//             newErrors.tasktitle = 'Task title is required';
//         }
        
//         if (formData.tasktitle.length > 100) {
//             newErrors.tasktitle = 'Title cannot exceed 100 characters';
//         }
        
//         if (formData.taskdetail.length > 500) {
//             newErrors.taskdetail = 'Description cannot exceed 500 characters';
//         }
        
//         setErrors(newErrors);
//         return Object.keys(newErrors).length === 0;
//     };

//     // Submit task assignment
//     const taskAssignToUser = async () => {
//         if (!validateForm()) return;
        
//         setLoading(true);
        
//         try {
//             const payload = {
//                 id,
//                 tasktitle: formData.tasktitle,
//                 taskdetail: formData.taskdetail,
//                 priority: formData.priority,
//                 status: formData.status,
//                 taskduration: `${formData.durationValue} ${formData.durationType}`,
//                 dueDate: formData.dueDate ? dayjs(formData.dueDate).format('YYYY-MM-DD') : null,
//                 startTime: formData.startTime ? dayjs(formData.startTime).format('HH:mm') : null,
//                 endTime: formData.endTime ? dayjs(formData.endTime).format('HH:mm') : null
//             };

//             const response = await axios.post("http://localhost:8000/admin/assigntask", payload);
            
//             message.success({
//                 content: response.data.message || 'Task assigned successfully',
//                 duration: 3
//             });
            
//             navigate("/admin/assigntask");
//         } catch (error) {
//             console.error('Assignment error:', error);
            
//             let errorMsg = 'Failed to assign task';
//             if (error.response) {
//                 errorMsg = error.response.data.error || 
//                           error.response.data.message || 
//                           errorMsg;
//             }
            
//             message.error({
//                 content: errorMsg,
//                 duration: 5
//             });
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
//             <div className="max-w-3xl mx-auto">
//                 <div className="bg-white shadow-xl rounded-lg overflow-hidden">
//                     {/* Header */}
//                     <div className="bg-gradient-to-r from-blue-600 to-blue-800 px-6 py-4">
//                         <h1 className="text-2xl font-bold text-white flex items-center">
//                             <FiUser className="mr-2" />
//                             Assign New Task
//                         </h1>
//                         <p className="text-blue-100 mt-1">User ID: {id}</p>
//                     </div>
                    
//                     {/* Form */}
//                     <div className="p-6 space-y-6">
//                         {/* Task Title */}
//                         <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-1">
//                                 Task Title *
//                             </label>
//                             <input
//                                 type="text"
//                                 value={formData.tasktitle}
//                                 onChange={(e) => handleChange('tasktitle', e.target.value)}
//                                 className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
//                                     errors.tasktitle ? 'border-red-500' : 'border-gray-300'
//                                 }`}
//                                 placeholder="Enter task title"
//                                 maxLength={100}
//                             />
//                             {errors.tasktitle && (
//                                 <p className="mt-1 text-sm text-red-600 flex items-center">
//                                     <FiAlertCircle className="mr-1" /> {errors.tasktitle}
//                                 </p>
//                             )}
//                         </div>
                        
//                         {/* Task Description */}
//                         <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-1">
//                                 Task Description
//                             </label>
//                             <textarea
//                                 rows={4}
//                                 value={formData.taskdetail}
//                                 onChange={(e) => handleChange('taskdetail', e.target.value)}
//                                 className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
//                                     errors.taskdetail ? 'border-red-500' : 'border-gray-300'
//                                 }`}
//                                 placeholder="Describe the task in detail"
//                                 maxLength={500}
//                             />
//                             {errors.taskdetail && (
//                                 <p className="mt-1 text-sm text-red-600 flex items-center">
//                                     <FiAlertCircle className="mr-1" /> {errors.taskdetail}
//                                 </p>
//                             )}
//                         </div>
                        
//                         {/* Priority and Status */}
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                             <div>
//                                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                                     Priority
//                                 </label>
//                                 <Select
//                                     value={formData.priority}
//                                     onChange={(value) => handleChange('priority', value)}
//                                     className="w-full"
//                                 >
//                                     <Option value="Low">Low</Option>
//                                     <Option value="Medium">Medium</Option>
//                                     <Option value="High">High</Option>
//                                     <Option value="Urgent">Urgent</Option>
//                                 </Select>
//                             </div>
                            
//                             <div>
//                                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                                     Status
//                                 </label>
//                                 <Select
//                                     value={formData.status}
//                                     onChange={(value) => handleChange('status', value)}
//                                     className="w-full"
//                                 >
//                                     <Option value="Not Started">Not Started</Option>
//                                     <Option value="In Progress">In Progress</Option>
//                                     <Option value="Completed">Completed</Option>
//                                     <Option value="On Hold">On Hold</Option>
//                                 </Select>
//                             </div>
//                         </div>
                        
//                         {/* Duration */}
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                             <div>
//                                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                                     Duration
//                                 </label>
//                                 <div className="flex">
//                                     <input
//                                         type="number"
//                                         min="1"
//                                         value={formData.durationValue}
//                                         onChange={(e) => handleChange('durationValue', e.target.value)}
//                                         className="w-1/2 px-4 py-2 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                                     />
//                                     <Select
//                                         value={formData.durationType}
//                                         onChange={(value) => handleChange('durationType', value)}
//                                         className="w-1/2"
//                                     >
//                                         <Option value="hours">Hours</Option>
//                                         <Option value="days">Days</Option>
//                                         <Option value="weeks">Weeks</Option>
//                                         <Option value="months">Months</Option>
//                                     </Select>
//                                 </div>
//                             </div>
                            
//                             <div>
//                                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                                     Due Date
//                                 </label>
//                                 <DatePicker
//                                     value={formData.dueDate ? dayjs(formData.dueDate) : null}
//                                     onChange={(date) => handleChange('dueDate', date)}
//                                     className="w-full"
//                                     suffixIcon={<FiCalendar />}
//                                 />
//                             </div>
//                         </div>
                        
//                         {/* Time Range */}
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                             <div>
//                                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                                     Start Time
//                                 </label>
//                                 <TimePicker
//                                     value={formData.startTime ? dayjs(formData.startTime) : null}
//                                     onChange={(time) => handleChange('startTime', time)}
//                                     className="w-full"
//                                     format="HH:mm"
//                                     suffixIcon={<FiClock />}
//                                 />
//                             </div>
                            
//                             <div>
//                                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                                     End Time
//                                 </label>
//                                 <TimePicker
//                                     value={formData.endTime ? dayjs(formData.endTime) : null}
//                                     onChange={(time) => handleChange('endTime', time)}
//                                     className="w-full"
//                                     format="HH:mm"
//                                     suffixIcon={<FiClock />}
//                                 />
//                             </div>
//                         </div>
                        
//                         {/* Submit Button */}
//                         <div className="pt-4">
//                             <button
//                                 type="button"
//                                 onClick={taskAssignToUser}
//                                 disabled={loading}
//                                 className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition duration-300 ${
//                                     loading ? 'opacity-70 cursor-not-allowed' : 'hover:shadow-md'
//                                 }`}
//                             >
//                                 {loading ? 'Assigning Task...' : 'Assign Task'}
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default UserTaskAssign;

import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { message, Select, DatePicker, TimePicker } from 'antd';
import dayjs from 'dayjs';
import { FiUser, FiCalendar, FiClock, FiAlertCircle } from 'react-icons/fi';

const { Option } = Select;

const UserTaskAssign = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
        tasktitle: '',
        taskdetail: '',
        priority: 'Medium',
        status: 'Not Started',
        durationValue: 1,
        durationUnit: 'weeks',
        dueDate: null,
        startTime: null,
        endTime: null
    });
    
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const handleChange = (name, value) => {
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        if (errors[name]) setErrors(prev => ({ ...prev, [name]: null }));
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.tasktitle.trim()) newErrors.tasktitle = 'Task title is required';
        if (formData.tasktitle.length > 100) newErrors.tasktitle = 'Title cannot exceed 100 characters';
        if (formData.taskdetail.length > 500) newErrors.taskdetail = 'Description cannot exceed 500 characters';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const taskAssignToUser = async () => {
        if (!validateForm()) return;
        setLoading(true);
        
        try {
            const payload = {
                id,
                tasktitle: formData.tasktitle,
                taskdetail: formData.taskdetail,
                priority: formData.priority,
                status: formData.status,
                taskduration: `${formData.durationValue} ${formData.durationUnit}`,
                dueDate: formData.dueDate ? dayjs(formData.dueDate).format('YYYY-MM-DD') : null,
                startTime: formData.startTime ? dayjs(formData.startTime).format('HH:mm') : null,
                endTime: formData.endTime ? dayjs(formData.endTime).format('HH:mm') : null
            };

            const response = await axios.post("http://localhost:8000/admin/assigntask", payload);
            
            message.success({
                content: response.data.message,
                duration: 3
            });
            navigate("/admindashboard/displaytask");
        } catch (error) {
            console.error('Assignment error:', error);
            const errorMsg = error.response?.data?.error || 'Failed to assign task';
            message.error({ content: errorMsg, duration: 5 });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4">
            <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
                <div className="bg-gradient-to-r from-blue-600 to-blue-800 px-6 py-4">
                    <h1 className="text-2xl font-bold text-white flex items-center">
                        <FiUser className="mr-2" /> Assign Task to User
                    </h1>
                </div>
                
                <div className="p-6 space-y-6">
                    {/* Task Title */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Task Title *</label>
                        <input
                            type="text"
                            value={formData.tasktitle}
                            onChange={(e) => handleChange('tasktitle', e.target.value)}
                            className={`w-full px-4 py-2 border rounded-lg ${errors.tasktitle ? 'border-red-500' : 'border-gray-300'}`}
                            placeholder="Enter task title"
                        />
                        {errors.tasktitle && (
                            <p className="mt-1 text-sm text-red-600 flex items-center">
                                <FiAlertCircle className="mr-1" /> {errors.tasktitle}
                            </p>
                        )}
                    </div>
                    
                    {/* Task Description */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        <textarea
                            rows={4}
                            value={formData.taskdetail}
                            onChange={(e) => handleChange('taskdetail', e.target.value)}
                            className={`w-full px-4 py-2 border rounded-lg ${errors.taskdetail ? 'border-red-500' : 'border-gray-300'}`}
                            placeholder="Task details..."
                        />
                    </div>
                    
                    {/* Priority and Status */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                            <Select
                                value={formData.priority}
                                onChange={(value) => handleChange('priority', value)}
                                className="w-full"
                            >
                                <Option value="Low">Low</Option>
                                <Option value="Medium">Medium</Option>
                                <Option value="High">High</Option>
                                <Option value="Urgent">Urgent</Option>
                            </Select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                            <Select
                                value={formData.status}
                                onChange={(value) => handleChange('status', value)}
                                className="w-full"
                            >
                                <Option value="Not Started">Not Started</Option>
                                <Option value="In Progress">In Progress</Option>
                                <Option value="Completed">Completed</Option>
                                <Option value="On Hold">On Hold</Option>
                            </Select>
                        </div>
                    </div>
                    
                    {/* Duration */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                            <div className="flex">
                                <input
                                    type="number"
                                    min="1"
                                    value={formData.durationValue}
                                    onChange={(e) => handleChange('durationValue', e.target.value)}
                                    className="w-1/2 px-4 py-2 border border-gray-300 rounded-l-lg"
                                />
                                <Select
                                    value={formData.durationUnit}
                                    onChange={(value) => handleChange('durationUnit', value)}
                                    className="w-1/2"
                                >
                                    <Option value="hours">Hours</Option>
                                    <Option value="days">Days</Option>
                                    <Option value="weeks">Weeks</Option>
                                    <Option value="months">Months</Option>
                                </Select>
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
                            <DatePicker
                                className="w-full"
                                value={formData.dueDate}
                                onChange={(date) => handleChange('dueDate', date)}
                                suffixIcon={<FiCalendar />}
                            />
                        </div>
                    </div>
                    
                    {/* Time Range */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Start Time</label>
                            <TimePicker
                                className="w-full"
                                format="HH:mm"
                                value={formData.startTime}
                                onChange={(time) => handleChange('startTime', time)}
                                suffixIcon={<FiClock />}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">End Time</label>
                            <TimePicker
                                className="w-full"
                                format="HH:mm"
                                value={formData.endTime}
                                onChange={(time) => handleChange('endTime', time)}
                                suffixIcon={<FiClock />}
                            />
                        </div>
                    </div>
                    
                    <button
                        onClick={taskAssignToUser}
                        disabled={loading}
                        className={`w-full py-3 px-4 bg-blue-600 text-white rounded-lg mt-6 ${
                            loading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-blue-700'
                        }`}
                    >
                        {loading ? 'Assigning...' : 'Assign Task'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UserTaskAssign;