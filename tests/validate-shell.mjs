import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const index = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const app = fs.readFileSync(path.join(root, 'js/app.js'), 'utf8');
const css = fs.readFileSync(path.join(root, 'css/redesign.css'), 'utf8');
const manifest = JSON.parse(fs.readFileSync(path.join(root, 'manifest.webmanifest'), 'utf8'));
const worker = fs.readFileSync(path.join(root, 'sw.js'), 'utf8');
const errors = [];

function assert(condition, message) {
  if (!condition) errors.push(message);
}

[
  'css/styles.css', 'css/redesign.css', 'js/data.js', 'js/lessons-advanced.js',
  'js/app.js', 'manifest.webmanifest', 'assets/app-icon.svg', 'sw.js'
].forEach((relativePath) => assert(fs.existsSync(path.join(root, relativePath)), `필수 파일 없음: ${relativePath}`));

['home', 'study', 'card', 'quiz', 'list'].forEach((mode) => {
  assert(index.includes(`data-mode="${mode}"`), `주요 메뉴 누락: ${mode}`);
});

assert(index.includes('id="global-search-btn"'), '통합 검색 진입점이 없습니다.');
assert(index.includes('id="header-progress"'), '헤더 진도 표시가 없습니다.');
assert(app.includes('function renderHomeMode()'), '학습 대시보드 렌더러가 없습니다.');
assert(app.includes('function startQuizSession('), '집중 퀴즈 세션이 없습니다.');
assert(app.includes('function renderGlobalSearch()'), '통합 검색 렌더러가 없습니다.');
assert(app.includes("store.set('mastery'"), '카드별 숙련도 저장이 없습니다.');
assert(app.includes("store.set('bookmarks'"), '카드 저장 기능이 없습니다.');
assert(css.includes('@media (max-width: 820px)'), '모바일 레이아웃 규칙이 없습니다.');
assert(css.includes('prefers-reduced-motion'), '동작 줄이기 접근성 규칙이 없습니다.');
assert(manifest.display === 'standalone', 'PWA standalone 설정이 없습니다.');
assert(worker.includes("const CACHE = 'nasdaq101-v3'"), '서비스워커 캐시 버전이 예상과 다릅니다.');

if (errors.length) {
  console.error(`Nasdaq 101 셸 검증 실패 (${errors.length})`);
  errors.forEach((error) => console.error(`- ${error}`));
  process.exitCode = 1;
} else {
  console.log('셸 검증 통과: 홈·통합검색·숙련도·자료실·PWA·모바일 규칙');
}
