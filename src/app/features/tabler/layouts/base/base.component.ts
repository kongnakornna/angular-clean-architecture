import { Component } from '@angular/core';

@Component({
  selector: 'app-tabler-base-layout',
  template: `
    <a href="#content" class="visually-hidden skip-link">Skip to main content</a>
    <ng-content></ng-content>
    <div class="settings">
      <a href="#" class="btn btn-floating btn-icon btn-primary" data-bs-toggle="offcanvas" data-bs-target="#offcanvas-settings" aria-controls="offcanvas-settings" aria-label="Theme Settings">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false" class="icon icon-1"><path d="M3 21v-4a4 4 0 1 1 4 4h-4" /><path d="M21 3a16 16 0 0 0 -12.8 10.2" /><path d="M21 3a16 16 0 0 1 -10.2 12.8" /><path d="M10.6 9a9 9 0 0 1 4.4 4.4" /></svg>
      </a>
      <form class="offcanvas offcanvas-start offcanvas-narrow" tabindex="-1" id="offcanvas-settings" role="dialog" aria-modal="true" aria-labelledby="offcanvas-settings-title">
        <div class="offcanvas-header">
          <h2 class="offcanvas-title" id="offcanvas-settings-title">Theme Settings</h2>
          <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body d-flex flex-column">
          <div>
            <div class="mb-4">
              <label class="form-label">Color mode</label>
              <p class="form-hint">Choose the color mode for your app.</p>
              <label class="form-check">
                <div class="form-selectgroup-item">
                  <input type="radio" name="theme" value="light" class="form-check-input" checked />
                  <div class="form-check-label">Light</div>
                </div>
              </label>
              <label class="form-check">
                <div class="form-selectgroup-item">
                  <input type="radio" name="theme" value="dark" class="form-check-input" />
                  <div class="form-check-label">Dark</div>
                </div>
              </label>
            </div>
            <div class="mb-4">
              <label class="form-label">Color scheme</label>
              <p class="form-hint">The perfect color mode for your app.</p>
              <div class="row g-2">
                <div class="col-auto">
                  <label class="form-colorinput">
                    <input name="theme-primary" type="radio" value="blue" class="form-colorinput-input" />
                    <span class="form-colorinput-color bg-blue"></span>
                  </label>
                </div>
                <div class="col-auto">
                  <label class="form-colorinput">
                    <input name="theme-primary" type="radio" value="green" class="form-colorinput-input" />
                    <span class="form-colorinput-color bg-green"></span>
                  </label>
                </div>
                <div class="col-auto">
                  <label class="form-colorinput">
                    <input name="theme-primary" type="radio" value="orange" class="form-colorinput-input" />
                    <span class="form-colorinput-color bg-orange"></span>
                  </label>
                </div>
                <div class="col-auto">
                  <label class="form-colorinput">
                    <input name="theme-primary" type="radio" value="purple" class="form-colorinput-input" />
                    <span class="form-colorinput-color bg-purple"></span>
                  </label>
                </div>
                <div class="col-auto">
                  <label class="form-colorinput">
                    <input name="theme-primary" type="radio" value="red" class="form-colorinput-input" />
                    <span class="form-colorinput-color bg-red"></span>
                  </label>
                </div>
                <div class="col-auto">
                  <label class="form-colorinput">
                    <input name="theme-primary" type="radio" value="yellow" class="form-colorinput-input" />
                    <span class="form-colorinput-color bg-yellow"></span>
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div class="mt-auto">
            <div class="btn-list justify-content-center">
              <button type="reset" class="btn">Reset to defaults</button>
            </div>
          </div>
        </div>
      </form>
    </div>
    <!-- BEGIN PAGE SCRIPTS -->
    <script>
      (function() {
        var themeConfig = { theme: 'light', 'theme-primary': 'blue' };
        var form = document.getElementById('offcanvas-settings');
        if (!form) return;
        var resetButton = form.querySelector('button[type="reset"]');
        var url = new URL(window.location.href);
        function checkItems() {
          for (var key in themeConfig) {
            var value = window.localStorage['tabler-' + key] || themeConfig[key];
            if (value) {
              var radios = form.querySelectorAll('[name="' + key + '"]');
              if (radios) {
                radios.forEach(function(radio) {
                  radio.checked = radio.value === value;
                });
              }
            }
          }
        }
        form.addEventListener('change', function(event) {
          var target = event.target, name = target.name, value = target.value;
          for (var key in themeConfig) {
            if (name === key) {
              document.documentElement.setAttribute('data-bs-' + key, value);
              window.localStorage.setItem('tabler-' + key, value);
              url.searchParams.set(key, value);
            }
          }
          window.history.pushState({}, '', url);
        });
        resetButton.addEventListener('click', function() {
          for (var key in themeConfig) {
            var value = themeConfig[key];
            document.documentElement.removeAttribute('data-bs-' + key);
            window.localStorage.removeItem('tabler-' + key);
            url.searchParams.delete(key);
          }
          checkItems();
          window.history.pushState({}, '', url);
        });
        checkItems();
      })();
    </script>
    <!-- END PAGE SCRIPTS -->
  `,
  styles: [`
    :host { display: contents; }
  `],
  standalone: true,
})
export class BaseLayoutComponent {}
