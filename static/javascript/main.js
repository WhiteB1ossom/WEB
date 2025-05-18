document.addEventListener("DOMContentLoaded", () => {
    const navItems = document.querySelectorAll(".nav-item");
    const contentArea = document.getElementById("content-area");
    const highlightBar = document.getElementById("highlightBar");
    const navLinks = document.getElementById("navLinks");

    function moveHighlight(target) {
        const navRect = navLinks.getBoundingClientRect();
        const itemRect = target.getBoundingClientRect();
        highlightBar.style.width = `${itemRect.width}px`;
        highlightBar.style.left = `${itemRect.left - navRect.left}px`;
    }

    // ⭐ JS 파일 동적 로드 함수
    function loadScript(src) {
        const script = document.createElement('script');
        script.src = src;
        script.type = 'text/javascript';
        script.defer = true;
        document.body.appendChild(script);
    }


    function loadPage(page) {
        fetch(`/${page}/`)
            .then(res => res.text())
            .then(html => {
                contentArea.innerHTML = html;

                if (page === "food") {
                    loadScript("/static/javascript/roulette.js");
                }
            })
            .catch(err => {
                contentArea.innerHTML = "<p>페이지를 불러올 수 없습니다.</p>";
                console.error(err);
            });
    }

    // URL에서 탭 이름 추출
    const urlParams = new URLSearchParams(window.location.search);
    const tabName = urlParams.get("tab");

    let initialTab = null;

    if (tabName) {
        initialTab = Array.from(navItems).find(
            item => item.dataset.page === tabName
        );
    }

    if (!initialTab) {
        // URL 파라미터 없거나 일치하는 탭이 없으면 첫 번째 탭 선택
        initialTab = navItems[0];
    }

    // 초기 활성화 및 콘텐츠 로드
    navItems.forEach(i => i.classList.remove("active"));
    if (initialTab) {
        initialTab.classList.add("active");
        moveHighlight(initialTab);
        loadPage(initialTab.dataset.page);
    }

    // 탭 클릭 이벤트
    navItems.forEach(item => {
        item.addEventListener("click", e => {
            e.preventDefault();
            navItems.forEach(i => i.classList.remove("active"));
            item.classList.add("active");
            moveHighlight(item);
            loadPage(item.dataset.page);
        });
    });

    // 창 크기 변경 시 위치 재계산
    window.addEventListener("resize", () => {
        const active = document.querySelector(".nav-item.active");
        if (active) moveHighlight(active);
    });
});
