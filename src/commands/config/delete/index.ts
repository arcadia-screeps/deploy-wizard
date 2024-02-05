import {getConfig, saveConfig} from "@/config" ;
import type {CmdExport} from "@/lib/fs-cmd-register" ;
import {t} from "i18next" ;

function action(names: string[]): void {
    const config = getConfig() ;
    names.forEach((name) => {
        // @ts-expect-error
        delete config[name] ;
    }) ;
    saveConfig(config) ;
}

const configDelete: CmdExport = {
    args: [
        ["<names...>", t("commands.config.delete.args.names")],
    ],
    alias: "del",
    description: t("commands.config.delete.description"),
    action,
} ;
export default configDelete ;
