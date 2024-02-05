import type {CmdExport} from "@/lib/fs-cmd-register" ;
import {t} from "i18next" ;
import shelljs from "shelljs" ;

function action(): void {
    shelljs.exec("docker exec -ti screeps screeps-launcher cli") ;
}

const cli: CmdExport = {
    description: t("commands.cli.description"),
    action,
} ;
export default cli ;
