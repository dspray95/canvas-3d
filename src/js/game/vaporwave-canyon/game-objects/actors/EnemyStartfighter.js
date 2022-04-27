import { Color } from "../../../../tools/Colors";
import { Starfighter } from "./Starfighter";

class EnemyStarfighter extends Starfighter {

    constructor(location, parent){
        super(location, parent, Color.RED, "enemy-starfighter")
    }

}

export { EnemyStarfighter }