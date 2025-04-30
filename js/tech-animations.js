/* 高科技金融動畫效果 */
document.addEventListener('DOMContentLoaded', function() {
    // 添加數字矩陣背景
    createMatrixBackground();
    
    // 添加股票圖表動畫
    createStockChartAnimation();
    
    // 添加數據流動畫
    createDataFlowAnimation();
    
    // 添加3D網格背景
    create3DGridBackground();
    
    // 添加懸浮元素效果
    createFloatingElements();
});

// 創建數字矩陣背景
function createMatrixBackground() {
    const matrixContainer = document.createElement('div');
    matrixContainer.className = 'matrix-background';
    document.body.appendChild(matrixContainer);
    
    // 創建畫布
    const canvas = document.createElement('canvas');
    matrixContainer.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    
    // 設置畫布大小
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // 矩陣字符
    const characters = '01';
    const fontSize = 10;
    const columns = canvas.width / fontSize;
    
    // 每列的當前位置
    const drops = [];
    for (let i = 0; i < columns; i++) {
        drops[i] = Math.random() * -100;
    }
    
    // 繪製矩陣效果
    function drawMatrix() {
        // 半透明黑色背景，形成拖尾效果
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // 設置文字顏色和字體
        ctx.fillStyle = 'rgba(0, 112, 243, 0.3)';
        ctx.font = fontSize + 'px monospace';
        
        // 繪製字符
        for (let i = 0; i < drops.length; i++) {
            // 隨機選擇一個字符
            const text = characters.charAt(Math.floor(Math.random() * characters.length));
            
            // 繪製字符
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            
            // 重置或移動
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            
            // 移動到下一個位置
            drops[i]++;
        }
    }
    
    // 設置動畫循環
    setInterval(drawMatrix, 50);
    
    // 添加CSS
    const style = document.createElement('style');
    style.textContent = `
        .matrix-background {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: -2;
            opacity: 0.3;
            pointer-events: none;
        }
    `;
    document.head.appendChild(style);
}

// 創建股票圖表動畫
function createStockChartAnimation() {
    // 在產品部分添加股票圖表
    const productSections = document.querySelectorAll('.product-content');
    
    if (productSections.length > 0) {
        const chartContainer = document.createElement('div');
        chartContainer.className = 'stock-chart-container';
        
        // 創建SVG
        chartContainer.innerHTML = `
            <svg class="stock-chart" viewBox="0 0 500 200" preserveAspectRatio="none">
                <path class="chart-line" d="M50,150 L50,150"></path>
                <path class="chart-area" d="M50,200 L50,150 L50,150 L50,200 Z"></path>
            </svg>
            <div class="chart-labels">
                <div class="y-axis-labels">
                    <div>+100%</div>
                    <div>+50%</div>
                    <div>0%</div>
                    <div>-50%</div>
                </div>
                <div class="x-axis-labels">
                    <div>1D</div>
                    <div>1W</div>
                    <div>1M</div>
                    <div>3M</div>
                    <div>1Y</div>
                    <div>ALL</div>
                </div>
            </div>
        `;
        
        // 添加到第二個產品部分
        if (productSections[1]) {
            const productInfo = productSections[1].querySelector('.product-info');
            if (productInfo) {
                productInfo.appendChild(chartContainer);
            }
        }
        
        // 添加CSS
        const style = document.createElement('style');
        style.textContent = `
            .stock-chart-container {
                width: 100%;
                height: 200px;
                margin: 30px 0;
                position: relative;
                overflow: hidden;
            }
            
            .stock-chart {
                width: 100%;
                height: 100%;
                overflow: visible;
            }
            
            .chart-line {
                fill: none;
                stroke: var(--primary-color);
                stroke-width: 3;
                stroke-linecap: round;
                stroke-linejoin: round;
                filter: drop-shadow(0 0 5px rgba(0, 112, 243, 0.5));
                stroke-dasharray: 1000;
                stroke-dashoffset: 1000;
                animation: drawStockLine 5s forwards ease-out;
            }
            
            .chart-area {
                fill: url(#chartGradient);
                opacity: 0.2;
                stroke: none;
                animation: fillStockArea 5s forwards ease-out;
            }
            
            .chart-labels {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                pointer-events: none;
                display: flex;
            }
            
            .y-axis-labels {
                width: 50px;
                height: 100%;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                padding: 10px 0;
                font-size: 10px;
                color: #aaa;
            }
            
            .x-axis-labels {
                position: absolute;
                bottom: 0;
                left: 50px;
                right: 0;
                display: flex;
                justify-content: space-between;
                padding: 5px 10px;
                font-size: 10px;
                color: #aaa;
            }
            
            @keyframes drawStockLine {
                to {
                    stroke-dashoffset: 0;
                }
            }
            
            @keyframes fillStockArea {
                0% {
                    opacity: 0;
                }
                80% {
                    opacity: 0;
                }
                100% {
                    opacity: 0.2;
                }
            }
        `;
        document.head.appendChild(style);
        
        // 添加漸變定義
        const gradientDef = document.createElementNS("http://www.w3.org/2000/svg", "defs");
        gradientDef.innerHTML = `
            <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stop-color="var(--primary-color)" stop-opacity="0.5" />
                <stop offset="100%" stop-color="var(--primary-color)" stop-opacity="0" />
            </linearGradient>
        `;
        
        const svg = document.querySelector('.stock-chart');
        if (svg) {
            svg.insertBefore(gradientDef, svg.firstChild);
        }
        
        // 生成隨機股票數據
        function generateStockData(points = 100) {
            let data = [];
            let value = 0;  // 从0开始
            let upwardBias = 0.7; // 上升趋势的偏差值
            let volatility = 1.5; // 增加波动性
            
            for (let i = 0; i < points; i++) {
                // 添加一个偏向上升的随机波动
                let randomChange = Math.random();
                if (randomChange > upwardBias) {
                    // 30% 概率下跌，增加下跌幅度
                    value += (Math.random() - 0.9) * 12 * volatility;
                } else {
                    // 70% 概率上涨，增加上涨幅度
                    value += (Math.random() + 0.2) * 10 * volatility;
                }
                
                // 确保值不会太低，但允许小幅下跌
                value = Math.max(value, -10);
                
                // 根据时间推移逐渐增加上涨趋势
                value += (i / points) * 2;
                
                data.push(value);
            }
            
            return data;
        }
        
        // 更新圖表路徑
        function updateChartPath() {
            const data = generateStockData();
            const svg = document.querySelector('.stock-chart');
            const chartLine = document.querySelector('.chart-line');
            const chartArea = document.querySelector('.chart-area');
            
            if (svg && chartLine && chartArea) {
                const margin = { left: 50, right: 20, top: 20, bottom: 30 };
                const width = 500 - margin.left - margin.right;
                const height = 200 - margin.top - margin.bottom;
                const max = Math.max(...data) * 1.1;
                const min = Math.min(...data) * 0.9;
                const range = max - min;
                
                // 創建路徑，从margin.left开始
                let linePath = `M${margin.left},${height - ((data[0] - min) / range) * height + margin.top}`;
                let areaPath = `M${margin.left},${height + margin.top} L${margin.left},${height - ((data[0] - min) / range) * height + margin.top}`;
                
                for (let i = 1; i < data.length; i++) {
                    const x = margin.left + (i / (data.length - 1)) * width;
                    const y = height - ((data[i] - min) / range) * height + margin.top;
                    linePath += ` L${x},${y}`;
                    areaPath += ` L${x},${y}`;
                }
                
                // 閉合區域路徑
                areaPath += ` L${width + margin.left},${height + margin.top} Z`;
                
                // 更新路徑
                chartLine.setAttribute('d', linePath);
                chartArea.setAttribute('d', areaPath);
                
                // 重置動畫
                chartLine.style.animation = 'none';
                chartArea.style.animation = 'none';
                
                // 觸發重繪
                void chartLine.offsetWidth;
                void chartArea.offsetWidth;
                
                // 重新啟動動畫
                chartLine.style.animation = 'drawStockLine 5s forwards ease-out';
                chartArea.style.animation = 'fillStockArea 5s forwards ease-out';
            }
        }
        
        // 初始更新
        setTimeout(updateChartPath, 500);
    }
}

// 創建數據流動畫
function createDataFlowAnimation() {
    const dataFlowContainer = document.createElement('div');
    dataFlowContainer.className = 'data-flow-container';
    
    // 添加到頁面
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.appendChild(dataFlowContainer);
        
        // 創建數據流
        for (let i = 0; i < 5; i++) {
            const dataStream = document.createElement('div');
            dataStream.className = 'data-stream';
            dataStream.style.left = `${Math.random() * 100}%`;
            dataStream.style.animationDelay = `${Math.random() * 5}s`;
            dataStream.style.animationDuration = `${Math.random() * 5 + 10}s`;
            dataFlowContainer.appendChild(dataStream);
            
            // 添加數據點
            for (let j = 0; j < 10; j++) {
                const dataPoint = document.createElement('div');
                dataPoint.className = 'data-point';
                dataPoint.style.animationDelay = `${j * 0.2}s`;
                dataStream.appendChild(dataPoint);
            }
        }
    }
    
    // 添加CSS
    const style = document.createElement('style');
    style.textContent = `
        .data-flow-container {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            overflow: hidden;
            pointer-events: none;
            z-index: 1;
        }
        
        .data-stream {
            position: absolute;
            top: -100px;
            width: 2px;
            height: 100px;
            animation: dataStreamFlow linear infinite;
        }
        
        .data-point {
            position: absolute;
            width: 6px;
            height: 6px;
            border-radius: 50%;
            background-color: var(--primary-color);
            left: -2px;
            animation: dataPointPulse 2s infinite;
            box-shadow: 0 0 10px var(--primary-color);
        }
        
        .data-point:nth-child(1) { top: 0%; }
        .data-point:nth-child(2) { top: 10%; }
        .data-point:nth-child(3) { top: 20%; }
        .data-point:nth-child(4) { top: 30%; }
        .data-point:nth-child(5) { top: 40%; }
        .data-point:nth-child(6) { top: 50%; }
        .data-point:nth-child(7) { top: 60%; }
        .data-point:nth-child(8) { top: 70%; }
        .data-point:nth-child(9) { top: 80%; }
        .data-point:nth-child(10) { top: 90%; }
        
        @keyframes dataStreamFlow {
            0% {
                transform: translateY(-100%);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            100% {
                transform: translateY(100vh);
                opacity: 0;
            }
        }
        
        @keyframes dataPointPulse {
            0%, 100% {
                transform: scale(0.8);
                opacity: 0.5;
            }
            50% {
                transform: scale(1.2);
                opacity: 1;
            }
        }
    `;
    document.head.appendChild(style);
}

// 創建3D網格背景
function create3DGridBackground() {
    const gridContainer = document.createElement('div');
    gridContainer.className = 'grid-background';
    document.body.appendChild(gridContainer);
    
    // 創建水平線
    for (let i = 0; i < 10; i++) {
        const horizontalLine = document.createElement('div');
        horizontalLine.className = 'grid-line horizontal';
        horizontalLine.style.top = `${i * 10}%`;
        gridContainer.appendChild(horizontalLine);
    }
    
    // 創建垂直線
    for (let i = 0; i < 10; i++) {
        const verticalLine = document.createElement('div');
        verticalLine.className = 'grid-line vertical';
        verticalLine.style.left = `${i * 10}%`;
        gridContainer.appendChild(verticalLine);
    }
    
    // 添加CSS
    const style = document.createElement('style');
    style.textContent = `
        .grid-background {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: -3;
            perspective: 1000px;
            transform-style: preserve-3d;
            pointer-events: none;
        }
        
        .grid-line {
            position: absolute;
            background-color: rgba(0, 112, 243, 0.1);
            transform-style: preserve-3d;
        }
        
        .horizontal {
            width: 100%;
            height: 1px;
            transform: rotateX(60deg);
        }
        
        .vertical {
            width: 1px;
            height: 100%;
            transform: rotateY(60deg);
        }
    `;
    document.head.appendChild(style);
    
    // 添加滾動效果
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        gridContainer.style.transform = `translateZ(${-scrollY * 0.1}px)`;
    });
}

// 創建懸浮元素效果
function createFloatingElements() {
    // 選擇要添加懸浮效果的元素
    const elements = document.querySelectorAll('.feature-icon, .client-icon');
    
    elements.forEach(element => {
        element.classList.add('floating-element');
        
        // 添加懸浮光暈
        const glow = document.createElement('div');
        glow.className = 'element-glow';
        element.appendChild(glow);
    });
    
    // 添加CSS
    const style = document.createElement('style');
    style.textContent = `
        .floating-element {
            position: relative;
            animation: floatElement 4s ease-in-out infinite;
        }
        
        .element-glow {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 100%;
            height: 100%;
            border-radius: 50%;
            background: radial-gradient(circle at center, rgba(0, 112, 243, 0.3), transparent 70%);
            filter: blur(10px);
            animation: glowPulse 4s ease-in-out infinite;
            z-index: -1;
        }
        
        @keyframes floatElement {
            0%, 100% {
                transform: translateY(0);
            }
            50% {
                transform: translateY(-10px);
            }
        }
        
        @keyframes glowPulse {
            0%, 100% {
                opacity: 0.5;
                transform: translate(-50%, -50%) scale(1);
            }
            50% {
                opacity: 1;
                transform: translate(-50%, -50%) scale(1.2);
            }
        }
    `;
    document.head.appendChild(style);
}
