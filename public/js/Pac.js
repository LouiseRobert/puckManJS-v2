/**
 * Classe gérant le personnage principal
 */
class Pac extends Element{

	/**
	 * Crée un nouveau pac avec un canvas de déplacement et des gommes en appelant le constructeur lastdirection'element
	 * @constructor
	 * @param canvasDepl canvas sur lequel Pac se déplace
	 * @param placeGommes emplacement des gommes
	 * @param placeVitamine emplacement des vitamines
	 */
	constructor(canvasDepl, placeGommes, placeVitamine){
		super('pacG', 270, 210, 25, 25, canvasDepl);
		this.lifeLeft = 3;
		this.coordGommes = placeGommes;
		this.gommesMangees = 0;
		this.coordVit = placeVitamine;
		this.godMode = "off"
	}

	/**
	 * change l'image du pac en fonction de la direction lastdirection dans laquelle il se dirige
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
	move(x, y) {
		super.move(x, y);

		setInterval(function(){
			for(let tabcoord of this.coordGommes){
				if(tabcoord[0] === this.getCoord()[0] && tabcoord[1] === this.getCoord()[1]){
					tabcoord[0] = 0;
					tabcoord[1] = 0;
					this.gommesMangees += 1;
				}
			}

			if(this.gommesMangees === this.coordGommes.length){
				this.gommesMangees = NaN; //pour éviter les incrémentations inattendues
				clearInterval(this.myMove);
				BlinkyE.stop();
				PinkyE.stop();
				ClydeE.stop();
				InkyE.stop();
				const div = document.createElement("div");
				let p = document.createElement("p");
				let rejouer = document.createElement("button");
				p.innerHTML = "bravo, vous avez gagné !";
				rejouer.innerHTML = "rejouer";
				rejouer.onclick = function(){document.location.href = location.href;};
				div.appendChild(p);
				div.appendChild(rejouer);
				div.style.border = "1px solid #CB0000";
				div.style.width = "20%";
				div.style.height = "20%";
				div.style.backgroundColor = "#EB8F28";
				p.style.textAlign = "center";
				rejouer.style.marginLeft = "38.5%";
				rejouer.style.marginRight = "38.5%";
				document.body.appendChild(div);
			}
		}.bind(this),120);

		for (let i = 0; i < this.coordVit.length; i++) {
			if (this.coordVit[i][0]===this.x && this.coordVit[i][1]===this.y) {
				this.coordVit.splice(i, 1);
				pac.godMode = "on";
				document.getElementById("godMode").innerHTML = "Vous etes invincibles pour une courte durée";
				setTimeout(function () {
					document.getElementById("godMode").innerHTML = "";
					pac.godMode = "off";
				}, 3000);
			}
		}
		//console.log("gommes mangées: " + this.gommesMangees);
	}

	/**
	 * Fait revivre ou perdre le joueur selon son nombre de vies restantes
	 */
	revive() {
		clearInterval(this.myMove);
		BlinkyE.stop();
		PinkyE.stop();
		ClydeE.stop();
		InkyE.stop();
		document.body.style.backgroundColor = "#D3D3D3";
		if (this.lifeLeft > 0) {
			this.lifeLeft--;
			document.getElementById("cpthp").innerHTML = "Il vous reste " + pac.lifeLeft + " vies.";
			let ctxPac = document.getElementById("canvaDepl").getContext("2d");
			ctxPac.clearRect(this.x, this.y, 25, 25);
			this.x = 270;
			this.y = 210;
			ctxPac.drawImage(document.getElementById(this.id), this.x, this.y, 25, 25);
			document.body.style.backgroundColor = "white";
			setTimeout(function () {
				BlinkyE.move();
				PinkyE.move();
				ClydeE.move();
				InkyE.move();
			}, 1000);
		} else if (this.lifeLeft === 0) {
			const div = document.createElement("div");
			let p = document.createElement("p");
			let rejouer = document.createElement("button");
			p.innerHTML = "Vous avez perdu !";
			rejouer.innerHTML = "rejouer";
			rejouer.onclick = function(){document.location.href = location.href;};
			div.appendChild(p);
			div.appendChild(rejouer);
			div.style.border = "1px solid #CB0000";
			div.style.width = "20%";
			div.style.height = "20%";
			div.style.backgroundColor = "#EB8F28";
			p.style.textAlign = "center";
			rejouer.style.marginLeft = "38.5%";
			rejouer.style.marginRight = "38.5%";
			document.body.appendChild(div);
		}
	}
}

