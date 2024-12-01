import axios from 'axios';
import React, { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function EditEmployee() {
    const location = useLocation();
    const navigate = useNavigate();
    const employee = location.state?.employee;

    const [firstName, setFirstName] = useState(employee?.first_name || '');
    const [lastName, setLastName] = useState(employee?.last_name || '');
    const [email, setEmail] = useState(employee?.email || '');
    const [position, setPosition] = useState(employee?.position || '');
    const [salary, setSalary] = useState(employee?.salary || '');
    const [dateOfJoining, setDateOfJoining] = useState(
        employee?.date_of_joining
            ? new Date(employee.date_of_joining).toISOString().split('T')[0]
            : ''
    );
    const [department, setDepartment] = useState(employee?.department || '');

    const handleEditEmployee = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.put(
                `https://apex-management-system-backend.onrender.com/api/v1/emp/employees/${employee._id}`,
                {
                    first_name: firstName,
                    last_name: lastName,
                    email: email,
                    position: position,
                    salary: Number(salary),
                    date_of_joining: new Date(dateOfJoining),
                    department: department,
                }
            );

            if (response.status === 200) {
                toast.success('Employee updated successfully!', {
                    position: 'top-right',
                    autoClose: 3000, // 3 seconds
                });

                // Navigate after a delay to allow the user to see the notification
                setTimeout(() => {
                    navigate('/employee');
                }, 3000);
            } else {
                toast.error('Failed to update employee. Please try again.', {
                    position: 'top-right',
                });
            }
        } catch (error) {
            console.error('Error updating employee:', error);
            const errorMessage =
                error.response?.data?.message || 'An error occurred while updating the employee. Please try again.';
            toast.error(errorMessage, {
                position: 'top-right',
            });
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-black">
            {/* Toastify Container */}
            <ToastContainer />

            <Link
                to="/employee"
                className="absolute top-20 left-8
                text-white font-bold bg-purple-600 
                rounded-md shadow-md shadow-white hover:shadow-yellow-400 p-4
                border-black border-4 hover:scale-105"
            >
                Back
            </Link>

            <div
                className="bg-black border-white border-4 
            w-full max-w-md py-8 px-14 rounded-lg shadow-lg shadow-white hover:scale-100 
            hover:shadow-red-600"
            >
                <h1 className="text-2xl font-bold text-white text-center mb-6">Edit Employee</h1>

                <form onSubmit={handleEditEmployee} className="space-y-5">
                    <div>
                        <label className="block text-white font-semibold mb-1">First Name</label>
                        <input
                            type="text"
                            className="w-full h-10 px-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-white font-semibold mb-1">Last Name</label>
                        <input
                            type="text"
                            className="w-full h-10 px-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-white font-semibold mb-1">Email</label>
                        <input
                            type="email"
                            className="w-full h-10 px-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-white font-semibold mb-1">Position</label>
                        <input
                            type="text"
                            className="w-full h-10 px-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={position}
                            onChange={(e) => setPosition(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-white font-semibold mb-1">Salary</label>
                        <input
                            type="number"
                            className="w-full h-10 px-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={salary}
                            onChange={(e) => setSalary(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-white font-semibold mb-1">Date of Joining</label>
                        <input
                            type="date"
                            className="w-full h-10 px-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={dateOfJoining}
                            onChange={(e) => setDateOfJoining(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-white font-semibold mb-1">Department</label>
                        <input
                            type="text"
                            className="w-full h-10 px-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={department}
                            onChange={(e) => setDepartment(e.target.value)}
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full h-10 bg-orange-500 text-white font-bold rounded-md hover:bg-blue-600 transition-colors"
                    >
                        Update Employee
                    </button>
                </form>
            </div>
        </div>
    );
}
