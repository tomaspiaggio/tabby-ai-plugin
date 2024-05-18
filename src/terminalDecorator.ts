import {Injectable} from '@angular/core'
import {bufferTime} from 'rxjs'
import {BaseTerminalTabComponent, TerminalDecorator} from 'tabby-terminal'
import {AIAutocomplete} from './ai-autocomplete.service'

@Injectable()
export class AIAutocompleteDecorator extends TerminalDecorator {

    constructor(private aiAutocomplete: AIAutocomplete) {
        super()
    }

    attach(tab: BaseTerminalTabComponent): void {
        tab.input$
            .pipe(bufferTime(3000))
            .subscribe((buffers: Buffer[]) =>
                buffers.forEach(e => this.aiAutocomplete.addLatestCommand(e.toString().trim())))
    }
}
