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
     * @param color
     */
    constructor(id, x, y, larg, haut, canvasDepl, color) {
        super(id, x, y, larg, haut, canvasDepl);
        this.color = color;
    }

    /**
     * Gére le déplacement des ennemis
     */
    move() {
        /*super.move(0, 1);
        if (!this.moved) {
            clearInterval(this.myMove);
            let rdm = Math.random();
            if (rdm > 0.66) {
                console.log("1");
                super.move(1, 0);
            } else if (rdm > 0.33) {
                console.log("2");
                super.move(-1, 0);
            } else {
                console.log("3");
                super.move(0, -1);
            }
        }*/
        this.vx = 0;
        this.vy = 1;
        console.log(this.vx + " " + this.vy + " deplacement");

        this.myMove = setInterval(function () {
            //console.log(this.x + "," + this.y); // POUR RECCUPERER LES COORDONNÉES, A SUPPRIMER PLUS TARD
            let elem = document.getElementById(this.id);
            this.ctxDepl.clearRect(this.x, this.y, this.larg, this.haut);

            if(this.estCoordInterdite(this.x+this.vx*20, this.y+this.vy*20)){
                this.changeDirection();
            } else {
                if((this.x === -10 && this.y === 350) || (this.x === -10 && this.y === 330)){
                    this.x = 650
                } else if((this.x === 670 && this.y === 350) || (this.x === 670 && this.y === 330)){
                    this.x = 10;
                } else {
                    this.x += this.vx*20;
                    this.y += this.vy*20;
                }
            }

            this.ctxDepl.drawImage(elem, this.x, this.y, this.larg, this.haut);
        }.bind(this),120);
    }

    changeDirection() {
        let rdm = Math.random();
        let directions = [[0,1],[0,-1],[1,0],[-1,0]];
        //let coord = [this.vx ,this.vy];
        for (let i = 0; i< directions.length; i++) {
            if (directions[i][0] === this.vx && directions[i][1] === this.vy) {
                directions.splice(i, 1);
            }

        }
        /*let index = directions.indexOf(coord);
        if (index !== -1) directions.splice(index, 1);*/

        console.log(directions + "  " + this.vx + " " + this.vy);

        if (rdm > 0.66) {
            this.vx = directions[0][0];
            this.vy = directions[0][1];
        } else if (rdm > 0.33) {
            this.vx = directions[1][0];
            this.vy = directions[1][1];
        } else {
            this.vx = directions[2][0];
            this.vy = directions[2][1];
        }
    }
}