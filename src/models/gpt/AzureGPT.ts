import {Model} from "../Model";
import {GPTModelQueryMetadata} from "./GPTModelQueryMetadata";

export class AzureGPT implements Model {
    constructor() {
    }

    async queryModel({systemPrompt, messages}: GPTModelQueryMetadata): Promise<string> {
        // TODO
        console.log(systemPrompt, messages)
        const rawResponse = await fetch("azureurl", {
            method: "POST",

        })
        const response = await rawResponse.json()

        return response.choices[0]
    }

    autocomplete(partialCommand: string, latestCommands: string[]): Promise<string> {
        const commandsList = latestCommands.map(e => `- ${e}`).join("\n")

        const systemPrompt = "You are a very experienced linux and unix developer. You will " +
            "receive a list of previous commands and a partial command. Your task is to try to identify what the " +
            "user is trying to accomplish and help them complete the task.\n\n" +
            `These are the last commands:\n\n${commandsList}`

        const messages = [partialCommand]
        return this.queryModel({systemPrompt, messages, temperature: 0, maxTokens: 512})
    }

    query(question: string, latestCommands: string[]): Promise<string> {
        const systemPrompt = ""
        const messages = []
        return this.queryModel({systemPrompt, messages})
    }
}