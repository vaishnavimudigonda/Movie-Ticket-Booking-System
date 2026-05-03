import { Link } from 'react-router-dom';
import { FiStar, FiClock } from 'react-icons/fi';

const MovieCard = ({ movie }) => {
  const durationHrs = Math.floor(movie.duration / 60);
  const durationMins = movie.duration % 60;

  return (
    <Link to={`/movie/${movie._id}`} className="group block">
      <div className="card hover:border-primary/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/10">
        {/* Poster */}
        <div className="relative overflow-hidden aspect-[2/3]">
          <img
            src={movie.poster || 'https://via.placeholder.com/300x450?text=No+Poster'}
            alt={movie.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {/* Rating badge */}
          {movie.rating > 0 && (
            <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1 text-xs font-bold text-yellow-400">
              <FiStar className="fill-yellow-400" />
              {movie.rating.toFixed(1)}
            </div>
          )}
          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
            <span className="btn-primary text-xs py-1.5 px-4 w-full text-center rounded-lg">Book Now</span>
          </div>
        </div>
        {/* Info */}
        <div className="p-3">
          <h3 className="font-bold text-white text-sm truncate group-hover:text-primary transition-colors">{movie.title}</h3>
          <div className="flex items-center justify-between mt-1.5">
            <div className="flex flex-wrap gap-1">
              {movie.genre.slice(0, 2).map((g) => (
                <span key={g} className="text-[10px] bg-[#2a2a2a] text-gray-300 px-1.5 py-0.5 rounded">{g}</span>
              ))}
            </div>
            <span className="text-[11px] text-gray-400 flex items-center gap-1">
              <FiClock size={10} />
              {durationHrs}h {durationMins}m
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
