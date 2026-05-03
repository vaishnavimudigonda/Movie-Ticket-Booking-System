import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FiFilm, FiGrid, FiCalendar, FiBookOpen, FiLogOut, FiUsers } from 'react-icons/fi';
import { MdMovieFilter } from 'react-icons/md';

const navItems = [
  { to: '/admin', label: 'Dashboard', icon: FiGrid, exact: true },
  { to: '/admin/movies', label: 'Movies', icon: FiFilm },
  { to: '/admin/shows', label: 'Shows', icon: FiCalendar },
  { to: '/admin/bookings', label: 'Bookings', icon: FiBookOpen },
];

const AdminLayout = ({ children, title }) => {
  const { logout, user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => { logout(); navigate('/'); };

  const isActive = (item) =>
    item.exact ? location.pathname === item.to : location.pathname.startsWith(item.to);

  return (
    <div className="flex min-h-screen bg-dark">
      {/* Sidebar */}
      <aside className="w-56 bg-[#111] border-r border-border flex flex-col shrink-0">
        {/* Logo */}
        <div className="p-5 border-b border-border">
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-primary rounded-lg p-1"><MdMovieFilter className="text-white text-xl" /></div>
            <div>
              <p className="font-display text-lg tracking-wider leading-none">MOVIE CLICK</p>
              <p className="text-[10px] text-yellow-400 font-semibold uppercase tracking-widest">Admin</p>
            </div>
          </Link>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map(({ to, label, icon: Icon, exact }) => (
            <Link
              key={to}
              to={to}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                isActive({ to, exact })
                  ? 'bg-primary text-white'
                  : 'text-gray-400 hover:bg-[#1a1a1a] hover:text-white'
              }`}
            >
              <Icon size={16} /> {label}
            </Link>
          ))}
        </nav>

        {/* User & logout */}
        <div className="p-4 border-t border-border">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-xs font-bold">
              {user?.name[0]}
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-white truncate">{user?.name}</p>
              <p className="text-[10px] text-gray-500 truncate">{user?.email}</p>
            </div>
          </div>
          <button onClick={handleLogout} className="w-full flex items-center gap-2 text-xs text-red-400 hover:text-red-300 transition-colors px-2 py-1.5 rounded hover:bg-[#1a1a1a]">
            <FiLogOut size={13} /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 overflow-auto">
        <header className="bg-[#111] border-b border-border px-8 py-4 sticky top-0 z-10">
          <h1 className="text-xl font-bold text-white">{title}</h1>
        </header>
        <main className="p-8">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;
