import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useState } from 'react';
import { FiFilm, FiUser, FiLogOut, FiMenu, FiX, FiBookOpen } from 'react-icons/fi';
import { MdAdminPanelSettings } from 'react-icons/md';

const Navbar = () => {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropOpen, setDropOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setDropOpen(false);
  };

  return (
    <nav className="bg-[#111] border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="bg-primary rounded-lg p-1.5">
              <FiFilm className="text-white text-xl" />
            </div>
            <span className="font-display text-2xl tracking-wider text-white group-hover:text-primary transition-colors">
              MOVIE CLICK
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-gray-300 hover:text-white transition-colors text-sm font-semibold">Movies</Link>
            {user && (
              <Link to="/my-bookings" className="text-gray-300 hover:text-white transition-colors text-sm font-semibold flex items-center gap-1">
                <FiBookOpen /> My Bookings
              </Link>
            )}
            {isAdmin && (
              <Link to="/admin" className="text-yellow-400 hover:text-yellow-300 transition-colors text-sm font-semibold flex items-center gap-1">
                <MdAdminPanelSettings className="text-base" /> Admin
              </Link>
            )}

            {user ? (
              <div className="relative">
                <button
                  onClick={() => setDropOpen(!dropOpen)}
                  className="flex items-center gap-2 bg-card border border-border rounded-full px-4 py-2 text-sm hover:border-primary transition-colors"
                >
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-xs font-bold">
                    {user.name[0].toUpperCase()}
                  </div>
                  <span>{user.name.split(' ')[0]}</span>
                </button>
                {dropOpen && (
                  <div className="absolute right-0 mt-2 w-44 bg-card border border-border rounded-xl shadow-xl overflow-hidden z-50">
                    <div className="px-4 py-3 border-b border-border">
                      <p className="text-xs text-gray-400">Signed in as</p>
                      <p className="text-sm font-semibold truncate">{user.email}</p>
                    </div>
                    <button onClick={handleLogout} className="w-full flex items-center gap-2 px-4 py-3 text-sm text-red-400 hover:bg-[#222] transition-colors">
                      <FiLogOut /> Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link to="/login" className="btn-outline text-sm py-1.5 px-4">Login</Link>
                <Link to="/register" className="btn-primary text-sm py-1.5 px-4">Sign Up</Link>
              </div>
            )}
          </div>

          {/* Mobile hamburger */}
          <button className="md:hidden text-white" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden pb-4 space-y-2 border-t border-border pt-4">
            <Link to="/" className="block px-4 py-2 text-sm text-gray-300 hover:text-white" onClick={() => setMenuOpen(false)}>Movies</Link>
            {user && <Link to="/my-bookings" className="block px-4 py-2 text-sm text-gray-300 hover:text-white" onClick={() => setMenuOpen(false)}>My Bookings</Link>}
            {isAdmin && <Link to="/admin" className="block px-4 py-2 text-sm text-yellow-400" onClick={() => setMenuOpen(false)}>Admin Panel</Link>}
            {user ? (
              <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-sm text-red-400">Sign Out</button>
            ) : (
              <>
                <Link to="/login" className="block px-4 py-2 text-sm text-gray-300" onClick={() => setMenuOpen(false)}>Login</Link>
                <Link to="/register" className="block px-4 py-2 text-sm text-primary font-semibold" onClick={() => setMenuOpen(false)}>Sign Up</Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
