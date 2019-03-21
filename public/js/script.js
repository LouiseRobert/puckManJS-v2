window.onload = function() {
  var c = document.getElementById("myCanvas");
  var d = document.getElementById("canvaDepl");
  var ctx = c.getContext("2d");
  var ctxDepl = d.getContext("2d");
  var tile = document.getElementById("tileset");
  ctx.drawImage(tile, 0, 0);
}

var pac = new Pac();

document.addEventListener('click', function () {
  //let nomTouche = event.key;

  //if (nomTouche == 39) {
    pac.depDroite();
  //}
}, false);


