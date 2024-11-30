import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

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
                `http://localhost:3002/api/v1/emp/employees/${employee._id}`,
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
                alert('Employee updated successfully!');
                navigate('/employee');
            } else {
                alert('Failed to update employee. Please try again.');
            }
        } catch (error) {
            console.error('Error updating employee:', error);
            alert('An error occurred while updating the employee. Please try again.');
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-900">
            <div className="bg-green-600 w-full max-w-md py-8 px-14 rounded-lg shadow-lg">
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
                        className="w-full h-10 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600 transition-colors"
                    >
                        Update Employee
                    </button>
                </form>
            </div>
        </div>
    );
}
