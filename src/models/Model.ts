export interface ModelQueryMetadata {}

export interface Model {
    queryModel(queryMetadata: ModelQueryMetadata): Promise<string>
    autocomplete(lastCommand: string, latestCommands: string[]): Promise<string>
    query(question: string, latestCommands: string[]): Promise<string>
}