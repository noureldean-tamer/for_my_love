const SECRET_CODE = "1732026"; 
let currentInput = "";

let bgMusic = new Audio('bg-music.mp3'); bgMusic.loop = true;
let finalVoice = new Audio('her-voice.mp3');

document.addEventListener("DOMContentLoaded", function() {
    new Typed('#terminal-text', {
        strings: [
            '`> Accessing secure memories...`^400\n`> Error: Authorization required.`^400\n`> Please enter the secret key to decrypt your birthday gift...`'
        ],
        typeSpeed: 30,
        showCursor: true,
        cursorChar: '_',
        onComplete: function() {
            document.getElementById('vault-input-area').classList.remove('hidden');
        }
    });
});

function pressKey(num) {
    if(currentInput.length < 7) {
        currentInput += num;
        document.getElementById('vault-code').value = "*".repeat(currentInput.length);
    }
}
function clearKey() { currentInput = ""; document.getElementById('vault-code').value = ""; }

function checkCode() {
    if(currentInput === SECRET_CODE) {
        document.getElementById('terminal-text').innerHTML += "\n`> Key Validated. Checking Biometrics...`";
        document.querySelector('.numpad').classList.add('hidden');
        document.getElementById('vault-code').classList.add('hidden');
        document.getElementById('biometric-area').classList.remove('hidden');
        initBiometricEvents();
    } else {
        alert("الكود غلط يا قمر! فكري في تاريخ مميز لينا في شهر 3 😉");
        clearKey();
    }
}

function initBiometricEvents() {
    const btn = document.getElementById('fingerprint-btn');
    let pressTimer;

    ['mousedown', 'touchstart'].forEach(evt => {
        btn.addEventListener(evt, (e) => {
            e.preventDefault();
            btn.classList.add('scanning');
            pressTimer = setTimeout(() => { triggerScreenShatter(); }, 2200);
        });
    });

    ['mouseup', 'mouseleave', 'touchend'].forEach(evt => {
        btn.addEventListener(evt, () => {
            clearTimeout(pressTimer);
            btn.classList.remove('scanning');
        });
    });
}

function triggerScreenShatter() {
    const overlay = document.getElementById('shatter-overlay');
    overlay.classList.remove('hidden');
    for(let i=0; i<20; i++) {
        const shard = document.createElement('div');
        shard.classList.add('glass-shard');
        overlay.appendChild(shard);
    }

    bgMusic.play().catch(e => console.log("Music blocked"));

    setTimeout(() => {
        const shards = document.querySelectorAll('.glass-shard');
        shards.forEach(shard => {
            const randomX = (Math.random() - 0.5) * 1200;
            const randomY = (Math.random() - 0.5) * 1200;
            const randomRot = Math.random() * 720;
            shard.style.transform = `translate(${randomX}px, ${randomY}px) rotate(${randomRot}deg) scale(0)`;
            shard.style.opacity = '0';
        });
        
        setTimeout(() => {
            overlay.classList.add('hidden');
            goToStage('stage-1', 'stage-2');
            initParticles();
            startChat();
        }, 800);
    }, 100);
}

function goToStage(currentId, nextId) {
    const current = document.getElementById(currentId);
    const next = document.getElementById(nextId);
    current.style.opacity = 0;
    setTimeout(() => {
        current.classList.add('hidden');
        next.classList.remove('hidden');
        next.style.opacity = 0;
        setTimeout(() => { next.style.opacity = 1; }, 50);
    }, 500);
}

function initParticles() {
    particlesJS("particles-js", {
        "particles": { "number": { "value": 25 }, "color": { "value": "#ff007f" }, "shape": { "type": "heart" }, "opacity": { "value": 0.4 }, "size": { "value": 6 } }
    });
}

// 💬 شات تفاعلي طويل ومبهر بالصور الحقيقية
const chatFlow = {
    start: {
        text: "أهلاً بيكي يا سندوستي في الشات بتاعنا🥰 جاهزة نلعب لعبة بسيطة؟",
        options: [
            { text: "جاهزة طبعاً 😍", next: "q1_yes", id: "btn-ready" },
            { text: "لا مش جاهزة 🙄", next: "q1_no", id: "btn-runaway" } // ضفنا ID هنا
        ]
    },
    q1_yes: {
        text: "انا عارف اني رخم بس مافيش اختيار تاني😂  طب  فاكرة أول صورة بعتهالي؟",
        options: [
            { text: "أكيد طبعاً فاكراها ❤️", next: "show_img1_romantic" },
            { text: "امم فكرني بيها كدا 😂", next: "show_img1_funny" }
        ]
    },
    show_img1_romantic: {
        text: "لو فاكراها بجد هتعرفي انها مش هي دي بس دي اول صوره تبعتيها في الشات 😑",
        image: "chat-img1.jpg", // حط صورتكم الأولى هنا في الفولدر بالاسم ده
        nextDelay: "q2"
    },
    show_img1_funny: {
        text: "أومال لو سألتك عن تاريخ بقا هتعملي اي 🤦‍♂️ علي العموم دي اول صوره مش فيو وانص ها 🙄",
        image: "chat-img1.jpg", // حط صورتكم الأولى هنا في الفولدر بالاسم ده
        nextDelay: "q2"
    },
    q2: {
        text: "طيب سؤال صعب شويه : عارفة اي اكتر كلمة بتقوليها وانا بلقطها منك بسرعه ؟😂",
        options: [
            { text: "مش عارفه😒", next: "q2_right" },
            { text: "بحبك وبس 🙈", next: "q2_sweet" }
        ]
    },
    q2_right: {
        text: "واللهي بتطلع منك زي السكر 👀 وانا واللهي بحبك 💗",
        options: [{ text: "افتحي الجواب بقا ✉️", next: "trigger_letter" }]
    },
    q2_sweet: {
        text: "مبهدلاني وبتثبتيني 😂 ، المهم انا بعشقك يا اجمل بنوته في الدنيا افتحي الجواب بقا كدا ",
        options: [{ text: "افتحي الجواب بقا ✉️", next: "trigger_letter" }]
    }
};

function startChat() {
    renderStep("start");
}

function renderStep(stepKey) {
    const step = chatFlow[stepKey];
    if (!step) return;

    // إرسال رسالة البوت النصية
    renderMessage(step.text, 'bot');

    // لو الخطوة فيها صورة، يتم إرسالها بعد ثانية
    if (step.image) {
        setTimeout(() => {
            renderImageMessage(step.image);
            // لو فيه نقلة تلقائية بعد الصورة
            if (step.nextDelay) {
                setTimeout(() => { renderStep(step.nextDelay); }, 1500);
            }
        }, 1000);
    }

    // عرض الاختيارات لو موجودة
    if (step.options) {
        setTimeout(() => { renderOptions(step.options); }, 1200);
    }
}

function renderMessage(text, sender) {
    const chatBox = document.getElementById('chat-box');
    const msgDiv = document.createElement('div');
    msgDiv.classList.add('message', sender === 'bot' ? 'bot-msg' : 'user-msg');
    msgDiv.innerText = text;
    chatBox.appendChild(msgDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function renderImageMessage(imgSrc) {
    const chatBox = document.getElementById('chat-box');
    const msgDiv = document.createElement('div');
    msgDiv.classList.add('message', 'bot-msg');
    
    const img = document.createElement('img');
    img.src = imgSrc;
    img.classList.add('chat-img');
    
    // شيلنا سطر الـ onerror العشوائي عشان ما يلخبطكش
    
    msgDiv.appendChild(img);
    chatBox.appendChild(msgDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
}
function renderOptions(options) {
    const optionsContainer = document.getElementById('chat-options');
    optionsContainer.innerHTML = '';
    
    options.forEach(opt => {
        const btn = document.createElement('button');
        btn.innerText = opt.text;
        
        if (opt.id === "btn-runaway") {
            btn.id = "btn-runaway";
            
            ['mouseenter', 'touchstart'].forEach(evt => {
                btn.addEventListener(evt, function(e) {
                    e.preventDefault();
                    
                    // التريكة السحرية: نقل الزرار بره الشات ليكون ابن مباشر للـ body
                    if (btn.parentElement !== document.body) {
                        document.body.appendChild(btn);
                    }
                    
                    // تحرير الزرار بالكامل فوق كل شيء
                    btn.style.position = 'fixed';
                    btn.style.zIndex = '999999';
                    
                    // حساب أبعاد الشاشة والزرار بدقة
                    const windowWidth = window.innerWidth;
                    const windowHeight = window.innerHeight;
                    const btnWidth = btn.offsetWidth || 130;
                    const btnHeight = btn.offsetHeight || 45;
                    
                    // حدود الأمان عشان ما يخرجش بره الحواف
                    const maxX = windowWidth - btnWidth - 50;
                    const maxY = windowHeight - btnHeight - 50;
                    
                    // توليد مكان عشوائي تماماً جوه الشاشة المرئية
                    const randomX = Math.floor(Math.random() * (maxX - 50) + 50);
                    const randomY = Math.floor(Math.random() * (maxY - 50) + 50);
                    
                    // نقل الزرار للمكان الجديد
                    btn.style.left = randomX + 'px';
                    btn.style.top = randomY + 'px';
                });
            });
        }

        btn.onclick = () => {
            renderMessage(opt.text, 'user');
            optionsContainer.innerHTML = '';
            
            // لو داس جاهزة والزرار التاني لسه بيتنطط في الشاشة، نمسحه فوراً عشان ما يفضلش واقف
            const runawayBtn = document.getElementById('btn-runaway');
            if (runawayBtn) runawayBtn.remove();
            
            setTimeout(() => {
                if (opt.next === "trigger_letter") {
                    goToStage('stage-2', 'stage-3');
                } else {
                    renderStep(opt.next);
                }
            }, 1000);
        };
        optionsContainer.appendChild(btn);
    });
}

// 3. الجواب والعداد ومطر القلوب
function openEnvelope() {
    const env = document.querySelector('.envelope');
    if(!env.classList.contains('open')) {
        env.classList.add('open');
        confetti({ particleCount: 100, spread: 60 });
        setTimeout(() => {
            document.getElementById('letter-scroll').classList.remove('hidden');
            startLiveTicker();     
            startContinuousRain(); 
            document.getElementById('letter-scroll').scrollIntoView({ behavior: 'smooth' });
        }, 600);
    }
}

function startContinuousRain() {
    const container = document.getElementById('floating-container');
    const elements = ['❤️', '🎈', '💖', '✨'];
    setInterval(() => {
        const el = document.createElement('div');
        el.classList.add('floating-element');
        el.innerText = elements[Math.floor(Math.random() * elements.length)];
        el.style.left = Math.random() * 100 + 'vw';
        el.style.fontSize = Math.random() * 20 + 20 + 'px';
        el.style.animationDuration = Math.random() * 3 + 4 + 's';
        container.appendChild(el);
        setTimeout(() => el.remove(), 7000);
    }, 300);
}

function startLiveTicker() {
    const START_DATE = new Date(2026, 2, 17, 4, 26, 0); // تاريخ البداية
    setInterval(() => {
        const now = new Date();
        const diff = now - START_DATE;
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        const ms = Math.floor((diff % 1000) / 10);
        document.getElementById('love-ticker').innerHTML = 
            `${days} يوم و ${hours} ساعة و ${minutes} دقيقة و ${seconds}.${ms < 10 ? '0'+ms : ms} ثانية`;
    }, 10);
}

// 4. الكشاف الفائق والمفاجأة الكبرى
function triggerSpotlightStage() {
    goToStage('stage-3', 'stage-4');
    document.body.classList.add('spotlight-active');
    bgMusic.volume = 0.05; // خفض الموسيقى الخلفية جداً
    finalVoice.play();    // تشغيل الـ Voice Note الخاص بك
    
    window.addEventListener('mousemove', updateSpotlight);
    window.addEventListener('touchmove', function(e) { updateSpotlight(e.touches[0]); });
}

function updateSpotlight(e) {
    const spotlight = document.getElementById('spotlight');
    spotlight.style.background = `radial-gradient(circle 140px at ${e.clientX}px ${e.clientY}px, transparent 100%, rgba(0,0,0,0.99) 100%)`;
}