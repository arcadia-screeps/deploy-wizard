import {__project} from "@/lib/dir" ;
import {createOJM} from "@/lib/ojm/ojm" ;
import path from "path" ;
import type {PackageJson} from "type-fest" ;

// const opm = json5.parse<PackageJson.PackageJsonStandard>(fs.readFileSync("./package.json").toString()) ;
const opm = createOJM<PackageJson.PackageJsonStandard>(path.join(__project, "package.json")) ;
export default opm ;
