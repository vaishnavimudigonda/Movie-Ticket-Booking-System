const http = require('http');

function request(options, body) {
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => resolve({ status: res.statusCode, body: data }));
    });
    req.on('error', reject);
    if (body) req.write(body);
    req.end();
  });
}

(async () => {
  try {
    const login = await request(
      { hostname: 'localhost', port: 5000, path: '/api/auth/login', method: 'POST', headers: { 'Content-Type': 'application/json' } },
      JSON.stringify({ email: 'user@movieclick.com', password: 'user123' })
    );
    console.log('login', login.status, login.body);

    const movies = await request({ hostname: 'localhost', port: 5000, path: '/api/movies', method: 'GET' });
    const movieId = JSON.parse(movies.body)[0]._id;
    console.log('movieId', movieId);

    const today = new Date();
    const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    console.log('todayStr', todayStr);
    const shows = await request({ hostname: 'localhost', port: 5000, path: '/api/shows/movie/' + movieId + '?date=' + todayStr, method: 'GET' });
    console.log('shows', shows.status, shows.body.slice(0, 400));

    const showList = JSON.parse(shows.body);
    if (!showList.length) {
      console.error('No shows returned for today');
      process.exit(1);
    }

    const showId = showList[0]._id;
    console.log('showId', showId);

    const book = await request(
      { hostname: 'localhost', port: 5000, path: '/api/bookings', method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + JSON.parse(login.body).token } },
      JSON.stringify({ showId, selectedSeats: ['A1'] })
    );
    console.log('book', book.status, book.body);
  } catch (error) {
    console.error('ERROR', error);
    process.exit(1);
  }
})();
