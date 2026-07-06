import { RouterTestingModule } from '@angular/router/testing';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { Title, Meta } from '@angular/platform-browser';

import { of } from 'rxjs';

import { AppComponent } from './app.component';

import { PageSeoService } from './presenter/pages/page-seo.service';
import { ToastComponent } from './presenter/components/shared/toast/toast.component';
import { ToastService } from './presenter/components/shared/toast/toast.service';
import { ThemeSwitcherService } from './presenter/components/shared/theme-switcher/theme-switcher.service';

const MOCK_THEME_PREF = of('light');

describe('AppComponent', () => {

    let component: AppComponent;
    let themeService: jasmine.SpyObj<ThemeSwitcherService>;
    let seoService: jasmine.SpyObj<PageSeoService>;
    let fixture: ComponentFixture<AppComponent>;

    beforeEach(async () => {
        themeService = jasmine.createSpyObj('ThemeSwitcherService', [], { pref$: MOCK_THEME_PREF });
        seoService = jasmine.createSpyObj('PageSeoService', ['setSEO']);

        await TestBed.configureTestingModule({
            declarations: [
                AppComponent,
                ToastComponent,
            ],
            providers: [
                { provide: ThemeSwitcherService, useValue: themeService },
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
        it('should call ngOnInit', () => {
            spyOn(component, 'ngOnInit');

            component.ngOnInit();

            expect(component.ngOnInit).toHaveBeenCalled();
        });
    });

    describe('themeService', () => {
        it('should populate themePref$ with data from themeService', () => {
            component.ngOnInit();

            expect(component.themePref$).toEqual(MOCK_THEME_PREF);
        });
    });

    describe('seoService', () => {
        it('should call setSEO method of seoService', () => {
            component.ngOnInit();

            expect(seoService.setSEO).toHaveBeenCalled();
        });

        it('should set page title', () => {
            let title = TestBed.inject(Title);
            let meta = TestBed.inject(Meta);

            component['seoService'] = new PageSeoService(meta, title);
            component.ngOnInit();

            expect(seoService.setSEO).toHaveBeenCalled();
            expect(title.getTitle()).toContain("Welcome to my Personal");
        });
    });
});
