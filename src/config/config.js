import { DefaultConfig } from "./env/defaultConfig"
import { DevConfig } from "./env/devConfig"
import { ProdConfig } from "./env/prodConfig"
import { TestConfig } from "./env/testCongfig"

const ENVIRONMENT = process.env.REACT_APP_ENVIRONMENT
let CONFIG = DefaultConfig

if(ENVIRONMENT === "dev"){
    CONFIG = DevConfig
}
else if(ENVIRONMENT === "prod"){
    CONFIG = ProdConfig
} 
else if(ENVIRONMENT === "test"){
    CONFIG = TestConfig;
}


export { ENVIRONMENT, CONFIG}