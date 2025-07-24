import { useState } from "react";
import axios from "axios";
import { message } from "antd";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [usertype, setUserType] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (usertype === "admin") {
      try {
        const res = await axios.post(
          "https://task-management-2-p6gu.onrender.com/admin/adminlogin",
          {
            email,
            password,
          }
        );

        if (res.data.success) {
          localStorage.setItem("adminname", res.data.admin.name);
          localStorage.setItem("adminToken", res.data.token);
          localStorage.setItem("adminEmail", res.data.admin.email);
          localStorage.setItem("adminId", res.data.admin.id);

          navigate("/admindashboard");
        } else {
          message.error("Admin login failed");
        }
      } catch (error) {
        message.error(error.response?.data?.message || "Admin login error");
      }
    } else if (usertype === "user") {
      try {
        const response = await axios.post(
          "https://task-management-2-p6gu.onrender.com/user/userlogin",
          {
            email,
            password,
          }
        );

        if (response.status === 200) {
          localStorage.setItem("username", response.data.username);
          localStorage.setItem("useremail", response.data.email);
          localStorage.setItem("uid", response.data._id);
          navigate("/userdashboard");
        } else {
          message.error("User login failed");
        }
      } catch (error) {
        message.error(error.response?.data?.msg || "User login error");
      }
    } else {
      message.error("Please select user type");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-600">
      <div className="bg-white shadow-md rounded-lg p-8 w-96 transform transition-transform duration-500 ease-in-out scale-95 hover:scale-100">
        <h2 className="text-2xl font-bold text-center mb-6 animate-fade-in">
          Login Form
        </h2>
        <form>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Enter Id:
            </label>
            <input
              type="text"
              value={email}
              onChange={(e) => setemail(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline transition duration-300 ease-in-out transform hover:scale-105"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Enter Password:
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline transition duration-300 ease-in-out transform hover:scale-105"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Login As:
            </label>
            <select
              value={usertype}
              onChange={(e) => setUserType(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline transition duration-300 ease-in-out transform hover:scale-105"
            >
              <option value="">Login User As</option>
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>
          </div>

          <button
            type="button"
            onClick={handleSubmit}
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out transform hover:scale-105"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Home;
