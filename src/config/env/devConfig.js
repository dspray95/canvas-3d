import { DefaultConfig } from "./defaultConfig"
import { CameraConfig } from "../CameraConfig"

class DevConfig extends DefaultConfig {

    static ENV = "dev"
    static SHOW_FPS = false
    static SPAWN_MOBS = true
    static CAMERA_CONFIG = CameraConfig

    static PLAYER_CONFIG = {
        "showPlayer": true,
        "playerXMovementSpeed": 2.5,
        "playerZMovementSpeed": 0,
        "playerStartPosXYZ": [0, 1, 3],
        "enablePlayerController": true
    }

    static MOVEMENT_CONFIG = {
        "enableCameraController": false,
        "moveDownCanyon": true,
        "canyonRunSpeed": 0.4,
    }

}

export { DevConfig }