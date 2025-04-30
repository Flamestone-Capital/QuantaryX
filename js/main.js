// 主要JavaScript功能
document.addEventListener('DOMContentLoaded', function() {
    // 導航欄菜單切換
    const menuToggle = document.getElementById('menu-toggle');
    const navbarMenu = document.getElementById('navbar-menu');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navbarMenu.classList.toggle('active');
            menuToggle.classList.toggle('active');
            
            // 切換漢堡菜單圖標
            const spans = menuToggle.querySelectorAll('span');
            spans.forEach(span => span.classList.toggle('active'));
        });
        
        // 點擊菜單項時關閉菜單（在移動設備上）
        const navbarLinks = document.querySelectorAll('.navbar-link');
        navbarLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 768) {
                    navbarMenu.classList.remove('active');
                    menuToggle.classList.remove('active');
                    const spans = menuToggle.querySelectorAll('span');
                    spans.forEach(span => span.classList.remove('active'));
                }
            });
        });
        
        // 點擊頁面其他區域時關閉菜單
        document.addEventListener('click', function(event) {
            if (!navbarMenu.contains(event.target) && !menuToggle.contains(event.target) && navbarMenu.classList.contains('active')) {
                navbarMenu.classList.remove('active');
                menuToggle.classList.remove('active');
                const spans = menuToggle.querySelectorAll('span');
                spans.forEach(span => span.classList.remove('active'));
            }
        });
    }
    
    // 產品標籤切換
    const productTabs = document.querySelectorAll('.product-tab');
    const productContents = document.querySelectorAll('.product-content');
    
    productTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const target = tab.getAttribute('data-tab');
            
            // 移除所有標籤和內容的active類
            productTabs.forEach(t => t.classList.remove('active'));
            productContents.forEach(c => c.classList.remove('active'));
            
            // 添加active類到當前標籤和對應內容
            tab.classList.add('active');
            document.getElementById(target).classList.add('active');
        });
    });
    
    // 語言切換
    const languageSelect = document.getElementById('language-select');
    
    if (languageSelect) {
        // 從localStorage获取保存的语言设置，如果没有则默认使用zh-hant
        const savedLanguage = localStorage.getItem('preferred-language') || 'zh-hant';
        document.documentElement.lang = savedLanguage;
        document.body.className = savedLanguage; // 设置body的类名
        languageSelect.value = savedLanguage;
        
        // 监听语言选择的变化
        languageSelect.addEventListener('change', function(e) {
            const selectedLanguage = e.target.value;
            document.documentElement.lang = selectedLanguage;
            document.body.className = selectedLanguage; // 更新body的类名
            localStorage.setItem('preferred-language', selectedLanguage);
        });
    }
    
    // 滾動動畫
    const animateElements = document.querySelectorAll('.animate');
    
    function checkScroll() {
        const triggerBottom = window.innerHeight * 0.8;
        
        animateElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < triggerBottom) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }
    
    // 初始化元素樣式
    animateElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    });
    
    // 監聽滾動事件
    window.addEventListener('scroll', checkScroll);
    
    // 初始檢查
    checkScroll();
    
    // 導航欄滾動效果
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            navbar.style.padding = '10px 0';
            navbar.style.backgroundColor = 'rgba(17, 17, 17, 0.95)';
        } else {
            navbar.style.padding = '15px 0';
            navbar.style.backgroundColor = 'rgba(17, 17, 17, 0.9)';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // 英雄區域背景效果
    const hero = document.querySelector('.hero');
    if (hero) {
        const gradientSphere = document.querySelector('.gradient-sphere');
        
        if (gradientSphere) {
            window.addEventListener('mousemove', function(e) {
                const x = e.clientX / window.innerWidth;
                const y = e.clientY / window.innerHeight;
                
                gradientSphere.style.transform = `translate(${x * 20 - 10}px, ${y * 20 - 10}px)`;
            });
        }
    }
    
    // 合作夥伴跑馬燈效果
    const partnersTrack = document.querySelector('.partners-track');
    if (partnersTrack) {
        // 複製跑馬燈內容以實現無縫滾動
        partnersTrack.innerHTML += partnersTrack.innerHTML;
    }

    // 导航高亮
    // 获取当前页面的路径
    const currentPath = window.location.pathname;
    
    // 获取所有导航链接
    const navLinks = document.querySelectorAll('.navbar-link');
    
    // 遍历所有链接
    navLinks.forEach(link => {
        // 获取链接的href属性
        const href = link.getAttribute('href');
        
        // 如果当前页面路径包含链接的href，则添加active类
        if (currentPath.includes(href)) {
            link.classList.add('active');
        }
    });
});

// 添加漸變背景動畫
document.addEventListener('DOMContentLoaded', function() {
    const hero = document.querySelector('.hero');
    
    if (hero) {
        // 創建漸變背景
        const gradientSphere = document.createElement('div');
        gradientSphere.classList.add('gradient-sphere');
        hero.querySelector('.hero-background').appendChild(gradientSphere);
        
        // 添加CSS
        const style = document.createElement('style');
        style.textContent = `
            .hero-background {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                overflow: hidden;
                z-index: 0;
            }
            
            .gradient-sphere {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: 800px;
                height: 800px;
                border-radius: 50%;
                background: radial-gradient(circle at center, rgba(0, 112, 243, 0.2), rgba(0, 168, 255, 0.1), transparent 70%);
                filter: blur(60px);
                animation: pulse 8s infinite alternate;
                transition: transform 0.3s ease;
            }
            
            @keyframes pulse {
                0% {
                    transform: translate(-50%, -50%) scale(0.8);
                    background: radial-gradient(circle at center, rgba(0, 112, 243, 0.2), rgba(0, 168, 255, 0.1), transparent 70%);
                }
                50% {
                    transform: translate(-50%, -50%) scale(1);
                    background: radial-gradient(circle at center, rgba(0, 168, 255, 0.2), rgba(0, 112, 243, 0.1), transparent 70%);
                }
                100% {
                    transform: translate(-50%, -50%) scale(0.9);
                    background: radial-gradient(circle at center, rgba(0, 112, 243, 0.2), rgba(0, 168, 255, 0.1), transparent 70%);
                }
            }
        `;
        document.head.appendChild(style);
    }
});
