document.addEventListener('DOMContentLoaded', () => {
    const player = document.getElementById('player');
    const target = document.getElementById('target');
    const gameArea = document.getElementById('gameArea');
    let gameAreaRect = gameArea.getBoundingClientRect();

    // Player movement
    document.addEventListener('keydown', (e) => {
        const playerRect = player.getBoundingClientRect();
        if (e.key === 'ArrowLeft' && playerRect.left > gameAreaRect.left) {
            player.style.left = `${playerRect.left - 20 - gameAreaRect.left}px`;
        }
        if (e.key === 'ArrowRight' && playerRect.right < gameAreaRect.right) {
            player.style.left = `${playerRect.left + 20 - gameAreaRect.left}px`;
        }
    });

    // Shooting
    document.addEventListener('keydown', (e) => {
        if (e.key === ' ') {
            shoot();
        }
    });

    function shoot() {
        const bullet = document.createElement('div');
        bullet.classList.add('bullet');
        bullet.style.left = player.style.left;
        bullet.style.bottom = '60px';
        gameArea.appendChild(bullet);

        const bulletInterval = setInterval(() => {
            const bulletRect = bullet.getBoundingClientRect();
            const targetRect = target.getBoundingClientRect();

            if (bulletRect.top <= targetRect.bottom &&
                bulletRect.right >= targetRect.left &&
                bulletRect.left <= targetRect.right) {
                clearInterval(bulletInterval);
                bullet.remove();
                alert('Hit!');
                // Move target to a new random position
                moveTarget();
            } else if (bulletRect.bottom >= gameAreaRect.top) {
                bullet.style.bottom = `${parseInt(bullet.style.bottom) + 10}px`;
            } else {
                clearInterval(bulletInterval);
                bullet.remove();
            }
        }, 20);
    }

    function moveTarget() {
        const randomX = Math.floor(Math.random() * (gameAreaRect.width - target.offsetWidth));
        target.style.left = `${randomX}px`;
    }

    // Initial target position
    moveTarget();
});