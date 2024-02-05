import {getConfig, saveConfig} from "@/config" ;
import type {CmdExport} from "@/lib/fs-cmd-register" ;
import {t} from "i18next" ;
import type {JsonPrimitive} from "type-fest" ;

function action(name: string, value: string, options: { number: boolean }): void {
    const config = getConfig() ;
    let v: JsonPrimitive = value ;
    if (options.number) {
        v = Number.parseFloat(value) ;
    }
    // @ts-expect-error
    config[name] = v ;
    saveConfig(config) ;
}

const configSet: CmdExport = {
    args: [
        ["<name>", t("commands.config.set.args.name")],
        ["<value>", t("commands.config.set.args.value")],
    ],
    optionList: [
        ["-n --number", t("commands.config.set.options.number")],
    ],
    description: t("commands.config.set.description"),
    action,
} ;
export default configSet ;
