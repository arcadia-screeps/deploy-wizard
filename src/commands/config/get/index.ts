import {getConfig} from "@/config" ;
import {colorStringifyPrimitive} from "@/lib/colorizer" ;
import type {CmdExport} from "@/lib/fs-cmd-register" ;
import {t} from "i18next" ;

function action(name: string): void {
    const config = getConfig() ;
    // @ts-expect-error
    console.log(colorStringifyPrimitive(config[name])) ;
}

const configGet: CmdExport = {
    args: [
        ["<name>", t("commands.config.get.args.name") ],
    ],
    description: t("commands.config.get.description"),
    action,
} ;
export default configGet ;
