import Vector from "../../../engine/rendering/objects/primitives/Vector";
import { randomIntRange } from "../../../tools/Random";
import { Blocker } from "../game-objects/world/Blocker";
import { BehaviourScript } from "./BehaviourScript";
import { SpawnerConfig } from "./SpawnerConfig";


class MobSpawner extends BehaviourScript{

    constructor(worldspace, spawnerConfig){
        this.worldspace = worldspace
        this.spawnerConfig = spawnerConfig
    }

    static getRandomBlockerConfiguration(blockerZPos){
        let blockerConfig = this.spawnerConfig.BLOCKER_CONFIGURATIONS[
            randomIntRange(0, this.spawnerConfig.BLOCKER_CONFIGURATIONS.length)
        ].copy()

        blockerConfig.forEach((blocker, index) => {
            if (blocker === 1){
                this.worldspace.mobs.add(
                    new Blocker(new Vector(index - 1, this.spawnerConfig.BLOCKER_Y_POS, blockerZPos)), 
                    this.worldspace
                )
            }
        })
    }

    execute(){}
}

export { MobSpawner }