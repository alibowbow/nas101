import fs from 'node:fs';
import vm from 'node:vm';

const context = {};
vm.createContext(context);
const source = [
  fs.readFileSync(new URL('../js/data.js', import.meta.url), 'utf8'),
  fs.readFileSync(new URL('../js/lessons-advanced.js', import.meta.url), 'utf8'),
  ';globalThis.__NAS101__ = { CARDS, GLOSSARY, LESSONS, LEARNING_TRACKS };'
].join('\n');

vm.runInContext(source, context, { filename: 'nas101-data.bundle.js' });
const { CARDS, GLOSSARY, LESSONS, LEARNING_TRACKS } = context.__NAS101__;
const errors = [];
const knownViz = new Set([
  'flow', 'steps', 'cards', 'compare', 'matrix', 'table', 'bars',
  'timeline', 'cycle', 'spectrum', 'dotplot', 'checklist',
  'yieldcurve', 'quadrant', 'layers', 'formula', 'scenario'
]);

function assert(condition, message) {
  if (!condition) errors.push(message);
}

function unique(values, label) {
  const seen = new Set();
  values.forEach((value) => {
    if (seen.has(value)) errors.push(`${label} 중복: ${value}`);
    seen.add(value);
  });
}

assert(Array.isArray(CARDS) && CARDS.length >= 200, '카드는 200개 이상이어야 합니다.');
assert(Array.isArray(GLOSSARY) && GLOSSARY.length >= 60, '용어는 60개 이상이어야 합니다.');
assert(Array.isArray(LESSONS) && LESSONS.length >= 12, '레슨은 12개 이상이어야 합니다.');
assert(Array.isArray(LEARNING_TRACKS) && LEARNING_TRACKS.length >= 5, '학습 트랙 정의가 부족합니다.');

unique(CARDS.map((card) => card.id), '카드 ID');
unique(LESSONS.map((lesson) => lesson.key), '레슨 key');

const cardIds = new Set(CARDS.map((card) => card.id));
const trackKeys = new Set(LEARNING_TRACKS.map((track) => track.key));

LESSONS.forEach((lesson, lessonIndex) => {
  const prefix = `CH.${lessonIndex + 1} ${lesson.key || '(키 없음)'}`;
  assert(typeof lesson.key === 'string' && lesson.key.length > 0, `${prefix}: key가 없습니다.`);
  assert(typeof lesson.title === 'string' && lesson.title.length > 0, `${prefix}: title이 없습니다.`);
  assert(trackKeys.has(lesson.track), `${prefix}: 알 수 없는 track ${lesson.track}`);
  assert(['기초', '중급', '고급', '실전'].includes(lesson.level), `${prefix}: level이 올바르지 않습니다.`);
  assert(Array.isArray(lesson.objectives) && lesson.objectives.length >= 3, `${prefix}: 학습 목표가 3개 이상 필요합니다.`);
  assert(Array.isArray(lesson.sections) && lesson.sections.length >= 5, `${prefix}: 섹션이 5개 이상 필요합니다.`);
  assert(Array.isArray(lesson.quiz) && lesson.quiz.length >= 6, `${prefix}: 퀴즈 연결이 6개 이상 필요합니다.`);
  (lesson.quiz || []).forEach((id) => assert(cardIds.has(id), `${prefix}: 존재하지 않는 퀴즈 카드 ID ${id}`));
  (lesson.sources || []).forEach((sourceItem) => {
    assert(/^https:\/\//.test(sourceItem.url || ''), `${prefix}: 출처 URL은 https여야 합니다.`);
    assert(typeof sourceItem.title === 'string' && sourceItem.title.length > 0, `${prefix}: 출처 제목이 없습니다.`);
  });
  (lesson.sections || []).forEach((section, sectionIndex) => {
    const sectionPrefix = `${prefix} 섹션 ${sectionIndex + 1}`;
    assert(typeof section.h === 'string' && section.h.length > 0, `${sectionPrefix}: 제목이 없습니다.`);
    assert(typeof section.body === 'string' && section.body.length >= 80, `${sectionPrefix}: 본문이 너무 짧습니다.`);
    assert(Array.isArray(section.points) && section.points.length >= 3, `${sectionPrefix}: 핵심 포인트가 3개 이상 필요합니다.`);
    const visuals = section.visuals || (section.viz ? [section.viz] : []);
    assert(visuals.length > 0, `${sectionPrefix}: 시각화가 없습니다.`);
    visuals.forEach((viz) => assert(knownViz.has(viz.type), `${sectionPrefix}: 알 수 없는 시각화 ${viz.type}`));
  });
});

if (errors.length) {
  console.error(`Nasdaq 101 데이터 검증 실패 (${errors.length})`);
  errors.forEach((error) => console.error(`- ${error}`));
  process.exitCode = 1;
} else {
  const sectionCount = LESSONS.reduce((sum, lesson) => sum + lesson.sections.length, 0);
  const minuteCount = LESSONS.reduce((sum, lesson) => sum + lesson.minutes, 0);
  console.log(`검증 통과: 카드 ${CARDS.length}, 용어 ${GLOSSARY.length}, 레슨 ${LESSONS.length}, 섹션 ${sectionCount}, ${minuteCount}분`);
}
