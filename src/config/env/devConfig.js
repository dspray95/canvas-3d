import { DefaultConfig } from "./defaultConfig"

class DevConfig extends DefaultConfig {

    static ENV = "dev"
    static SHOW_FPS = true
    static SPAWN_MOBS = true

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

export { DevConfig }