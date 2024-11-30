import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function FindEmployee() {
    const location = useLocation();
    const navigate = useNavigate();

    // Initialize employees state with the data from location.state
    const [employees, setEmployees] = useState(location.state?.employees || []);

    // Delete employee function
    const deleteEmployee = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:3002/api/v1/emp/employees/${id}`);
            if (response.status === 200) {
                alert(response.data.message);
                // Remove the deleted employee from the state
                setEmployees(employees.filter((employee) => employee._id !== id));
            } else {
                alert('Failed to delete employee.');
            }
        } catch (error) {
            console.error('Error deleting employee:', error);
            alert('An error occurred while deleting the employee.');
        }
    };

    // Back button handler
    const handleBack = () => {
        navigate('/employee');
    };

    return (
        <div className="min-h-screen bg-black p-6">
            <h1 className="text-2xl text-white font-bold mt-12 mb-5 text-center">Employee Search Results</h1>

            {employees.length > 0 ? (
                <div className="overflow-x-auto bg-black p-6 rounded-xl shadow-md shadow-teal-600 border-white border-4">
                    <table className="table-auto w-full text-left border-white border-2">
                        <thead>
                            <tr className="text-white bg-orange-500">
                                <th className="px-4 py-2">ID</th>
                                <th className="px-4 py-2">First Name</th>
                                <th className="px-4 py-2">Last Name</th>
                                <th className="px-4 py-2">Email</th>
                                <th className="px-4 py-2">Position</th>
                                <th className="px-4 py-2">Salary</th>
                                <th className="px-4 py-2">Department</th>
                                <th className="px-4 py-2">Date of Joining</th>
                                <th className="px-4 py-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {employees.map((employee) => (
                                <tr
                                    key={employee._id}
                                    className="bg-gray-800 text-white hover:bg-gray-600"
                                >
                                    <td className="px-4 py-2 border-white border-2">{employee._id}</td>
                                    <td className="px-4 py-2 border-white border-2">{employee.first_name}</td>
                                    <td className="px-4 py-2 border-white border-2">{employee.last_name}</td>
                                    <td className="px-4 py-2 border-white border-2">{employee.email}</td>
                                    <td className="px-4 py-2 border-white border-2">{employee.position}</td>
                                    <td className="px-4 py-2 border-white border-2">
                                        {employee.salary.toLocaleString('en-US', {
                                            style: 'currency',
                                            currency: 'USD',
                                        })}
                                    </td>
                                    <td className="px-4 py-2 border-white border-2">{employee.department}</td>
                                    <td className="px-4 py-2 border-white border-2">
                                        {new Date(employee.date_of_joining).toLocaleDateString()}
                                    </td>
                                    <td className="px-4 py-2 border-white border-2">
                                        <button
                                            className="bg-yellow-500 text-white px-3 py-2 rounded-md hover:bg-yellow-600 mr-2 font-bold
                                            border-black border-2 shadow-md hover:shadow-white hover:scale-105"
                                            onClick={() => navigate('/edit-employee', { state: { employee } })}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600 font-bold
                                            border-black border-2 shadow-md hover:shadow-white hover:scale-105"
                                            onClick={() => deleteEmployee(employee._id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className="mt-5">
                        <button
                            className="bg-purple-600 text-white 
                            px-4 py-2 border-black border-4 
                            shadow-md shadow-slate-400 rounded-md hover:bg-yellow-600
                            font-semibold"
                            onClick={handleBack}
                        >
                            Back
                        </button>
                    </div>
                </div>
            ) : (
                <p className="text-white font-bold">No employees found for the search criteria!</p>
            )}
        </div>
    );
}
