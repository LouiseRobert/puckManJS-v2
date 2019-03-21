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
        pac.changeDirection("left");
        pac.move(-1, 0);
        break;
      case "ArrowUp" : // touche haut
        pac.changeDirection("up");
        pac.move(0, -1);
        break;
      case "ArrowRight" : // touche droite
        pac.changeDirection("right");
        pac.move(1, 0);
        break;
      case "ArrowDown" : // touche bas
        pac.changeDirection("down");
        pac.move(0, 1);
        break;
    }
  }

  document.addEventListener('keydown', gererClavier);


};