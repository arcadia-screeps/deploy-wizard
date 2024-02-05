import type {CmdExport} from "@/lib/fs-cmd-register" ;
import shelljs from "shelljs" ;
import {t} from "i18next" ;

function action(): void {
    shelljs.exec("docker compose -p screeps up -d") ;
}

const start: CmdExport = {
    name: "start",
    description: t("commands.start.description"),
    action,
} ;
export default start ;
