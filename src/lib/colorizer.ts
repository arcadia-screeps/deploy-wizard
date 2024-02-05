import chalk from "chalk" ;
import type {JsonPrimitive} from "type-fest" ;

export function colorStringifyPrimitive(value: JsonPrimitive): string {
    return typeof value === "string"
        ? chalk.green(`"${value}"`)
        : chalk.yellow(value) ;
}

function _colorStringify(value: object, space: number, step: number): string {
    const spaces = " ".repeat(space) ;
    return Object.entries(value).reduce((prev, [key, value], index, array) => {
        prev += `${spaces}${chalk.green(`"${key}"`)}: ${
            typeof value === "object"
                ? `{\n${_colorStringify(value, space + step, step)}${spaces}}`
                : colorStringifyPrimitive(value)
        }${
            index === array.length - 1
                ? ""
                : ","
        }\n` ;
        return prev ;
    }, "") ;
}

export function colorStringify(value: any, space: number): string {
    if (typeof value === "object") {
        return `{\n${_colorStringify(value, space, space)}}` ;
    } else {
        return colorStringifyPrimitive(value) ;
    }
}

// export function colorizeObj(obj: object): object {
//     return Object.fromEntries(
//         Object.entries(obj).map(([key, value]) => [
//             chalk.green(key),
//             typeof value === "string"
//                 ? chalk.green(value)
//                 : chalk.yellow(value),
//         ]),
//     ) ;
// }
