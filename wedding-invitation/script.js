document.addEventListener("DOMContentLoaded", () => {
    
    // 1. شاشة الترحيب وزر OPEN
    const openBtn = document.getElementById("open-btn");
    const welcomeScreen = document.getElementById("welcome-screen");
    const mainInvitation = document.getElementById("main-invitation");
    const weddingMusic = document.getElementById("wedding-music");

    if (openBtn && welcomeScreen && mainInvitation) {
        openBtn.addEventListener("click", () => {
            if (weddingMusic) {
                weddingMusic.play().catch(error => {
                    console.log("تأخر تشغيل الصوت لحين تفاعل المتصفح المباشر:", error);
                });
            }

            welcomeScreen.classList.add("slide-up");
            mainInvitation.classList.remove("hidden");
            
            setTimeout(() => {
                welcomeScreen.style.display = "none";
            }, 1100);
        });
    }

    // 2. العداد التنازلي (7 أغسطس 2026)
    const countdownTimer = document.getElementById("countdown-timer");
    if (countdownTimer) {
        const weddingDate = new Date("August 7, 2026 16:00:00").getTime();

        const updateCountdown = () => {
            const now = new Date().getTime();
            const timeLeft = weddingDate - now;

            if (timeLeft < 0) {
                countdownTimer.innerHTML = "The Wedding Day Has Arrived! ✨";
                return;
            }

            const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

            countdownTimer.innerHTML = `${days} days ${hours} hours ${minutes} min ${seconds} sec`;
        };

        updateCountdown();
        setInterval(updateCountdown, 1000);
    }

    // 3. كتاب الزوار والأمان
    const escapeHTML = (str) => {
        return str.replace(/[&<>'"]/g, tag => {
            const chars = { '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' };
            return chars[tag] || tag;
        });
    };

    const wishesForm = document.getElementById("wishes-form");
    const wishesDisplayArea = document.getElementById("wishes-display-area");

    const renderWish = (name, text, time) => {
        if (!wishesDisplayArea) return;
        const wishCard = document.createElement("div");
        wishCard.className = "single-wish-card";
        wishCard.innerHTML = `
            <div class="wish-header">
                <span class="wish-author">${escapeHTML(name)}</span>
                <span class="wish-time">${time}</span>
            </div>
            <p class="wish-body-text">${escapeHTML(text)}</p>
        `;
        wishesDisplayArea.insertBefore(wishCard, wishesDisplayArea.firstChild);
    };
    // تشغيل وظيفة فحص العداد وتحديثه بمجرد تحميل الصفحة
document.addEventListener("DOMContentLoaded", function() {
    // التحقق من وجود قيمة سابقة في الـ LocalStorage، وإذا لم توجد نبدأ من رقم عشوائي كقيمة افتراضية (مثلاً 42) لإعطاء فخامة للدعوة
    if (!localStorage.getItem("weddingAttendanceCount")) {
        localStorage.setItem("weddingAttendanceCount", 42); 
    }
    
    // عرض العدد الحالي في العداد أسفل الصفحة
    document.getElementById("globalAttendanceCounter").innerText = localStorage.getItem("weddingAttendanceCount");
});

function confirmAttendance() {
    // التحقق مما إذا كان المستخدم قد ضغط على الزر من قبل في هذه الجلسة لمنع التكرار اللانهائي
    if (sessionStorage.getItem("hasConfirmed") === "true") {
        alert("You have already confirmed your attendance! Thank you. ✨");
        return;
    }

    // جلب العدد الحالي وزيادته بمقدار 1
    let currentCount = parseInt(localStorage.getItem("weddingAttendanceCount")) || 0;
    currentCount += 1;

    // حفظ العدد الجديد في الـ LocalStorage وتحديث الشاشة فوراً
    localStorage.setItem("weddingAttendanceCount", currentCount);
    document.getElementById("globalAttendanceCounter").innerText = currentCount;

    // تعليم الجلسة الحالية بأن المستخدم أكد الحضور بنجاح
    sessionStorage.setItem("hasConfirmed", "true");

    // رسالة تأكيد مبهجة للمستخدم
    alert("Thank you! Your attendance has been successfully confirmed. 🥂✨");
}

    const loadWishes = () => {
        const savedWishes = localStorage.getItem("wedding_wishes");
        if (savedWishes && wishesDisplayArea) {
            const wishesArray = JSON.parse(savedWishes);
            if (wishesArray.length > 0) wishesDisplayArea.innerHTML = "";
            wishesArray.forEach(wish => renderWish(wish.name, wish.text, wish.time));
        }
    };

    loadWishes();

    if (wishesForm) {
        wishesForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const guestName = document.getElementById("guest-name").value.trim();
            const guestWish = document.getElementById("guest-wish").value.trim();
            
            if (!guestName || !guestWish) return;

            const currentTime = new Date().toLocaleString('en-US', { 
                hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true,
                month: 'numeric', day: 'numeric', year: 'numeric'
            });

            renderWish(guestName, guestWish, currentTime);

            const savedWishes = localStorage.getItem("wedding_wishes");
            const wishesArray = savedWishes ? JSON.parse(savedWishes) : [];
            wishesArray.push({ name: guestName, text: guestWish, time: currentTime });
            localStorage.setItem("wedding_wishes", JSON.stringify(wishesArray));
            
            wishesForm.reset();
        });
    }
});