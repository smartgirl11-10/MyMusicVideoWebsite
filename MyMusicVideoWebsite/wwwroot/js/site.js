// Please see documentation at https://learn.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.
document.addEventListener('DOMContentLoaded', () => {
    const cover = document.getElementById('albumCover');
    const spinBtn = document.getElementById('spinBtn');
    const resetBtn = document.getElementById('resetBtn');
    if (!cover || !spinBtn || !resetBtn) return;

    let rafId = null;
    let angle = 0;
    let spinning = false;
    const speed = 2.5; // degrees per frame (adjust for faster/slower)

    function step() {
        angle = (angle + speed) % 360;
        cover.style.transform = `rotate(${angle}deg)`;
        rafId = requestAnimationFrame(step);
    }

    spinBtn.addEventListener('click', () => {
        spinning = !spinning;
        spinBtn.textContent = spinning ? 'Stop spinning' : 'Spin cover';
        if (spinning) {
            // start animation loop
            if (!rafId) rafId = requestAnimationFrame(step);
            cover.style.boxShadow = '0 18px 48px rgba(0,0,0,0.75)';
        } else {
            // stop animation
            if (rafId) {
                cancelAnimationFrame(rafId);
                rafId = null;
            }
            cover.style.boxShadow = '0 12px 30px rgba(0,0,0,0.7)';
        }
    });

    resetBtn.addEventListener('click', () => {
        if (rafId) cancelAnimationFrame(rafId);
        rafId = null;
        spinning = false;
        spinBtn.textContent = 'Spin cover';
        angle = 0;
        cover.style.transform = 'rotate(0deg)';
        cover.style.boxShadow = '0 12px 30px rgba(0,0,0,0.7)';
    });
});