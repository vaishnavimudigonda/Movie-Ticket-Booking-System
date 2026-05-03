const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const Movie = require('./models/Movie');
const Show = require('./models/Show');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/movieclick';

const generateSeats = (priceRegular = 150, pricePremium = 250, priceRecliner = 400) => {
  const seats = [];
  const rows = ['A','B','C','D','E','F','G','H','I','J'];
  rows.forEach((row, rowIndex) => {
    for (let col = 1; col <= 10; col++) {
      let type = 'regular', price = priceRegular;
      if (rowIndex >= 7) { type = 'recliner'; price = priceRecliner; }
      else if (rowIndex >= 4) { type = 'premium'; price = pricePremium; }
      seats.push({ seatNumber: `${row}${col}`, row, column: col, type, price, isBooked: false });
    }
  });
  return seats;
};

// Extracted exactly from your seed.js
const movies = [
  {
    title: 'Inception',
    description: 'A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O. A mind-bending sci-fi thriller that blurs the line between dreams and reality.',
    poster: 'https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg',
    banner: 'https://image.tmdb.org/t/p/original/s3TBrRGB1iav7gFOCNx3H31MoES.jpg',
    genre: ['Sci-Fi', 'Thriller', 'Action'],
    duration: 148, language: 'English',
    releaseDate: new Date('2010-07-16'), rating: 8.8,
    director: 'Christopher Nolan',
    cast: [{ name: 'Leonardo DiCaprio', role: 'Cobb' },{ name: 'Joseph Gordon-Levitt', role: 'Arthur' },{ name: 'Elliot Page', role: 'Ariadne' }],
    isActive: true,
  },
  {
    title: 'The Dark Knight',
    description: 'When the Joker wreaks havoc on Gotham, Batman must confront one of the greatest psychological and physical tests of his ability to fight injustice. A superhero film that transcends the genre.',
    poster: 'https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg',
    banner: 'https://image.tmdb.org/t/p/original/hkBaDkMWbLaf8B1lsLtjHXN4eds.jpg',
    genre: ['Action', 'Drama', 'Thriller'],
    duration: 152, language: 'English',
    releaseDate: new Date('2008-07-18'), rating: 9.0,
    director: 'Christopher Nolan',
    cast: [{ name: 'Christian Bale', role: 'Bruce Wayne' },{ name: 'Heath Ledger', role: 'Joker' },{ name: 'Aaron Eckhart', role: 'Harvey Dent' }],
    isActive: true,
  },
  {
    title: 'Interstellar',
    description: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity survival. A visually stunning and emotionally powerful space epic about love, time, and the survival of mankind.',
    poster: 'https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg',
    banner: 'https://image.tmdb.org/t/p/original/pbrkL804EoL1okpLLuan0vQe8ZF.jpg',
    genre: ['Sci-Fi', 'Drama'],
    duration: 169, language: 'English',
    releaseDate: new Date('2014-11-07'), rating: 8.6,
    director: 'Christopher Nolan',
    cast: [{ name: 'Matthew McConaughey', role: 'Cooper' },{ name: 'Anne Hathaway', role: 'Brand' },{ name: 'Jessica Chastain', role: 'Murph' }],
    isActive: true,
  },
  {
    title: 'Avengers: Endgame',
    description: 'After Thanos destroys half of all life, the remaining Avengers assemble one final time to reverse the damage and restore the universe. The ultimate superhero showdown spanning time itself.',
    poster: 'https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg',
    banner: 'https://image.tmdb.org/t/p/original/7RyHsO4yDXtBv1zUU3mTpHeQ0d5.jpg',
    genre: ['Action', 'Drama'],
    duration: 181, language: 'English',
    releaseDate: new Date('2019-04-26'), rating: 8.4,
    director: 'Anthony & Joe Russo',
    cast: [{ name: 'Robert Downey Jr.', role: 'Iron Man' },{ name: 'Chris Evans', role: 'Captain America' },{ name: 'Scarlett Johansson', role: 'Black Widow' }],
    isActive: true,
  },
  {
    title: 'Parasite',
    description: 'Greed and class discrimination threaten the symbiotic relationship between the wealthy Park family and the destitute Kim clan. This Oscar-winning Korean masterpiece is a darkly comic thriller.',
    poster: 'https://image.tmdb.org/t/p/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg',
    banner: 'https://image.tmdb.org/t/p/original/ApiBzeaa95TNYliSbQ8pJv4Fje7.jpg',
    genre: ['Drama', 'Thriller', 'Comedy'],
    duration: 132, language: 'Korean',
    releaseDate: new Date('2019-05-30'), rating: 8.6,
    director: 'Bong Joon-ho',
    cast: [{ name: 'Song Kang-ho', role: 'Ki-taek' },{ name: 'Lee Sun-kyun', role: 'Park Dong-ik' },{ name: 'Cho Yeo-jeong', role: 'Yeon-kyo' }],
    isActive: true,
  },
  {
    title: 'The Lion King',
    description: 'Simba idolizes his father King Mufasa, but is overcome by the treachery of his uncle Scar. A timeless animated tale of courage, identity and the circle of life brought to breathtaking photorealistic life.',
    poster: 'https://image.tmdb.org/t/p/w500/sKCr78MXSLixwmZ8DyJLrpMsd15.jpg',
    banner: 'https://image.tmdb.org/t/p/original/wXsQvli6tWqja51pYxXNG1LFIGV.jpg',
    genre: ['Animation', 'Drama'],
    duration: 118, language: 'English',
    releaseDate: new Date('2019-07-19'), rating: 7.1,
    director: 'Jon Favreau',
    cast: [{ name: 'Donald Glover', role: 'Simba' },{ name: 'Beyonce', role: 'Nala' },{ name: 'James Earl Jones', role: 'Mufasa' }],
    isActive: true,
  },
  {
    title: 'RRR',
    description: 'A fictional story about two legendary revolutionaries — Alluri Sitarama Raju and Komaram Bheem — and their journey before they fought for their country in the 1920s. A jaw-dropping action epic that broke all records.',
    poster: 'http://localhost:5000/posters/rrr.png',
    banner: 'http://localhost:5000/posters/rrr.png',
    genre: ['Action', 'Drama'],
    duration: 182, language: 'Telugu',
    releaseDate: new Date('2022-03-25'), rating: 7.8,
    director: 'S. S. Rajamouli',
    cast: [{ name: 'N. T. Rama Rao Jr.', role: 'Komaram Bheem' },{ name: 'Ram Charan', role: 'Alluri Sitarama Raju' },{ name: 'Alia Bhatt', role: 'Sita' },{ name: 'Ajay Devgn', role: 'Venkata Ramaraju Sr.' }],
    isActive: true,
  },
  {
    title: 'Baahubali: The Beginning',
    description: 'In ancient India, an adventurous man becomes involved in a decades-old feud between two warring royal factions. A monumental epic of power, love and war that redefined the scale of Indian cinema forever.',
    poster: 'http://localhost:5000/posters/bahubali.png',
    banner: 'http://localhost:5000/posters/bahubali.png',
    genre: ['Action', 'Drama'],
    duration: 159, language: 'Telugu',
    releaseDate: new Date('2015-07-10'), rating: 8.0,
    director: 'S. S. Rajamouli',
    cast: [{ name: 'Prabhas', role: 'Baahubali / Shivudu' },{ name: 'Rana Daggubati', role: 'Bhallaladeva' },{ name: 'Anushka Shetty', role: 'Devasena' },{ name: 'Tamannaah', role: 'Avantika' }],
    isActive: true,
  },
  {
    title: 'Jawan',
    description: 'A high-octane action thriller exploring the relationship between a father and son caught in an escalating conflict against corruption and injustice. Shah Rukh Khan delivers a powerful dual performance in this massive blockbuster.',
    poster: 'http://localhost:5000/posters/jawan.png',
    banner: 'http://localhost:5000/posters/jawan.png',
    genre: ['Action', 'Thriller', 'Drama'],
    duration: 169, language: 'Hindi',
    releaseDate: new Date('2023-09-07'), rating: 7.0,
    director: 'Atlee Kumar',
    cast: [{ name: 'Shah Rukh Khan', role: 'Vikram Rathore / Azaad' },{ name: 'Nayanthara', role: 'Narmada Rai' },{ name: 'Vijay Sethupathi', role: 'Kalee Gaikwad' },{ name: 'Deepika Padukone', role: 'Aishwarya Rathore' }],
    isActive: true,
  },
  {
    title: 'Brahmastra: Part One - Shiva',
    description: 'A young man named Shiva discovers he has a special connection with Fire and sets out to stop evil forces trying to acquire the Brahmastra — a weapon of unimaginable power rooted in Indian mythology and cosmic science.',
    poster: 'http://localhost:5000/posters/brahmastra.png',
    banner: 'http://localhost:5000/posters/brahmastra.png',
    genre: ['Action', 'Sci-Fi', 'Drama'],
    duration: 167, language: 'Hindi',
    releaseDate: new Date('2022-09-09'), rating: 5.6,
    director: 'Ayan Mukerji',
    cast: [{ name: 'Ranbir Kapoor', role: 'Shiva' },{ name: 'Alia Bhatt', role: 'Isha' },{ name: 'Amitabh Bachchan', role: 'Guruji' },{ name: 'Nagarjuna', role: 'Anish' }],
    isActive: true,
  },
  {
    title: 'Virupaksha',
    description: 'A young man who moves to a remote village discovers a series of mysterious deaths linked to an ancient curse. As villagers fall prey to a terrifying supernatural force, he must uncover the dark secret buried deep in the past.',
    poster: 'http://localhost:5000/posters/virupaksha.png',
    banner: 'http://localhost:5000/posters/virupaksha.png',
    genre: ['Horror', 'Thriller', 'Drama'],
    duration: 158, language: 'Telugu',
    releaseDate: new Date('2023-04-21'), rating: 7.5,
    director: 'Karthik Dandu',
    cast: [{ name: 'Sai Dharam Tej', role: 'Surya' },{ name: 'Samantha Ruth Prabhu', role: 'Nandini' },{ name: 'Murali Sharma', role: 'Village Elder' }],
    isActive: true,
  },
  {
    title: 'Masooda',
    description: 'A single mother fights desperately to save her daughter who is possessed by a powerful demonic spirit. A chilling supernatural horror deeply rooted in South Indian folklore that will keep you on the edge of your seat.',
    poster: 'http://localhost:5000/posters/masooda.png',
    banner: 'http://localhost:5000/posters/masooda.png',
    genre: ['Horror', 'Thriller'],
    duration: 132, language: 'Telugu',
    releaseDate: new Date('2022-09-16'), rating: 7.8,
    director: 'Santhosh Ananddram',
    cast: [{ name: 'Sangeetha Sringeri', role: 'Neelam' },{ name: 'Thiruveer', role: 'Aakash' },{ name: 'Shah Ra', role: 'Supporting' }],
    isActive: true,
  },
  {
    title: 'Isha',
    description: 'A terrifying tale of a young woman whose life turns into a nightmare when a malevolent supernatural entity begins to haunt her. The horror unfolds through chilling events that blur the line between reality and the paranormal.',
    poster: 'http://localhost:5000/posters/isha.png',
    banner: 'http://localhost:5000/posters/isha.png',
    genre: ['Horror', 'Thriller', 'Drama'],
    duration: 128, language: 'Telugu',
    releaseDate: new Date('2023-08-11'), rating: 6.8,
    director: 'Sudheer Varma',
    cast: [{ name: 'Nithya Menen', role: 'Isha' },{ name: 'Sudheer Babu', role: 'Arjun' },{ name: 'Brahmanandam', role: 'Supporting' }],
    isActive: true,
  },
  {
    title: 'Kingdom',
    description: 'In a dystopian future, humanity faces extinction against an overwhelming alien invasion. A brave soldier discovers a hidden underground kingdom and uncovers the one secret that could turn the tide in this spectacular sci-fi epic.',
    poster: 'http://localhost:5000/posters/kingdom.png',
    banner: 'http://localhost:5000/posters/kingdom.png',
    genre: ['Sci-Fi', 'Action', 'Thriller'],
    duration: 145, language: 'Hindi',
    releaseDate: new Date('2024-01-12'), rating: 7.2,
    director: 'Rohit Shetty',
    cast: [{ name: 'Hrithik Roshan', role: 'Vikram' },{ name: 'Deepika Padukone', role: 'Zara' },{ name: 'Anil Kapoor', role: 'Commander' }],
    isActive: true,
  },
  {
    title: 'Padmaavat',
    description: 'Queen Padmaavati is a woman of exceptional beauty and courage living in a prosperous kingdom. Her world is shattered when a ruthless, all-conquering Sultan becomes obsessively determined to possess her at any cost.',
    poster: 'http://localhost:5000/posters/padmavaat.png',
    banner: 'http://localhost:5000/posters/padmavaat.png',
    genre: ['Drama', 'Action', 'Sci-Fi'],
    duration: 164, language: 'Hindi',
    releaseDate: new Date('2018-01-25'), rating: 7.0,
    director: 'Sanjay Leela Bhansali',
    cast: [{ name: 'Deepika Padukone', role: 'Rani Padmaavati' },{ name: 'Shahid Kapoor', role: 'Maharawal Ratan Singh' },{ name: 'Ranveer Singh', role: 'Alauddin Khilji' }],
    isActive: true,
  },
  {
    title: 'Independence Day',
    description: 'On July 2nd, alien warships appear over every major city on Earth. On July 4th, the survivors will fight back. Will Smith and Jeff Goldblum lead humanity in the ultimate battle for survival against an unstoppable extraterrestrial force.',
    poster: 'https://image.tmdb.org/t/p/w500/z0LFedRUNRFGMPOo2gvwPuFOBdv.jpg',
    banner: 'https://image.tmdb.org/t/p/original/4s8GJGELSz87oehYnM2APuCpMiR.jpg',
    genre: ['Sci-Fi', 'Action', 'Thriller'],
    duration: 145, language: 'English',
    releaseDate: new Date('1996-07-03'), rating: 7.0,
    director: 'Roland Emmerich',
    cast: [{ name: 'Will Smith', role: 'Captain Steven Hiller' },{ name: 'Jeff Goldblum', role: 'David Levinson' },{ name: 'Bill Pullman', role: 'President Whitmore' }],
    isActive: true,
  },
  {
    title: 'Arrival',
    description: 'When mysterious spacecraft touch down across the globe, linguist Louise Banks is recruited to communicate with the alien visitors. As she unravels their language, she makes a shocking discovery about the nature of time itself.',
    poster: 'https://image.tmdb.org/t/p/w500/x2FJsf1ElAgr63Y3PNPtJrcmpoe.jpg',
    banner: 'https://image.tmdb.org/t/p/original/kq7mVOFwdR4kTBtPbGFdNhFDHx5.jpg',
    genre: ['Sci-Fi', 'Drama', 'Thriller'],
    duration: 116, language: 'English',
    releaseDate: new Date('2016-11-11'), rating: 7.9,
    director: 'Denis Villeneuve',
    cast: [{ name: 'Amy Adams', role: 'Dr. Louise Banks' },{ name: 'Jeremy Renner', role: 'Ian Donnelly' },{ name: 'Forest Whitaker', role: 'Colonel Weber' }],
    isActive: true,
  },
];

const theaters = [
  { name: 'Prasads IMAX',         screen: 'IMAX Screen'         },
  { name: 'PVP Cinemas',          screen: 'Screen 1'            },
  { name: 'PVR Cinemas',          screen: 'Screen 2'            },
  { name: 'AMB Cinemas',          screen: 'Dolby Atmos Screen'  },
  { name: 'Cinepolis',            screen: 'Screen 3'            },
  { name: 'Asian Sudarshan',      screen: 'Screen 1'            },
  { name: 'SPI Sathyam Cinemas',  screen: 'Screen 4'            },
];

const showTimings = ['11:30 AM', '2:00 PM', '4:00 PM', '6:30 PM', '10:00 PM'];

async function seedDataSafely() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB');

    // ONLY clear movies and shows, leave users and bookings intact
    await Promise.all([Movie.deleteMany(), Show.deleteMany()]);
    console.log('Cleared existing movies and shows (your user accounts are safe!)');

    const createdMovies = await Movie.insertMany(movies);
    console.log(`Successfully added ${createdMovies.length} movies to the database!`);

    const showDocs = [];
    for (const movie of createdMovies) {
      const assignedTheaters = theaters.slice(0, 3);
      for (let d = 0; d < 5; d++) {
        const date = new Date();
        date.setDate(date.getDate() + d);
        date.setHours(0, 0, 0, 0);
        for (const theater of assignedTheaters) {
          for (const time of showTimings) {
            showDocs.push({
              movie: movie._id,
              theater: theater.name,
              screen: theater.screen,
              date, time,
              seats: generateSeats(150, 250, 400),
              isActive: true,
            });
          }
        }
      }
    }

    await Show.insertMany(showDocs);
    console.log(`Successfully added ${showDocs.length} shows!`);
    console.log('Done! All movies are now visible in the database.');
    process.exit(0);
  } catch (err) {
    console.error('Seed error:', err);
    process.exit(1);
  }
}

seedDataSafely();
