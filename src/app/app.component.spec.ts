import { RouterTestingModule } from '@angular/router/testing';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { Title, Meta } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import { PageSeoService } from './core/services/page-seo.service';
import { ToastComponent } from './shared/components/toast/toast.component';
import { ToastService } from './shared/services/toast.service';

describe('AppComponent', () => {

    let component: AppComponent;
    let seoService: jasmine.SpyObj<PageSeoService>;
    let fixture: ComponentFixture<AppComponent>;

    beforeEach(async () => {
        seoService = jasmine.createSpyObj('PageSeoService', ['setSEO']);

        await TestBed.configureTestingModule({
            declarations: [
                AppComponent,
                ToastComponent,
            ],
            providers: [
                { provide: PageSeoService, useValue: seoService },
                ToastService,
            ],
            imports: [RouterTestingModule]
        }).compileComponents()

        fixture = TestBed.createComponent(AppComponent)
        component = fixture.componentInstance;
        fixture.detectChanges();

    });

    it('should create the app component', () => {
        expect(component).toBeTruthy();
        expect(component).toBeInstanceOf(AppComponent);
    });

    describe('ngOnInit', () => {
        it('should call seoService.setSEO', () => {
            component.ngOnInit();

            expect(seoService.setSEO).toHaveBeenCalled();
        });
    });
});
