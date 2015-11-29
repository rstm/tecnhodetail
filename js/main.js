$(function() {
  $('#slides').slidesjs({
    width: 752,
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
  
  $('#form-start-button').on('click', function() {
    $('#main-form').show();
    $('#form-background').show();
  });
  
  $('#close').on('click', function() {
    $('#main-form').hide();
    $('#form-background').hide();
  })
  
  $('#next-step').on('click', function() {
    $('#first-step').hide();
    $('#second-step').show();
  });
  
  $('#submit-btn').on('click', function() {
    $('#second-step').hide();
    $('#final-step').show();
  });
    
  
});