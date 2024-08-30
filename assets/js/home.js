document.addEventListener('DOMContentLoaded', function() {
    const banner = document.getElementById('banner');
    // Use setTimeout to ensure CSS has applied before the transition
    setTimeout(() => {
        banner.classList.add('fade-in');
    }, 100); // Small delay to ensure the CSS is applied before transitioning
});
