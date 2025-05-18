// PDF.js worker 설정
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.9.179/pdf.worker.min.js';

// PDF 파일 경로 설정
const url = "/static/pdf/meal.pdf" + "?t=" + new Date().getTime();  // 캐시 방지 타임스탬프 추가

// 전역 변수 선언
let pdfDoc = null,
    pageNum = 1,
    scale = 0.8,
    canvas = document.getElementById('pdf-render');

// 이미 ctx가 선언되었는지 확인하고, 선언이 안 되어 있을 경우만 새로 선언
if (!canvas.getContext) {
    console.error("Canvas 지원되지 않음");
} else {
    let ctx = canvas.getContext('2d'); // 여기에서 ctx만 한번 선언

    // PDF 파일 로드
    pdfjsLib.getDocument(url).promise.then(pdfDoc_ => {
      pdfDoc = pdfDoc_;
      console.log("PDF 로드 완료");
      renderPage(pageNum);  // 첫 번째 페이지 렌더링
    }).catch(err => {
      console.error('PDF 로드 에러:', err);
      canvas.style.display = 'none';  // 에러가 날 경우 캔버스를 숨김
      alert('PDF를 불러오는 중 오류가 발생했습니다.');
    });

    // 페이지 렌더링 함수
    function renderPage(num) {
      pdfDoc.getPage(num).then(page => {
        const viewport = page.getViewport({ scale: scale });
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        const renderContext = {
          canvasContext: ctx,
          viewport: viewport
        };

        page.render(renderContext);  // 페이지를 canvas에 렌더링
      });
    }
}
