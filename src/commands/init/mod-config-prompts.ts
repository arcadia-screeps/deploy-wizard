import Mod from "@/lib/enum/mod" ;
import Preset from "@/lib/enum/preset" ;
import RestartPolicy from "@/lib/enum/restart-policy" ;
import type {Choice} from "@/type/choice" ;
import type {ComposeConfig} from "@/type/compose-config" ;
import type {ModMapToolConfig} from "@/type/launcher-config" ;
import {checkbox, input, select} from "@inquirer/prompts" ;
import {t} from "i18next" ;

export async function getModMapToolConfig(): Promise<ModMapToolConfig> {
    return {
        maptool: {
            user: await input(
                {
                    message: t("prompts:inputMaptoolUser"),
                    default: "admin",
                }),
            pass: await input(
                {
                    message: t("prompts:inputMaptoolPass"),
                }),
        },
    } ;
}

export async function getModMongoConfig(): Promise<ComposeConfig> {
    const restartPolicyChoices: Choice<RestartPolicy>[] = [
        {
            value: RestartPolicy.UNLESS_STOPPED,
            description: t("prompts:selectRestartPolicy.choices.unless-stopped"),
        },
        {
            value: RestartPolicy.ON_FAILURE,
            description: t("prompts:selectRestartPolicy.choices.on-failure"),
        },
        {
            value: RestartPolicy.ALWAYS,
            description: t("prompts:selectRestartPolicy.choices.always"),
        },
        {
            value: RestartPolicy.NO,
            description: t("prompts:selectRestartPolicy.choices.no"),
        },
    ] ;
    const mongoVersionChoices: Choice<string>[] = [
        {
            value: "2.6.4",
            description: t("prompts:selectMongoVersion.choices.2.6.4"),
        },
        {
            value: "latest",
        },
        {
            value: "7",
        },
        {
            value: "6",
        },
        {
            value: "5",
        },
        {
            value: "4",
        },
        {
            value: "3",
        },
    ] ;
    const redisVersionChoices: Choice<string>[] = [
        {
            value: "3.0.6",
            description: t("prompts:selectRedisVersion.choices.3.0.6"),
        },
        {
            value: "latest",
        },
        {
            value: "7.2.4",
        },
        {
            value: "7.2.4-alpine",
        },
        {
            value: "6.2.14",
        },
        {
            value: "6.2.14-alpine",
        },
        {
            value: "5.0.14",
        },
        {
            value: "5.0.14-alpine",
        },
        {
            value: "4.0.14",
        },
        {
            value: "4.0.14-alpine",
        },
        {
            value: "3.2.12",
        },
        {
            value: "3.2.12-alpine",
        },
    ] ;

    return {
        network: await input(
            {
                message: t("prompts:inputNetwork"),
                default: "screeps-net",
            }),
        restartPolicy: await select<RestartPolicy>(
            {
                message: t("prompts:selectRestartPolicy.message"),
                choices: restartPolicyChoices,
            }),
        mongoVersion: await select<string>(
            {
                message: t("prompts:selectMongoVersion.message"),
                choices: mongoVersionChoices,
            },
        ),
        mongoVolume: await input(
            {
                message: t("prompts:inputMongoVolume"),
                default: "mongo-data",
            }),
        redisVersion: await select<string>(
            {
                message: t("prompts:selectRedisVersion.message"),
                choices: redisVersionChoices,
            }),
        redisVolume: await input(
            {
                message: t("prompts:inputRedisVolume"),
                default: "redis-data",
            }),
    } ;
}

export async function getScreepsMods(preset: Preset): Promise<Mod[]> {
    const choices: Choice<Mod>[] = [
        {
            description: t("prompts:selectMods.choices.admin-utils"),
            value: Mod.ADMIN_UTIL,
            disabled: true,
            checked: true,
        },
        {
            description: t("prompts:selectMods.choices.mongo"),
            value: Mod.MONGO,
            disabled: true,
            checked: preset === Preset.ADVANCED,
        },
        {
            description: t("prompts:selectMods.choices.auth"),
            value: Mod.AUTH,
        },
        {
            description: t("prompts:selectMods.choices.features"),
            value: Mod.FEATURES,
        },
        {
            description: t("prompts:selectMods.choices.remote-console"),
            value: Mod.REMOTE_CONSOLE,
        },
        {
            description: t("prompts:selectMods.choices.map-tool"),
            value: Mod.MAP_TOOL,
        },
        {
            description: t("prompts:selectMods.choices.pure-automation"),
            value: Mod.PURE_AUTOMATION,
        },
    ] ;

    const ret = await checkbox(
        {
            message: t("prompts:selectMods.message"),
            choices: choices.map((choice) => ({
                ...choice,
                name: `${
                    "name" in choice && choice.name.length > 0
                        ? choice.name
                        : choice.value
                } ${
                    "description" in choice && choice.description.length > 0
                        ? `(${choice.description})`
                        : ""
                }`,
            })),
            pageSize: choices.length,
        }) ;
    if (preset === Preset.ADVANCED) {
        ret.unshift(Mod.MONGO) ;
    }
    ret.unshift(Mod.ADMIN_UTIL) ;
    return ret ;
}
