import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function ViewEmployee() {
    const location = useLocation();
    const navigate = useNavigate();

    const [employee, setEmployee] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const employeeId = location.state?.employeeId;

    // Fetch employee data based on ID
    useEffect(() => {
        if (!employeeId) {
            setError('No employee ID provided');
            setLoading(false);
            return;
        }

        const fetchEmployee = async () => {
            try {
                const response = await axios.get(`http://localhost:3002/api/v1/emp/employees/${employeeId}`);
                setEmployee(response.data);
            } catch (err) {
                setError('Failed to fetch employee data');
            } finally {
                setLoading(false);
            }
        };

        fetchEmployee();
    }, [employeeId]);

    const handleBack = () => {
        navigate('/employee');
    };

    if (loading) {
        return <div className="text-white text-center font-bold">Loading...</div>;
    }

    if (error) {
        return <div className="text-white text-center font-bold">{error}</div>;
    }

    if (!employee) {
        return <div className="text-white text-center font-bold">Employee not found.</div>;
    }

    return (
        <div className="min-h-screen bg-gray-900 p-6">
            <h1 className="text-2xl text-white font-bold mt-12 mb-5 text-center">Employee Details</h1>

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
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="bg-gray-800 text-white hover:bg-gray-600">
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
                        </tr>
                    </tbody>
                </table>

                <div className="mt-5 text-center">
                    <button
                        className="bg-purple-600 text-white px-4 py-2 border-black border-4 shadow-md shadow-slate-400 rounded-md hover:bg-yellow-600 font-semibold"
                        onClick={handleBack}
                    >
                        Back
                    </button>
                </div>
            </div>
        </div>
    );
}
