$(document).ready(()=>{
    $.ajax({
        url: '/movie/showing',
        type: 'GET'
    })
    .then(data=>{
        // Insert movie list to PHIM DANG CHIEU Section
        data.forEach(movie => {
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
        data.forEach(movie => {
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