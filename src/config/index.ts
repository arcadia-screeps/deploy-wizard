import defaultConfig from "@/config/default-config" ;
import type Language from "@/lib/enum/language" ;
import {createOJM} from "@/lib/ojm/ojm" ;
import fs from "fs-extra" ;
import path from "path" ;
import * as process from "process" ;

export interface ScreepsDeployWizardConfig {
    language?: Language;
}

const USER_HOME = process.env.HOME ?? process.env.USERPROFILE! ;
const configDir = path.join(USER_HOME, ".screep-deploy-wizard") ;
const configFileName = "config.json" ;
const configPath = path.join(configDir, configFileName) ;

export function getConfig(): ScreepsDeployWizardConfig {
    if (!hasConfig()) {
        saveConfig(defaultConfig) ;
    }
    return createOJM(path.join(USER_HOME, ".screep-deploy-wizard", "config.json")) ;
}

export function saveConfig(config: ScreepsDeployWizardConfig): void {
    fs.ensureFileSync(configPath) ;
    fs.writeJSONSync(configPath, config) ;
}

export function hasConfig(): boolean {
    return fs.existsSync(configPath) ;
}
