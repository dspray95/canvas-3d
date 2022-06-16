import { DefaultConfig } from "./env/defaultConfig"
import { DevConfig } from "./env/devConfig"
import { ProdConfig } from "./env/prodConfig"

const ENVIRONMENT = process.env.REACT_APP_ENVIRONMENT
let CONFIG = DefaultConfig

if(ENVIRONMENT === "dev"){
    CONFIG = DevConfig
}
else if(ENVIRONMENT === "prod"){
    CONFIG = ProdConfig
} 
else {
    throw `Invalid environment set in .env. Expected 'dev' or 'prod', recieved ${ENVIRONMENT}`
}


export { ENVIRONMENT, CONFIG}