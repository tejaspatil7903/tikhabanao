import { Link } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';
import { Button } from './Button';

export default function Navbar() {
  const { user, logout } = useAuthStore();

  return (
    <nav className="bg-primary text-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold hover:text-accent transition-colors">
          SmartServe
        </Link>
        <div className="space-x-4 flex items-center">
          {user ? (
            <>
              <span className="text-light font-medium">{user.name}</span>
              <Button
                variant="accent"
                onClick={logout}
                className="hover:bg-danger"
              >
                Logout
              </Button>
            </>
          ) : (
            <Link to="/login">
              <Button variant="secondary">
                Login
              </Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}