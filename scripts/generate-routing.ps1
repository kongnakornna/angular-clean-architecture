$baseDir = "C:\github\angular-clean-architecture\src\app\features\tabler"
$outputPath = "$baseDir\tabler-routing.module.ts"

# Define all components with their paths
$components = @()

# Auth pages
$authComponents = @(
    @{ Name = '_2StepVerificationComponent'; File = '2-step-verification'; Path = 'auth/2-step-verification' },
    @{ Name = '_2StepVerificationCodeComponent'; File = '2-step-verification-code'; Path = 'auth/2-step-verification-code' },
    @{ Name = 'AuthLockComponent'; File = 'auth-lock'; Path = 'auth/auth-lock' },
    @{ Name = 'ForgotPasswordComponent'; File = 'forgot-password'; Path = 'auth/forgot-password' },
    @{ Name = 'SignInComponent'; File = 'sign-in'; Path = 'auth/sign-in' },
    @{ Name = 'SignInCoverComponent'; File = 'sign-in-cover'; Path = 'auth/sign-in-cover' },
    @{ Name = 'SignInIllustrationComponent'; File = 'sign-in-illustration'; Path = 'auth/sign-in-illustration' },
    @{ Name = 'SignInLinkComponent'; File = 'sign-in-link'; Path = 'auth/sign-in-link' },
    @{ Name = 'SignUpComponent'; File = 'sign-up'; Path = 'auth/sign-up' },
    @{ Name = 'TermsOfServiceComponent'; File = 'terms-of-service'; Path = 'auth/terms-of-service' }
)
$components += $authComponents

# Marketing pages
$marketingComponents = @(
    @{ Name = 'AboutComponent'; File = 'about'; Path = 'marketing/about' },
    @{ Name = 'HeroComponent'; File = 'hero'; Path = 'marketing/hero' },
    @{ Name = 'MarketingIndexComponent'; File = 'index'; Path = 'marketing/index' },
    @{ Name = 'MarketingPricingComponent'; File = 'pricing'; Path = 'marketing/pricing' },
    @{ Name = 'RealEstateComponent'; File = 'real-estate'; Path = 'marketing/real-estate' },
    @{ Name = 'TestimonialsComponent'; File = 'testimonials'; Path = 'marketing/testimonials' },
    @{ Name = 'TextComponent'; File = 'text'; Path = 'marketing/text' }
)
$components += $marketingComponents

# Docs
$docsComponents = @(
    @{ Name = 'DocsIndexComponent'; File = 'index'; Path = 'docs/index' }
)
$components += $docsComponents

# Layouts (note: some layouts have same names as pages)
$layoutComponents = @(
    @{ Name = 'BaseComponent'; File = 'base'; Path = 'layouts/base' },
    @{ Name = 'LayoutCardComponent'; File = 'card'; Path = 'layouts/card' },
    @{ Name = 'LayoutDefaultComponent'; File = 'default'; Path = 'layouts/default' },
    @{ Name = 'LayoutErrorComponent'; File = 'error'; Path = 'layouts/error' },
    @{ Name = 'HomepageComponent'; File = 'homepage'; Path = 'layouts/homepage' },
    @{ Name = 'LayoutMarketingComponent'; File = 'marketing'; Path = 'layouts/marketing' },
    @{ Name = 'LayoutPayComponent'; File = 'pay'; Path = 'layouts/pay' },
    @{ Name = 'LayoutProseComponent'; File = 'prose'; Path = 'layouts/prose' },
    @{ Name = 'RedirectComponent'; File = 'redirect'; Path = 'layouts/redirect' },
    @{ Name = 'LayoutSettingsComponent'; File = 'settings'; Path = 'layouts/settings' },
    @{ Name = 'SingleComponent'; File = 'single'; Path = 'layouts/single' }
)
$components += $layoutComponents

# Layout variants (root level)
$layoutVariantComponents = @(
    @{ Name = 'LayoutBoxedComponent'; File = 'layout-boxed'; Path = 'layouts/layout-boxed' },
    @{ Name = 'LayoutComboComponent'; File = 'layout-combo'; Path = 'layouts/layout-combo' },
    @{ Name = 'LayoutCondensedComponent'; File = 'layout-condensed'; Path = 'layouts/layout-condensed' },
    @{ Name = 'LayoutFluidComponent'; File = 'layout-fluid'; Path = 'layouts/layout-fluid' },
    @{ Name = 'LayoutFluidVerticalComponent'; File = 'layout-fluid-vertical'; Path = 'layouts/layout-fluid-vertical' },
    @{ Name = 'LayoutHorizontalComponent'; File = 'layout-horizontal'; Path = 'layouts/layout-horizontal' },
    @{ Name = 'LayoutNavbarDarkComponent'; File = 'layout-navbar-dark'; Path = 'layouts/layout-navbar-dark' },
    @{ Name = 'LayoutNavbarOverlapComponent'; File = 'layout-navbar-overlap'; Path = 'layouts/layout-navbar-overlap' },
    @{ Name = 'LayoutNavbarStickyComponent'; File = 'layout-navbar-sticky'; Path = 'layouts/layout-navbar-sticky' },
    @{ Name = 'LayoutRtlComponent'; File = 'layout-rtl'; Path = 'layouts/layout-rtl' },
    @{ Name = 'LayoutVerticalComponent'; File = 'layout-vertical'; Path = 'layouts/layout-vertical' },
    @{ Name = 'LayoutVerticalRightComponent'; File = 'layout-vertical-right'; Path = 'layouts/layout-vertical-right' },
    @{ Name = 'LayoutVerticalTransparentComponent'; File = 'layout-vertical-transparent'; Path = 'layouts/layout-vertical-transparent' }
)
$components += $layoutVariantComponents

# Main pages
$pageComponents = @(
    @{ Name = 'AccordionComponent'; File = 'accordion'; Path = 'accordion' },
    @{ Name = 'ActivityComponent'; File = 'activity'; Path = 'activity' },
    @{ Name = 'AlertsComponent'; File = 'alerts'; Path = 'alerts' },
    @{ Name = 'AllElementsComponent'; File = 'all-elements'; Path = 'all-elements' },
    @{ Name = 'AvatarsComponent'; File = 'avatars'; Path = 'avatars' },
    @{ Name = 'BadgesComponent'; File = 'badges'; Path = 'badges' },
    @{ Name = 'BlankComponent'; File = 'blank'; Path = 'blank' },
    @{ Name = 'ButtonsComponent'; File = 'buttons'; Path = 'buttons' },
    @{ Name = 'CardActionsComponent'; File = 'card-actions'; Path = 'card-actions' },
    @{ Name = 'CardGradientsComponent'; File = 'card-gradients'; Path = 'card-gradients' },
    @{ Name = 'CardsMasonryComponent'; File = 'cards-masonry'; Path = 'cards-masonry' },
    @{ Name = 'CardsComponent'; File = 'cards'; Path = 'cards' },
    @{ Name = 'CarouselComponent'; File = 'carousel'; Path = 'carousel' },
    @{ Name = 'ChangelogComponent'; File = 'changelog'; Path = 'changelog' },
    @{ Name = 'ChartsComponent'; File = 'charts'; Path = 'charts' },
    @{ Name = 'ChatComponent'; File = 'chat'; Path = 'chat' },
    @{ Name = 'ColorpickerComponent'; File = 'colorpicker'; Path = 'colorpicker' },
    @{ Name = 'ColorsComponent'; File = 'colors'; Path = 'colors' },
    @{ Name = 'CookieBannerComponent'; File = 'cookie-banner'; Path = 'cookie-banner' },
    @{ Name = 'DashboardCryptoComponent'; File = 'dashboard-crypto'; Path = 'dashboard-crypto' },
    @{ Name = 'DatagridComponent'; File = 'datagrid'; Path = 'datagrid' },
    @{ Name = 'DatatablesComponent'; File = 'datatables'; Path = 'datatables' },
    @{ Name = 'DropdownsComponent'; File = 'dropdowns'; Path = 'dropdowns' },
    @{ Name = 'DropzoneComponent'; File = 'dropzone'; Path = 'dropzone' },
    @{ Name = 'EmailInboxComponent'; File = 'email-inbox'; Path = 'email-inbox' },
    @{ Name = 'EmailsComponent'; File = 'emails'; Path = 'emails' },
    @{ Name = 'EmptyComponent'; File = 'empty'; Path = 'empty' },
    @{ Name = 'Error404Component'; File = 'error-404'; Path = 'error-404' },
    @{ Name = 'Error500Component'; File = 'error-500'; Path = 'error-500' },
    @{ Name = 'ErrorMaintenanceComponent'; File = 'error-maintenance'; Path = 'error-maintenance' },
    @{ Name = 'FaqComponent'; File = 'faq'; Path = 'faq' },
    @{ Name = 'FlagsComponent'; File = 'flags'; Path = 'flags' },
    @{ Name = 'FormElementsComponent'; File = 'form-elements'; Path = 'form-elements' },
    @{ Name = 'FormLayoutComponent'; File = 'form-layout'; Path = 'form-layout' },
    @{ Name = 'FullcalendarComponent'; File = 'fullcalendar'; Path = 'fullcalendar' },
    @{ Name = 'GalleryComponent'; File = 'gallery'; Path = 'gallery' },
    @{ Name = 'IconsComponent'; File = 'icons'; Path = 'icons' },
    @{ Name = 'IllustrationsComponent'; File = 'illustrations'; Path = 'illustrations' },
    @{ Name = 'IndexComponent'; File = 'index'; Path = 'dashboard' },
    @{ Name = 'InlinePlayerComponent'; File = 'inline-player'; Path = 'inline-player' },
    @{ Name = 'InvoiceComponent'; File = 'invoice'; Path = 'invoice' },
    @{ Name = 'JobListingComponent'; File = 'job-listing'; Path = 'job-listing' },
    @{ Name = 'LicenseComponent'; File = 'license'; Path = 'license' },
    @{ Name = 'LightboxComponent'; File = 'lightbox'; Path = 'lightbox' },
    @{ Name = 'ListsComponent'; File = 'lists'; Path = 'lists' },
    @{ Name = 'LogsComponent'; File = 'logs'; Path = 'logs' },
    @{ Name = 'MapFullsizeComponent'; File = 'map-fullsize'; Path = 'map-fullsize' },
    @{ Name = 'MapsVectorComponent'; File = 'maps-vector'; Path = 'maps-vector' },
    @{ Name = 'MapsComponent'; File = 'maps'; Path = 'maps' },
    @{ Name = 'MarkdownComponent'; File = 'markdown'; Path = 'markdown' },
    @{ Name = 'ModalsComponent'; File = 'modals'; Path = 'modals' },
    @{ Name = 'MusicComponent'; File = 'music'; Path = 'music' },
    @{ Name = 'NavigationComponent'; File = 'navigation'; Path = 'navigation' },
    @{ Name = 'OffcanvasComponent'; File = 'offcanvas'; Path = 'offcanvas' },
    @{ Name = 'OnboardingComponent'; File = 'onboarding'; Path = 'onboarding' },
    @{ Name = 'PageLoaderComponent'; File = 'page-loader'; Path = 'page-loader' },
    @{ Name = 'PaginationComponent'; File = 'pagination'; Path = 'pagination' },
    @{ Name = 'PatternsComponent'; File = 'patterns'; Path = 'patterns' },
    @{ Name = 'PayComponent'; File = 'pay'; Path = 'pay' },
    @{ Name = 'PaymentProvidersComponent'; File = 'payment-providers'; Path = 'payment-providers' },
    @{ Name = 'PhotogridComponent'; File = 'photogrid'; Path = 'photogrid' },
    @{ Name = 'PlaceholderComponent'; File = 'placeholder'; Path = 'placeholder' },
    @{ Name = 'PricingTableComponent'; File = 'pricing-table'; Path = 'pricing-table' },
    @{ Name = 'PricingComponent'; File = 'pricing'; Path = 'pricing' },
    @{ Name = 'ProfileComponent'; File = 'profile'; Path = 'profile' },
    @{ Name = 'ProgressComponent'; File = 'progress'; Path = 'progress' },
    @{ Name = 'ProseComponent'; File = 'prose'; Path = 'prose' },
    @{ Name = 'ScrollSpyComponent'; File = 'scroll-spy'; Path = 'scroll-spy' },
    @{ Name = 'SearchResultsComponent'; File = 'search-results'; Path = 'search-results' },
    @{ Name = 'SegmentedControlComponent'; File = 'segmented-control'; Path = 'segmented-control' },
    @{ Name = 'SettingsPlanComponent'; File = 'settings-plan'; Path = 'settings-plan' },
    @{ Name = 'SettingsComponent'; File = 'settings'; Path = 'settings' },
    @{ Name = 'SignaturesComponent'; File = 'signatures'; Path = 'signatures' },
    @{ Name = 'SocialIconsComponent'; File = 'social-icons'; Path = 'social-icons' },
    @{ Name = 'SortableComponent'; File = 'sortable'; Path = 'sortable' },
    @{ Name = 'StarsRatingComponent'; File = 'stars-rating'; Path = 'stars-rating' },
    @{ Name = 'StepsComponent'; File = 'steps'; Path = 'steps' },
    @{ Name = 'TablesComponent'; File = 'tables'; Path = 'tables' },
    @{ Name = 'TabsComponent'; File = 'tabs'; Path = 'tabs' },
    @{ Name = 'TagsComponent'; File = 'tags'; Path = 'tags' },
    @{ Name = 'TasksListComponent'; File = 'tasks-list'; Path = 'tasks-list' },
    @{ Name = 'TasksComponent'; File = 'tasks'; Path = 'tasks' },
    @{ Name = 'TextFeaturesComponent'; File = 'text-features'; Path = 'text-features' },
    @{ Name = 'ToastsComponent'; File = 'toasts'; Path = 'toasts' },
    @{ Name = 'TourComponent'; File = 'tour'; Path = 'tour' },
    @{ Name = 'TrialEndedComponent'; File = 'trial-ended'; Path = 'trial-ended' },
    @{ Name = 'TurboLoaderComponent'; File = 'turbo-loader'; Path = 'turbo-loader' },
    @{ Name = 'TypographyComponent'; File = 'typography'; Path = 'typography' },
    @{ Name = 'UptimeComponent'; File = 'uptime'; Path = 'uptime' },
    @{ Name = 'UsersComponent'; File = 'users'; Path = 'users' },
    @{ Name = 'WidgetsComponent'; File = 'widgets'; Path = 'widgets' },
    @{ Name = 'WizardComponent'; File = 'wizard'; Path = 'wizard' },
    @{ Name = 'WysiwygComponent'; File = 'wysiwyg'; Path = 'wysiwyg' }
)
$components += $pageComponents

# Generate the routing module content
$importsLines = @()
$routeLines = @()

$components | ForEach-Object {
    $compName = $_.Name
    $file = $_.File
    $path = $_.Path
    
    # Determine the import path
    $catPrefix = ""
    if ($path -match '^auth/') { $catPrefix = "auth/" }
    elseif ($path -match '^marketing/') { $catPrefix = "marketing/" }
    elseif ($path -match '^docs/') { $catPrefix = "docs/" }
    elseif ($path -match '^layouts/') { $catPrefix = "layouts/" }
    elseif ($path -match '^layouts/') { $catPrefix = "layouts/" }
    
    $importPath = "./$catPrefix$file/$file.component"
    $importsLines += "import { $compName } from '$importPath';"
    
    $routeLines += "  { path: '$path', component: $compName },"
}

$routeContent = @"
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

$($importsLines -join "`n")

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
$($routeLines -join "`n")
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TablerRoutingModule { }
"@

Set-Content -Path $outputPath -Value $routeContent -Force
Write-Output "Routing module generated at $outputPath with $($components.Count) routes"
