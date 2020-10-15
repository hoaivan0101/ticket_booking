var express = require('express');
var router = express.Router();
const checkAuth = require('../controllers/checkAuth');

const movieController = require('../controllers/movieController')

/* GET home page */
router.get('/', movieController.homepage);

/* GET all movies page */
router.get('/movie', checkAuth, movieController.movie);

/* GET list of showing movies */
router.get('/movie/showing', movieController.showingList);

/* GET list of upcoming movies */
router.get('/movie/upcoming', movieController.upcomingList);

/* GET movie info page */
router.get('/movie/:id', movieController.movieInfo);

/* GET list of cinemas showing selected movie */
router.get('/movie/:movieId/cinema', movieController.cinemaList);

/* GET list of showDate which selected cinema has */
router.get('/movie/:movieId/cinema/:cinemaId/showDate', movieController.showDateList);

/* GET list of showTime which selected showDate has */
router.get('/movie/:movieId/cinema/:cinemaId/showDate/:showDateId/showTime', movieController.showTimeList);

/* GET list of showTime which selected showDate has */
router.get('/movie/:movieId/cinema/:cinemaId/showDate/:showDateId/showTime/:showTimeId', movieController.doneBooking);

module.exports = router;
