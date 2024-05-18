import {ConfigService} from "tabby-core";
import {Model} from "./Model";
import {AzureGPT} from "./gpt/AzureGPT";

export class ModelProvider {
    static forConfig(config: ConfigService): Model {
        // TODO implement if/when other models than GPT are implemented
        console.log(config)
        return new AzureGPT(/*config.store*/)
    }
}