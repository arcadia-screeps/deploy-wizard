import {getModMapToolConfig, getModMongoConfig, getScreepsMods} from "@/commands/init/mod-config-prompts" ;
import Mod from "@/lib/enum/mod" ;
import Preset from "@/lib/enum/preset" ;
import generateFile from "@/lib/file-generator" ;
import type {CmdExport} from "@/lib/fs-cmd-register" ;
import type {LauncherConfig} from "@/type/launcher-config" ;
import {input, select} from "@inquirer/prompts" ;
import {t} from "i18next" ;
import path from "path" ;
import * as process from "process" ;

function selectPreset() {
    return select<Preset>(
        {
            message: t("prompts:selectPreset.message"),
            choices: [
                {
                    value: Preset.PRIMARY,
                    description: t("prompts:selectPreset.choices.primary"),
                },
                {
                    value: Preset.ADVANCED,
                    description: t("prompts:selectPreset.choices.advanced"),
                },
            ],
        }) ;
}

async function action(): Promise<void> {
    const preset = await selectPreset() ;
    const launcherContext: LauncherConfig = {
        serverConfig: {
            shardName: await input(
                {
                    message: t("prompts:inputShardName"),
                    default: "shard1",
                }),
            tickRate: Number.parseInt(await input(
                {
                    message: t("prompts:inputTickRate"),
                    default: "1000",
                    validate: (value) => {
                        const tickRate = Number.parseInt(value) ;
                        return !isNaN(tickRate) && tickRate > 0 ;
                    },
                },
            )),
        },
        mods: await getScreepsMods(preset),
    } ;
    if (launcherContext.mods.includes(Mod.MONGO)) {
        await generateFile(
            "docker-compose.yml.hbs",
            path.join(process.cwd(), "docker-compose.yml"),
            await getModMongoConfig(),
        ) ;
    }
    if (launcherContext.mods.includes(Mod.MAP_TOOL)) {
        const modMapToolConfig = await getModMapToolConfig() ;
        launcherContext.serverConfig = {
            ...launcherContext.serverConfig,
            ...modMapToolConfig,
        } ;
    }

    await generateFile(
        "config.yml.hbs",
        path.join(process.cwd(), "config.yml"),
        launcherContext,
    ) ;
}

const init: CmdExport = {
    description: t("commands.init.description"),
    optionList: [],
    action,
} ;
export default init ;
