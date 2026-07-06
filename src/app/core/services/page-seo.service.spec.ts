import { TestBed } from '@angular/core/testing';
import { Meta, Title } from '@angular/platform-browser';
import { PageSeoService } from './page-seo.service';

describe('PageSeoService', () => {
  let service: PageSeoService;
  let meta: jasmine.SpyObj<Meta>;
  let title: jasmine.SpyObj<Title>;

  beforeEach(() => {
    const metaSpy = jasmine.createSpyObj('Meta', ['updateTag']);
    const titleSpy = jasmine.createSpyObj('Title', ['setTitle']);

    TestBed.configureTestingModule({
      providers: [
        PageSeoService,
        { provide: Meta, useValue: metaSpy },
        { provide: Title, useValue: titleSpy },
      ],
    });

    service = TestBed.inject(PageSeoService);
    meta = TestBed.inject(Meta) as jasmine.SpyObj<Meta>;
    title = TestBed.inject(Title) as jasmine.SpyObj<Title>;
  });

  it('should set default SEO data when no data provided', () => {
    service.setSEO();
    expect(title.setTitle).toHaveBeenCalledWith('BizAdmin | BizAdmin System');
    expect(meta.updateTag).toHaveBeenCalledWith({ name: 'author', content: 'BizAdmin' });
    expect(meta.updateTag).toHaveBeenCalledWith({ name: 'description', content: 'BizAdmin Management System' });
    expect(meta.updateTag).toHaveBeenCalledWith({ name: 'keywords', content: 'bizadmin, management, erp' });
  });

  it('should set custom SEO data when provided', () => {
    service.setSEO({
      pageTitle: 'Dashboard',
      pageDescription: 'Admin Dashboard',
      pageKeywords: 'admin, dashboard',
      author: 'Admin',
    });

    expect(title.setTitle).toHaveBeenCalledWith('Admin | Dashboard');
    expect(meta.updateTag).toHaveBeenCalledWith({ name: 'author', content: 'Admin' });
    expect(meta.updateTag).toHaveBeenCalledWith({ name: 'description', content: 'Admin Dashboard' });
    expect(meta.updateTag).toHaveBeenCalledWith({ name: 'keywords', content: 'admin, dashboard' });
  });
});
