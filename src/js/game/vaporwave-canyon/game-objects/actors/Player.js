import { Color } from "../../../../tools/Colors";
import { Starfighter } from "./Starfighter";

class Player extends Starfighter {

    constructor(location, parent){
        super(location, parent, Color.ELECTRIC_BLUE, "player")
        this.health = 3
    }

}

export { Player }