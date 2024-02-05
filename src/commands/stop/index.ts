import type {CmdExport} from "@/lib/fs-cmd-register" ;
import {t} from "i18next" ;
import shelljs from "shelljs" ;

function action(): void {
    shelljs.exec("docker compose -p screeps down") ;
}

const stop: CmdExport = {
    name: "stop",
    description: t("commands.stop.description"),
    action,
} ;
export default stop ;
