import {__project} from "@/lib/dir" ;
import {Argument, type Command, createCommand} from "commander" ;
import {globbySync} from "globby" ;

export interface CmdStruct {
    subCmds?: CmdStruct[];
    importPath?: string;
    name: string;
}

export interface CmdExport {
    name?: string;
    alias?: string;
    description?: string;
    args?: (Argument | [string, string, unknown] | [string, string] | [string])[];
    optionList?: ([string, string, string[] | boolean | string] | [string, string] | [string])[];
    action?: (...args: any[]) => (Promise<void> | void);
    eventListener?: {
        event: string;
        listener: (...args: any[]) => void
    };
}

function getCommandPath(): string[] {
    return globbySync("./commands/**/index.{ts,js}", {
        cwd: __project,
    }) ;
}

export function parseCmdStruct(commandPath: string[]): CmdStruct {
    const cmdStruct: CmdStruct = {
        name: "",
    } ;
    commandPath.forEach((cmdPath) => {
        const sep = cmdPath.includes("\\") ? "\\" : "/" ;
        const split = cmdPath.split(sep) ;
        const prefixIndex = split.indexOf("commands") ;
        split.slice(prefixIndex + 1).reduce((prev, curr, currentIndex, array) => {
            if (curr === "index.js") {
                // prev.importPath = path.join("commands", array.join(sep)) ;
                prev.importPath = ["..", "commands", ...array].join(sep) ;
                return prev ;
            } else {
                // 查找当前命令的 subCmds 列表中是否存在相同 name 的对象
                if (prev.subCmds === undefined) {
                    prev.subCmds = [] ;
                }
                let next = prev.subCmds.find((value) => value.name === curr) ;
                if (next === undefined) {
                    next = {
                        name: curr,
                    } ;
                    prev.subCmds.push(next) ;
                }
                return next ;
            }
        }, cmdStruct) ;
    }) ;
    return cmdStruct ;
}

export async function registerFsCmd(cmdStruct: CmdStruct): Promise<Command> {
    const cmd = createCommand() ;
    cmd.name(cmdStruct.name) ;
    if (cmdStruct.importPath != null) {
        const {
            alias,
            name,
            description,
            optionList,
            args,
            action,
        } = (await import(cmdStruct.importPath)).default as CmdExport ;
        if (name !== undefined) cmd.name(name) ;
        if (description !== undefined) cmd.description(description) ;
        if (action !== undefined) cmd.action(action) ;
        if (alias !== undefined) cmd.alias(alias) ;

        args?.forEach((arg) => {

            arg instanceof Argument
                ? cmd.addArgument(arg)
                // @ts-expect-error
                : cmd.argument(...arg) ;
        }) ;
        optionList?.map((option) => {
            // @ts-expect-error
            cmd.option(...option) ;
        }) ;
    }
    if (cmdStruct.subCmds) {
        for (const subCmdStruct of cmdStruct.subCmds) {
            cmd.addCommand(await registerFsCmd(subCmdStruct)) ;
        }
    }
    return cmd ;
}
