import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function EmployeeList() {
    const [employees, setEmployees] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchBy, setSearchBy] = useState('department');

    const navigate = useNavigate();

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await axios.get('http://localhost:3002/api/v1/emp/employees');
                setEmployees(response.data);
            } catch (error) {
                console.error('Error fetching employees:', error);
            }
        };

        fetchEmployees();
    }, []);

    const fetchFilteredEmployees = async () => {
        if (!searchQuery) {
            alert('Please enter a valid department or position');
            return;
        }

        const params = new URLSearchParams();

        if (searchBy === 'department') {
            params.append('department', searchQuery.trim());
        } else if (searchBy === 'position') {
            params.append('position', searchQuery.trim());
        }

        const url = `http://localhost:3002/api/v1/emp/search?${params.toString()}`;

        try {
            const response = await axios.get(url);

            if (response.data.length > 0) {
                navigate('/find-employees', { state: { employees: response.data } });
            } else {
                alert('No employees found matching the search criteria');
            }
        } catch (error) {
            if (error.response) {
                alert(`Error fetching employees: ${error.response.data.message}`);
            } else {
                console.error('Error fetching employees:', error);
                alert('Error fetching employees. Please try again.');
            }
        }
    };

    const deleteEmployee = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:3002/api/v1/emp/employees/${id}`);
            if (response.status === 200) {
                alert(response.data.message);
                setEmployees(employees.filter((employee) => employee._id !== id)); // Update state after successful deletion
            } else {
                alert('Failed to delete employee.');
            }
        } catch (error) {
            console.error('Error deleting employee:', error);
            alert('An error occurred while deleting the employee.');
        }
    };

    const handleAddEmployee = () => {
        navigate('/add-employee');
    };

    return (
        <div className="min-h-screen bg-gray-900 p-6">
            <h2 className="text-2xl text-white font-bold mt-12 mb-12 text-center">Employee List</h2>

            <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
                {/* Search by Dropdown */}
                <select
                    value={searchBy}
                    onChange={(e) => setSearchBy(e.target.value)}
                    className="w-full sm:w-52 h-10 rounded-md border-black border-4 text-black font-semibold shadow-md shadow-slate-400 px-2"
                >
                    <option value="department">Search by Department</option>
                    <option value="position">Search by Position</option>
                </select>

                {/* Search Query Input */}
                <input
                    type="search"
                    className="w-full sm:w-96 h-10 rounded-md px-2 py-2 text-black font-semibold border-black border-4 shadow-md shadow-slate-400"
                    placeholder={`Enter ${searchBy}`}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />

                {/* Search Button */}
                <button
                    className="w-full sm:w-auto bg-purple-600 rounded-md p-2 border-black border-4 shadow-sm shadow-slate-400 text-white font-semibold hover:bg-yellow-500 hover:scale-105"
                    onClick={fetchFilteredEmployees}
                >
                    Search
                </button>
            </div>

            <div className="mt-5 mb-5">
                <button
                    className="bg-purple-600 rounded-md p-2 border-black border-4 text-white font-semibold hover:bg-yellow-500 hover:scale-105 shadow-md shadow-slate-400"
                    onClick={handleAddEmployee}
                >
                    Add Employee
                </button>
            </div>

            <div className="overflow-x-auto bg-black p-6 rounded-xl shadow-md">
                {employees && employees.length > 0 ? (
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
                                <tr key={employee._id} className="bg-gray-700 text-white hover:bg-gray-600">
                                    <td className="px-4 py-2 border-white border-2">{employee._id}</td>
                                    <td className="px-4 py-2 border-white border-2">{employee.first_name}</td>
                                    <td className="px-4 py-2 border-white border-2">{employee.last_name}</td>
                                    <td className="px-4 py-2 border-white border-2">{employee.email}</td>
                                    <td className="px-4 py-2 border-white border-2">{employee.position}</td>
                                    <td className="px-4 py-2 border-white border-2">
                                        {employee.salary.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                                    </td>
                                    <td className="px-4 py-2 border-white border-2">{employee.department}</td>
                                    <td className="px-4 py-2 border-white border-2">
                                        {new Date(employee.date_of_joining).toLocaleDateString()}
                                    </td>

                                    <td className="px-4 py-2 border-white border-2">
                                        <button
                                            className="bg-purple-700 text-white px-3 py-2 rounded-md hover:bg-blue-600 mr-2"
                                            onClick={() => navigate('/view-employee', { state: { employeeId: employee._id } })}
                                        >
                                            View
                                        </button>
                                        <button
                                            className="bg-blue-500 text-white px-3 py-2 rounded-md hover:bg-blue-600 mr-2"
                                            onClick={() => navigate('/edit-employee', { state: { employee } })}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600"
                                            onClick={() => deleteEmployee(employee._id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p className="text-white text-center font-bold">No employees found!</p>
                )}
            </div>
        </div>
    );
}
