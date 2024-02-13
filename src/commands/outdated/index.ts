import type { CmdExport } from "@/lib/fs-cmd-register" ;
import opm from "@/lib/ojm/opm" ;
import chalk from "chalk" ;
import { t } from "i18next" ;
import pacote from "pacote" ;

const {
    name: pkgName,
    version: pkgVersion,
} = opm ;

async function action(): Promise<void> {
    const manifest = await pacote.manifest(`${pkgName}@latest`) ;
    const latestPkgVersion = manifest.version ;

    if (latestPkgVersion !== pkgVersion) {
        console.log(`${chalk.yellow(t("commands.outdated.message.haveNewVersion"))} ${chalk.green(pkgVersion)} ${chalk.yellow("=>")} ${chalk.green(
            latestPkgVersion)}`) ;
        console.log(chalk.yellow(t("commands.outdated.message.updateNotice"))) ;
        console.log("\t", chalk.green("npm i -g @arcadia-screeps/deploy-wizard")) ;
        console.log(chalk.yellow(t("commands.outdated.message.or"))) ;
        console.log("\t", chalk.green("yarn global add @arcadia-screeps/deploy-wizard")) ;
    } else {
        console.log(chalk.yellow(t("commands.outdated.message.noUpdateNeeded"), chalk.green(pkgVersion))) ;
    }
}

const outdated: CmdExport = {
    description: t("commands.outdated.description"),
    optionList: [],
    action,
} ;
export default outdated ;
