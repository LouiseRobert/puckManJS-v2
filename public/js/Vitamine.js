/**
 * Classe gérant les vitamines
 */
class Vitamine{
	/**
	 * Crée une vitamine
	 * @param x abscisse
	 * @param y ordonnée
	 * @param canvasDepl
	 */
	constructor(x, y, canvasDepl){
		//on affecte x et y a this.x et this.y
		this.x = x + 5; // + 5 pour les placer correctement par rapport au Pac
		this.y = y + 5;


		//On dessine la gomme
		var vitamine = document.getElementById("vitamine");
		this.canvasVit = canvasDepl;
		this.ctx = this.canvasVit.getContext("2d");

		this.ctx.drawImage(vitamine, this.x, this.y, 22, 22);
	}
}