$baseDir = "C:\github\angular-clean-architecture"
$tablerDest = "$baseDir\src\app\features\tabler"

$categories = @{
    'pages'     = 'Pages'
    'auth'      = 'Auth'
    'layouts'   = 'Layouts'
    'marketing' = 'Marketing'
    'docs'      = 'Docs'
}

$allRoutes = @()

foreach ($catKey in $categories.Keys) {
    $catPath = "$tablerDest\$catKey"
    if (-not (Test-Path $catPath)) { continue }
    
    $compDirs = Get-ChildItem -Path $catPath -Directory
    foreach ($dir in $compDirs) {
        $infoPath = "$($dir.FullName)\.component-info.json"
        if (-not (Test-Path $infoPath)) { continue }
        
        $info = Get-Content $infoPath -Raw | ConvertFrom-Json
        $pascalName = $info.PascalName
        $fileName = $info.FileName
        $compName = "$pascalName`Component"
        $selector = "app-tabler-$fileName"
        
        # Read the extracted HTML template
        $htmlPath = "$($dir.FullName)\$fileName.component.html"
        if (-not (Test-Path $htmlPath)) { continue }
        
        # Create TypeScript file
        $tsContent = @"
import { Component } from '@angular/core';

@Component({
  selector: '$selector',
  templateUrl: './$fileName.component.html',
  styleUrls: ['./$fileName.component.scss'],
  standalone: false,
})
export class $compName { }
"@
        Set-Content -Path "$($dir.FullName)\$fileName.component.ts" -Value $tsContent -Force
        
        # Create SCSS file (empty for now)
        if (-not (Test-Path "$($dir.FullName)\$fileName.component.scss")) {
            Set-Content -Path "$($dir.FullName)\$fileName.component.scss" -Value "" -Force
        }
        
        # Create spec file
        $specContent = @"
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { $compName } from './$fileName.component';

describe('$compName', () => {
  let component: $compName;
  let fixture: ComponentFixture<$compName>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [$compName],
    }).compileComponents();

    fixture = TestBed.createComponent($compName);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
"@
        Set-Content -Path "$($dir.FullName)\$fileName.component.spec.ts" -Value $specContent -Force
        
        # Build route entry
        $routePath = "$catKey/$fileName"
        $routeComponent = "$compName"
        $routeImport = "..\$catKey\$fileName\$fileName.component"
        $route = @{
            Path = $routePath -replace '^pages/', ''
            Component = $routeComponent
            Import = $routeImport
            Category = $catKey
        }
        $allRoutes += $route
        
        Write-Output "Generated: $catKey/$fileName -> $compName"
    }
}

# Write routes to a JSON for the routing module generator
$routeJson = $allRoutes | ConvertTo-Json
Set-Content -Path "$tablerDest\.routes-data.json" -Value $routeJson -Force

Write-Output "`nTotal components generated: $($allRoutes.Count)"
