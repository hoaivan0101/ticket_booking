$('.btn_login').click(function () {
    var username = $('#username').val();
    var password = $('#password').val();
    var email = $('#userEmail').val();
    
    $('.alert_username').text('');
    $('.alert_password').text('');
    $('.alert_email').text('');
    
        if (username == "") {
            $('.alert_username').text('PLEASE INPUT YOUR USERNAME');
            return false;
        }
        if (password == "") {
            $('.alert_password').text('PLEASE INPUT YOUR PASSWORD');
            return false;
        }
        if (password.length < 8) {
            $('.alert_password').text('PASSWORD MUST HAVE ATLEAST 8 CHARACTERS');
            return false;
        }
        if (email == "") {
            $('.alert_email').text('PLEASE INPUT YOUR EMAIL');
            return false;
        }

    $.ajax({
            url: '/auth/register',
            type: 'POST',
            data: {
                username: username,
                password: password,
                email: email
            }, 
        })
            .then(data => {
                if (!data) { $('.alert_email').text('USERNAME OR EMAIL HAS EXISTED'); }
                else {setTimeout(function() {
                    swal({
                        title: "Wow!",
                        text: "SIGNUP SUCCESSFUL",
                        type: "success"
                    }, function() {
                      window.location.href ='/auth/login';
                    });
                }, 100);}
        })
})
        // Test input

