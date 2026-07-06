import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Toast, ToastService, ToastType } from '../../services/toast.service';

@Component({
    selector: 'app-toast',
    standalone: false,
    templateUrl: './toast.component.html',
    animations: [
        trigger(
            'inOutAnimation',
            [
                transition(
                    ':enter',
                    [
                        style({ left: 0, opacity: 0 }),
                        animate('1s ease-out',
                            style({ left: 20, opacity: 1 }))
                    ]
                ),
                transition(
                    ':leave',
                    [
                        style({ left: 20, opacity: 1 }),
                        animate('1s ease-in',
                            style({ left: 0, opacity: 0 }))
                    ]
                )
            ]
        )
    ]
})
export class ToastComponent implements OnInit {

    public toast$?: Observable<Toast>

    public constructor(private toastService: ToastService) { }

    ngOnInit(): void {
        this.toast$ = this.toastService.listen$;
    }

    public color(toastType: ToastType): string {
        switch (toastType) {
            case ToastType.info:
                return `bg-primary text-white`;
            case ToastType.warning:
                return `bg-warning text-white`;
            case ToastType.success:
                return `bg-success text-white`;
            case ToastType.error:
                return `bg-danger text-white`;
            default:
                return `bg-success text-white`;
        }
    }

    public close() {
        this.toastService.close();
    }

}
