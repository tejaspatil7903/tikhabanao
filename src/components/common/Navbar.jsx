import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../stores/authStore";
import { Button } from "./Button";

export default function Navbar() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login", { state: { fromNavbar: true } }); // Pass custom state
  };

  return (
    <nav className="bg-primary text-white shadow-md h-20">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center h-full">
        <Link
          to="/"
          className="hover:text-accent transition-colors flex items-center"
        >
          <img src="/logo.png" alt="SmartServe Logo" className="h-24" />
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
            <Button variant="secondary" onClick={handleLoginClick}>
              Login
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
}
