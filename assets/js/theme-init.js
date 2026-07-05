(function () {
const theme = localStorage.getItem('theme') || 'system';
const colorScheme = localStorage.getItem('colorScheme') || '{{ site.Params.colorScheme | default "shadcn" }}';

document.documentElement.setAttribute('data-theme', colorScheme);

function applyTheme() {
    if (theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark');
    } else {
    document.documentElement.classList.remove('dark');
    }
}

applyTheme();

if (theme === 'system') {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', applyTheme);
}
})();
