// Google Analytics
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
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
    document.getElementById('start-game').addEventListener('click', function() {
        trackEvent('click', 'game', 'start_new_game');
    });

    // 追蹤幫我選號
    document.getElementById('random-pick').addEventListener('click', function() {
        trackEvent('click', 'game', 'random_pick');
    });
});
