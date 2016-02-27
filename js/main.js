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
      
      var fd = new FormData(document.getElementById("request-form"));
      
      $.ajax({
          type: "POST",
          url: url,
          // data: $("#request-form").serialize(), // serializes the form's elements.
          data: fd, // serializes the form's elements.
          enctype: 'multipart/form-data',
          processData: false,  // tell jQuery not to process the data
          contentType: false,  
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
  
  /* СТРЕЛКИ */
    
  $('#clients .next').on('click', function() {
    $('.clients-logos img.show').first().hide( "fast", function() {
      $(this).removeClass('show').addClass('hide').parent().appendTo('.clients-logos');
    });
    
    $('.clients-logos img.hide').first().show( "fast", function() {
      $(this).removeClass('hide').addClass('show');
    });
  });
  
  $('#clients .previous').on('click', function() {
    $('.clients-logos img.show').last().hide( "fast", function() {
      $(this).removeClass('show').addClass('hide').parent().appendTo('.clients-logos');
    });
    
    var hidden_image = $('.clients-logos img.hide').first();
    $(hidden_image).parent().prependTo('.clients-logos');
    $(hidden_image).show( "fast", function() {
      $(this).removeClass('hide').addClass('show');
    });
  });
  
//   НОВОСТИ
  
  $('#news .next').on('click', function() {
    
    var first = $('.news-items a.show').first();
    
    $(first).parent().animate({
        "margin-left": "-120px"
    }, 200);
    
    $('.news-items').animate({
        "opacity" : "0"
    }, 200, function() {
        $('.news-items a.show').first().removeClass('show').addClass('hide').parent().appendTo('.news-items');
        $('.news-items a.hide').first().removeClass('hide').addClass('show');
        $('.news-items a.show').first().removeClass('show').addClass('hide').parent().appendTo('.news-items');
        $('.news-items a.hide').first().removeClass('hide').addClass('show');
        $('.news-items a.show').first().removeClass('show').addClass('hide').parent().appendTo('.news-items');
        
        var last = $('.news-items a.hide').first();
        $(last).removeClass('hide').addClass('show');
        
        $(last).parent().css("margin-right", "-120px");
        
        $(last).parent().animate({
            "margin-right": "16px"
        }, 200);
        
        $('.news-items').animate({
            "opacity" : "1"
        }, 200);
        
        $(first).parent().css("margin-left", "16px");
    });
    
    
  });
  
  
  $('#news .previous').on('click', function() {
    
    var lastDisplayed = $('.news-items a.show').last();
    
    $(lastDisplayed).parent().animate({
        "margin-right": "-120px"
    }, 200);
    
    $('.news-items').animate({
        "opacity" : "0"
    }, 200, function() {        
        $('.news-items a.show').last().removeClass('show').addClass('hide');
        $('.news-items a.hide').last().removeClass('hide').addClass('show').parent().prependTo('.news-items');
        $('.news-items a.show').last().removeClass('show').addClass('hide');
        $('.news-items a.hide').last().removeClass('hide').addClass('show').parent().prependTo('.news-items');
        $('.news-items a.show').last().removeClass('show').addClass('hide');
        
        var lastHidden = $('.news-items a.hide').last();
        
        $(lastHidden).removeClass('hide').addClass('show').parent().prependTo('.news-items');
                
        $(lastHidden).parent().css("margin-left", "-120px");
        
        $(lastHidden).parent().animate({
            "margin-left": "16px"
        }, 200);
        
        $('.news-items').animate({
            "opacity" : "1"
        }, 200);
        
        $(lastDisplayed).parent().css("margin-right", "16px");
    });
    
    
  });
  
//   $('#news .previous').on('click', function() {
//     $('.news-items a.show').last().hide( "fast", function() {
//       $(this).removeClass('show').addClass('hide').parent().appendTo('.news-items');
//     });
    
//     var hidden_image = $('.news-items a.hide').last();
//     $(hidden_image).parent().prependTo('.news-items');
//     $(hidden_image).show( "fast", function() {
//       $(this).removeClass('hide').addClass('show');
//     });
//   });
  
  /* //СТРЕЛКИ */
  
    $("#upload_link").on('click', function(e){
        e.preventDefault();
        $("#upload:hidden").trigger('click');
    });
    
    
    $('#upload').on('change', function() {
      $("#upload_link").after("<span class='success_upload'>&ensp;&#10004;</span>");
    })
  
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

