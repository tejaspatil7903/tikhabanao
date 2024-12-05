import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/common/Navbar';
import PrivateRoute from './components/auth/PrivateRoute';
import UserDashboard from './components/user/UserDashboard';
import AdminDashboard from './components/admin/AdminDashboard';
import DeliveryDashboard from './components/delivery/DeliveryDashboard';
import AdminRegistration from './components/auth/AdminRegistration';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import FoodSelection from './components/user/FoodSelection';
import MainCourse from './components/user/MainCourse';
import Breads from './components/user/Breads';
import ExtraBreads from './components/user/ExtraBreads';
import Desserts from './components/user/Desserts';
import Cart from './components/user/Cart';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-light">
        <Navbar />
        <Toaster position="top-center" />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin-registration" element={<AdminRegistration />} />
          
          <Route path="/user" element={
            <PrivateRoute allowedRoles={['user']}>
              <UserDashboard />
            </PrivateRoute>
          } />
          
          <Route path="/admin" element={
            <PrivateRoute allowedRoles={['admin']}>
              <AdminDashboard />
            </PrivateRoute>
          } />
          
          <Route path="/delivery" element={
            <PrivateRoute allowedRoles={['delivery']}>
              <DeliveryDashboard />
            </PrivateRoute>
          } />
          
          <Route path="/select-food" element={
            <PrivateRoute allowedRoles={['user']}>
              <FoodSelection />
            </PrivateRoute>
          } />
          
          <Route path="/main-course" element={
            <PrivateRoute allowedRoles={['user']}>
              <MainCourse />
            </PrivateRoute>
          } />
          
          <Route path="/breads" element={
            <PrivateRoute allowedRoles={['user']}>
              <Breads />
            </PrivateRoute>
          } />
          
          <Route path="/extra-breads" element={
            <PrivateRoute allowedRoles={['user']}>
              <ExtraBreads />
            </PrivateRoute>
          } />
          
          <Route path="/desserts" element={
            <PrivateRoute allowedRoles={['user']}>
              <Desserts />
            </PrivateRoute>
          } />
          
          <Route path="/cart" element={
            <PrivateRoute allowedRoles={['user']}>
              <Cart />
            </PrivateRoute>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;