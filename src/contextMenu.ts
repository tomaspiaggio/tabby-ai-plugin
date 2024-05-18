import {Injectable} from '@angular/core'
import {MenuItemOptions} from 'tabby-core'
import {TerminalContextMenuItemProvider} from 'tabby-terminal'
import {AIAutocomplete} from './ai-autocomplete.service'

@Injectable()
export class ClippyContextMenuProvider extends TerminalContextMenuItemProvider {
    weight = 10

    constructor (
        private aiAutocomplete: AIAutocomplete,
    ) {
        super()
    }

    async getItems (): Promise<MenuItemOptions[]> {
        return [
            {
                label: 'Toggle AI Autocomplete',
                click: () => this.aiAutocomplete.toggleEnable(),
                type: "checkbox"
            },
        ]
    }
}
