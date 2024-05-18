import {Injectable} from '@angular/core'
import {ConfigService, HotkeysService, Logger, LogService} from 'tabby-core'
import {Model} from "./models/Model";
import {ModelProvider} from "./models/ModelProvider";

@Injectable({ providedIn: 'root'})
export class AIAutocomplete {

    private logger: Logger

    private model: Model | undefined
    private enabled = false
    private readonly latestCommands: string[] = []

    constructor (
        private config: ConfigService,
        log: LogService,
        hotkeys: HotkeysService,
    ) {
        this.logger = log.create(this.config.store.aiAutocompletePlugin.agent)
        this.enabled = this.config.store.enabled
        this.model = ModelProvider.forConfig(config)

        // this.loadAgent()
        // this.config.changed$.pipe(
        //     map(() => this.config.store.aiAutocompletePlugin.agent),
        //     distinctUntilChanged(),
        // ).subscribe(() => this.loadAgent())

        hotkeys.hotkey$.subscribe(h => {
            // TODO
            if (h === 'toggle-clippy') {
                this.toggleEnable()
            }
        })
    }

    autocomplete(lastCommand: string): Promise<string> {
        return this.model.autocomplete(lastCommand, this.latestCommands)
    }

    query(question: string): Promise<string> {
        return this.model.query(question, this.latestCommands)
    }

    toggleEnable () {
        this.enabled = !this.enabled
        const name = this.config.store.aiAutocompletePlugin.agent

        if (this.enabled) this.logger.debug(`${name} enabled`)
        else this.logger.debug(`${name} disabled`)
    }

    addLatestCommand(command: string): void {
        if (!this.enabled) return

        if (this.latestCommands.length > this.config.store.maxNumberOfCommandsStored) {
            const removedCommand = this.latestCommands.splice(0, 1)
            this.logger.debug(`The following command has been removed because it reached the max in the deque: ${removedCommand}`)
        }

        this.latestCommands.push(command)
    }
}
