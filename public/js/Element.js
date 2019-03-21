class Element {
	constructor(id, x, y, larg, haut){
		this.x = x;
		this.y = y;
		this.larg = larg;
		this.haut = haut;
		this.id = id;

		var elem = document.getElementById(id);

		this.canvas = document.getElementById("myCanvas");
		this.canvaDepl = document.getElementById("canvaDepl");

  		this.ctx = this.canvas.getContext("2d");

  		this.ctxDepl = this.canvaDepl.getContext("2d");
  		this.ctxDepl.drawImage(elem, this.x, this.y, this.larg, this.haut);
  	}

  	move(x,y) {
		var elem = document.getElementById(this.id);
		this.ctxDepl.clearRect(this.x, this.y, this.larg, this.haut);
		this.x += x*20;
		this.y += y*20;
		console.log(this.x + " , " + this.y);
		this.ctxDepl.drawImage(elem, this.x, this.y, this.larg, this.haut);

	}

	depDroite(){
		var elem = document.getElementById(this.id);
		this.ctxDepl.clearRect(this.x, this.y, this.larg, this.haut);
		this.x += 20;
		console.log(this.x + " , " + this.y);
		this.ctxDepl.drawImage(elem, this.x, this.y, this.larg, this.haut);

	}


}