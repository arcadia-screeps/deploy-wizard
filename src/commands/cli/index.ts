import type { CmdExport } from "@/lib/fs-cmd-register" ;
import * as child_process from "child_process" ;
import { t } from "i18next" ;

function action(): void {
    child_process.execFileSync("docker", ["exec", "-ti", "screeps", "screeps-launcher", "cli"], {
        shell: true,
        stdio: "inherit",
    }) ;
}

const cli: CmdExport = {
    description: t("commands.cli.description"),
    action,
} ;
export default cli ;
