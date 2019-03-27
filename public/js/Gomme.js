class Gomme{
	constructor(x, y){
		this.x = x + 10;
		this.y = y + 10;

		var gomme = document.getElementById("gomme");
		this.canvasGomme = document.getElementById("canvaGomme");
		this.ctx = this.canvasGomme.getContext("2d");

		this.ctx.drawImage(gomme, this.x, this.y, 10, 10);
	}

}