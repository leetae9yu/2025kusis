document.addEventListener("DOMContentLoaded", function () {
    console.log("문제없음~");

    // 게임 시작 버튼
    const startButton = document.querySelector(".start-button");
    if (startButton) {
        startButton.addEventListener("click", startGame);
    }

    // 엔터키/닉네임
    const nicknameInput = document.getElementById('nickname');
    if (nicknameInput) {
        nicknameInput.addEventListener('keypress', function (event) {
            if (event.key === 'Enter') saveNickname();
        });
    }

    // 엔터키/퀴즈
    const quizInput = document.getElementById('quiz-answer');
    if (quizInput) {
        quizInput.addEventListener('keypress', function (event) {
            if (event.key === 'Enter') checkAnswer();
        });
    }

    // 엔터키/첫시작 -> 나중에 통합
    const rulesInput = document.getElementById('answer');
    if (rulesInput) {
        rulesInput.addEventListener('keypress', function (event) {
            if (event.key === 'Enter') checkRulesAnswer();
        });
    }

    // game_screen2에서 게임 시작 시간 저장
    if (window.location.pathname.includes("game_screen2.html")) {
        if (!localStorage.getItem("gameStartTime")) {
            const startTime = new Date().getTime();
            localStorage.setItem("gameStartTime", startTime);
            console.log(`게임 시작 시간 저장: ${startTime}`);
        } else {
            console.log(`기존 게임 시작 시간 유지: ${localStorage.getItem("gameStartTime")}`);
        }
    }

    // ending.html에서 총 플레이 시간 계산 및 표시
    if (window.location.pathname.includes("ending.html")) {
        displayCongratsMessage();
        displayGameTime();
    }
});

// index -> rules
function startGame() {
    window.location.href = 'rules.html';
}

// 닉네임 저장
function saveNickname() {
    const nickname = document.getElementById('nickname').value.trim();
    if (!nickname) {
        alert("사용하실 닉네임을 입력해주세요.");
        return;
    }
    localStorage.setItem("nickname", nickname);
    alert(`'${nickname}' 닉네임이 확인되었습니다.`);
    window.location.href = 'game_screen2.html';
}

// 규칙 화면에서 "자전" 입력 시 게임 시작
function checkRulesAnswer() {
    const answer = document.getElementById('answer').value.trim();
    if (answer === "자전") {
        alert("환영합니다.");
        window.location.href = 'game_screen1.html';
    } else {
        alert("정답이 아닙니다. 다시 시도해주세요.");
    }
}

// 정답 체크 + 총 플레이 시간 저장
function checkAnswer() {
    const answer = document.getElementById('quiz-answer').value.trim();
    
    // 퀴즈 정답 + 화면 전환
    const correctAnswers = {
        'game_screen2.html': "밥약",
        'game_screen3.html': "정경대후문",
        'game_screen4.html': "무르무르드구스토",
        'game_screen5.html': "w",
        'game_screen6.html': "love",
        'game_screen7.html': "25",
        'game_screen8.html': "케시케시"
    };
    const nextScreens = {
        'game_screen2.html': 'game_screen3.html',
        'game_screen3.html': 'game_screen4.html',
        'game_screen4.html': 'game_screen5.html',
        'game_screen5.html': 'game_screen6.html',
        'game_screen6.html': 'game_screen7.html',
        'game_screen7.html': 'game_screen8.html',
        'game_screen8.html': 'ending.html'
    };

    const currentPage = window.location.pathname.split("/").pop();
    if (answer.toLowerCase() === correctAnswers[currentPage].toLowerCase()) {
        alert("정답입니다!");

        sessionStorage.setItem(`token_${nextScreens[currentPage]}`, "authorized");

        // 마지막 스테이지에서 총 플레이 시간 저장
        if (currentPage === 'game_screen8.html') {
            saveTotalGameTime();
        }

        window.location.href = nextScreens[currentPage];
    } else {
        alert("오답입니다. 다시 시도하세요.");
    }
}

// 총 플레이 시간 저장
function saveTotalGameTime() {
    const startTime = localStorage.getItem("gameStartTime");
    if (startTime) {
        const endTime = new Date().getTime();
        const timeDiff = endTime - parseInt(startTime);
        const today = new Date().toLocaleDateString('ko-KR', { month: '2-digit', day: '2-digit' }).replace(/[^0-9]/g, '');

        const seconds = String(Math.floor(timeDiff / 1000) % 60).padStart(2, '0');
        const minutes = String(Math.floor(timeDiff / (1000 * 60)) % 60).padStart(2, '0');
        const hours = String(Math.floor(timeDiff / (1000 * 60 * 60))).padStart(2, '0');

        const formattedTime = `${today}${hours}${minutes}${seconds}`;x``

        console.log(`총 플레이 시간 저장: ${formattedTime}`);
        localStorage.setItem("formattedTime", formattedTime);
    }   
}

// 엔딩 메시지 표시
function displayCongratsMessage() {
    const nickname = localStorage.getItem("nickname") || "플레이어";
    document.getElementById("congrats-message").textContent = `${nickname}님 축하합니다!`;
}

// 엔딩 페이지에서 총 플레이 시간 출력
function displayGameTime() {
    const formattedTime = localStorage.getItem("formattedTime");

    if (!formattedTime) {
        console.log("총 플레이 시간 기록 없음");
        document.getElementById("clear-time").textContent = "플레이 시간 기록 없음";
        return;
    }

    console.log(`총 플레이 시간 불러오기: ${formattedTime}`);
    document.getElementById("clear-time").textContent = `총 플레이 시간: ${formattedTime}`;
}