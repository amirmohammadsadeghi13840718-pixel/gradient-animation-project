// انتخاب المان‌ها
const letters = document.querySelectorAll('.letter');
const logo = document.getElementById('animatedLogo');
const subtitle = document.getElementById('animatedSubtitle');

// متغیرهای موس
let mouseX = 0;
let mouseY = 0;
let currentX = 0;
let currentY = 0;

// ردیابی حرکت موس
document.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
});

// انیمیشن لوگو با حرکت موس
function animateLogo() {
    currentX += (mouseX - currentX) * 0.05;
    currentY += (mouseY - currentY) * 0.05;
    
    if (logo) {
        logo.style.transform = `perspective(1000px) 
            rotateY(${currentX * 20}deg) 
            rotateX(${-currentY * 20}deg)`;
    }
    
    requestAnimationFrame(animateLogo);
}

// انیمیشن حروف با حرکت موس
function animateLetters() {
    letters.forEach((letter, index) => {
        const speed = 0.02 + (index * 0.01);
        const offsetX = mouseX * 30 * (index + 1) * speed;
        const offsetY = mouseY * 20 * (index + 1) * speed;
        
        letter.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
    });
    
    requestAnimationFrame(animateLetters);
}

// تغییر رنگ تصادفی برای حروف
function randomColorChange() {
    setInterval(() => {
        letters.forEach((letter, index) => {
            setTimeout(() => {
                const hue = Math.random() * 360;
                letter.style.color = `hsl(${hue}, 100%, 70%)`;
                
                // برگشت به رنگ اصلی بعد از 0.5 ثانیه
                setTimeout(() => {
                    if (index % 2 === 0) {
                        letter.style.color = '#ff99ff';
                    } else {
                        letter.style.color = '#99ffff';
                    }
                }, 500);
            }, index * 100);
        });
    }, 3000);
}

// افکت شاین روی لوگو
function shineEffect() {
    setInterval(() => {
        if (logo) {
            logo.style.filter = 'brightness(1.5)';
            setTimeout(() => {
                logo.style.filter = 'brightness(1)';
            }, 500);
        }
    }, 4000);
}

// ایجاد ذرات در پس‌زمینه
function createParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.style.position = 'fixed';
    particlesContainer.style.top = '0';
    particlesContainer.style.left = '0';
    particlesContainer.style.width = '100%';
    particlesContainer.style.height = '100%';
    particlesContainer.style.pointerEvents = 'none';
    particlesContainer.style.zIndex = '0';
    document.body.appendChild(particlesContainer);

    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        const size = Math.random() * 5 + 2;
        
        particle.style.position = 'absolute';
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.background = `hsl(${Math.random() * 360}, 100%, 70%)`;
        particle.style.borderRadius = '50%';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.boxShadow = '0 0 10px currentColor';
        particle.style.animation = `floatParticle ${Math.random() * 10 + 10}s linear infinite`;
        
        particlesContainer.appendChild(particle);
    }
}

// اضافه کردن کلیدهای انیمیشن به CSS
function addParticleAnimation() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes floatParticle {
            0% {
                transform: translateY(100vh) rotate(0deg);
                opacity: 0;
            }
            10% {
                opacity: 0.8;
            }
            90% {
                opacity: 0.8;
            }
            100% {
                transform: translateY(-100vh) rotate(360deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// افکت تایپ برای زیرنویس
function typeWriterEffect() {
    const text = subtitle.textContent;
    subtitle.textContent = '';
    let i = 0;

    function typeWriter() {
        if (i < text.length) {
            subtitle.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    }

    // شروع افکت تایپ بعد از 1 ثانیه
    setTimeout(typeWriter, 1000);
}

// حرکت موجی برای حروف
function waveEffect() {
    setInterval(() => {
        letters.forEach((letter, index) => {
            setTimeout(() => {
                letter.style.transform += ' scale(1.2)';
                setTimeout(() => {
                    letter.style.transform = letter.style.transform.replace(' scale(1.2)', '');
                }, 200);
            }, index * 50);
        });
    }, 5000);
}

// شروع همه انیمیشن‌ها
function init() {
    animateLogo();
    animateLetters();
    randomColorChange();
    shineEffect();
    createParticles();
    addParticleAnimation();
    typeWriterEffect();
    waveEffect();

    // افکت هنگام لود صفحه
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 1s ease';
        document.body.style.opacity = '1';
    }, 100);
}

// اجرا بعد از لود کامل صفحه
window.addEventListener('load', init);

// افکت هنگام خروج از صفحه
window.addEventListener('beforeunload', () => {
    document.body.style.opacity = '0';
});