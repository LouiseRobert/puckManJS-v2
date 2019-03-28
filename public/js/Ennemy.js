/**
 * Classe gérant les ennemis
 */
class Ennemy extends Element {

    /**
     * Crée un ennemi en appelant le constructeur d'element
     * @param id
     * @param x
     * @param y
     * @param larg
     * @param haut
     * @param canvasDepl
     */
    constructor(id, x, y, larg, haut, canvasDepl) {
        super(id, x, y, larg, haut, canvasDepl);
    }

    /**
     * Gére le déplacement des ennemis
     * @param x
     * @param y
     */
    move(x, y) {
        super.move(x, y);
    }
}