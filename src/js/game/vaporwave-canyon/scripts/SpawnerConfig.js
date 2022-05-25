class SpawnerConfig{

    BLOCKER_CHANCE = 0.05
    STARFIGHTER_CHANCE = 0.05
    COIN_CHANCE = 0.1
    
    BLOCKER_Y_POS = 1
    BLOCKER_CONFIGURATIONS = [
        [0, 0, 1],
        [0, 1, 1],
        [1, 0, 0],
        [1, 1, 0],
        [0, 1, 0]
    ]

    MIN_DISTANCE_BETWEEN_MOBS = 5

}

export { SpawnerConfig }