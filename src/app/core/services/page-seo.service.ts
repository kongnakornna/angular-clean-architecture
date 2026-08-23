import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

export interface SeoData {
    pageTitle: string;
    pageDescription?: string;
    pageKeywords?: string;
    pageUrl?: string;
    author?: string;
    pageImageUrl?: string;
}

@Injectable({
    providedIn: 'root'
})
export class PageSeoService {

    constructor(
        private meta: Meta,
        private title: Title
    ) { }

    public setSEO(data?: SeoData): void {
        const defaultImage = `${window.location.origin}/assets/img/blog-thumbnail.jpg`;
        const author = `${data?.author ?? 'Kongnakorn Jantakun'}`;
        const imagePath = `${data?.pageImageUrl ?? defaultImage}`;
        const pageTitle = `${data?.pageTitle ?? 'IoT System'}`;
        const description = `${data?.pageDescription ?? 'IoT Management System'}`;
        const keywords = `${data?.pageKeywords ?? 'iCmon, iot management, erp'}`;
        const pageUrl = `${data?.pageUrl ?? window.location.origin}`;

        this.title.setTitle(`${pageTitle}`);
        this.meta.updateTag({ name: 'author', content: author })
        this.meta.updateTag({ name: 'description', content: description })
        this.meta.updateTag({ name: 'keywords', content: keywords })
    }
}
