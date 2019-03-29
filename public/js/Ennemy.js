/**
 * Classe gérant les ennemis
 */
class Ennemy extends Element {

    /**
     * Crée un ennemi en appelant le constructeur lastdirection'element
     * @param id
     * @param x
     * @param y
     * @param larg
     * @param haut
     * @param canvasDepl
     * @param turningPoints  tableau des points où on peut tourner sans âvoir été bloqué
     */
    constructor(id, x, y, larg, haut, canvasDepl, turningPoints) {
        super(id, x, y, larg, haut, canvasDepl);
        this.turningPoints =turningPoints;
        this.lastdirection = "top";
        this.directions = {
            "top" : {"x" : 0, "y" : -1, "opposite" : "bot", "toturn" : ["left", "right"]},
            "bot" : {"x" : 0, "y" : 1, "opposite" : "top", "toturn" : ["left", "right"]},
            "left" : {"x" : -1, "y" : 0, "opposite" : "right", "toturn" : ["top", "bot"]},
            "right" : {"x" : 1, "y" : 0, "opposite" : "left", "toturn" : ["top", "bot"]},
        };
    }

    /**
     * Détermine si une case est un point d'où l'on peut tourner ou pas
     * @param x abscisse de la case
     * @param y ordonnée de la case
     * @returns {boolean|*[]} true si c'est un point d'où l'on peut tourner, false sinon
     */
    isturningPoint(x, y){
        for(let i = 0; i<this.turningPoints.length; i++){
            if(this.turningPoints[i][0] === x && this.turningPoints[i][1] === y){
                return [true, this.turningPoints[i][2]];
            }
        }
        return [false, null];
    }

    /**
     * Fait tourner l'ennemi de pi/2 ou -pi/2 au hasard
     * @return string : retourne la direction attribuée
     */
    turn() {
        let rdm = Math.random();
        if (rdm >= 0.5) {
            this.lastdirection = this.directions[this.lastdirection]["toturn"][0];
        } else {
            this.lastdirection = this.directions[this.lastdirection]["toturn"][1];
        }
        return this.lastdirection;
    }

    /**
     * Gére le déplacement des ennemis
     */
    move() {
        //on applique un setInterval a notre fonction pour que les fantômes bougent toujours
        this.EnMove = setInterval(function () {

            //On récupère l'image de l'ennemi et on l'efface
            let elem = document.getElementById(this.id);
            this.ctxDepl.clearRect(this.x, this.y, this.larg, this.haut);

            if (this.x === pac.getCoord()[0] && this.y === pac.getCoord()[1]) {
                if (pac.godMode === "on") {

                } else {
                    pac.revive();
                }
            }

            //On a maintenant 3 possibilités :
            //1) La case où l'on veut aller est libre, on peut avancer, c'est le cas le plus simple, on à juste à incrémenter x et y
            //2) La case où l'on veut aller est occupée, on ne peut donc pas avancer et doit donc tourner
            //3) Le cas où la case sur laquelle on est nous permet de tourner mais n'étant pas bloquer par un mur on doit distinguer ce cas pour avoir une chance de tourner

            // On gère le cas où l'on peut tourner mais où l'on a le choix
            if (this.isturningPoint(this.x+this.directions[this.lastdirection]["x"]*20, this.y+this.directions[this.lastdirection]["y"]*20)[0]) {

                //On récupère les directions dans lesquelles les cases sont libres depuis notre position actuelle
                let possibleDirections = this.isturningPoint(this.x+this.directions[this.lastdirection]["x"]*20, this.y+this.directions[this.lastdirection]["y"]*20)[1];

                //On enlève la direction opposée à la nôtre pour ne pas faire de sur place
                let possibleDirections2 = possibleDirections.filter(function (value) {
                    return value !== this.directions[this.lastdirection]["opposite"];
                }.bind(this));

                //On va utiliser un random pour choisir entre les directions restantes
                let rdm = Math.random();

                //Il peut y en avoir 2 ou 3 restantes puisqu'il y en avait 4 maximum, 3 minimum et qu'on en a enlevé une
                //On leur affecte chacun une des directions
                if (parseFloat(rdm) > parseInt(possibleDirections2.length-1) / parseInt(possibleDirections2.length)) {
                    this.lastdirection = possibleDirections2[0];
                } else if (parseFloat(rdm) > parseInt(possibleDirections2.length-2) / parseInt(possibleDirections2.length)) {
                    this.lastdirection = possibleDirections2[1];
                } else if(possibleDirections2.length-3 === 0) { // Ce cas est celui où l'on a 3 directions restantes
                    this.lastdirection = possibleDirections2[2];
                }
            }

            //On gère maintenant les deux autre cas en commençant par la collision
            if(this.estCoordInterdite(this.x+this.directions[this.lastdirection]["x"]*20, this.y+this.directions[this.lastdirection]["y"]*20)) {
                //On tourne dans une des deux directions à pi/2 de la direction actuelle et on enregistre la direction que l'on a pas retenu
                let lasthope = this.turn();

                //Si la direction choisie est valide, on avance
                if (!this.estCoordInterdite(this.x + this.directions[this.lastdirection]["x"] * 20, this.y + this.directions[this.lastdirection]["y"] * 20)) {
                    this.x += this.directions[this.lastdirection]["x"] * 20;
                    this.y += this.directions[this.lastdirection]["y"] * 20;

                    //Sinon on essaye l'autre
                } else if (!this.estCoordInterdite(this.x + this.directions[lasthope]["x"] * 20, this.y + this.directions[lasthope]["y"] * 20)) {
                    this.x += this.directions[this.lastdirection]["x"] * 20;
                    this.y += this.directions[this.lastdirection]["y"] * 20;

                    //Si l'autre non plus ne va pas on fait demi-tour
                } else {
                    this.x += this.directions[this.directions[this.lastdirection]["opposite"]]["x"] * 20;
                    this.y += this.directions[this.directions[this.lastdirection]["opposite"]]["y"] * 20;
                }

                //Il ne reste plus que le cas où tout va bien
            } else {

                //On gère le passage secret
                if((this.x === -10 && this.y === 350) || (this.x === -10 && this.y === 330)){
                    this.x = 650
                } else if((this.x === 670 && this.y === 350) || (this.x === 670 && this.y === 330)){
                    this.x = 10;

                    //On applique finalement le déplacement
                } else {
                    this.x += this.directions[this.lastdirection]["x"]*20;
                    this.y += this.directions[this.lastdirection]["y"]*20;
                }
            }
            //On dessine l'ennemi sur sa case d'arrivée
            this.ctxDepl.drawImage(elem, this.x, this.y, this.larg, this.haut);

            if (this.x === pac.getCoord()[0] && this.y === pac.getCoord()[1]) {
                if (pac.godMode === "on") {

                } else {
                    pac.revive();
                }
            }
        }.bind(this),120);
    }

    /**
     * Arrête le déplacement de l'ennemi
     */
    stop() {
        clearInterval(this.EnMove);
    }
}