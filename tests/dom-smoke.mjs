import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { Window } from 'happy-dom';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const index = fs.readFileSync(path.join(root, 'index.html'), 'utf8')
  .replace(/<script[\s\S]*?<\/script>/gi, '')
  .replace(/<link[^>]+(?:stylesheet|manifest)[^>]*>/gi, '');
const source = [
  fs.readFileSync(path.join(root, 'js/data.js'), 'utf8'),
  fs.readFileSync(path.join(root, 'js/lessons-advanced.js'), 'utf8'),
  fs.readFileSync(path.join(root, 'js/app.js'), 'utf8')
].join('\n');

const window = new Window({ url: 'http://localhost/#home' });
window.scrollTo = () => {};
window.document.write(index);
window.eval(source);

const { document, Event } = window;

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

assert(document.querySelector('.home-dashboard'), '홈 대시보드가 렌더링되지 않았습니다.');
assert(document.querySelectorAll('.home-stat').length === 4, '홈 학습 지표 4개가 렌더링되지 않았습니다.');
assert(document.querySelectorAll('.track-row').length === 4, '학습 트랙 지도가 렌더링되지 않았습니다.');

document.getElementById('home-daily').click();
assert(document.querySelector('.quiz-session-banner'), '오늘의 퀴즈 세션이 시작되지 않았습니다.');
assert(document.querySelectorAll('.quiz-opt').length === 2, '퀴즈 선택지가 올바르게 렌더링되지 않았습니다.');
document.querySelector('.quiz-opt').click();
assert(document.querySelector('.quiz-result'), '퀴즈 결과가 렌더링되지 않았습니다.');

document.querySelector('[data-mode="study"]').click();
assert(document.querySelectorAll('.lesson-card').length === 14, '14개 챕터가 학습 화면에 렌더링되지 않았습니다.');
document.querySelector('.lesson-card').click();
assert(document.querySelector('.lesson-detail-wrap'), '챕터 상세로 이동하지 못했습니다.');
assert(document.querySelectorAll('.lesson-section').length >= 5, '챕터 섹션이 충분히 렌더링되지 않았습니다.');

document.querySelector('[data-mode="list"]').click();
assert(document.querySelector('.library-shell'), '통합 자료실이 렌더링되지 않았습니다.');
assert(document.querySelectorAll('.list-item').length === 206, '전체 카드 목록이 렌더링되지 않았습니다.');
document.querySelector('[data-save-card]').click();
assert(window.localStorage.getItem('nas101.bookmarks') === '[1]', '카드 저장이 로컬 저장소에 반영되지 않았습니다.');

document.getElementById('global-search-btn').click();
const searchInput = document.getElementById('global-search-input');
searchInput.value = '금리';
searchInput.dispatchEvent(new Event('input', { bubbles: true }));
assert(document.querySelectorAll('.search-result').length > 0, '통합 검색 결과가 없습니다.');
document.getElementById('search-close').click();
assert(!document.querySelector('.search-overlay'), '통합 검색이 닫히지 않았습니다.');

document.querySelector('[data-library-view="glossary"]').click();
assert(document.querySelectorAll('.gloss-item').length === 60, '용어사전 60개가 렌더링되지 않았습니다.');

console.log('DOM 스모크 통과: 홈 → 퀴즈 → 챕터 → 자료실 → 검색 → 용어사전');
window.close();
