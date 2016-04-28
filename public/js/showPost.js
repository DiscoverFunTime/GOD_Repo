$(document).ready(function(){
  console.log('sanity check!');
  var liked = false;
  var $btnLike = $('#btnLike');

  $btnLike.on('click', function(e) {
    if (liked) {
      console.log('button click on false');
      $btnLike.html("♡");
      liked = false;
    } else {
      console.log('button click on true');
      $btnLike.html("💖");
      liked = true;
    }
  });
});