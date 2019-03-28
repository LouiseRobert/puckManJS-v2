/**
 * Classe générique gérant les éléments du jeu
 */
class Element {

	/**
	 * Crée un nouvel Element
	 * @constructor
	 * @param id : id html pour le récuperer
	 * @param x  abscisse
	 * @param y  ordonnée
	 * @param larg  largeur de l'image
	 * @param haut  hauteur de l'image
	 * @param canvasDepl
	 */
	constructor(id, x, y, larg, haut, canvasDepl){
		this.x = x;
		this.y = y;
		this.larg = larg;
		this.haut = haut;
		this.id = id;

		var elem = document.getElementById(id);
		this.canvas = document.getElementById("myCanvas");
		this.canvaDepl = canvasDepl;

		this.ctx = this.canvas.getContext("2d");

		this.ctxDepl = this.canvaDepl.getContext("2d");
		this.ctxDepl.drawImage(elem, this.x, this.y, this.larg, this.haut);

		//Coordonnées des murs et du centre
		this.coordInterdites = [[290,50],[290,30],[290,70],[530,50],[670,50],[670,70],[670,90],[670,110], [30,10], [10,30],[50,10],[70,10],[90,10],
			[110,10],[130,10],[150,10],[170,10],[190,10],[210,10],[230,10],[250,10],[270,10],[290,10],[290,90],[270,90],[250,90],[230,90],[190,90],
			[170,90],[150,90],[130,90],[110,90],[90,110],[90,130],[90,150],[90,170],[90,190],[110,190],[110,170],[110,150],[110,130],[110,110],[130,110],
			[150,110],[170,110],[190,110],[10,50],[10,70],[10,90],[10,110],[10,130],[10,150],[10,170],[10,190],[10,210],[10,230],[50,230],[70,230],[90,230],
			[110,230],[110,250],[110,270],[110,290],[110,310],[110,330],[110,350],[110,370],[110,390],[110,410],[90,410],[90,390],[90,370],[90,350],[90,330],
			[90,310],[90,290],[90,270],[90,250],[70,250],[50,250],[30,250],[10,250],[10,270],[10,290],[10,310],[-10,310],[-10,370],[10,370],[10,390],[10,410],
			[10,430],[10,45],[10,470],[10,490],[10,510],[10,530],[10,550],[10,570],[10,590],[10,610],[10,630],[30,630],[50,630],[70,630],[90,630],[110,630],
			[130,630],[150,630],[170,630],[190,630],[210,630],[230,630],[250,630],[270,630],[270,610],[270,590],[270,570],[270,550],[250,550],[230,550],
			[290,550],[310,550],[230,550],[230,530],[250,530],[270,530],[290,530],[310,530],[310,550],[310,570],[290,570],[290,590],
			[290,610],[290,630],[310,630],[330,630],[350,630],[370,630],[390,630],[390,610],[390,590],[390,570],[370,570],[370,550],[430,630],[430,610],
			[430,590],[430,570],[450,570],[450,550],[450,530],[410,530],[390,530],[370,530],[430,630],[450,630],[470,630],[490,630],[510,630],[530,630],
			[550,630],[570,630],[590,630],[610,630],[630,630],[650,630],[670,630],[670,610],[670,590],[670,570],[670,550],[670,510],[670,490],[670,470],
			[670,450],[670,430],[670,410],[650,410],[630,410],[610,410],[590,410],[570,410],[570,390],[570,370],[570,350],[570,330],[570,310],[570,290],
			[570,270],[570,250],[570,230],[590,230],[610,230],[610,250],[610,270],[610,290],[610,310],[610,330],[610,350],[610,370],[610,390],[630,390],
			[650,390],[670,390],[670,370],[690,370],[690,310],[670,310],[650,310],[650,290],[650,270],[650,250],[650,230],[650,210],[650,190],[650,170],
			[650,150],[650,130],[650,110],[650,90],[650,70],[650,50],[650,30],[650,10],[630,10],[610,10],[590,10],[570,10],[550,10],[550,30],[550,50],[550,70],
			[570,70],[590,70],[610,70],[610,90],[610,110],[610,130],[610,150],[610,170],[590,170],[570,170],[570,150],[570,130],[570,110],[550,110],[530,110],
			[510,110],[490,110],[490,90],[490,70],[510,70],[530,70],[530,50],[530,30],[510,30],[490,30],[470,30],[450,30],[430,30],[410,30],[390,30],
			[370,30],[350,30],[330,30],[330,50],[330,70],[330,90],[330,110],[310,110],[290,110],[270,110],[250,110],[230,110],[230,90],[30,230],
			[230,110],[230,110],[230,110],[230,110],[230,110],[230,110],[370,90],[370,70],[390,70],[410,70],[430,70],[450,70],[670,530],
			[450,90],[450,110],[430,110],[410,110],[390,110],[370,110],[370,90],[470,150],[490,150],[510,150],[530,150],[530,170],[530,190],[530,210],[530,230],
			[530,250],[510,250],[490,170],[470,170],[590,470],[610,470],[610,490],[610,510],[610,530],[610,550],[510,170],[510,190],[510,210],[510,230],
			[610,570],[590,570],[570,570],[550,570],[530,570],[510,570],[490,570],[490,550],[490,530],[510,530],[530,530],[550,530],[570,530],[570,510],
			[570,490],[570,470],[510,390],[510,410],[510,430],[510,450],[510,470],[490,470],[470,470],[450,470],[450,490],[470,490],[490,490],[510,490],
			[530,490],[530,470],[530,450],[530,430],[530,410],[530,390],[510,390],[370,490],[370,470],[350,470],[330,470],[330,450],[330,430],[310,430],
			[290,430],[290,450],[290,470],[290,490],[310,490],[330,490],[350,490],[370,490],[230,490],[210,490],[190,490],[170,490],[170,470],[170,450],
			[170,430],[190,430],[190,450],[190,470],[210,470],[230,470],[230,490],[170,550],[170,530],[150,530],[130,530],[110,530],[110,510],[110,490],
			[110,470],[90,470],[90,490],[90,510],[70,510],[70,530],[90,530],[90,550],[250,390],[270,390],[290,390],[310,390],[330,390],[350,390],[370,390],
			[390,390],[390,410],[390,430],[410,430],[410,410],[410,390],[410,370],[410,350],[430,350],[450,350],[470,350],[490,350],[510,350],[530,350],
			[530,330],[530,310],[510,310],[510,330],[490,330],[470,330],[450,330],[430,330],[410,310],[410,290],[110,550],[130,550],[150,550],
			[410,210],[410,230],[410,250],[410,270],[390,270],[370,270],[350,270],[330,270],[310,270],[310,250],[310,230],[310,210],[310,190],[310,170],
			[330,170],[350,170],[350,150],[330,150],[310,150],[290,150],[270,150],[250,150],[230,150],[210,150],[190,150],[170,150],[170,170],[170,190],
			[170,210],[190,170],[290,270],[270,270],[270,290],[270,310],[250,310],[230,310],[210,310],[190,310],[170,310],[170,310],[170,330],[10,510],
			[190,330],[210,330],[230,330],[250,330],[250,350],[250,370],[430,530],[290,170],[270,170],[250,170],[230,170],[210,170],[10,450]];

	}

	/**
	 * Teste si une coordonnée est accessible
	 * @param x
	 * @param y
	 * @returns {boolean} : true si la coordonnée est interdite, false sinon
	 */
	estCoordInterdite(x, y){
		for(let tab of this.coordInterdites){
			if(tab[0] === x && tab[1] === y){
				return true;
			}
		}
		return false;
	}


	/**
	 * Déplace un Element sur son canvas de deplacement
	 * @param x  deplacement en abscisse
	 * @param y  deplacement en ordonnée
	 */
	move(x,y) {

		//console.log(this.moving);
		if (this.moving !== undefined) {
			if (this.moving === x + " " + y) {
				return false;
			} else {
				clearInterval(this.myMove);
			}
		}
		this.moving = x + " " + y;
		this.myMove = setInterval(function () {
			console.log(this.x + "," + this.y); // POUR RECCUPERER LES COORDONNÉES, A SUPPRIMER PLUS TARD
			var elem = document.getElementById(this.id);
			this.ctxDepl.clearRect(this.x, this.y, this.larg, this.haut);

			if(this.estCoordInterdite(this.x+x*20, this.y+y*20)){
				x = 0;
				y = 0;
			} else{
				if((this.x === -10 && this.y === 350) || (this.x === -10 && this.y === 330)){
					this.x = 650
				} else if((this.x === 670 && this.y === 350) || (this.x === 670 && this.y === 330)){
					this.x = 10;
				} else {
					this.x += x*20;
					this.y += y*20;
				}
			}

			this.ctxDepl.drawImage(elem, this.x, this.y, this.larg, this.haut);
		}.bind(this),120);
	}


	/**
	 * Getter des coordonées de this
	 * @returns {*[]} : tableau des coordonnées de this
	 */
	getCoord(){
		return [this.x, this.y];
	}
}
