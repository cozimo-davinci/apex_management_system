import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AddEmployee() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [position, setPosition] = useState('');
    const [salary, setSalary] = useState('');
    const [dateOfJoining, setDateOfJoining] = useState('');
    const [department, setDepartment] = useState('');

    const navigate = useNavigate();

    const handleAddEmployee = async (e) => {
        e.preventDefault();

        // Validate input
        if (!firstName || !lastName || !email || !position || !salary || !dateOfJoining || !department) {
            alert('All fields are required.');
            return;
        }

        if (isNaN(Number(salary))) {
            alert('Salary must be a valid number.');
            return;
        }

        try {
            const response = await axios.post('http://localhost:3002/api/v1/emp/employees', {
                first_name: firstName,
                last_name: lastName,
                email: email,
                position: position,
                salary: Number(salary), // Ensure salary is a number
                date_of_joining: new Date(dateOfJoining), // Ensure date is valid
                department: department,
            });

            if (response.status === 201) {
                alert('Employee added successfully!');
                // Clear form fields
                setFirstName('');
                setLastName('');
                setEmail('');
                setPosition('');
                setSalary('');
                setDateOfJoining('');
                setDepartment('');
                navigate('/employee');
            } else {
                alert('Failed to add employee. Please try again.');
            }
        } catch (error) {
            console.error('Error adding employee:', error);
            alert('An error occurred while adding the employee. Please try again.');
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen w-96 bg-gray-900">
            <div className="bg-green-600 w-full max-w-md py-8 px-14 rounded-lg shadow-lg hover:shadow-2xl hover:scale-105
             transition-shadow duration-300 border-black border-4 shadow-yellow-500">
                <h1 className="text-2xl font-bold text-white text-center mb-6">Add Employee</h1>

                <form onSubmit={handleAddEmployee} className="space-y-5">
                    <div>
                        <label className="block text-white font-semibold mb-1">First Name</label>
                        <input
                            type="text"
                            className="w-full h-10 px-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter First Name"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="block text-white font-semibold mb-1">Last Name</label>
                        <input
                            type="text"
                            className="w-full h-10 px-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter Last Name"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="block text-white font-semibold mb-1">Email</label>
                        <input
                            type="email"
                            className="w-full h-10 px-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="block text-white font-semibold mb-1">Position</label>
                        <input
                            type="text"
                            className="w-full h-10 px-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter Position"
                            value={position}
                            onChange={(e) => setPosition(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="block text-white font-semibold mb-1">Salary</label>
                        <input
                            type="text"
                            className="w-full h-10 px-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter Salary"
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
                            placeholder="Enter Department"
                            value={department}
                            onChange={(e) => setDepartment(e.target.value)}
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full h-10 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600 transition-colors"
                    >
                        Add Employee
                    </button>
                </form>
            </div>
        </div>
    );
}
