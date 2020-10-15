const MovieModel = require('../models/movie')
const SessionModel = require('../models/sess');

/* GET home page */
exports.homepage = (req, res, next) => {
    res.render('main', { user: req.user });
}

/* GET all movies' page */
exports.movie = (req, res, next) => {
    res.render('movie_all')
}

/* GET a specific movie's page */
exports.movieInfo = (req, res, next) => {
    MovieModel.findById(req.params.id)
    .then(data=>{
        res.render('movie', {data: data})
    })
    .catch(err=>console.log(err))
}

/* GET list of showing movies */
exports.showingList = (req, res, next) => {
    let today = new Date()
    MovieModel.find()
    .sort({openDate: -1})
    .then(data=>{
        res.json(data);
    })
    .catch(err=>console.log(err))
}

/* GET list of upcoming movies */
exports.upcomingList = (req, res, next) => {
    let today = new Date()
    MovieModel.find({
        openDate: {$gt: today}
    })
    .sort({openDate: 1})
    .then(data=>{
        res.json(data);
    })
    .catch(err=>console.log(err))
}

/* GET list of cinemas showing selected movie */
exports.cinemaList = (req, res, next) => {
    SessionModel.find({
        movie: req.params.movieId
    })
    .then(data=>{
        let fullList = data.map(session => session.cinema)
        let uniqueList = Array.from(new Set(fullList))
        res.json(uniqueList)
    })
    .catch(err=>console.log(err))
}

/* GET list of showDate which selected cinema has */
exports.showDateList = (req, res, next) => {
    SessionModel.find({
        movie: req.params.movieId,
        cinema: decodeURI(req.params.cinemaId)
    })
        .then(data => {
        let fullList = data.map(session => session.showDate)
        let uniqueList = Array.from(new Set(fullList))
        res.json(uniqueList)
    })
    .catch(err=>console.log(err))
}

/* GET list of showTime which selected showDate has */
exports.showTimeList = (req, res, next) => {
    SessionModel.find({
        movie: req.params.movieId,
        cinema: decodeURI(req.params.cinemaId),
        showDate: req.params.showDateId
    })
        .then(data => {
            let fullList = data.map(session => session.showTime);
            let uniqueList = Array.from(new Set(fullList));
            res.json(uniqueList);
    })
    .catch(err=>console.log(err))
}

exports.doneBooking = (req, res, next) => {
    SessionModel.find({
        movie: req.params.movieId,
        cinema: decodeURI(req.params.cinemaId),
        showDate: req.params.showDateId,
        showTime: req.params.showTimeId
    })
        .then(data => {
            res.json('/cart/' + data[0]._id + '/index');
            return false;
    })
    .catch(err=>console.log(err))
}