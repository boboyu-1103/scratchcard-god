// 當文檔加載完成時執行
document.addEventListener('DOMContentLoaded', function() {
    console.log('Web App 已啟動');
    
    // 初始化 PWA
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', function() {
            navigator.serviceWorker.register('/service-worker.js')
                .then(function(registration) {
                    console.log('ServiceWorker 註冊成功');
                })
                .catch(function(err) {
                    console.log('ServiceWorker 註冊失敗: ', err);
                });
        });
    }

    // 獲取元素引用
    const startGameButton = document.getElementById('start-game');
    const randomPickButton = document.getElementById('random-pick');
    const gridContainer = document.getElementById('grid');
    const holesInput = document.getElementById('holes');
    const rowsInput = document.getElementById('rows');
    const selectedCountSpan = document.getElementById('selected-count');
    const totalHolesSpan = document.getElementById('total-holes');
    const suggestedHoleSpan = document.getElementById('suggested-hole');
    
    // 初始化選中的洞的集合
    const selectedHoles = new Set();

    // 開始新局
    function startNewGame() {
        const holes = parseInt(holesInput.value);
        const rows = parseInt(rowsInput.value);
        
        // 始終顯示確認提示
        if (!confirm('確定要開始新的一局嗎？\n' + 
                    '這將會：\n' +
                    '1. 清除所有已選擇的洞\n' +
                    '2. 產生新的洞洞樂遊戲')) {
            return;
        }

        // 驗證輸入
        if (isNaN(holes) || isNaN(rows) || holes < 1 || rows < 1) {
            alert('請輸入有效的數字');
            return;
        }

        if (rows > holes) {
            alert('每行洞數不能大於總洞數');
            return;
        }

        // 重置選擇狀態
        selectedHoles.clear();
        selectedCountSpan.textContent = '0';
        totalHolesSpan.textContent = holes.toString();
        suggestedHoleSpan.textContent = '-';

        // 生成網格
        gridContainer.innerHTML = '';
        gridContainer.style.gridTemplateColumns = `repeat(${rows}, 1fr)`;

        for (let i = 1; i <= holes; i++) {
            const hole = document.createElement('div');
            hole.className = 'hole';
            hole.textContent = i;
            hole.setAttribute('role', 'button');
            hole.setAttribute('aria-label', `洞 ${i}`);
            hole.addEventListener('click', () => toggleHole(i));
            gridContainer.appendChild(hole);
        }
    }

    // 切換洞的選中狀態
    function toggleHole(number) {
        const holes = document.querySelectorAll('.hole');
        holes.forEach(hole => {
            if (parseInt(hole.textContent) === number) {
                if (selectedHoles.has(number)) {
                    selectedHoles.delete(number);
                    hole.classList.remove('selected');
                } else {
                    selectedHoles.add(number);
                    hole.classList.add('selected');
                }
                selectedCountSpan.textContent = selectedHoles.size;
            }
        });
    }

    // 隨機選擇一個洞
    function suggestHole() {
        const totalHoles = parseInt(totalHolesSpan.textContent);
        const availableHoles = new Set();
        
        // 找出所有未被選中的洞
        for (let i = 1; i <= totalHoles; i++) {
            if (!selectedHoles.has(i)) {
                availableHoles.add(i);
            }
        }

        // 移除所有洞的建議狀態
        document.querySelectorAll('.hole').forEach(hole => {
            hole.classList.remove('suggested');
        });

        if (availableHoles.size === 0) {
            suggestedHoleSpan.textContent = '-';
            alert('已經沒有可選擇的洞了！');
            return;
        }

        // 隨機選擇一個未被選中的洞
        const availableArray = Array.from(availableHoles);
        const randomIndex = Math.floor(Math.random() * availableArray.length);
        const suggestedNumber = availableArray[randomIndex];

        // 更新建議選擇的顯示
        suggestedHoleSpan.textContent = suggestedNumber;

        // 在網格中標記建議的洞並自動選中
        const holes = document.querySelectorAll('.hole');
        holes.forEach(hole => {
            if (parseInt(hole.textContent) === suggestedNumber) {
                hole.classList.add('suggested');
                // 自動選中建議的洞
                toggleHole(suggestedNumber);
            }
        });
    }

    // 初始化生成網格（首次加載時不需要確認）
    function initializeGrid() {
        const holes = parseInt(holesInput.value);
        const rows = parseInt(rowsInput.value);

        // 驗證輸入
        if (isNaN(holes) || isNaN(rows) || holes < 1 || rows < 1) {
            alert('請輸入有效的數字');
            return;
        }

        if (rows > holes) {
            alert('每行洞數不能大於總洞數');
            return;
        }

        // 重置選擇狀態
        selectedHoles.clear();
        selectedCountSpan.textContent = '0';
        totalHolesSpan.textContent = holes.toString();
        suggestedHoleSpan.textContent = '-';

        // 生成網格
        gridContainer.innerHTML = '';
        gridContainer.style.gridTemplateColumns = `repeat(${rows}, 1fr)`;

        for (let i = 1; i <= holes; i++) {
            const hole = document.createElement('div');
            hole.className = 'hole';
            hole.textContent = i;
            hole.setAttribute('role', 'button');
            hole.setAttribute('aria-label', `洞 ${i}`);
            hole.addEventListener('click', () => toggleHole(i));
            gridContainer.appendChild(hole);
        }
    }

    // 添加事件監聽器
    startGameButton.addEventListener('click', startNewGame);
    randomPickButton.addEventListener('click', suggestHole);

    // 初始化
    initializeGrid();
});
