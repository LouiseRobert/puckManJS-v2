/**
 * Classe gérant le personnage principal
 */
class Pac extends Element{

	/**
	 * Crée un nouveau pac avec un canvas de déplacement et des gommes en appelant le constructeur d'element
	 * @constructor
	 * @param canvasDepl
	 * @param placeGommes
	 */
	constructor(canvasDepl, placeGommes){
		super('pacG', 270, 210, 25, 25, canvasDepl);
		this.coordGommes = placeGommes;
		this.gommesMangees = 0;
	}

	/**
	 * change l'image du pac en fonction de la direction d dans laquelle il se dirige
	 * @param d : direction dans laquelle le pac se dirige
	 */
	changeDirection(d) {
		switch (d) {
			case "right":
				this.src = "public/img/pacmanDroite.gif";
				break;
			case "left":
				this.src = "public/img/pacmanGauche.gif";
				break;
			case "up":
				this.src = "public/img/pacmanHaut.gif";
				break;
			case "down":
				this.src = "public/img/pacmanBas.gif";
				break;
		}
		document.getElementById(this.id).src = this.src;
	}


	/**
	 * Déplace le pac en faisant appel à move de Element et mange les gommes si il se déplace dessus
	 * @param x
	 * @param y
	 */
	move(x, y){
		super.move(x, y);

		this.myMove2 = setInterval(function(){
			for(var tabcoord of this.coordGommes){
				if(tabcoord[0] === this.getCoord()[0] && tabcoord[1] === this.getCoord()[1]){
					tabcoord[0] = 0;
					tabcoord[1] = 0;
					this.gommesMangees += 1;
				}
			}

			if(this.gommesMangees == this.coordGommes.length){
				this.gommesMangees = NaN; //pour éviter les incrémentations inattendues
				var div = document.createElement("div");
						var p = document.createElement("p");
						var rejouer = document.createElement("button");
						p.innerHTML = "bravo, vous avez gagné !";
						rejouer.innerHTML = "rejouer";
						rejouer.onclick = function(){document.location.reload(false);}
						div.appendChild(p);
						div.appendChild(rejouer);
						div.style.border = "1px solid black";
						div.style.width = "20%";
						div.style.height = "20%";
						p.style.textAlign = "center";
						rejouer.style.marginLeft = "38.5%";
						rejouer.style.marginRight = "38.5%";
						document.body.appendChild(div);
			}
		}.bind(this),120);

		console.log("gommes mangées: " + this.gommesMangees);
	}
}
