import fs from "fs-extra" ;
import json5 from "json5" ;

export function createOJM<T>(filePath: string): T {
    return json5.parse<T>(fs.readFileSync(filePath).toString()) ;
}
