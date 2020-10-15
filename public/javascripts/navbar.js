$(document).ready(function () {
  $(window).scroll(function () {
    var pos_body = $("html, body").scrollTop();
    if (pos_body > 20) {
      $(".header").addClass("stick_header");
    } else {
      $(".header").removeClass("stick_header");
    }
    if (pos_body < 500) {
      $(".backtotop").removeClass("unhide");
    } else {
      $(".backtotop").addClass("unhide");
    }
  });
  $(".backtotop").click(function () {
    $("html,body").animate({ scrollTop: 0 }, 700);
  });
  $(".findfilm").click(function () {
    $("#idfind").focus();
  });

  // FIND FILM

  $.ajax({
    url: "/movie/showing",
    type: "GET",
  }).then((data) => {
    // FIND
    $("#idfind").keyup(function () {
      var keyQ = $(this).val();
      var result = data.filter(function (item) {
        return item.title.toLowerCase().indexOf(keyQ.toLowerCase()) > -1;
      });
      $(".namequery").html("");
      for (i of result) {
        $(".namequery").append(
          `<div><img style="width:30px"src="${i.poster}"><a href="/movie/${i._id}">${i.title}<a/></div>`
        );
      }
    });
  });

  // ADD USERNAME AND LOGOUT BUTTONS

  $.ajax({
    url: "/auth/userinfo",
    type: "GET",
  })
    .then(data => {
      if (!data||data=='KHONG HOP LE') { 
        $('#usernamenavbar').html(`<a href="/auth" class="nav-item nav-link">
        <i class="fa fa-user-circle fa-lg"></i>
        <span> ĐĂNG NHẬP
        </span>
    </a>`)
      } else $('#usernamenavbar').html(`<a href="/userinfo" class="nav-item nav-link">
                  <i class="fa fa-user-circle fa-lg"></i>
                  <span> ${data}</span>
              </a><a href="/auth/logout" class="nav-item nav-link">
              <span> Đăng xuất</span>
          </a>`)
  })
});