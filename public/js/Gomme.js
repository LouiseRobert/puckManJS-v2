/**
 * Classe gérant les gommes
 */
class Gomme{

	/**
	 * Crée une gomme
	 * @param x abscisse
	 * @param y ordonnée
	 * @param canvasDepl
	 */
	constructor(x, y, canvasDepl){
		//on affecte x et y a this.x et this.y
		this.x = x + 10; // + 10 pour les placer correctement par rapport au Pac
		this.y = y + 10;


		//On dessine la gomme
		var gomme = document.getElementById("gomme");
		this.canvasGomme = canvasDepl;
		this.ctx = this.canvasGomme.getContext("2d");

		this.ctx.drawImage(gomme, this.x, this.y, 10, 10);
	}

	/**
	 * Efface la gomme qui pour coordonnées x et y
	 * @param x
	 * @param y
	 */
	effaceGomme(x ,y){
		this.ctx.clearRect(x+10, y+10, 10, 10);
	}

}
	