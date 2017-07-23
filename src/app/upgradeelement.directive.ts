import {Directive, AfterViewChecked} from '@angular/core';
declare var componentHandler: any;

@Directive({
    selector: '[mdl]'
})
export class UpgradeElementDirective implements AfterViewChecked {
    ngAfterViewChecked() {
        componentHandler.upgradeAllRegistered();
    }
}