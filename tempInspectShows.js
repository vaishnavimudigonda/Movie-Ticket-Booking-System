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
    const movies = await request({ hostname: 'localhost', port: 5000, path: '/api/movies', method: 'GET' });
    const movieId = JSON.parse(movies.body)[0]._id;
    const shows = await request({ hostname: 'localhost', port: 5000, path: '/api/shows/movie/' + movieId, method: 'GET' });
    const showList = JSON.parse(shows.body);
    console.log('count', showList.length);
    console.log('first show date', showList[0].date);
    console.log('first show date type', typeof showList[0].date);
    console.log('first show date raw', JSON.stringify(showList[0].date));
    console.log('first show time', showList[0].time);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();
