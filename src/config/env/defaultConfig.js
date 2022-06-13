import { CameraConfig } from "../CameraConfig"

class DefaultConfig{

    static ENV = "dev"
    static SHOW_FPS = false
    static SPAWN_MOBS = false
    static ENABLE_CAMERA_CONTROLLER = false
    static CAMERA_CONFIG = CameraConfig

    static PLAYER_CONFIG = {
        "showPlayer": false,
        "playerXMovementSpeed": 0,
        "playerZMovementSpeed": 0,
        "playerStartPosXYZ": [0, 0, 0],
        "enablePlayerController": false,
    }


    static TERRAIN_CONFIG = {
        "sizeX": 22,
        "sizeY": 30,
        "colorRGB": [60, 66, 98],
        "height": 0,
        "heightMultiplier": 3,
        "initPosXYZ": [0, 0, 0],
        "maxChunks": 5,
        "noise": {
            "scale": 5,
            "octaves": 4,
            "persistance": 0.2,
            "lacunarity": 1.87,
            "seed": 500
        }
    }
}

export { DefaultConfig }