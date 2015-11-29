$(function() {
  $('#slides').slidesjs({
    width: 752,
    height: 445,
    // navigation: true,
    // pagination: {
    //   active: true,
    //   effect: "slide"
    // },
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