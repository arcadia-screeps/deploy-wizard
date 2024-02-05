import type {Prettify} from "@/type/prettify" ;

type DefaultNS = "translation"
import type {Resources} from "@/type/i18n/resources" ;

declare module "i18next" {

    interface CustomTypeOptions {
        defaultNS: DefaultNS;
        resources: Prettify<Resources>;
    }
}
