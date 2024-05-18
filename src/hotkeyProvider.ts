import { Injectable } from '@angular/core'
import { HotkeyDescription, HotkeyProvider } from 'tabby-core'

/** @hidden */
@Injectable()
export class AIHotkeyProvider extends HotkeyProvider {
    async provide (): Promise<HotkeyDescription[]> {
        return [
            {
                id: 'ai-autocomplete',
                name: 'AI Autocomplete',
            },
            {
                id: 'ai-question',
                name: 'Show/hide AI question/answer',
            }
        ]
    }
}
