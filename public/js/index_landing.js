$(document).ready(function(){
  console.log("test")
  $('#load').fadeOut(4000, function(){ 
  $('#landingComp').css('visibility','visible')
  $('.pages.navbar-through').css('visibility','visible').hide().fadeIn(1300);
  }); 

  $("body").on("click", ".item-title", function(e){ //youtube dialoge out of a stable component that will remain the same
    window.location.href='/auth/login';
    // var pic = $(event.currentTarget);
  });               

});

 