$('.btn_login').click(function () {
  // Test input
  var username = $('#username').val();
  var password = $('#password').val();
  $('.alert_username').text('');
  $('.alert_password').text('');
  if (username == "") {
    $('.alert_username').text('PLEASE INPUT USERNAME');
    return false;
  }
  if (password == "") {
    $('.alert_password').text('PLEASE INPUT PASSWORD');
    return false;
  }
  // POST DATA
  
    $.ajax({
      url: '/auth/login',
      type: "POST",
      data: {
        username: username,
        password: password
      }
    })
      .then(data => {
        if (data == 'Fail') { $('.alert_password').text('ACCOUNT NOT FOUND');  }
        else {
          setTimeout(function() {
            swal({
                title: "Wow!",
                text: "LOGIN SUCCESSFUL",
                type: "success"
            }, function() {
              window.location.href ='/movie';
            });
        }, 100);
        }
      })
      .catch(err => {
        console.log(err);
      })
})

