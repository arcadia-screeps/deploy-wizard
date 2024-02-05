import RestartPolicy from "@/lib/enum/restart-policy" ;

export interface ComposeConfig {
    network: string;        // screeps
    mongoVersion: string;   // latest
    mongoVolume: string;    // mongo-data
    redisVersion: string;   // latest
    redisVolume: string;    // redis-data
    restartPolicy: RestartPolicy;  // unless-stopped
}
