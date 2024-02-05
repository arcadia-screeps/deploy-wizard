import {__project} from "@/lib/dir" ;
import fs from "fs-extra" ;
import handlebars from "handlebars" ;
import path from "path" ;

export default async function generateFile(
    templateFileName: string,
    outputPath: string,
    context: NonNullable<unknown>,
): Promise<void> {
    const template = await fs.readFile(path.join(__project, "template", templateFileName)) ;
    const compiledTemplate = handlebars.compile(`${template}`) ;
    const rendered = compiledTemplate(context) ;
    await fs.writeFile(outputPath, rendered) ;
}
