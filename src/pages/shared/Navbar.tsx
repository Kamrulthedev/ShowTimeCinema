import { RootState } from "@/redux/store";
import { NavigationMenu } from "@radix-ui/react-navigation-menu";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Navbar() {
  const user = useSelector((state: RootState) => state);
  return (
    <nav className="bg-black text-white flex flex-wrap justify-between items-center p-4">
      <div className="flex items-center">
        <a href="/" className="mr-4">
          <img
            src="https://i.ibb.co/qrV0vL5/cinema-logo-template-isolated-on-white-background-vector.jpg"
            alt="CINEMA"
            className="h-8"
          />
        </a>
        <button className="text-white lg:hidden">Menu</button>
      </div>
      <div className="flex items-center flex-1 justify-center lg:justify-start">
        <select className="bg-black text-white border border-gray-700 rounded p-1 mr-2">
          <option value="all">All</option>
          {/* Add more options as needed */}
        </select>
        <input
          type="text"
          placeholder="Search CINEMA"
          className="bg-black text-white border border-gray-700 rounded p-1 mr-2 w-32 sm:w-64"
        />
        <button className="bg-black text-white">
          <i className="fa fa-search"></i>
        </button>
      </div>
      <div className="flex items-center mt-2 lg:mt-0">
        <Link to="/movies">
          <NavigationMenu className="text-lg mr-4">Movies</NavigationMenu>
        </Link>
        <a href="#" className="mr-4 hidden lg:block">
          Watchlist
        </a>
        {user ? (
          <span className="mr-4 hidden lg:block">Hello,</span>
        ) : (
          <a href="#" className="mr-4 hidden lg:block">
            Sign In
          </a>
        )}
        <select className="bg-black text-white border border-gray-700 rounded p-1">
          <option value="en">EN</option>
          {/* Add more options as needed */}
        </select>
      </div>
    </nav>
  );
}
