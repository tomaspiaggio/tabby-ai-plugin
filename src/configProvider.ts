import { ConfigProvider } from 'tabby-core'

/** @hidden */
export class ClippyConfigProvider extends ConfigProvider {
    defaults = {
        aiAutocompletePlugin: {
            agent: 'AI Autocomplete',
        },
        hotkeys: {
            'toggle-clippy': [],
        },
        maxNumberOfCommandsStored: 10,
        enabled: true
    }
}
