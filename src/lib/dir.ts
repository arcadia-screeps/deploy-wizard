import path from "path" ;
import url from "url" ;

const __filename = url.fileURLToPath(import.meta.url) ;
const __project = path.join(path.dirname(__filename), "..", "..") ;
const resolve = (p: string): string => path.resolve(__project, p) ;

export {
    __project,
    __filename,
    resolve,
} ;
