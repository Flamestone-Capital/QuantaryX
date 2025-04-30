// 解決方案標籤切換
document.addEventListener('DOMContentLoaded', function() {
    const solutionTabs = document.querySelectorAll('.solution-tab');
    const solutionSections = document.querySelectorAll('.solution-section');
    
    // 初始化顯示第一個解決方案
    if (solutionSections.length > 0) {
        solutionSections[0].style.display = 'block';
    }
    
    if (solutionTabs.length > 0) {
        solutionTabs[0].classList.add('active');
    }
    
    solutionTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const target = tab.getAttribute('data-target');
            
            // 移除所有標籤的active類
            solutionTabs.forEach(t => t.classList.remove('active'));
            
            // 隱藏所有解決方案部分
            solutionSections.forEach(section => {
                section.style.display = 'none';
            });
            
            // 添加active類到當前標籤
            tab.classList.add('active');
            
            // 顯示對應的解決方案部分
            const targetSection = document.getElementById(target);
            if (targetSection) {
                targetSection.style.display = 'block';
                
                // 觸發動畫重新計算
                const animateElements = targetSection.querySelectorAll('.animate');
                animateElements.forEach(element => {
                    element.style.opacity = '0';
                    element.style.transform = 'translateY(20px)';
                    
                    setTimeout(() => {
                        element.style.opacity = '1';
                        element.style.transform = 'translateY(0)';
                    }, 100);
                });
            }
            
            // 滾動到解決方案部分
            window.scrollTo({
                top: document.querySelector('.solutions-tabs').offsetTop - 100,
                behavior: 'smooth'
            });
        });
    });
});
