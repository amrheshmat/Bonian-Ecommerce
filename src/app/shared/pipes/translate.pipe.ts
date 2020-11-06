import { Pipe, PipeTransform } from '@angular/core';
import { TranslatorService } from '../services/translator.service';

@Pipe({
    name: 'translate',
    pure: false,
})
export class TranslatePipe implements PipeTransform {
    constructor(private translationService: TranslatorService) { }

    transform(value: any, args?: any): any {
        return this.translationService.translate(value)
    }
}
