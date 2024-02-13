import Mod from "@/lib/enum/mod" ;
import Preset from "@/lib/enum/preset" ;
import RestartPolicy from "@/lib/enum/restart-policy" ;

export interface Resources {
    translation: {
        summary: string;
        description: string;
        options: {
            version: {
                description: string
            }
        }
        commands: {
            cli: {
                description: string;
            }
            config: {
                description: string
                list: {
                    description: string
                }
                get: {
                    args: {
                        name: string
                    }
                    description: string
                }
                set: {
                    args: {
                        name: string,
                        value: string
                    }
                    description: string
                    options: {
                        number: string
                    }
                }
                delete: {
                    args: {
                        names: string
                    }
                    description: string
                }
            }
            init: {
                description: string;
            }
            logs: {
                description: string
            }
            outdated: {
                description: string;
                message: {
                    haveNewVersion: string,
                    updateNotice: string,
                    or: string,
                    noUpdateNeeded: string,
                }
            }
            restart: {
                description: string;
            }
            start: {
                description: string;
            }
            stop: {
                description: string;
            }
        }
    };
    prompts: {
        selectPreset: {
            message: string
            choices: {
                [Preset.PRIMARY]: string
                [Preset.ADVANCED]: string
            }
        }
        selectMods: {
            message: string,
            choices: {
                [Mod.ADMIN_UTIL]: string
                [Mod.AUTH]: string
                [Mod.FEATURES]: string
                [Mod.MAP_TOOL]: string
                [Mod.MONGO]: string
                [Mod.PURE_AUTOMATION]: string
                [Mod.REMOTE_CONSOLE]: string
            }
        }
        inputShardName: string
        inputTickRate: string
        inputMaptoolUser: string
        inputMaptoolPass: string
        inputNetwork: string
        inputMongoVolume: string
        inputRedisVolume: string
        selectRestartPolicy: {
            message: string
            choices: {
                [RestartPolicy.ALWAYS]: string
                [RestartPolicy.NO]: string
                [RestartPolicy.ON_FAILURE]: string
                [RestartPolicy.UNLESS_STOPPED]: string
            }
        }
        selectMongoVersion: {
            message: string
            choices: {
                "2.6.4": string
            }
        }
        selectRedisVersion: {
            message: string
            choices: {
                "3.0.6": string
            }
        }
    };
};
