import type {CmdExport} from "@/lib/fs-cmd-register" ;
import shelljs from "shelljs" ;
import {t} from "i18next" ;

function action(): void {
    shelljs.exec("docker compose -p screeps restart") ;
}

const restart: CmdExport = {
    name: "restart",
    description: t("commands.restart.description"),
    action,
} ;
export default restart ;
