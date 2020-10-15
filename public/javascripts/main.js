/* Movie Select Box - START here */

// Search Movies

$(document).ready(()=>{
    $.ajax({
        url: '/movie/showing',
        type: 'GET'
    })
    .then(data=>{
        // Insert movie list to Movie Select Box
        data.forEach(movie => {
            let movieItem = $(`<option class="val" value="${movie._id}">${movie.title}</option>`)
            $('#movieSelection').append(movieItem)
        })

        // Insert movie list to PHIM DANG CHIEU Section
        data.slice(0,6).forEach(movie => {
            let movieItem = $(`
                <div class="col-sm-4 col-6">
                    <a href="/movie/${movie._id}" class="stretched-link">
                        <img src=${movie.poster} class="img-fluid py-2" alt="poster">
                    </a>
                    <h6>${movie.title}</h6>
                    <h6>${movie.title_local}</h6>
                </div>
            `)
            $('#showing div.row').append(movieItem)
        })
    })
    .catch(err=>console.log(err))

    // Insert movie list to PHIM SAP CHIEU Section
    $.ajax({
        url: '/movie/upcoming',
        type: 'GET'
    })
    .then(data=>{
        data.slice(0,6).forEach(movie => {
            let movieItem = $(`
                <div class="col-sm-4 col-6">
                    <a href="/movie/${movie._id}" class="stretched-link">
                        <img src=${movie.poster} class="img-fluid py-2" alt="poster">
                    </a>
                    <h6>${movie.title}</h6>
                    <h6>${movie.title_local}</h6>
                </div>
            `)
            $('#upcoming div.row').append(movieItem)
        })
    })
    .catch(err=>console.log(err))
})

// Select Cinema

$('#movieSelection').change(()=>{
    $("#cinemaSelection option[class='val']").remove()
    $("#showDateSelection option[class='val']").remove()
    $("#showTimeSelection option[class='val']").remove()
    let movieId = $('#movieSelection').val()
    $.ajax({
        url: '/movie/' + movieId + '/cinema',
        type: 'GET'
    })
    .then(data=>{
        data.forEach(cinema => {
            let item = $(`<option class="val" value="${cinema}">${cinema}</option>`)
            $('#cinemaSelection').append(item)
        })
    })
    .catch(err=>console.log(err))
})

// Select ShowDate

$('#cinemaSelection').change(()=>{
    $("#showDateSelection option[class='val']").remove()
    $("#showTimeSelection option[class='val']").remove()
    let movieId = $('#movieSelection').val()
    let cinema = $('#cinemaSelection').val()
    let cinemaId = encodeURI(cinema)
    $.ajax({
        url: '/movie/' + movieId + '/cinema/' + cinemaId + '/showDate',
        type: 'GET'
    })
    .then(data=>{
        data.forEach(showDate => {
            let item = $(`<option class="val" value="${showDate}">${showDate}</option>`)
            $('#showDateSelection').append(item)
        })
    })
    .catch(err=>console.log(err))
})

// Select ShowTime

$('#showDateSelection').change(()=>{
    $("#showTimeSelection option[class='val']").remove()
    let movieId = $('#movieSelection').val()
    let cinema = $('#cinemaSelection').val()
    let showDateId = $('#showDateSelection').val()
    let cinemaId = encodeURI(cinema)
    $.ajax({
        url: '/movie/' + movieId + '/cinema/' + cinemaId + '/showDate/' + showDateId + '/showTime',
        type: 'GET'
    })
        .then(data => {
            data.forEach(showTime => {
            let item = $(`<option class="val" value="${showTime}">${showTime}</option>`)
            $('#showTimeSelection').append(item)
        })
    })
    .catch(err=>console.log(err))
})

//PICKDATE 

$('#showTimeSelection').change(() => {
    let movieId = $('#movieSelection').val()
    let cinema = $('#cinemaSelection').val()
    let showDateId = $('#showDateSelection').val()
    let cinemaId = encodeURI(cinema)
    let timeId = $('#showTimeSelection').val();
    console.log(cinema, ' ', showDateId, ' ', timeId);
    $.ajax({
        url: '/movie/' + movieId + '/cinema/' + cinemaId + '/showDate/' + showDateId + '/showTime/' + timeId,
        type: 'GET'
    })
        .then(data => {
            console.log(data);
            window.location = data;
    })
    .catch(err=>console.log(err))
})

/* Movie Select Box - END here*/
/* =========================================================================*/

