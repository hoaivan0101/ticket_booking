$.ajax({
    url: '/show/films',
    type: 'GET'
  })
    .then(data => {
        // Load data first
      for (let i = 0; i <= 5; i++) {
        loaddata(i, data);
      }
        i = 6;
        // Scroll at the end 
      $(window).scroll(function () {
        if ($(window).scrollTop() + 20 >= $(document).height() - $(window).height()) {
          loaddata(i, data); i++;
        }
      });
      // FIND
      $('#idfind').keyup(function () {
        var keyQ = $(this).val();
        var result = data.filter(function (item) {
          return item.title.toLowerCase().indexOf(keyQ.toLowerCase()) > -1;
        })
        $('.namequery').html('');
        for (i of result) { $('.namequery').append(`<div><img style="width:30px"src="${i.poster}"><a href="/index/films/${i._id}">${i.title}<a/></div>`) }
      });
    })


// ADD DATA
  function loaddata(i, data) {
    $('.content').append(` <div class="main flex">
          <div><a href="/show/films/${data[i]._id}"><img class="main__img--lists" src="${data[i].poster}" alt=""></a></div>
          <div class="main_right">
            <ul>
              <li class="main_right_lists flex"><span class="main_right_lists_left">Tên Phim</span>
                <div class="main_right_lists_right">${data[i].title}</div></li>
              <li class="main_right_lists flex"><span class="main_right_lists_left">Thời lượng</span><span
                  class="main_right_lists_right">${data[i].length}</span></li>
              <li class="main_right_lists flex"><span class="main_right_lists_left">Diễn Viên</span><span
                  class="main_right_lists_right">${data[i].actor}</span></li>
              <li class="main_right_lists flex"><span class="main_right_lists_left">Ngày khởi chiếu</span><span
                  class="main_right_lists_right">${data[i].openDate}</span></li>
            </ul>
          </div>
        </div>`)
  }