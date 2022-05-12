import { DefaultConfig } from "./defaultConfig"
import { CameraConfig } from "../CameraConfig"

class ProdConfig extends DefaultConfig{

    static ENV = "dev"
    static SHOW_FPS = false
    static SPAWN_MOBS = false

    static PLAYER_CONFIG = {
        "showPlayer": true,
        "playerXMovementSpeed": 0.1,
        "playerZMovementSpeed": 0.4,
        "playerStartPosXYZ": [0, 1, 3],
        "enablePlayerController": true
    }

    static MOVEMENT_CONFIG = {
        "enableCameraController": false,
        "moveDownCanyon": true,
        "canyonRunSpeed": 0.4,
    }

}

export { ProdConfig }