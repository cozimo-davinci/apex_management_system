import './App.css';
import LoginForm from './components/LoginForm';
import SignUpForm from './components/SignUpForm';
import EmployeeList from './components/EmployeeList';
import AddEmployee from './components/AddEmployee';
import FindEmployee from './components/FindEmployee';
import EditEmployee from './components/EditEmployee';
import ViewEmployee from './components/ViewEmployee';
import Home from './components/Home';
import { Routes, Route, BrowserRouter, Link } from 'react-router-dom';

function App() {
  return (
    <div className="bg-slate-900 min-h-screen relative">
      <BrowserRouter>
        {/* Navigation */}
        <nav className="absolute top-4 right-8 flex space-x-6 ">

          <Link to="/home" className="text-white text-lg hover:underline font-bold  hover:text-emerald-500">
            Home
          </Link>
          <Link to="/login" className="text-white text-lg hover:underline font-bold hover:text-emerald-500">
            Login
          </Link>
          <Link to="/signup" className="text-white text-lg hover:underline font-bold  hover:text-emerald-500">
            Sign Up
          </Link>


        </nav>

        {/* Routes */}
        <div className="flex flex-col items-center justify-center h-full">
          <Routes>
            <Route path="/login" element={<LoginForm />} />
            <Route path="/signup" element={<SignUpForm />} />
            <Route path='/employee' element={<EmployeeList />} />
            <Route path='/add-employee' element={<AddEmployee />} />
            <Route path='/find-employees' element={<FindEmployee />} />
            <Route path='/edit-employee' element={<EditEmployee />} />
            <Route path='/view-employee' element={<ViewEmployee />} />
            <Route path='/home' element={<Home />} />

          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
