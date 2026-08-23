/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class',
    content: [
        "./src/**/*.{html,ts}"
    ],
    theme: {
        extend: {},
    },
    plugins: [
        require('@tailwindcss/typography'),

    ],
    corePlugins: {
        // Tailwind's `.collapse`/`.visible`/`.invisible` visibility utilities collide
        // with Bootstrap's `.collapse` component class, hiding collapse content.
        visibility: false
    }
}
