window.onload = function() {
  var c = document.getElementById("myCanvas");
  var d = document.getElementById("canvaDepl");
  var ctx = c.getContext("2d");
  var ctxDepl = d.getContext("2d");
  var tile = document.getElementById("tileset");
  ctx.drawImage(tile, 0, 0);


  var pac = new Pac();

  function gererClavier(event) {
    var k = event.key;
    switch (k) {
      case "ArrowLeft" : // touche gauche
        pac.move(-1, 0);
        pac.changeDirection("left");
        break;
      case "ArrowUp" : // touche haut
        pac.move(0, -1);
        pac.changeDirection("up");
        break;
      case "ArrowRight" : // touche droite
        pac.move(1, 0);
        pac.changeDirection("right");
        break;
      case "ArrowDown" : // touche bas
        pac.move(0, 1);
        pac.changeDirection("down");
        break;
    }
  }

  document.addEventListener('keydown', gererClavier);


}