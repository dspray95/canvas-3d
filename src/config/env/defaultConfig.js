class DefaultConfig{

    static ENV = "dev"
    static SHOW_FPS = false
    static SPAWN_MOBS = false

    static PLAYER_CONFIG = {
        "showPlayer": false,
        "playerMovementSpeed": 0,
        "playerStartPosXYZ": [0, 0, 0],
        "enableXAxisControl": false
    }

    static MOVEMENT_CONFIG = {
        "enableCameraController": false,
        "moveDownCanyon": false,
        "canyonRunSpeed": 0,
    }

    static TERRAIN_CONFIG = {
        "sizeX": 22,
        "sizeY": 30,
        "colorRGB": [60, 66, 98],
        "height": 0,
        "heightMultiplier": 3,
        "initPosXYZ": [0, 0, 0]
    }
}

export { DefaultConfig }