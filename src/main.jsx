// ============================================
// main.jsx : 리액트 앱이 "시작"되는 파일 (진입점)
// index.html -> main.jsx -> App.jsx 순서로 연결된다
// ============================================

// 1) 필요한 도구/파일 가져오기(import)

// createRoot : 리액트가 화면을 그릴 "뿌리"를 만들어주는 함수
import { createRoot } from "react-dom/client";

// 앱 전체에 적용할 CSS 파일 (변수에 담지 않고 불러오기만 하면 적용됨)
import "./index.css";

// 우리가 직접 만든 컴포넌트(App.jsx 파일의 App 함수)
import App from "./App.jsx";

// 2) index.html 안에 있는 <div id="root"></div> 를 찾는다
//    리액트가 그림을 그릴 "도화지"라고 생각하면 된다
const rootElement = document.getElementById("root");

// 3) 그 도화지를 리액트가 관리하도록 "뿌리(root)"로 만든다
const root = createRoot(rootElement);

// 4) 뿌리 안에 App 컴포넌트를 그린다(렌더링)
//    <App /> 는 "App.jsx 의 App 컴포넌트를 여기에 그려라" 라는 뜻
root.render(<App />);
