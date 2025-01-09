
// صفحة التسجيل والترحيب
let submitNameBtn = document.getElementById('submit-name-btn');
let usernameInput = document.getElementById('username');
let welcomeScreen = document.getElementById('welcome-screen');
let mainScreen = document.getElementById('main-screen');
let greeting = document.getElementById('greeting');

// التفاعل مع المستخدم
submitNameBtn.addEventListener('click', function() {
    let username = usernameInput.value.trim();
    if (username) {
        // حفظ الاسم في LocalStorage
        localStorage.setItem('username', username);
        // عرض رسالة الترحيب
        greeting.textContent = `مرحباً، ${username}!`;
        // إخفاء شاشة التسجيل وعرض الشاشة الرئيسية
        welcomeScreen.style.display = 'none';
        mainScreen.style.display = 'block';
    } else {
        alert('من فضلك أدخل اسمك');
    }
});

// التحقق إذا كان هناك اسم محفوظ
window.onload = function() {
    let savedUsername = localStorage.getItem('username');
    if (savedUsername) {
        greeting.textContent = `مرحباً، ${savedUsername}!`;
        welcomeScreen.style.display = 'none';
        mainScreen.style.display = 'block';
    }
};

// إعداد التسجيل الصوتي
let startBtn = document.getElementById('start-btn');
let playBtn = document.getElementById('play-btn');
let output = document.getElementById('output');
let instructions = document.getElementById('instructions');

let recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.lang = "en-US";
recognition.continuous = false;

startBtn.addEventListener('click', function() {
    recognition.start();
    output.textContent = "جاري التسجيل...";
});

recognition.onresult = function(event) {
    let userSpeech = event.results[0][0].transcript;
    output.textContent = "الجملة التي قلتها: " + userSpeech;
    evaluateSpeech(userSpeech);
};

recognition.onerror = function(event) {
    output.textContent = "حدث خطأ أثناء التسجيل: " + event.error;
};

function evaluateSpeech(userSpeech) {
    const correctSentence = "Hello, how are you?";

    if (userSpeech.toLowerCase() === correctSentence.toLowerCase()) {
        instructions.textContent = "نطقك صحيح تمامًا!";
    } else {
        instructions.textContent = "فيه أخطاء في النطق. حاول تقول الجملة بوضوح أكثر.";
    }

    playBtn.style.display = "inline";
}

playBtn.addEventListener('click', function() {
    let speech = new SpeechSynthesisUtterance("Hello, how are you?");
    speech.lang = "en-US";
    window.speechSynthesis.speak(speech);
});


