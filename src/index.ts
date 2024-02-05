import {getConfig} from "@/config" ;
import {__project} from "@/lib/dir" ;
import {parseCmdStruct, registerFsCmd} from "@/lib/fs-cmd-register" ;
import opm from "@/lib/ojm/opm" ;
import chalk from "chalk" ;
import {createCommand} from "commander" ;
import * as console from "console" ;
import {globbySync} from "globby" ;
import i18next, {t} from "i18next" ;
import I18NexFsBackend, {type FsBackendOptions} from "i18next-fs-backend" ;
import path from "path" ;

const config = getConfig() ;

await i18next.use(I18NexFsBackend).init<FsBackendOptions>({
    saveMissing: true,
    initImmediate: false,
    lng: config.language ?? "en",
    fallbackLng: "en",
    supportedLngs: ["en", "zh"],
    ns: ["translation", "prompts"],
    defaultNS: "translation",
    backend: {
        loadPath: path.join(__project, "./locales/{{lng}}/{{ns}}.json"),
        addPath: path.join(__project, "./locales/{{lng}}/{{ns}}.missing.json"),
    },
}) ;

function getCommand(): string[] {
    return globbySync("./commands/**/index.{ts,js}", {
        cwd: path.join(__project, "dist"),
    }) ;
}

const commandsPath = getCommand().sort() ;
const program = createCommand()
    .alias("sdw")
    .summary(t("summary"))
    .description(t("description"))
    .version(
        opm.version ?? "",
        "-v, --version",
        t("options.version.description"),
    ) ;

const cmdStruct = parseCmdStruct(commandsPath) ;
if (cmdStruct.subCmds) {
    for (const subCmdStruct of cmdStruct.subCmds) {
        program.addCommand(await registerFsCmd(subCmdStruct)) ;
    }
}

program.on("command:*", ([cmd]) => {
    console.error(`${chalk.red("未知命令")} ${chalk.yellow(cmd)}`) ;
    process.exitCode = 1 ;
}) ;

async function start(): Promise<void> {
    await program.parseAsync(process.argv) ;
}

export default start ;
