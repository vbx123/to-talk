// عناصر HTML
const translateBtn = document.getElementById('translate-btn');
const recordBtn = document.getElementById('record-btn');
const playCorrectBtn = document.getElementById('play-correct-btn');
const sentenceInput = document.getElementById('sentence-input');
const translatedSentenceBox = document.getElementById('translated-sentence');
const analysisResultBox = document.getElementById('analysis-result');
const recordStatus = document.getElementById('record-status');

// ترجمة الجملة باستخدام API
translateBtn.addEventListener('click', async () => {
    const text = sentenceInput.value.trim();
    if (!text) {
        alert("يرجى إدخال الجملة أولاً.");
        return;
    }

    try {
        const response = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=ar|en`);
        const data = await response.json();
        const translatedText = data.responseData.translatedText;
        translatedSentenceBox.textContent = `الجملة المترجمة: ${translatedText}`;
        translatedSentenceBox.style.display = "block";
    } catch (error) {
        alert("حدث خطأ أثناء الترجمة.");
    }
});

// التسجيل وتحليل النطق
let recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.lang = "en-US";

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
        <p>نسبة النطق الصحيح: ${accuracy}%</p>
        <p>الجملة التي نطقتها: ${userSpeech}</p>
    `;
    analysisResultBox.style.display = "block";
    recordStatus.textContent = "تم الانتهاء من التسجيل.";
    playCorrectBtn.style.display = "inline";
};

recognition.onerror = (event) => {
    recordStatus.textContent = `حدث خطأ أثناء التسجيل: ${event.error}`;
};

// النطق الصحيح للجملة
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
