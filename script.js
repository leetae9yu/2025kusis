document.addEventListener("DOMContentLoaded", function () {
    console.log("드디어!!!!!!");

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

    // 게임 시작 시간
    if (window.location.pathname.includes("5U4KlzAuEa.html")) {
        if (!sessionStorage.getItem("gameStartTime")) {
            const startTime = new Date().getTime();
            sessionStorage.setItem("gameStartTime", startTime);
            console.log(`게임 시작 시간 저장: ${startTime}`);
        } else {
            console.log(`기존 게임 시작 시간 유지: ${sessionStorage.getItem("gameStartTime")}`);
        }
    }

    // 총 플레이 시간 표시
    if (window.location.pathname.includes("ntEgt7T4le.html")) {
        displayCongratsMessage();
        displayGameTime();
    }
});

// index -> rules
function startGame() {
    window.location.href = '78HFUk3iVa.html';
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
    window.location.href = '5U4KlzAuEa.html';
}

// rules -> game_screen1
function checkRulesAnswer() {
    const answer = document.getElementById('answer').value.trim();
    if (answer === "자전") {
        alert("환영합니다.");
        window.location.href = '7zIX7NaCpO.html';
    } else {
        alert("정답이 아닙니다. 다시 시도해주세요.");
    }
}

// 정답 체크 + 총 플레이 시간 저장
function checkAnswer() {
    const answer = document.getElementById('quiz-answer').value.trim();
    
    // 퀴즈 정답 + 화면 전환
    const correctAnswers = {
        '5U4KlzAuEa.html': "밥약",
        'L6oANupv9Q.html': "정경대후문",
        'RvKP7gOqyj.html': "무르무르드구스토",
        'Lgshoh7O5w.html': "w",
        'UIqYGE6kx7.html': "love",
        'M0Gnx4LDty.html': "25",
        '9LsC4CP3wN.html': "케시케시",
        'M3cXoHbBqQ.html': "siso",
        'GxwngdwkgC.html': "고대자전학회환영해",
        'exOYXAyO2D.html': "2223",
        'OJ3muElxrE.html': "안암역이번출구"
    };
    const nextScreens = {
        '5U4KlzAuEa.html': 'L6oANupv9Q.html',
        'L6oANupv9Q.html': 'RvKP7gOqyj.html',
        'RvKP7gOqyj.html': 'Lgshoh7O5w.html',
        'Lgshoh7O5w.html': 'UIqYGE6kx7.html',
        'UIqYGE6kx7.html': 'M0Gnx4LDty.html',
        'M0Gnx4LDty.html': '9LsC4CP3wN.html',
        '9LsC4CP3wN.html': 'M3cXoHbBqQ.html',
        'M3cXoHbBqQ.html': 'GxwngdwkgC.html',
        'GxwngdwkgC.html': 'exOYXAyO2D.html',
        'exOYXAyO2D.html': 'cOG8YNdene.html',
        'OJ3muElxrE.html': 'ntEgt7T4le.html' 
    };

    const currentPage = window.location.pathname.split("/").pop();

    if (answer.toLowerCase() === correctAnswers[currentPage].toLowerCase()) {
        alert("정답입니다!");

        // 총 플레이 시간 저장
        if (currentPage === 'OJ3muElxrE.html') {
            saveTotalGameTime();
        }

        window.location.href = nextScreens[currentPage];
    } else {
        alert("오답입니다. 다시 시도하세요.");
    }
}

// 총 플레이 시간 저장
function saveTotalGameTime() {
    const startTime = sessionStorage.getItem("gameStartTime");
    if (startTime) {
        const endTime = new Date().getTime();
        const timeDiff = endTime - parseInt(startTime);
        const today = new Date().toLocaleDateString('ko-KR', { month: '2-digit', day: '2-digit' }).replace(/[^0-9]/g, '');

        const seconds = String(Math.floor(timeDiff / 1000) % 60).padStart(2, '0');
        const minutes = String(Math.floor(timeDiff / (1000 * 60)) % 60).padStart(2, '0');
        const hours = String(Math.floor(timeDiff / (1000 * 60 * 60))).padStart(2, '0');

        const formattedTime = `${today}${hours}${minutes}${seconds}`;

        console.log(`총 플레이 시간 저장: ${formattedTime}`);
        sessionStorage.setItem("formattedTime", formattedTime);
    }   
}

// 엔딩 메시지 표시
function displayCongratsMessage() {
    const nickname = localStorage.getItem("nickname") || "플레이어";
    document.getElementById("congrats-message").textContent = `${nickname}님 축하합니다!`;
}

// 엔딩 페이지에서 총 플레이 시간 출력
function displayGameTime() {
    const formattedTime = sessionStorage.getItem("formattedTime");

    if (!formattedTime) {
        console.log("총 플레이 시간 기록 없음");
        document.getElementById("clear-time").textContent = "플레이 시간 기록 없음";
        return;
    }

    console.log(`총 플레이 시간 불러오기: ${formattedTime}`);
    document.getElementById("clear-time").textContent = `총 플레이 시간: ${formattedTime}`;
}