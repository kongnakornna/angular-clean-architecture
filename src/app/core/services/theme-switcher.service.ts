import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ThemeSwitcherService {
    public pref$: Observable<string>;
    private pref: BehaviorSubject<string>;
    private prefKey = 'THEME_PREF';
    private _isDarkMode = false;

    constructor() {
        const saved = this.getThemePref();
        this.pref = new BehaviorSubject(saved);
        this.pref$ = this.pref.asObservable();
        this._isDarkMode = saved === 'dark';
        this.applyTheme(saved);
    }

    get isDarkMode(): boolean {
        return this._isDarkMode;
    }

    toggleTheme(): void {
        const newVal = this._isDarkMode ? 'light' : 'dark';
        this._isDarkMode = !this._isDarkMode;
        localStorage.setItem(this.prefKey, newVal);
        this.pref.next(newVal);
        this.applyTheme(newVal);
    }

    public updateThemePref(value: 'dark' | 'light'): void {
        if (value) {
            this._isDarkMode = value === 'dark';
            localStorage.setItem(this.prefKey, value);
            this.pref.next(value);
            this.applyTheme(value);
        }
    }

    private applyTheme(value: string): void {
        if (value === 'dark') {
            document.documentElement.setAttribute('data-bs-theme', 'dark');
            document.body.classList.add('dark');
        } else {
            document.documentElement.setAttribute('data-bs-theme', 'light');
            document.body.classList.remove('dark');
        }
    }

    private getThemePref(): string {
        const localPref = localStorage.getItem(this.prefKey);
        return localPref || 'light';
    }

}
