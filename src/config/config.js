import { DefaultConfig } from "./env/defaultConfig"
import { DevConfig } from "./env/devConfig"
import { ProdConfig } from "./env/prodConfig"

const ENVIRONMENT = "dev"
let CONFIG = DefaultConfig

if(ENVIRONMENT === "dev"){
    CONFIG = DevConfig
}

if(ENVIRONMENT === "prod"){
    CONFIG = ProdConfig
}


export { ENVIRONMENT, CONFIG}