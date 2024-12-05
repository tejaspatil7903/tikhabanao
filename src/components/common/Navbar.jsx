import { Link } from "react-router-dom";
import { useAuthStore } from "../../stores/authStore";
import { Button } from "./Button";

export default function Navbar() {
  const { user, logout } = useAuthStore();

  return (
    <nav className="bg-primary text-white shadow-md h-20">
      {" "}
      {/* Fixed height for navbar */}
      <div className="container mx-auto px-4 py-3 flex justify-between items-center h-full">
        {/* Logo Section */}
        <Link
          to="/"
          className="hover:text-accent transition-colors flex items-center"
        >
          <img
            src="/logo.png"
            alt="SmartServe Logo"
            className="h-24" // Adjust height of the logo as needed
          />
        </Link>

        {/* User Section */}
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
              <Button variant="secondary">Login</Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
