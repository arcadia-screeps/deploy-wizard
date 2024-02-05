import type Mod from "@/lib/enum/mod" ;
import type { Prettify } from "@/type/prettify" ;

export interface LauncherConfig {
    mods: Mod[];
    serverConfig: Prettify<ModAdminUtilsConfig & ModAuthConfig & ModMapToolConfig & ModMongoConfig & ScreepsBaseConfig>;
}

export interface ScreepsBaseConfig {
    steam_api_key?: string;
    port?: number;              // 21025
    host?: string;              // 0.0.0.0
    password?: string;          //
    cli_port?: number;           // 21026
    cli_host?: string;           // localhost
    runners_cnt?: number;        // 1
    runner_threads?: number;     // 4
    processors_cnt?: number;     // 2
    logdir?: string;             // logs
    modfile?: string;            // mods.json
    assetdir?: string;           // assets
    db?: string;                 // db.json
    log_console?: boolean;       // false
    log_rotate_keep?: number;    // 5
    storage_disabled?: boolean;  // false
    restart_interval?: number;   // 3600
}

// screepsmod-admin-utils
export interface ModAdminUtilsConfig {
    shardName: string;
    tickRate: number;           // 1000
    map?: string;               // 使用 curl https://maps.screepspl.us/maps/index.json 查看 id，或者使用 random 与 random_WxH
    socketUpdateRate?: number;  // 200
    whitelist?: string[];       //
    constants?: {
        [key: string]: number | string
    };
    welcomeText?: string;       //
    statsToken?: string;        // For S+ Grafana
    gclToCPU?: boolean;         // false
    maxCPU?: number;            // 100
    baseCPU?: number;           // 20
    stepCPU?: number;           // 10
}

// screepsmod-mongo
export interface MongoConfig {
    host: string;              // mongo
    port?: number;              // 27017
    database?: string;          // screeps
}

export interface RedisConfig {
    host: string;               // redis
    port?: number;               // 6379
}

export interface ModMongoConfig {
    mongo?: MongoConfig;
    redis?: RedisConfig;
}

// screepsmod-auth
export interface AuthConfig {
    cpus: number;               // 100
    preventSpawning: boolean;   // false
}

export interface GithubConfig {
    clientId: string;
    clientSecret: string;
}

export interface ModAuthConfig {
    auth?: AuthConfig;
    github?: GithubConfig;
}

// screepsmod-map-tool
export interface MapToolConfig {
    user: string;
    pass: string;
}

export interface ModMapToolConfig {
    maptool?: MapToolConfig;
}
