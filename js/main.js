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
    
    var validForm = checkFormValid("#first-step");
    
    if (validForm) {
      $('#first-step').hide();
      $('#second-step').show();
      alignCenter();
    }
  });
  
  $( "input[required='required']" ).keypress(function() {
    $(this).removeClass('not_valid');
    $(this).siblings('.error').remove();
  }); 
    
  
  $("#request-form").submit(function(e) {
         
    var validForm = checkFormValid("#second-step");
         
    if (validForm) {
      $('#submit-btn').html('Подождите...');
      var url = "send_mail.php"; // the script where you handle the form input.
      
      $.ajax({
          type: "POST",
          url: url,
          data: $("#request-form").serialize(), // serializes the form's elements.
          success: function(data)
          {
              $('#request-form').hide();
              $('#main-form').css('margin-top', "-150px");
              
              $('#final-step').show();
              
              alignCenter();
              $('#submit-btn').html('Отправить<span class="arrow"">></span>');
          }
        });
    }

    e.preventDefault(); // avoid to execute the actual submit of the form.
  });
    
  $('#clients .previous').on('click', function() {
    $('.clients-logos img.show').first().hide( "fast", function() {
      $(this).removeClass('show').addClass('hide').appendTo('.clients-logos');
    });
    
    $('.clients-logos img.hide').first().show( "fast", function() {
      $(this).removeClass('hide').addClass('show');
    });
  });
  
  $('#clients .next').on('click', function() {
    $('.clients-logos img.show').last().hide( "fast", function() {
      $(this).removeClass('show').addClass('hide').appendTo('.clients-logos');
    });
    
    $('.clients-logos img.hide').first().prependTo('.clients-logos').show( "fast", function() {
      $(this).removeClass('hide').addClass('show');
    });
  });
  
    $("#upload_link").on('click', function(e){
        e.preventDefault();
        $("#upload:hidden").trigger('click');
    });
  
});

var alignCenter = function() {
  var semiwidth = $('#main-form').outerWidth() / 2;
  $('#main-form').css('margin-left', "-" + semiwidth + "px");
  var semiheight = $('#main-form').outerHeight() / 2;
  $('#main-form').css('margin-top', "-" + semiheight + "px");
};

var checkFormValid = function(selector) {
  var valid_form = true;
    $( selector + " input[required='required']" ).each(function() {
			if(!$.trim(this.value).length) {
        var input = $(this);
                
        // if (!$(this).hasClass('not_valid')) {
        //   $( input ).after( "<span class='error'>Не заполнено!</span>" );
        // }
        
        $(this).addClass('not_valid');
				valid_form = false;
			}
		});
    
    return valid_form;
}

