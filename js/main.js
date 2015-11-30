$(function() {
  $('#slides').slidesjs({
    // width: 752,
    width: 960,
    height: 445,
    play: {
      active: false,
      auto: true,
      interval: 5000,
      swap: true,
      pauseOnHover: true,
      restartDelay: 5000
    },
    effect: {
      slide: {
        speed: 2500
      }
    }
  });
});

$(document).ready(function() {
  
  if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
    $('#map iframe').attr("width", "980");
  }

  
  $('#form-start-button').on('click', function() {
    $('#main-form').show();
    $('#form-background').show();
    $('#final-step').hide();
    $('#second-step').hide();
    $('#first-step').show();
    $('#request-form').show();
    alignCenter();
  });
  
  $('#close').on('click', function() {
    $('#main-form').hide();
    $('#form-background').hide();
  })
  
  $('#next-step').on('click', function() {
    $('#first-step').hide();
    $('#second-step').show();
    alignCenter();
  });
  
  // $('#submit-btn').on('click', function() {
  //   $('#request-form').hide();
  //   $('#final-step').show();
  //   alignCenter();
  // });
  
  $("#request-form").submit(function(e) {

    var url = "send_mail.php"; // the script where you handle the form input.

    $.ajax({
           type: "POST",
           url: url,
           data: $("#request-form").serialize(), // serializes the form's elements.
           success: function(data)
           {
              alert(data); // show response from the php script.
              $('#request-form').hide();
              $('#final-step').show();
              alignCenter();
           }
         });

    e.preventDefault(); // avoid to execute the actual submit of the form.
});
    
  
});

var alignCenter = function() {
  var semiwidth = $('#main-form').outerWidth() / 2;
    $('#main-form').css('margin-left', "-" + semiwidth + "px");
}