class Pac extends Element{
	constructor(){
		super('pacD', 30, 30, 25, 25);
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
}

