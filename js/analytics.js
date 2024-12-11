// Google Analytics
window.dataLayer = window.dataLayer || [];
function gtag() { dataLayer.push(arguments); }

// 初始化 Google Analytics
(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtag/js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','G-V69YEQ8EHQ');

gtag('js', new Date());
gtag('config', 'G-V69YEQ8EHQ');

// 追蹤特定事件
function trackEvent(action, category, label) {
    gtag('event', action, {
        'event_category': category,
        'event_label': label
    });
}

// 追蹤按鈕點擊
document.addEventListener('DOMContentLoaded', function() {
    // 追蹤開始新局
    const startGameBtn = document.getElementById('start-game');
    if (startGameBtn) {
        startGameBtn.addEventListener('click', function() {
            trackEvent('click', 'game', 'start_new_game');
        });
    }

    // 追蹤幫我選號
    const randomPickBtn = document.getElementById('random-pick');
    if (randomPickBtn) {
        randomPickBtn.addEventListener('click', function() {
            trackEvent('click', 'game', 'random_pick');
        });
    }
});
