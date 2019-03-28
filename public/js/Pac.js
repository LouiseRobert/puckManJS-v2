class Pac extends Element{
	constructor(canvasDepl, placeGommes){
		super('pacG', 270, 210, 25, 25, canvasDepl);
		this.coordGommes = placeGommes;
		this.gommesMangees = 0;
	}

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

	move(x, y){
		super.move(x, y);

		this.myMove2 = setInterval(function(){
			for(var tabcoord of this.coordGommes){
				if(tabcoord[0] == this.getCoord()[0] && tabcoord[1] == this.getCoord()[1]){
					tabcoord[0] = 0;
					tabcoord[1] = 0;
					this.gommesMangees += 1;
				}
			}
			
		}.bind(this),120);

		console.log("gommes mangées: " + this.gommesMangees );
	}
}
