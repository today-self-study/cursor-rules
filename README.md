# Cursor Rules Collection

이 저장소는 GitHub Pages를 통해 유용한 Cursor Rule들을 쉽게 찾아보고 복사할 수 있는 웹사이트를 제공합니다.

## 🚀 사용법

1.  이 저장소를 클론하거나 코드를 다운로드합니다.
2.  로컬에서 `index.html` 파일을 브라우저로 열어보거나, GitHub Pages에 배포하여 온라인으로 확인할 수 있습니다.
3.  웹사이트에서 원하는 Rule을 찾고 'Copy' 버튼을 눌러 내용을 복사한 뒤, `.cursor/rules` 폴더에 `.md` 파일로 저장하여 사용하세요.

## 📝 새로운 Rule 추가하기

1.  `rules/` 디렉토리에 새로운 `.md` 파일을 추가합니다.
2.  파일 상단에 다음과 같은 형식으로 Frontmatter를 작성하여 제목과 설명을 추가할 수 있습니다.
    ```markdown
    ---
    title: "새로운 Rule 제목"
    description: "이 Rule에 대한 간략한 설명입니다."
    ---
    - 여기에 Rule의 내용을 작성합니다.
    ```
3.  `js/script.js` 파일의 `ruleFiles` 배열에 새로 추가한 파일 경로(예: `'rules/your-new-rule.md'`)를 추가합니다.
4.  변경 사항을 커밋하고 푸시하면 웹사이트에 자동으로 반영됩니다.

## 📁 프로젝트 구조

-   `index.html`: 메인 페이지 HTML 파일
-   `css/style.css`: 페이지 스타일시트
-   `js/script.js`: 동적 기능 (Rule 로딩, 복사 등)을 위한 JavaScript 파일
-   `rules/`: Cursor Rule 마크다운 파일들을 저장하는 디렉토리

---