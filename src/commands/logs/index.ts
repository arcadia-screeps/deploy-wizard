import type { CmdExport } from "@/lib/fs-cmd-register" ;
import { t } from "i18next" ;
import shelljs from "shelljs" ;

function action(): void {
    shelljs.exec("docker logs -f screeps") ;
}

const logs: CmdExport = {
    description: t("commands.logs.description"),
    action,
} ;

export default logs ;
