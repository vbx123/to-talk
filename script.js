const translateBtn = document.getElementById('translate-btn');
const recordBtn = document.getElementById('record-btn');
const playCorrectBtn = document.getElementById('play-correct-btn');

const sentenceInput = document.getElementById('sentence-input');
const translatedSentenceBox = document.getElementById('translated-sentence');
const analysisResultBox = document.getElementById('analysis-result');
const recordStatus = document.getElementById('record-status');

let recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.lang = "en-US";
recognition.continuous = false;

// **الترجمة**
translateBtn.addEventListener('click', () => {
    const text = sentenceInput.value.trim();
    if (!text) {
        alert("من فضلك اكتب جملة.");
        return;
    }

    // استخدام API للترجمة (محاكاة الترجمة هنا)
    const translatedText = text === "أنا محمد من مصر" ? "I am Muhammad from Egypt" : "Translation feature coming soon!";
    translatedSentenceBox.textContent = `الجملة المترجمة: ${translatedText}`;
    translatedSentenceBox.style.display = "block";
});

// **التسجيل الصوتي**
recordBtn.addEventListener('click', () => {
    recordStatus.textContent = "جاري التسجيل...";
    recognition.start();
});

recognition.onresult = (event) => {
    const userSpeech = event.results[0][0].transcript.toLowerCase();
    const correctSentence = translatedSentenceBox.textContent.split(":")[1]?.trim().toLowerCase();

    if (!correctSentence) {
        alert("يرجى ترجمة الجملة أولاً.");
        return;
    }

    let correctWordCount = 0;
    const userWords = userSpeech.split(" ");
    const correctWords = correctSentence.split(" ");

    userWords.forEach((word, index) => {
        if (word === correctWords[index]) {
            correctWordCount++;
        }
    });

    const accuracy = Math.round((correctWordCount / correctWords.length) * 100);

    analysisResultBox.innerHTML = `
        <p>النطق: ${accuracy}% صحيح.</p>
        <p>الجملة التي نطقتها: ${userSpeech}</p>
    `;
    analysisResultBox.style.display = "block";

    recordStatus.textContent = "تم الانتهاء من التسجيل.";
    playCorrectBtn.style.display = "inline";
};

recognition.onerror = (event) => {
    recordStatus.textContent = `حدث خطأ أثناء التسجيل: ${event.error}`;
};

// **النطق الصحيح**
playCorrectBtn.addEventListener('click', () => {
    const correctSentence = translatedSentenceBox.textContent.split(":")[1]?.trim();
    if (!correctSentence) {
        alert("يرجى ترجمة الجملة أولاً.");
        return;
    }

    const speech = new SpeechSynthesisUtterance(correctSentence);
    speech.lang = "en-US";
    window.speechSynthesis.speak(speech);
});
