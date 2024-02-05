import type {CmdExport} from "@/lib/fs-cmd-register" ;
import opm from "@/lib/ojm/opm" ;
import chalk from "chalk" ;
import {t} from "i18next" ;
import pacote from "pacote" ;

const {
    name: pkgName,
    version: pkgVersion,
} = opm ;

async function action(): Promise<void> {
    const manifest = await pacote.manifest(`${pkgName}@latest`) ;
    const latestPkgVersion = manifest.version ;
    console.log(`${pkgVersion}=>${latestPkgVersion}`) ;

    if (latestPkgVersion !== pkgVersion) {
        console.log(`${chalk.yellow("有可更新版本")} ${chalk.green(pkgVersion)} ${chalk.yellow("->")} ${chalk.green(
            latestPkgVersion)}`) ;
    }
}

const outdated: CmdExport = {
    description: t("commands.outdated.description"),
    optionList: [],
    action,
} ;
export default outdated ;
