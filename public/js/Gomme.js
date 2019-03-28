class Gomme{
	constructor(x, y, canvasDepl){
		this.x = x + 10; // +10 pour les placer correctemet par rapport au Pac
		this.y = y + 10;

		var gomme = document.getElementById("gomme");
		this.canvasGomme = canvasDepl;
		this.ctx = this.canvasGomme.getContext("2d");

		this.ctx.drawImage(gomme, this.x, this.y, 10, 10);
	}

	effaceGomme(x ,y){
		this.ctx.clearRect(x+10, y+10, 10, 10);
	}

}
	