import { FiFilm, FiGithub, FiTwitter, FiInstagram } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const Footer = () => (
  <footer className="bg-[#111] border-t border-border mt-16">
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="bg-primary rounded-lg p-1.5"><FiFilm className="text-white" /></div>
            <span className="font-display text-2xl tracking-wider">MOVIE CLICK</span>
          </div>
          <p className="text-gray-400 text-sm">Your ultimate destination for booking movie tickets online. Experience cinema like never before.</p>
        </div>
        <div>
          <h4 className="font-bold text-white mb-3">Quick Links</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><Link to="/" className="hover:text-primary transition-colors">Home</Link></li>
            <li><Link to="/my-bookings" className="hover:text-primary transition-colors">My Bookings</Link></li>
            <li><Link to="/login" className="hover:text-primary transition-colors">Login</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-white mb-3">Follow Us</h4>
          <div className="flex gap-4 text-gray-400">
            <a href="#" className="hover:text-primary transition-colors"><FiTwitter size={20} /></a>
            <a href="#" className="hover:text-primary transition-colors"><FiInstagram size={20} /></a>
            <a href="#" className="hover:text-primary transition-colors"><FiGithub size={20} /></a>
          </div>
        </div>
      </div>
      <div className="border-t border-border pt-6 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} Movie Click. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
