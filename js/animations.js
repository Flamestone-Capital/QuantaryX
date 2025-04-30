// 高級動畫和互動效果
document.addEventListener('DOMContentLoaded', function() {
    // 粒子背景效果
    createParticleBackground();
    
    // 滾動觸發動畫
    initScrollAnimations();
    
    // 產品卡片懸停效果
    initProductCardEffects();
    
    // 圖表動畫效果
    initChartAnimations();
});

// 創建粒子背景
function createParticleBackground() {
    const particleContainer = document.createElement('div');
    particleContainer.className = 'particle-background';
    document.body.appendChild(particleContainer);
    
    // 添加粒子
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // 隨機位置和大小
        const size = Math.random() * 5 + 1;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${Math.random() * 100}vw`;
        particle.style.top = `${Math.random() * 100}vh`;
        
        // 隨機動畫延遲和持續時間
        const animationDuration = Math.random() * 50 + 30;
        const animationDelay = Math.random() * 10;
        particle.style.animationDuration = `${animationDuration}s`;
        particle.style.animationDelay = `${animationDelay}s`;
        
        particleContainer.appendChild(particle);
    }
    
    // 添加CSS
    const style = document.createElement('style');
    style.textContent = `
        .particle-background {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: -1;
            overflow: hidden;
            pointer-events: none;
        }
        
        .particle {
            position: absolute;
            background-color: rgba(0, 112, 243, 0.2);
            border-radius: 50%;
            animation: float linear infinite;
        }
        
        @keyframes float {
            0% {
                transform: translateY(0) translateX(0);
                opacity: 0;
            }
            10% {
                opacity: 0.8;
            }
            90% {
                opacity: 0.6;
            }
            100% {
                transform: translateY(-100vh) translateX(100px);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// 初始化滾動觸發動畫
function initScrollAnimations() {
    // 選擇所有需要動畫的元素
    const animatedElements = document.querySelectorAll('.feature-card, .product-content, .client-type, .cta-buttons, .partners-track');
    
    // 創建觀察器
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });
    
    // 觀察每個元素
    animatedElements.forEach(element => {
        observer.observe(element);
    });
    
    // 添加CSS
    const style = document.createElement('style');
    style.textContent = `
        .feature-card, .product-content, .client-type, .cta-buttons, .partners-track {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.8s ease, transform 0.8s ease;
        }
        
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
        
        .feature-card.animate-in {
            transition-delay: calc(var(--card-index, 0) * 0.1s);
        }
    `;
    document.head.appendChild(style);
    
    // 設置卡片索引以實現階梯式動畫
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach((card, index) => {
        card.style.setProperty('--card-index', index);
    });
}

// 初始化產品卡片懸停效果
function initProductCardEffects() {
    const productCards = document.querySelectorAll('.product-content');
    
    productCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
            card.style.transition = 'transform 0.1s ease';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
            card.style.transition = 'transform 0.5s ease';
        });
    });
}

// 初始化圖表動畫效果
function initChartAnimations() {
    // 創建一個模擬圖表元素
    const chartContainer = document.createElement('div');
    chartContainer.className = 'chart-animation-container';
    
    // 添加到產品部分
    const productSection = document.querySelector('.products');
    if (productSection) {
        const productInfo = productSection.querySelector('#flamestone .product-info');
        if (productInfo) {
            chartContainer.innerHTML = `
                <div class="chart-line"></div>
                <div class="chart-dot dot-1"></div>
                <div class="chart-dot dot-2"></div>
                <div class="chart-dot dot-3"></div>
                <div class="chart-dot dot-4"></div>
                <div class="chart-dot dot-5"></div>
            `;
            productInfo.appendChild(chartContainer);
        }
    }
    
    // 添加CSS
    const style = document.createElement('style');
    style.textContent = `
        .chart-animation-container {
            position: relative;
            height: 100px;
            margin: 30px 0;
            overflow: hidden;
        }
        
        .chart-line {
            position: absolute;
            bottom: 30px;
            left: 0;
            width: 0;
            height: 3px;
            background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
            animation: drawLine 3s forwards ease-out;
            box-shadow: 0 0 10px rgba(0, 112, 243, 0.5);
        }
        
        .chart-dot {
            position: absolute;
            width: 12px;
            height: 12px;
            border-radius: 50%;
            background-color: var(--secondary-color);
            bottom: 26px;
            transform: scale(0);
            box-shadow: 0 0 15px rgba(0, 168, 255, 0.8);
        }
        
        .dot-1 { left: 10%; animation: popDot 0.3s forwards ease-out 0.6s; }
        .dot-2 { left: 30%; animation: popDot 0.3s forwards ease-out 1.2s; }
        .dot-3 { left: 50%; animation: popDot 0.3s forwards ease-out 1.8s; }
        .dot-4 { left: 70%; animation: popDot 0.3s forwards ease-out 2.4s; }
        .dot-5 { left: 90%; animation: popDot 0.3s forwards ease-out 3s; }
        
        @keyframes drawLine {
            to { width: 100%; }
        }
        
        @keyframes popDot {
            0% { transform: scale(0); }
            50% { transform: scale(1.5); }
            100% { transform: scale(1); }
        }
    `;
    document.head.appendChild(style);
}
