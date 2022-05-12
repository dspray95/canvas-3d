import { DefaultConfig } from "./defaultConfig"

class ProdConfig extends DefaultConfig{

    static ENV = "dev"
    static SHOW_FPS = false
    static SPAWN_MOBS = false

    static PLAYER_CONFIG = {
        "showPlayer": true,
        "playerMovementSpeed": 0.1,
        "playerStartPosXYZ": [0, 0, 0],
        "enableXAxisControl": true
    }

    static MOVEMENT_CONFIG = {
        "enableCameraController": false,
        "moveDownCanyon": true,
        "canyonRunSpeed": 0.4,
    }

}

export { ProdConfig }