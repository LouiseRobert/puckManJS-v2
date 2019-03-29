/**
 * On exécute le code quand la fenetre est chargée
 */
window.onload = function() {
  // gestion de la musique
  var div = document.createElement("div");
  var music = document.createElement("audio");
  music.controls;
  music.autoplay = true;
  music.src = "public/music/pacmanRemix.mp3";
  music.loop = true;

  div.appendChild(music);
  var p = document.createElement("p");
  p.innerHTML = "un peu de musique agréable ? :)";
  p.style.textAlign = "center";
  var play = document.createElement("img");
  play.src = "public/img/son.png";
  play.style.width = "20%";
  play.style.height = "50%";
  play.style.marginLeft = "30%";

  var stop = document.createElement("img");
  stop.src = "public/img/silence.png";
  stop.style.width = "20%";
  stop.style.height = "50%";
  stop.style.marginRight = "30%";


  div.appendChild(p);
  div.appendChild(play);
  div.appendChild(stop);

  play.onclick = function(){music.src = "public/music/pacmanRemix.mp3";};
  stop.onclick = function(){music.src = "";};

  div.style.border = "1px solid black";
  div.style.width = "300px";
  div.style.height = "100px";

  document.body.appendChild(div);

//On definit des constantes pour les directions
  const bot = "bot";
  const left = "left";
  const right = "right";
  const top = "top";

  // si le jeu est en pause ou non (-1 s'il n'est pas en pause)
  var interval = -1;

    //On crée les variables dont on a besoin pour dessiner la map, les personnages et les gommes
  var c = document.getElementById("myCanvas");
  var d = document.getElementById("canvaDepl");
  var ctx = c.getContext("2d");
  var tile = document.getElementById("tileset");
  ctx.drawImage(tile, 0, 0);

  //On crée un tableau contenant les emplacements des gommes
  var emplacementGommes = [[270,50],[250,50],[230,50],[210,50],[190,50],[170,50],
    [150,50],[130,50],[110,50],[90,50],[70,50],[50,50],[50,70],[50,90],[50,110],
    [50,130],[50,150],[50,170],[50,190],[130,130],[130,150],[130,170],[130,190],
    [130,210],[130,230],[130,250],[130,270],[130,290],[130,310],[130,330],[130,350],
    [130,370],[130,390],[130,410],[130,430],[130,450],[130,470],[130,490],
    [130,510],[150,510],[170,510],[190,510],[210,510],[230,510],[250,510],[270,510],
    [290,510],[310,510],[330,510],[350,510],[370,510],[390,510],[410,510],[430,510],
    [450,510],[470,510],[490,510],[510,510],[530,510],[550,510],[550,490],[550,470],
    [550,450],[550,430],[550,410],[550,390],[550,370],[550,350],[550,330],
    [550,310],[550,290],[550,270],[550,250],[550,230],[550,210],[550,190],[550,170],
    [550,150],[550,130],[530,130],[510,130],[490,130],[470,130],[450,130],[430,130],
    [410,130],[390,130],[370,130],[350,130],[330,130],[310,130],[290,130],[270,130],
    [250,130],[230,130],[210,130],[190,130],[170,130],[150,130],[350,50],[370,50],
    [390,50],[410,50],[430,50],[450,50],[470,50],[490,50],[210,190],[210,210],[210,230],
    [210,250],[210,270],[210,290],[50,270],[50,290],[50,310],[50,330],[50,350],
    [50,370],[50,390],[50,410],[50,430],[50,450],[50,470],[50,490],[50,510],[50,530],
    [50,550],[50,570],[230,590],[210,590],[190,590],[170,590],[150,590],
    [130,590],[110,590],[90,590],[70,590],[50,590],[210,350],[210,370],[210,390],
    [210,410],[210,430],[370,410],[350,410],[330,410],[310,410],[290,410],[270,410],
    [250,410],[230,410],[350,450],[370,450],[390,450],[410,450],[430,450],[450,450],
    [470,450],[490,450],[350,430],[450,370],[450,390],[450,410],[450,430],[490,370],
    [490,390],[490,410],[490,430],[470,370],[450,290],[450,270],[450,250],[450,230],
    [450,210],[450,190],[470,190],[470,210],[470,230],[470,250],[470,270],[470,290],
    [570,50],[590,50],[610,50],[630,50],[630,70],[630,90],[630,110],[630,130],[630,150],
    [630,170],[630,190],[630,210],[630,230],[630,250],[630,270],[630,290],[630,310],
    [630,330],[630,350],[630,370],[310,590],[330,590],[350,590],[370,590],[450,590],
    [470,590],[490,590],[510,590],[530,590],[550,590],[570,590],[590,590],[610,590],
    [630,590],[630,430],[630,450],[630,470],[630,490],[630,510],[630,530],[630,550],
    [630,570]];


  //On crée une gomme a chacun des emplacements du tableau
    for(let coord of emplacementGommes){
        new Gomme(coord[0], coord[1], d);
    }


    let pac = new Pac(d, emplacementGommes);

//Tableau des cases où les fantomes doivent avoir une chance de tourner meme s'ils ne sont pas arretes par un decor

  let arr = [[210, 50, [bot, left, right]],[350,130, [top, right,left]],[130,210,[left,top,bot]],[470,50,[bot,left,right]],[210,130,[top,left,right]],[470,130,[top,left,right]],[370,130,[bot,left,right]],[390,130,[bot,left,right]],[410,130,[bot,left,right]]
      ,[410,130,[bot,left,right]],[430,130,[bot,left,right]],[450,130,[bot,left,right]],[550,290,[bot,left,top]],[550,190,[bot,top,right]],[630,190,[bot,left,top]],[550,370,[bot,left,top]],[550,430,[bot,top,right]],[470,510,[bot,left,right]],[470,590,[top,left,right]]
      ,[390,510,[top,left,right]],[410,510,[top,left,right]],[430,510,[top,left,right]],[390,450,[bot,left,right]],[410,450,[bot,left,right]],[430,450,[bot,left,right]],[350,590,[top,left,right]],[330,590,[top,left,right]],[330,510,[bot,left,right]],[350,510,[bot,left,right]]
      ,[250,510,[top,left,right]],[270,510,[top,left,right]],[270,410,[bot,left,right]],[250,410,[bot,left,right]],[130,410,[top,bot,right]],[130,390,[top,bot,right]],[130,370,[top,bot,right]],[130,350,[top,bot,right]]
      ,[130,270,[top,bot,right]],[130,250,[top,bot,right]],[130,230,[top,bot,right]],[130,290,[top,bot,right]],[190,290,[top,bot,left,right]],[190,270,[top,bot,left,right]],[190,250,[top,bot,left,right]],[190,230,[top,bot,left,right]]
      ,[190,510,[left,bot,right]],[210,510,[left,bot,right]],[190,590,[left,top,right]],[210,590,[left,top,right]],[50,430,[top,bot,right]],[50,450,[top,bot,right]],[150,430,[top,bot,left]],[130,450,[top,bot,left]]];
    /*let blinky = new Ennemy('blinky', 270, 210, 25, 25, d, "red");
    blinky.move();*/


    //on gere les entrées clavier pour se déplacer
  function gererClavier(event) {
    let k = event.key;
    switch (k) {
      case "ArrowLeft" : // touche gauche
        pac.changeDirection(left);
        pac.move(-1, 0);
        break;
      case "ArrowUp" : // touche haut
        pac.changeDirection("up");
        pac.move(0, -1);
        break;
      case "ArrowRight" : // touche droite
        pac.changeDirection(right);
        pac.move(1, 0);
        break;
      case "ArrowDown" : // touche bas
        pac.changeDirection("down");
        pac.move(0, 1);
        break;        
    }
  }
  // on gère la barre espace pour mettre le jeu en pause
  function gererPause(event){
    let k = event.key;
    if(k == " "){
      if(interval == -1){
          console.log("PAUSED");
          interval = setInterval(function(){ window.setTimeout(function(){},100); }, 100);
          document.body.style.backgroundColor = "#D3D3D3";
        } else {
          clearInterval(interval);
          interval = -1;
          document.body.style.backgroundColor = "white";
        }
    }
  }

  document.addEventListener('keydown', gererPause);

  // on vérifie toutes les 0.1 ms si le jeu est en pause
setInterval(function(){
  if(interval == -1){
    document.addEventListener('keydown', gererClavier);
  } else{
    document.removeEventListener('keydown', gererClavier);
  }}, 100);
  


};