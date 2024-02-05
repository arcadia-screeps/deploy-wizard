import {getConfig} from "@/config" ;
import {colorStringify} from "@/lib/colorizer" ;
import type {CmdExport} from "@/lib/fs-cmd-register" ;
import {t} from "i18next" ;

function action(): void {
    // console.log(JSON.stringify(colorizeObj(getConfig()), null, 2)) ;
    console.log(colorStringify(getConfig(), 2)) ;
}

const configList: CmdExport = {
    alias: "ls",
    description: t("commands.config.list.description"),
    action,
} ;
export default configList ;
