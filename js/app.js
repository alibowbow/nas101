/* =========================================================
 * Nasdaq 101 — Macro Strategy (Static Web App)
 * 순수 바닐라 JS. 빌드 도구 없이 동작합니다.
 * ========================================================= */
(function () {
  'use strict';

  /* ---------- 아이콘 (lucide 기반 인라인 SVG) ---------- */
  var ICONS = {
    home: '<path d="m3 11 9-8 9 8"/><path d="M5 10v10h14V10"/><path d="M9 20v-6h6v6"/>',
    briefcase: '<path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/><rect width="20" height="14" x="2" y="6" rx="2"/>',
    bookOpen: '<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>',
    brain: '<path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"/><path d="M9 13a4.5 4.5 0 0 0 3-4"/><path d="M12 13h4"/><path d="M12 18h6a2 2 0 0 1 2 2v1"/><path d="M12 8h8"/><path d="M16 8V5a2 2 0 0 1 2-2"/><circle cx="16" cy="13" r=".5"/><circle cx="18" cy="3" r=".5"/><circle cx="20" cy="21" r=".5"/><circle cx="20" cy="8" r=".5"/>',
    fileText: '<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/>',
    gradCap: '<path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z"/><path d="M22 10v6"/><path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5"/>',
    chevronLeft: '<path d="m15 18-6-6 6-6"/>',
    chevronRight: '<path d="m9 18 6-6-6-6"/>',
    shuffle: '<path d="M2 18h1.4c1.3 0 2.5-.6 3.3-1.7l6.1-8.6c.8-1.1 2-1.7 3.3-1.7H22"/><path d="m18 2 4 4-4 4"/><path d="M2 6h1.9c1.5 0 2.9.9 3.6 2.2"/><path d="M22 18h-5.9c-1.3 0-2.6-.7-3.3-1.8l-.5-.8"/><path d="m18 14 4 4-4 4"/>',
    rotateCcw: '<path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/>',
    checkCircle: '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/>',
    xCircle: '<circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/>',
    trophy: '<path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/>',
    alertCircle: '<circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/>',
    search: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
    sparkles: '<path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/>',
    x: '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
    loader: '<path d="M21 12a9 9 0 1 1-6.219-8.56"/>',
    trendingUp: '<polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/>',
    trendingDown: '<polyline points="22 17 13.5 8.5 8.5 13.5 2 7"/><polyline points="16 17 22 17 22 11"/>',
    arrowLeftRight: '<path d="M8 3 4 7l4 4"/><path d="M4 7h16"/><path d="m16 21 4-4-4-4"/><path d="M20 17H4"/>',
    landmark: '<line x1="3" x2="21" y1="22" y2="22"/><line x1="6" x2="6" y1="18" y2="11"/><line x1="10" x2="10" y1="18" y2="11"/><line x1="14" x2="14" y1="18" y2="11"/><line x1="18" x2="18" y1="18" y2="11"/><polygon points="12 2 20 7 4 7"/>',
    pieChart: '<path d="M21.21 15.89A10 10 0 1 1 8 2.83"/><path d="M22 12A10 10 0 0 0 12 2v10z"/>',
    barChart: '<path d="M3 3v18h18"/><path d="M18 17V9"/><path d="M13 17V5"/><path d="M8 17v-3"/>',
    activity: '<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>',
    coins: '<circle cx="8" cy="8" r="6"/><path d="M18.09 10.37A6 6 0 1 1 10.34 18"/><path d="M7 6h1v4"/><path d="m16.71 13.88.7.71-2.82 2.82"/>',
    droplet: '<path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z"/>',
    percent: '<line x1="19" x2="5" y1="5" y2="19"/><circle cx="6.5" cy="6.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/>',
    cpu: '<rect width="16" height="16" x="4" y="4" rx="2"/><rect width="6" height="6" x="9" y="9" rx="1"/><path d="M15 2v2"/><path d="M15 20v2"/><path d="M2 15h2"/><path d="M2 9h2"/><path d="M20 15h2"/><path d="M20 9h2"/><path d="M9 2v2"/><path d="M9 20v2"/>',
    globe: '<circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/>',
    repeat: '<path d="m17 2 4 4-4 4"/><path d="M3 11v-1a4 4 0 0 1 4-4h14"/><path d="m7 22-4-4 4-4"/><path d="M21 13v1a4 4 0 0 1-4 4H3"/>',
    settings: '<path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/>',
    lightbulb: '<path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/>',
    library: '<path d="m16 6 4 14"/><path d="M12 6v14"/><path d="M8 8v12"/><path d="M4 4v16"/>',
    calendar: '<path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/>',
    shield: '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1 1 0 0 1 1.52 0C14.5 3.8 17 5 19 5a1 1 0 0 1 1 1z"/>',
    history: '<path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M12 7v5l4 2"/>',
    clock: '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
    lineChart: '<path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/>',
    layers: '<path d="M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z"/><path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65"/><path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65"/>',
    bookmark: '<path d="M19 21 12 16l-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>',
    target: '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>',
    zap: '<path d="M4 14a1 1 0 0 1-.78-1.63l9-11a.5.5 0 0 1 .87.46l-1.5 6.7A1 1 0 0 0 12.56 10H20a1 1 0 0 1 .78 1.63l-9 11a.5.5 0 0 1-.87-.46l1.5-6.7A1 1 0 0 0 11.44 14z"/>'
  };

  /* 레슨 키 → 아이콘 매핑 */
  var LESSON_ICONS = {
    fed: 'landmark', calendar: 'calendar', earnings: 'barChart',
    cycle: 'activity', history: 'history', risk: 'shield',
    rates: 'lineChart', liquidity: 'droplet', nasdaq: 'pieChart',
    breadth: 'layers', semis: 'cpu', volatility: 'activity',
    technical: 'lineChart', playbook: 'repeat'
  };

  function icon(name, cls) {
    return '<svg class="icon' + (cls ? ' ' + cls : '') + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + (ICONS[name] || '') + '</svg>';
  }

  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  function catOf(card) {
    return CATEGORIES[card.cat] || CATEGORIES['시장 심리 & 수급'];
  }

  function shuffleArray(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }

  /* ---------- 로컬 저장소 ---------- */
  // localStorage가 차단된 환경(프라이빗 모드, 스토리지 정책)에서도
  // 세션 동안은 동작하도록 메모리 백업을 함께 사용한다.
  var memStore = {};
  var store = {
    get: function (key, fallback) {
      try {
        var v = localStorage.getItem('nas101.' + key);
        if (v != null) return JSON.parse(v);
      } catch (e) { /* 차단/파싱 실패 → 메모리 백업 사용 */ }
      return Object.prototype.hasOwnProperty.call(memStore, key) ? memStore[key] : fallback;
    },
    set: function (key, value) {
      memStore[key] = value;
      try { localStorage.setItem('nas101.' + key, JSON.stringify(value)); } catch (e) { /* private mode 등 */ }
    }
  };

  function arrayValue(value) { return Array.isArray(value) ? value : []; }
  function stringValue(value, fallback) { return typeof value === 'string' ? value : fallback; }
  function objectValue(value) { return value && typeof value === 'object' && !Array.isArray(value) ? value : {}; }

  /* ---------- 상태 ---------- */
  var state = {
    mode: 'home',                 // home | card | quiz | study | list | glossary
    deck: CARDS.slice(),
    idx: 0,
    flipped: false,
    reviewMode: false,            // 오답 복습 모드
    quiz: { score: 0, attempted: 0, options: [], selected: -1, correct: null },
    searchQuery: '',
    catFilter: 'All',
    glossQuery: '',
    lessonKey: null,              // 학습 모드: null이면 목록, 값이 있으면 해당 레슨 상세
    readLessons: arrayValue(store.get('readLessons', [])),
    studySeen: arrayValue(store.get('studySeen', [])),
    studyTrack: 'all',
    studyQuery: '',
    lastLesson: stringValue(store.get('lastLesson', ''), ''),
    chapterQuiz: null,            // {key, title} — 챕터 확인 퀴즈 진행 중이면 설정
    quizSession: null,            // 홈에서 시작한 집중 세션
    cardFocusIds: null,
    cardDeckTitle: '',
    lifetime: store.get('stats', { attempted: 0, correct: 0 }),
    wrongIds: arrayValue(store.get('wrongIds', [])),
    mastery: objectValue(store.get('mastery', {})),
    bookmarks: arrayValue(store.get('bookmarks', [])),
    activity: arrayValue(store.get('activity', [])).slice(0, 30),
    globalSearch: { open: false, query: '' },
    ai: { open: false, loading: false, error: null, text: null, card: null, needKey: false }
  };

  // 이전 버전 또는 수동 수정으로 저장값이 손상되어도 앱이 시작되도록 정규화한다.
  (function normalizeStoredProgress() {
    var cardIds = new Set(CARDS.map(function (card) { return card.id; }));
    var lessonKeys = new Set(LESSONS.map(function (lesson) { return lesson.key; }));
    state.wrongIds = Array.from(new Set(state.wrongIds.map(Number).filter(function (id) { return cardIds.has(id); })));
    state.bookmarks = Array.from(new Set(state.bookmarks.map(Number).filter(function (id) { return cardIds.has(id); })));
    state.readLessons = Array.from(new Set(state.readLessons.filter(function (key) { return lessonKeys.has(key); })));
    var validSeen = new Set();
    LESSONS.forEach(function (lesson) {
      (lesson.sections || []).forEach(function (_, index) {
        var key = lesson.key + ':' + index;
        if (state.studySeen.indexOf(key) !== -1) validSeen.add(key);
      });
    });
    state.studySeen = Array.from(validSeen);
    var cleanMastery = {};
    Object.keys(state.mastery).forEach(function (key) {
      var id = Number(key);
      var item = state.mastery[key];
      if (!cardIds.has(id) || !item || typeof item !== 'object') return;
      var attempted = Math.max(0, Number(item.attempted) || 0);
      var correct = Math.min(attempted, Math.max(0, Number(item.correct) || 0));
      cleanMastery[id] = { attempted: attempted, correct: correct, streak: Math.max(0, Number(item.streak) || 0), lastSeen: Math.max(0, Number(item.lastSeen) || 0) };
    });
    state.mastery = cleanMastery;
    state.lifetime = objectValue(state.lifetime);
    state.lifetime.attempted = Math.max(0, Number(state.lifetime.attempted) || 0);
    state.lifetime.correct = Math.min(state.lifetime.attempted, Math.max(0, Number(state.lifetime.correct) || 0));
  })();

  var lessonObserver = null;

  // nav/footer의 실제 높이를 CSS 변수로 주입 —
  // sticky 필터 오프셋과 main의 상하 여백이 실측값을 따라가게 한다.
  function syncChromeHeights() {
    var nav = document.querySelector('.topnav');
    if (nav) document.documentElement.style.setProperty('--nav-h', nav.offsetHeight + 'px');
    var footer = document.getElementById('footer');
    if (footer) {
      var h = footer.classList.contains('hidden') ? 16 : footer.offsetHeight;
      document.documentElement.style.setProperty('--footer-h', h + 'px');
    }
  }

  var els = {
    main: document.getElementById('main'),
    content: document.getElementById('content'),
    footer: document.getElementById('footer'),
    footerContent: document.getElementById('footer-content'),
    progressFill: document.getElementById('progress-fill'),
    headerProgress: document.getElementById('header-progress'),
    modeSwitch: document.getElementById('mode-switch'),
    modalRoot: document.getElementById('modal-root'),
    searchRoot: document.getElementById('search-root'),
    toastRoot: document.getElementById('toast-root')
  };

  /* ---------- 토스트 ---------- */
  var toastTimer = null;
  function toast(msg) {
    els.toastRoot.innerHTML = '<div class="toast">' + esc(msg) + '</div>';
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { els.toastRoot.innerHTML = ''; }, 2200);
  }

  /* ---------- 퀴즈 선택지 생성 ---------- */
  function buildQuizOptions(card) {
    var options;
    if (card.type === 'UP') {
      options = [
        { text: '상승 / 매수 / 호재 (Bullish)', isCorrect: true, icon: 'trendingUp' },
        { text: '하락 / 매도 / 악재 (Bearish)', isCorrect: false, icon: 'trendingDown' }
      ];
    } else if (card.type === 'DOWN') {
      options = [
        { text: '상승 / 매수 / 호재 (Bullish)', isCorrect: false, icon: 'trendingUp' },
        { text: '하락 / 매도 / 악재 (Bearish)', isCorrect: true, icon: 'trendingDown' }
      ];
    } else if (card.type === 'CUSTOM' && card.customOptions) {
      options = [
        { text: card.customOptions[0], isCorrect: true, icon: 'chevronRight' },
        { text: card.customOptions[1], isCorrect: false, icon: 'chevronRight' }
      ];
    } else {
      options = [
        { text: '긍정적 시그널', isCorrect: true, icon: 'chevronRight' },
        { text: '부정적 시그널', isCorrect: false, icon: 'chevronRight' }
      ];
    }
    return shuffleArray(options);
  }

  function resetQuizQuestion() {
    state.quiz.options = buildQuizOptions(state.deck[state.idx]);
    state.quiz.selected = -1;
    state.quiz.correct = null;
  }

  /* ---------- 내비게이션 ---------- */
  function goTo(newIdx) {
    state.idx = newIdx;
    state.flipped = false;
    if (state.mode === 'quiz') resetQuizQuestion();
    render();
  }

  // 복습 모드에서 이동 시 해결된 카드를 deck에서 걷어내고, 모두 해결했으면 복습 모드를 종료한다.
  function advanceReview(dir) {
    if (state.wrongIds.length === 0) {
      state.reviewMode = false;
      rebuildDeck(false);
      render();
      toast('오답노트를 모두 해결했습니다! 전체 카드로 돌아갑니다.');
      return;
    }
    var pool = CARDS.filter(function (c) { return state.wrongIds.indexOf(c.id) !== -1; });
    var curId = state.deck[state.idx] && state.deck[state.idx].id;
    var pos = -1;
    for (var i = 0; i < pool.length; i++) if (pool[i].id === curId) { pos = i; break; }
    state.deck = pool;
    var nextIdx;
    if (pos === -1) {
      // 현재 카드가 방금 해결되어 pool에서 빠진 경우: 같은 자리(다음 카드)로
      nextIdx = dir > 0 ? Math.min(state.idx, pool.length - 1) : (state.idx - 1 + pool.length) % pool.length;
      if (nextIdx < 0 || nextIdx >= pool.length) nextIdx = 0;
    } else {
      nextIdx = (pos + dir + pool.length) % pool.length;
    }
    goTo(nextIdx);
  }

  function next() {
    if (state.mode === 'quiz' && state.chapterQuiz && state.idx === state.deck.length - 1) {
      finishChapterQuiz();
      return;
    }
    if (state.mode === 'quiz' && state.quizSession && state.idx === state.deck.length - 1 && state.quiz.selected !== -1) {
      state.quizSession.done = true;
      state.quizSession.finishedAt = Date.now();
      addActivity('quiz', state.quizSession.label, state.quiz.score + '/' + state.quiz.attempted);
      render();
      window.scrollTo(0, 0);
      return;
    }
    if (state.mode === 'quiz' && state.reviewMode) { advanceReview(1); return; }
    goTo(state.idx < state.deck.length - 1 ? state.idx + 1 : 0);
  }
  function prev() {
    if (state.mode === 'quiz' && state.reviewMode) { advanceReview(-1); return; }
    goTo(state.idx > 0 ? state.idx - 1 : state.deck.length - 1);
  }

  function currentPool() {
    if (state.mode === 'card' && Array.isArray(state.cardFocusIds)) {
      return state.cardFocusIds.map(function (id) {
        return CARDS.find(function (card) { return card.id === id; });
      }).filter(Boolean);
    }
    if (state.quizSession && Array.isArray(state.quizSession.cardIds)) {
      return state.quizSession.cardIds.map(function (id) {
        return CARDS.find(function (card) { return card.id === id; });
      }).filter(Boolean);
    }
    if (state.chapterQuiz) {
      var lesson = null;
      for (var i = 0; i < LESSONS.length; i++) if (LESSONS[i].key === state.chapterQuiz.key) lesson = LESSONS[i];
      if (lesson && lesson.quiz && lesson.quiz.length) {
        return lesson.quiz.map(function (id) {
          return CARDS.filter(function (c) { return c.id === id; })[0];
        }).filter(Boolean);
      }
      state.chapterQuiz = null;
    }
    if (state.reviewMode) {
      var wrongs = CARDS.filter(function (c) { return state.wrongIds.indexOf(c.id) !== -1; });
      if (wrongs.length) return wrongs;
      state.reviewMode = false; // 오답이 없으면 복습 모드도 함께 해제 (플래그·UI·deck 불일치 방지)
    }
    return CARDS.slice();
  }

  /* ---------- 챕터 확인 퀴즈 ---------- */
  function startChapterQuiz(lesson) {
    state.mode = 'quiz';
    state.chapterQuiz = { key: lesson.key, title: lesson.title };
    state.quizSession = null;
    state.reviewMode = false;
    state.quiz.score = 0;
    state.quiz.attempted = 0;
    rebuildDeck(false);
    updateRoute('quiz');
    render();
    window.scrollTo(0, 0);
    toast('챕터 확인 퀴즈 시작! (' + state.deck.length + '문제)');
  }

  function exitChapterQuiz(showResult) {
    var cq = state.chapterQuiz;
    if (showResult && cq) {
      toast('챕터 퀴즈 완료: ' + state.quiz.score + '/' + state.quiz.attempted + ' 정답');
    }
    state.chapterQuiz = null;
    state.mode = 'study';
    state.lessonKey = cq ? cq.key : null;
    state.quiz.score = 0;
    state.quiz.attempted = 0;
    rebuildDeck(false);
    updateRoute('study', state.lessonKey);
    render();
    window.scrollTo(0, 0);
  }

  function finishChapterQuiz() {
    exitChapterQuiz(true);
  }

  function addActivity(type, title, detail) {
    state.activity.unshift({ type: type, title: title, detail: detail || '', at: Date.now() });
    state.activity = state.activity.slice(0, 30);
    store.set('activity', state.activity);
  }

  function dailyHash(value) {
    var date = new Date();
    var seed = Number(String(date.getFullYear()) + String(date.getMonth() + 1).padStart(2, '0') + String(date.getDate()).padStart(2, '0'));
    var x = (Number(value) * 2654435761 + seed * 1013904223) >>> 0;
    x ^= x >>> 16;
    return x >>> 0;
  }

  function adaptiveCards(limit, category) {
    var pool = category ? CARDS.filter(function (card) { return card.cat === category; }) : CARDS.slice();
    var wrongSet = new Set(state.wrongIds);
    return pool.sort(function (a, b) {
      var ma = state.mastery[a.id] || { attempted: 0, correct: 0 };
      var mb = state.mastery[b.id] || { attempted: 0, correct: 0 };
      var pa = (wrongSet.has(a.id) ? -1000 : 0) + (ma.attempted ? (ma.correct / ma.attempted) * 100 : -100) + dailyHash(a.id) / 100000000000;
      var pb = (wrongSet.has(b.id) ? -1000 : 0) + (mb.attempted ? (mb.correct / mb.attempted) * 100 : -100) + dailyHash(b.id) / 100000000000;
      return pa - pb;
    }).slice(0, Math.min(limit || 10, pool.length));
  }

  function startQuizSession(label, cards) {
    var sessionCards = (cards || []).filter(Boolean);
    if (!sessionCards.length) {
      toast('복습할 문제가 아직 없습니다.');
      return;
    }
    state.mode = 'quiz';
    state.chapterQuiz = null;
    state.reviewMode = false;
    state.quizSession = { label: label, total: sessionCards.length, cardIds: sessionCards.map(function (card) { return card.id; }), done: false, startedAt: Date.now() };
    state.deck = sessionCards;
    state.idx = 0;
    state.flipped = false;
    state.quiz = { score: 0, attempted: 0, options: [], selected: -1, correct: null };
    resetQuizQuestion();
    updateRoute('quiz');
    render();
    window.scrollTo(0, 0);
  }

  function startCardFocus(cards, title) {
    var focusCards = (cards || []).filter(Boolean);
    state.mode = 'card';
    state.quizSession = null;
    state.deck = focusCards.length ? focusCards : CARDS.slice();
    state.cardFocusIds = focusCards.length ? focusCards.map(function (card) { return card.id; }) : null;
    state.idx = 0;
    state.flipped = false;
    state.cardDeckTitle = title || '';
    updateRoute('card');
    render();
    window.scrollTo(0, 0);
  }

  function rebuildDeck(shuffled) {
    var pool = currentPool();
    state.deck = shuffled ? shuffleArray(pool) : pool;
    state.idx = 0;
    state.flipped = false;
    if (state.mode === 'quiz') resetQuizQuestion();
  }

  function switchMode(mode) {
    state.mode = mode;
    state.idx = 0;
    state.flipped = false;
    state.lessonKey = null;
    state.chapterQuiz = null;
    state.quizSession = null;
    state.cardDeckTitle = '';
    state.cardFocusIds = null;
    if (mode !== 'quiz') state.reviewMode = false;
    if (mode === 'card' || mode === 'quiz') rebuildDeck(false);
    updateRoute(mode);
    render();
    window.scrollTo(0, 0);
  }

  function updateRoute(mode, detail) {
    if (!window.history || !window.history.replaceState) return;
    var route = '#' + (mode || state.mode) + (detail ? '/' + encodeURIComponent(detail) : '');
    window.history.replaceState(null, '', route);
  }

  /* ---------- 퀴즈 응답 ---------- */
  function answerQuiz(optIdx) {
    if (state.quiz.selected !== -1) return;
    var opt = state.quiz.options[optIdx];
    if (!opt) return;
    state.quiz.selected = optIdx;
    state.quiz.correct = opt.isCorrect;
    state.quiz.attempted += 1;
    state.lifetime.attempted += 1;
    var card = state.deck[state.idx];
    var mastery = state.mastery[card.id] || { attempted: 0, correct: 0, streak: 0, lastSeen: 0 };
    mastery.attempted += 1;
    mastery.lastSeen = Date.now();
    if (opt.isCorrect) {
      state.quiz.score += 1;
      state.lifetime.correct += 1;
      mastery.correct += 1;
      mastery.streak = (mastery.streak || 0) + 1;
      // 오답 복습 모드에서 맞히면 오답노트에서 제거
      var pos = state.wrongIds.indexOf(card.id);
      if ((state.reviewMode || state.quizSession) && pos !== -1) {
        state.wrongIds.splice(pos, 1);
        store.set('wrongIds', state.wrongIds);
        toast('오답노트에서 해결! (' + state.wrongIds.length + '문제 남음)');
      }
    } else {
      mastery.streak = 0;
      if (state.wrongIds.indexOf(card.id) === -1) {
        state.wrongIds.push(card.id);
        store.set('wrongIds', state.wrongIds);
      }
    }
    state.mastery[card.id] = mastery;
    store.set('mastery', state.mastery);
    store.set('stats', state.lifetime);
    render();
  }

  function toggleReviewMode() {
    if (!state.reviewMode && state.wrongIds.length === 0) {
      toast('아직 오답노트가 비어 있습니다.');
      return;
    }
    state.reviewMode = !state.reviewMode;
    rebuildDeck(false);
    render();
  }

  /* ---------- Gemini AI 해설 ---------- */
  function getApiKey() { return store.get('apiKey', ''); }

  // 모달을 닫았다가 다른 카드로 다시 여는 사이 늦게 도착한 이전 응답이
  // 새 모달 상태를 덮어쓰지 않도록 요청 세대 번호로 구분한다.
  var aiRequestSeq = 0;

  var modalOpener = null; // 모달을 연 요소 (닫을 때 포커스 복원)

  function openAiModal(card) {
    modalOpener = document.activeElement;
    state.ai = { open: true, loading: false, error: null, text: null, card: card, needKey: !getApiKey() };
    renderModal();
    if (!state.ai.needKey) fetchAiExplanation(card);
  }

  function closeAiModal() {
    aiRequestSeq += 1; // 진행 중이던 요청 결과는 무시
    state.ai.open = false;
    renderModal();
    if (modalOpener && document.contains(modalOpener) && typeof modalOpener.focus === 'function') {
      modalOpener.focus();
    }
    modalOpener = null;
  }

  function fetchAiExplanation(card) {
    var apiKey = getApiKey();
    if (!apiKey) {
      state.ai.needKey = true;
      renderModal();
      return;
    }
    var reqId = ++aiRequestSeq;
    state.ai.loading = true;
    state.ai.error = null;
    state.ai.needKey = false;
    renderModal();

    var prompt = [
      '당신은 월스트리트 출신의 수석 매크로 전략가입니다.',
      '아래 투자 격언에 대해 초보자도 이해할 수 있게 깊이 있는 통찰을 제공해주세요.',
      '반드시 아래 3가지 소제목 형식을 유지하여 답변해 주세요. (굵은 글씨는 **텍스트** 형식 사용 가능)',
      '',
      '질문: ' + card.q,
      '답변: ' + card.a,
      '',
      '형식:',
      '💡 핵심 요약',
      '(이 원리가 작동하는 경제학적/심리적 이유를 1~2문장으로 설명)',
      '',
      '🏛️ 역사적 사례',
      '(과거 실제 증시에서 이 원리가 적용되었던 대표적인 사례 짧게)',
      '',
      '🎯 실전 투자 전략',
      '(이 상황에서 개인 투자자가 취해야 할 구체적이고 현실적인 액션 1가지)'
    ].join('\n');

    fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=' + encodeURIComponent(apiKey), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
    })
      .then(function (res) {
        if (!res.ok) throw new Error('AI Request Failed: ' + res.status);
        return res.json();
      })
      .then(function (data) {
        if (reqId !== aiRequestSeq) return; // stale 응답 무시
        var text = data && data.candidates && data.candidates[0] &&
          data.candidates[0].content && data.candidates[0].content.parts &&
          data.candidates[0].content.parts[0] && data.candidates[0].content.parts[0].text;
        if (!text) throw new Error('No response content');
        state.ai.text = text;
        state.ai.error = null;
      })
      .catch(function (err) {
        if (reqId !== aiRequestSeq) return; // stale 에러 무시
        state.ai.error = '전문가 AI 연결에 실패했습니다. API 키가 유효한지 확인하거나 잠시 후 다시 시도해주세요. (' + err.message + ')';
      })
      .then(function () {
        if (reqId !== aiRequestSeq) return;
        state.ai.loading = false;
        renderModal();
      });
  }

  function formatAiText(text) {
    var sections = String(text).split(/\n{2,}/);
    return sections.map(function (section) {
      var safe = esc(section).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br>');
      return '<p>' + safe + '</p>';
    }).join('');
  }

  /* ---------- 학습 지표와 홈 대시보드 ---------- */
  function learningMetrics() {
    var readCount = LESSONS.filter(function (lesson) { return state.readLessons.indexOf(lesson.key) !== -1; }).length;
    var totalSections = LESSONS.reduce(function (sum, lesson) { return sum + ((lesson.sections && lesson.sections.length) || 0); }, 0);
    var seenSections = Math.min(totalSections, state.studySeen.length);
    var attemptedCards = 0;
    var masteredCards = 0;
    Object.keys(state.mastery).forEach(function (id) {
      var item = state.mastery[id];
      if (!item || !item.attempted) return;
      attemptedCards += 1;
      if (item.attempted >= 2 && item.correct / item.attempted >= 0.8) masteredCards += 1;
    });
    var lessonPct = totalSections ? seenSections / totalSections : 0;
    var cardPct = CARDS.length ? attemptedCards / CARDS.length : 0;
    var masteryPct = CARDS.length ? masteredCards / CARDS.length : 0;
    var overall = Math.round((lessonPct * 0.5 + cardPct * 0.28 + masteryPct * 0.22) * 100);
    var accuracy = state.lifetime.attempted ? Math.round((state.lifetime.correct / state.lifetime.attempted) * 100) : 0;
    return {
      readCount: readCount,
      totalLessons: LESSONS.length,
      seenSections: seenSections,
      totalSections: totalSections,
      attemptedCards: attemptedCards,
      masteredCards: masteredCards,
      overall: Math.min(100, overall),
      accuracy: accuracy
    };
  }

  function categoryHealth() {
    var groups = {};
    CARDS.forEach(function (card) {
      if (!groups[card.cat]) groups[card.cat] = { category: card.cat, total: 0, attempted: 0, correct: 0, wrong: 0 };
      var group = groups[card.cat];
      var mastery = state.mastery[card.id];
      group.total += 1;
      if (mastery && mastery.attempted) {
        group.attempted += mastery.attempted;
        group.correct += mastery.correct;
      }
      if (state.wrongIds.indexOf(card.id) !== -1) group.wrong += 1;
    });
    return Object.keys(groups).map(function (key) {
      var group = groups[key];
      group.accuracy = group.attempted ? Math.round((group.correct / group.attempted) * 100) : null;
      group.priority = group.wrong * 100 + (group.accuracy == null ? 30 : 100 - group.accuracy);
      return group;
    }).sort(function (a, b) { return b.priority - a.priority || a.category.localeCompare(b.category, 'ko'); });
  }

  function renderHeaderProgress() {
    if (!els.headerProgress) return;
    var metrics = learningMetrics();
    els.headerProgress.style.setProperty('--header-progress', metrics.overall);
    els.headerProgress.innerHTML = '<span><strong>' + metrics.overall + '%</strong><small>학습 진도</small></span>';
  }

  function renderHomeMode() {
    els.main.classList.add('scroll-top');
    var metrics = learningMetrics();
    var daily = adaptiveCards(10);
    var wrongCount = daily.filter(function (card) { return state.wrongIds.indexOf(card.id) !== -1; }).length;
    var newCount = daily.filter(function (card) { return !(state.mastery[card.id] && state.mastery[card.id].attempted); }).length;
    var revisitCount = Math.max(0, daily.length - wrongCount - newCount);
    var continueLesson = LESSONS.find(function (lesson) { return lesson.key === state.lastLesson; }) ||
      LESSONS.find(function (lesson) { return state.readLessons.indexOf(lesson.key) === -1; }) || LESSONS[0];
    var continueSeen = continueLesson ? lessonSeenCount(continueLesson) : 0;
    var weak = categoryHealth().slice(0, 4);
    var tracks = (typeof LEARNING_TRACKS !== 'undefined' ? LEARNING_TRACKS : []).filter(function (track) { return track.key !== 'all'; });
    var trackColors = ['#36d3ff', '#70f0c3', '#8b7cff', '#4e9cff'];

    var tracksHtml = tracks.map(function (track, index) {
      var lessons = LESSONS.filter(function (lesson) { return lesson.track === track.key; });
      var completed = lessons.filter(function (lesson) { return state.readLessons.indexOf(lesson.key) !== -1; }).length;
      var partial = lessons.reduce(function (sum, lesson) {
        var count = lessonSeenCount(lesson);
        return sum + (lesson.sections && lesson.sections.length ? count / lesson.sections.length : 0);
      }, 0);
      var pct = lessons.length ? Math.round((partial / lessons.length) * 100) : 0;
      return '<div class="track-row" style="--track-progress:' + pct + '%;--track-color:' + trackColors[index % trackColors.length] + '">' +
        '<span>' + esc(track.title) + '</span><i></i><b>' + completed + '/' + lessons.length + '</b></div>';
    }).join('');

    var focusHtml = weak.map(function (group, index) {
      var detail = group.attempted ? '정답률 ' + group.accuracy + '% · 오답 ' + group.wrong : '아직 푼 문제가 없는 영역';
      return '<button class="focus-item" data-focus-cat="' + esc(group.category) + '">' +
        '<span class="focus-rank">' + String(index + 1).padStart(2, '0') + '</span>' +
        '<span class="focus-copy"><strong>' + esc(group.category) + '</strong><span>' + detail + '</span></span>' + icon('chevronRight') + '</button>';
    }).join('');

    els.content.innerHTML =
      '<div class="home-dashboard">' +
        '<section class="home-hero">' +
          '<div class="home-copy"><span class="home-kicker">PERSONAL MARKET SCHOOL</span>' +
            '<h2>시장을 외우지 말고<br><em>구조로 읽으세요.</em></h2>' +
            '<p>금리·유동성·실적·수급을 따로 암기하지 않고, 하나의 인과관계로 연결해 판단하는 투자 학습 시스템입니다.</p>' +
            '<div class="home-primary-actions">' +
              '<button class="action-primary" id="home-daily">' + icon('zap') + ' 오늘의 10문제</button>' +
              '<button class="action-secondary" id="home-continue">' + icon('bookOpen') + ' 이어서 학습</button>' +
            '</div>' +
          '</div>' +
          '<aside class="home-session-card" aria-label="오늘의 학습 구성">' +
            '<div class="home-session-head"><span>TODAY\'S SESSION</span><b>약 7분</b></div>' +
            '<div class="session-orbit"><div><span><strong>' + daily.length + '</strong><small>QUESTIONS</small></span></div></div>' +
            '<ul class="home-session-list">' +
              '<li><span>오답 다시 보기</span><b>' + wrongCount + '</b></li>' +
              '<li><span>새 개념 만나기</span><b>' + newCount + '</b></li>' +
              '<li><span>기억 강화하기</span><b>' + revisitCount + '</b></li>' +
            '</ul>' +
          '</aside>' +
        '</section>' +

        '<section class="home-stats" aria-label="학습 현황">' +
          '<div class="home-stat"><div class="home-stat-top">' + icon('layers') + '<strong>' + metrics.overall + '%</strong></div><span>전체 학습 진도</span><i style="--value:' + metrics.overall + '%"></i></div>' +
          '<div class="home-stat"><div class="home-stat-top">' + icon('target') + '<strong>' + metrics.accuracy + '%</strong></div><span>누적 퀴즈 정답률</span><i style="--value:' + metrics.accuracy + '%"></i></div>' +
          '<div class="home-stat"><div class="home-stat-top">' + icon('checkCircle') + '<strong>' + metrics.masteredCards + '</strong></div><span>숙련 카드 · ' + metrics.attemptedCards + '장 경험</span><i style="--value:' + Math.round((metrics.masteredCards / CARDS.length) * 100) + '%"></i></div>' +
          '<div class="home-stat"><div class="home-stat-top">' + icon('repeat') + '<strong>' + state.wrongIds.length + '</strong></div><span>해결할 오답</span><i style="--value:' + Math.min(100, state.wrongIds.length * 5) + '%"></i></div>' +
        '</section>' +

        '<div class="home-grid">' +
          '<section class="home-panel"><header class="home-panel-head"><div><span>LEARNING PATH</span><h3>커리큘럼 이어가기</h3></div><button data-home-mode="study">전체 보기</button></header>' +
            (continueLesson ? '<button class="continue-card" id="home-lesson" data-lesson="' + esc(continueLesson.key) + '"><span class="continue-card-icon">' + icon(LESSON_ICONS[continueLesson.key] || 'bookOpen') + '</span><span class="continue-card-copy"><small>' + (continueSeen ? '이어서 학습' : '추천 시작') + '</small><strong>' + esc(continueLesson.title) + '</strong><span>' + continueSeen + '/' + continueLesson.sections.length + ' 섹션 · 약 ' + continueLesson.minutes + '분</span></span>' + icon('chevronRight') + '</button>' : '') +
            '<div class="track-map">' + tracksHtml + '</div>' +
          '</section>' +
          '<section class="home-panel"><header class="home-panel-head"><div><span>FOCUS RADAR</span><h3>우선 복습할 영역</h3></div><button id="home-review">오답 복습</button></header>' +
            '<div class="focus-list">' + (focusHtml || '<div class="focus-empty">퀴즈를 풀면 취약 영역을 자동으로 분석합니다.</div>') + '</div>' +
          '</section>' +
        '</div>' +

        '<section class="home-tools" aria-label="빠른 도구">' +
          '<button class="home-tool" id="home-card-focus"><span>' + icon('bookOpen') + '</span><span><strong>오늘의 카드</strong><small>취약·미학습 개념을 섞어 빠르게 훑기</small></span></button>' +
          '<button class="home-tool" id="home-search"><span>' + icon('search') + '</span><span><strong>통합 검색</strong><small>카드·챕터·용어를 한 번에 찾기</small></span></button>' +
          '<button class="home-tool" data-home-mode="list"><span>' + icon('bookmark') + '</span><span><strong>나의 자료실</strong><small>전체 인사이트와 저장한 카드를 탐색</small></span></button>' +
        '</section>' +
      '</div>';

    document.getElementById('home-daily').addEventListener('click', function () { startQuizSession('오늘의 10문제', adaptiveCards(10)); });
    document.getElementById('home-continue').addEventListener('click', function () { if (continueLesson) { state.mode = 'study'; openLesson(continueLesson.key); } });
    var lessonButton = document.getElementById('home-lesson');
    if (lessonButton) lessonButton.addEventListener('click', function () { state.mode = 'study'; openLesson(lessonButton.dataset.lesson); });
    document.getElementById('home-review').addEventListener('click', function () {
      startQuizSession('오답 집중 복습', CARDS.filter(function (card) { return state.wrongIds.indexOf(card.id) !== -1; }).slice(0, 20));
    });
    document.getElementById('home-card-focus').addEventListener('click', function () { startCardFocus(adaptiveCards(20), '오늘의 카드'); });
    document.getElementById('home-search').addEventListener('click', openGlobalSearch);
    els.content.querySelectorAll('[data-home-mode]').forEach(function (button) { button.addEventListener('click', function () { switchMode(button.dataset.homeMode); }); });
    els.content.querySelectorAll('[data-focus-cat]').forEach(function (button) {
      button.addEventListener('click', function () { startQuizSession(button.dataset.focusCat + ' 집중 퀴즈', adaptiveCards(10, button.dataset.focusCat)); });
    });
  }

  /* ---------- 렌더링 ---------- */
  function render() {
    // innerHTML 전체 교체로 키보드 포커스가 유실되지 않도록 id 기준으로 복원
    var focusId = document.activeElement && document.activeElement.id;
    if (lessonObserver) { lessonObserver.disconnect(); lessonObserver = null; }
    els.content.classList.toggle('content--home', state.mode === 'home');
    els.content.classList.toggle('content--study', state.mode === 'study');
    els.content.classList.toggle('content--library', state.mode === 'list' || state.mode === 'glossary');
    renderNav();
    if (state.mode === 'home') renderHomeMode();
    else if (state.mode === 'card') renderCardMode();
    else if (state.mode === 'quiz') renderQuizMode();
    else if (state.mode === 'list') renderListMode();
    else if (state.mode === 'study') renderStudyMode();
    else renderGlossaryMode();
    renderFooter();
    renderHeaderProgress();
    syncChromeHeights();
    if (focusId) {
      var f = document.getElementById(focusId);
      if (f && typeof f.focus === 'function') f.focus();
    }
  }

  function renderNav() {
    var buttons = els.modeSwitch.querySelectorAll('.mode-btn');
    buttons.forEach(function (btn) {
      var active = btn.dataset.mode === state.mode || (btn.dataset.mode === 'list' && state.mode === 'glossary');
      btn.classList.toggle('active', active);
      btn.setAttribute('aria-pressed', active ? 'true' : 'false');
    });
  }

  function catChipHtml(card, cls) {
    var cat = catOf(card);
    return '<div class="' + cls + '">' +
      '<span style="color:' + cat.color + ';display:flex">' + icon(cat.icon) + '</span>' +
      '<span>' + esc(card.cat) + '</span></div>';
  }

  /* ---------- 카드 심층 블록 (왜 + 반례 + 용어 링크) ---------- */
  function goGlossary(term) {
    switchMode('glossary');
    state.glossQuery = term;
    updateRoute('glossary', term);
    render();
    window.scrollTo(0, 0);
  }

  function deepPanelHtml(card, suffix) {
    var d = card.deep;
    if (!d) return { btn: '', panel: '' };
    var terms = (d.terms || []).map(function (t) {
      return '<button class="deep-term" data-term="' + esc(t) + '">' + icon('gradCap') + ' ' + esc(t) + '</button>';
    }).join('');
    var panel =
      '<div class="deep-panel hidden" id="deep-panel-' + suffix + '">' +
        '<div class="deep-block deep-why"><h5>' + icon('search') + ' 왜 그럴까</h5><p>' + esc(d.why) + '</p></div>' +
        (d.except ? '<div class="deep-block deep-except"><h5>' + icon('alertCircle') + ' 이럴 땐 반대로</h5><p>' + esc(d.except) + '</p></div>' : '') +
        (terms ? '<div class="deep-terms">' + terms + '</div>' : '') +
      '</div>';
    var btn = '<button class="deep-toggle" id="deep-toggle-' + suffix + '">' + icon('search') + ' 더 깊이</button>';
    return { btn: btn, panel: panel };
  }

  function wireDeep(suffix) {
    var toggle = document.getElementById('deep-toggle-' + suffix);
    var panel = document.getElementById('deep-panel-' + suffix);
    if (!toggle || !panel) return;
    toggle.addEventListener('click', function (e) {
      e.stopPropagation();
      var opened = panel.classList.toggle('hidden');
      toggle.classList.toggle('open', !opened);
      if (!opened) panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
    panel.addEventListener('click', function (e) { e.stopPropagation(); });
    panel.querySelectorAll('.deep-term').forEach(function (chip) {
      chip.addEventListener('click', function (e) {
        e.stopPropagation();
        goGlossary(chip.dataset.term);
      });
    });
  }

  function toggleBookmark(cardId) {
    var index = state.bookmarks.indexOf(cardId);
    if (index === -1) {
      state.bookmarks.push(cardId);
      toast('카드를 자료실에 저장했습니다.');
    } else {
      state.bookmarks.splice(index, 1);
      toast('저장을 해제했습니다.');
    }
    store.set('bookmarks', state.bookmarks);
  }

  function renderCardMode() {
    els.main.classList.remove('scroll-top');
    var card = state.deck[state.idx];
    var saved = state.bookmarks.indexOf(card.id) !== -1;
    store.set('lastCard', card.id);
    var deep = deepPanelHtml(card, 'card');
    els.content.innerHTML =
      (state.cardDeckTitle ? '<div class="card-context"><span>' + icon('zap') + esc(state.cardDeckTitle) + '</span><button id="card-context-all">전체 카드로 전환</button></div>' : '') +
      '<div class="scene" id="scene" role="button" tabindex="0" aria-label="카드 뒤집기">' +
        '<div class="card3d' + (state.flipped ? ' flipped' : '') + '" id="card3d">' +
          '<div class="card-face card-front">' +
            '<div class="card-head">' + catChipHtml(card, 'cat-chip') +
              '<div class="card-head-tools"><button class="card-save' + (saved ? ' saved' : '') + '" id="card-save" aria-label="' + (saved ? '저장 해제' : '카드 저장') + '" aria-pressed="' + (saved ? 'true' : 'false') + '">' + icon('bookmark') + '</button><span class="card-num">#' + card.id + '</span></div></div>' +
            '<div class="card-body"><h2 class="card-q">' + esc(card.q) + '</h2></div>' +
            '<div class="card-foot"><div class="flip-hint">' + icon('arrowLeftRight') + ' Tap to flip</div></div>' +
          '</div>' +
          '<div class="card-face card-back">' +
            '<div class="card-head"><span class="insight-tag">Insight</span></div>' +
            '<div class="card-body"><div class="card-a-wrap"><p class="card-a">' + esc(card.a) + '</p>' + deep.panel + '</div></div>' +
            '<div class="card-foot card-foot-row">' + deep.btn +
              '<button class="ai-btn" id="ai-btn"' + (state.flipped ? '' : ' tabindex="-1"') + '>' + icon('sparkles') + ' 전문가 해설</button></div>' +
          '</div>' +
        '</div>' +
      '</div>';

    var scene = document.getElementById('scene');
    var aiBtn = document.getElementById('ai-btn');
    var saveBtn = document.getElementById('card-save');
    var deepToggle = document.getElementById('deep-toggle-card');
    saveBtn.tabIndex = state.flipped ? -1 : 0;
    if (deepToggle) deepToggle.tabIndex = state.flipped ? 0 : -1;
    var flip = function () {
      state.flipped = !state.flipped;
      document.getElementById('card3d').classList.toggle('flipped', state.flipped);
      // 시각적으로 숨겨진 면의 버튼이 Tab으로 잡히지 않도록
      aiBtn.tabIndex = state.flipped ? 0 : -1;
      saveBtn.tabIndex = state.flipped ? -1 : 0;
      if (deepToggle) deepToggle.tabIndex = state.flipped ? 0 : -1;
    };
    scene.addEventListener('click', flip);
    scene.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') { e.preventDefault(); flip(); }
    });
    aiBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      openAiModal(card);
    });
    saveBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      toggleBookmark(card.id);
      saveBtn.classList.toggle('saved', state.bookmarks.indexOf(card.id) !== -1);
      saveBtn.setAttribute('aria-pressed', state.bookmarks.indexOf(card.id) !== -1 ? 'true' : 'false');
    });
    var allButton = document.getElementById('card-context-all');
    if (allButton) allButton.addEventListener('click', function () { state.cardDeckTitle = ''; state.cardFocusIds = null; state.deck = CARDS.slice(); state.idx = 0; render(); });
    wireDeep('card');
  }

  function renderQuizMode() {
    els.main.classList.remove('scroll-top');
    if (state.quizSession && state.quizSession.done) {
      renderQuizSummary();
      return;
    }
    var card = state.deck[state.idx];
    if (!state.quiz.options.length) resetQuizQuestion();

    var lifetimeRate = state.lifetime.attempted
      ? Math.round((state.lifetime.correct / state.lifetime.attempted) * 100) : 0;

    var optionsHtml = state.quiz.options.map(function (opt, i) {
      var cls = 'quiz-opt';
      var iconName = opt.icon;
      if (state.quiz.selected !== -1) {
        if (opt.isCorrect) { cls += ' correct'; iconName = 'checkCircle'; }
        else if (state.quiz.selected === i) { cls += ' wrong'; iconName = 'xCircle'; }
        else { cls += ' dimmed'; }
      }
      return '<button class="' + cls + '" data-opt="' + i + '"' +
        (state.quiz.selected !== -1 ? ' disabled' : '') + '>' +
        icon(iconName) + '<span>' + esc(opt.text) + '</span></button>';
    }).join('');

    var resultHtml = '';
    if (state.quiz.selected !== -1) {
      var ok = state.quiz.correct;
      var deepQ = deepPanelHtml(card, 'quiz');
      resultHtml =
        '<div class="quiz-result"><div class="quiz-result-box ' + (ok ? 'ok' : 'no') + '">' +
          '<div class="quiz-result-head">' +
            '<div class="quiz-result-title">' + icon(ok ? 'checkCircle' : 'alertCircle') +
              '<span>' + (ok ? 'Excellent Insight.' : 'Review Needed.') + '</span></div>' +
            '<button class="quiz-result-ai" id="quiz-ai-btn">' + icon('sparkles') + ' AI 해설</button>' +
          '</div>' +
          '<p>' + esc(card.a) + '</p>' +
          deepQ.btn + deepQ.panel +
        '</div></div>';
    }

    els.content.innerHTML =
      '<div class="quiz-wrap">' +
        (state.quizSession ? '<div class="quiz-session-banner"><span>' + icon('zap') + esc(state.quizSession.label) + '</span><b>' + (state.idx + 1) + ' / ' + state.deck.length + '</b></div>' : '') +
        '<div class="quiz-topbar">' +
          '<div class="quiz-score">' + icon('trophy') +
            '<span>SCORE: ' + state.quiz.score + '/' + state.quiz.attempted +
            (state.lifetime.attempted ? ' · 누적 ' + lifetimeRate + '%' : '') + '</span></div>' +
          '<div style="display:flex;gap:.5rem;align-items:center;flex-wrap:wrap">' +
            (state.chapterQuiz
              ? '<button class="review-btn active" id="chapter-exit" title="레슨으로 돌아가기">' +
                  icon('chevronLeft') + ' ' + esc(state.chapterQuiz.title.length > 14 ? state.chapterQuiz.title.slice(0, 14) + '…' : state.chapterQuiz.title) + ' 나가기</button>'
              : '<button class="review-btn' + (state.reviewMode ? ' active' : '') + '" id="review-btn" title="틀린 문제만 다시 풀기">' +
                  icon('repeat') + ' 오답 ' + state.wrongIds.length + '</button>') +
            catChipHtml(card, 'quiz-cat') +
          '</div>' +
        '</div>' +
        '<div class="quiz-q"><div class="qnum">Q.' + card.id + '</div><h2>' + esc(card.q) + '</h2></div>' +
        '<div class="quiz-options">' + optionsHtml + '</div>' +
        resultHtml +
      '</div>';

    els.content.querySelectorAll('.quiz-opt').forEach(function (btn) {
      btn.addEventListener('click', function () { answerQuiz(parseInt(btn.dataset.opt, 10)); });
    });
    var reviewBtn = document.getElementById('review-btn');
    if (reviewBtn) reviewBtn.addEventListener('click', toggleReviewMode);
    var chapterExit = document.getElementById('chapter-exit');
    if (chapterExit) chapterExit.addEventListener('click', function () { exitChapterQuiz(false); });
    var quizAiBtn = document.getElementById('quiz-ai-btn');
    if (quizAiBtn) quizAiBtn.addEventListener('click', function () { openAiModal(card); });
    wireDeep('quiz');
  }

  function renderQuizSummary() {
    var total = Math.max(1, state.quiz.attempted);
    var rate = Math.round((state.quiz.score / total) * 100);
    var tone = rate >= 80 ? '완벽한 흐름입니다' : rate >= 60 ? '좋습니다. 틀린 개념만 다듬어보세요' : '핵심 개념을 한 번 더 연결해보세요';
    els.content.innerHTML =
      '<section class="quiz-summary">' +
        '<span class="quiz-summary-kicker">SESSION COMPLETE</span>' +
        '<div class="quiz-summary-ring" style="--score:' + rate + '"><div><strong>' + rate + '%</strong><small>' + state.quiz.score + ' / ' + state.quiz.attempted + ' 정답</small></div></div>' +
        '<h2>' + esc(tone) + '</h2>' +
        '<p>' + esc(state.quizSession.label) + '을 마쳤습니다. 오답은 자동으로 복습 목록에 반영되었습니다.</p>' +
        '<div class="quiz-summary-stats"><span><b>' + state.wrongIds.length + '</b>남은 오답</span><span><b>' + learningMetrics().accuracy + '%</b>누적 정답률</span><span><b>' + learningMetrics().masteredCards + '</b>숙련 카드</span></div>' +
        '<div class="quiz-summary-actions">' +
          '<button class="action-primary" id="summary-retry">' + icon('repeat') + ' 같은 구성 다시 풀기</button>' +
          '<button class="action-secondary" id="summary-home">' + icon('home') + ' 홈으로</button>' +
        '</div>' +
      '</section>';
    document.getElementById('summary-retry').addEventListener('click', function () { startQuizSession(state.quizSession.label, shuffleArray(state.deck)); });
    document.getElementById('summary-home').addEventListener('click', function () { switchMode('home'); });
  }

  function libraryHeaderHtml(active, count) {
    return '<header class="library-head">' +
      '<div class="library-head-copy"><span>KNOWLEDGE LIBRARY</span><h2>시장 지식 탐색</h2><p>카드와 용어를 검색하고, 중요한 인사이트는 저장해 나만의 복습 자료실을 만드세요.</p></div>' +
      '<div><div class="library-tabs" aria-label="탐색 자료 선택">' +
        '<button class="library-tab' + (active === 'cards' ? ' active' : '') + '" data-library-view="list">' + icon('fileText') + ' 인사이트</button>' +
        '<button class="library-tab' + (active === 'glossary' ? ' active' : '') + '" data-library-view="glossary">' + icon('gradCap') + ' 용어사전</button>' +
      '</div><div class="library-meta">' + count + ' RESULTS</div></div>' +
    '</header>';
  }

  function filteredCards() {
    var q = state.searchQuery.trim().toLowerCase();
    return CARDS.filter(function (item) {
      var matchSearch = !q || item.q.toLowerCase().indexOf(q) !== -1 || item.a.toLowerCase().indexOf(q) !== -1 || item.cat.toLowerCase().indexOf(q) !== -1;
      var matchCat = state.catFilter === 'All' || item.cat === state.catFilter || (state.catFilter === 'Saved' && state.bookmarks.indexOf(item.id) !== -1);
      return matchSearch && matchCat;
    });
  }

  function listItemHtml(item) {
    var cat = catOf(item);
    var saved = state.bookmarks.indexOf(item.id) !== -1;
    return '<article class="list-item">' +
      '<div class="list-item-head">' +
        '<div class="list-item-cat" style="color:' + cat.color + ';background:' + cat.bg + ';border-color:' + cat.border + '">' + icon(cat.icon) + ' ' + esc(item.cat) + '</div>' +
        '<span class="list-item-num">#' + item.id + '</span></div>' +
      '<div class="list-item-q">Q. ' + esc(item.q) + '</div>' +
      '<div class="list-item-a">' + esc(item.a) + '</div>' +
      '<div class="list-item-actions">' +
        '<button class="list-action' + (saved ? ' saved' : '') + '" data-save-card="' + item.id + '">' + icon('bookmark') + (saved ? ' 저장됨' : ' 저장') + '</button>' +
        '<button class="list-action" data-open-card="' + item.id + '">' + icon('bookOpen') + ' 카드로 보기</button>' +
      '</div>' +
    '</article>';
  }

  function wireLibraryTabs() {
    els.content.querySelectorAll('[data-library-view]').forEach(function (button) {
      button.addEventListener('click', function () { switchMode(button.dataset.libraryView); });
    });
  }

  function wireListActions() {
    els.content.querySelectorAll('[data-save-card]').forEach(function (button) {
      button.addEventListener('click', function () {
        toggleBookmark(Number(button.dataset.saveCard));
        refreshListItems();
      });
    });
    els.content.querySelectorAll('[data-open-card]').forEach(function (button) {
      button.addEventListener('click', function () {
        var id = Number(button.dataset.openCard);
        state.mode = 'card';
        state.cardFocusIds = null;
        state.cardDeckTitle = '';
        state.deck = CARDS.slice();
        state.idx = Math.max(0, state.deck.findIndex(function (card) { return card.id === id; }));
        state.flipped = false;
        updateRoute('card', id);
        render();
        window.scrollTo(0, 0);
      });
    });
  }

  function renderListMode() {
    els.main.classList.add('scroll-top');
    var cats = ['All', 'Saved'];
    CARDS.forEach(function (card) { if (cats.indexOf(card.cat) === -1) cats.push(card.cat); });
    var filtered = filteredCards();
    var chipsHtml = cats.map(function (cat) {
      var label = cat === 'All' ? '전체' : cat === 'Saved' ? '저장됨 ' + state.bookmarks.length : cat;
      return '<button class="cat-filter' + (state.catFilter === cat ? ' active' : '') + '" data-cat="' + esc(cat) + '">' + esc(label) + '</button>';
    }).join('');
    var itemsHtml = filtered.length ? filtered.map(listItemHtml).join('') : '<div class="empty-state">' + icon('search') + '<p>조건에 맞는 인사이트가 없습니다.</p></div>';

    els.content.innerHTML = '<div class="list-wrap library-shell">' +
      libraryHeaderHtml('cards', filtered.length) +
      '<div class="list-filters"><div class="search-box">' + icon('search') + '<input type="search" id="search-input" placeholder="질문·답변·카테고리 검색" value="' + esc(state.searchQuery) + '"></div><div class="cat-filters">' + chipsHtml + '</div></div>' +
      '<div class="list-items">' + itemsHtml + '</div></div>';

    var input = document.getElementById('search-input');
    input.addEventListener('input', function () { state.searchQuery = input.value; refreshListItems(); });
    els.content.querySelectorAll('.cat-filter').forEach(function (button) {
      button.addEventListener('click', function () { state.catFilter = button.dataset.cat; renderListMode(); });
    });
    wireLibraryTabs();
    wireListActions();
  }

  function refreshListItems() {
    var filtered = filteredCards();
    var listEl = els.content.querySelector('.list-items');
    if (listEl) listEl.innerHTML = filtered.length ? filtered.map(listItemHtml).join('') : '<div class="empty-state">' + icon('search') + '<p>조건에 맞는 인사이트가 없습니다.</p></div>';
    var meta = els.content.querySelector('.library-meta');
    if (meta) meta.textContent = filtered.length + ' RESULTS';
    wireListActions();
  }

  /* ---------- 학습 모드: 시각화 컴포넌트 ---------- */
  var TONE_CLASS = { good: 'tone-good', bad: 'tone-bad', warn: 'tone-warn', info: 'tone-info' };

  function toneCls(tone) { return TONE_CLASS[tone] || ''; }

  function vizChip(step) {
    var t = typeof step === 'string' ? step : step.t;
    var tone = typeof step === 'string' ? '' : toneCls(step.tone);
    return '<span class="flow-chip ' + tone + '">' + esc(t) + '</span>';
  }

  function vizNote(viz) {
    return viz.note ? '<p class="viz-note">' + icon('lightbulb') + esc(viz.note) + '</p>' : '';
  }

  function vizTitle(viz) {
    return viz.title ? '<div class="viz-heading">' + esc(viz.title) + '</div>' : '';
  }

  function vizFlow(viz) {
    var arrow = '<span class="flow-arrow">' + icon('chevronRight') + '</span>';
    var branches = (viz.branches || []).map(function (b) {
      return '<div class="flow-branch">' +
        (b.label ? '<span class="flow-branch-label">' + esc(b.label) + '</span>' : '') +
        '<div class="flow-chain">' + (b.steps || []).map(vizChip).join(arrow) + '</div>' +
      '</div>';
    }).join('');
    return '<div class="viz viz-flow">' + vizTitle(viz) +
      (viz.start ? '<div class="flow-start">' + esc(viz.start) + '</div>' : '') +
      branches + vizNote(viz) + '</div>';
  }

  function vizSteps(viz) {
    var items = (viz.items || []).map(function (it, i) {
      return '<div class="step-item">' +
        '<div class="step-badge"><span>' + (i + 1) + '</span></div>' +
        '<div class="step-body">' +
          (it.tag ? '<span class="step-tag">' + esc(it.tag) + '</span>' : '') +
          '<strong>' + esc(it.t) + '</strong>' +
          (it.d ? '<p>' + esc(it.d) + '</p>' : '') +
        '</div>' +
      '</div>';
    }).join('');
    return '<div class="viz viz-steps">' + vizTitle(viz) + items + vizNote(viz) + '</div>';
  }

  function vizCards(viz) {
    var items = (viz.items || []).map(function (it) {
      return '<div class="vcard">' +
        (it.k ? '<span class="vcard-k">' + esc(it.k) + '</span>' : '') +
        '<strong>' + esc(it.v) + '</strong>' +
        (it.d ? '<p>' + esc(it.d) + '</p>' : '') +
      '</div>';
    }).join('');
    return '<div class="viz viz-cards">' + vizTitle(viz) +
      '<div class="vcard-grid cols-' + ((viz.items || []).length >= 3 ? 3 : 2) + '">' + items + '</div>' +
      vizNote(viz) + '</div>';
  }

  function vizCompare(viz) {
    function col(c) {
      if (!c) return '';
      return '<div class="cmp-col ' + toneCls(c.tone) + '">' +
        '<h5>' + esc(c.title) + '</h5>' +
        '<ul>' + (c.items || []).map(function (x) { return '<li>' + icon('chevronRight') + '<span>' + esc(x) + '</span></li>'; }).join('') + '</ul>' +
      '</div>';
    }
    return '<div class="viz viz-compare">' + vizTitle(viz) +
      '<div class="cmp-grid">' + col(viz.a) + col(viz.b) + '</div>' + vizNote(viz) + '</div>';
  }

  function vizMatrix(viz) {
    var head = '<tr><th>' + esc(viz.corner || '') + '</th>' +
      (viz.cols || []).map(function (c) { return '<th>' + esc(c) + '</th>'; }).join('') + '</tr>';
    var rows = (viz.rows || []).map(function (r) {
      return '<tr><th>' + esc(r.label) + '</th>' +
        (r.cells || []).map(function (c) {
          return '<td class="' + toneCls(c.tone) + '">' + esc(c.t) + '</td>';
        }).join('') + '</tr>';
    }).join('');
    return '<div class="viz viz-matrix">' + vizTitle(viz) +
      '<div class="viz-scroll"><table>' + head + rows + '</table></div>' + vizNote(viz) + '</div>';
  }

  function vizTable(viz) {
    var head = '<tr>' + (viz.head || []).map(function (h) { return '<th>' + esc(h) + '</th>'; }).join('') + '</tr>';
    var rows = (viz.rows || []).map(function (r) {
      return '<tr>' + r.map(function (c, i) {
        return '<td' + (i === 0 ? ' class="first"' : '') + '>' + esc(c) + '</td>';
      }).join('') + '</tr>';
    }).join('');
    return '<div class="viz viz-table">' + vizTitle(viz) +
      '<div class="viz-scroll"><table>' + head + rows + '</table></div>' + vizNote(viz) + '</div>';
  }

  function vizBars(viz) {
    var max = 0;
    (viz.items || []).forEach(function (it) { if (it.value > max) max = it.value; });
    if (!max) max = 100;
    var rows = (viz.items || []).map(function (it) {
      var w = Math.max(3, Math.round((it.value / max) * 100));
      return '<div class="bar-row">' +
        '<span class="bar-label">' + esc(it.label) + '</span>' +
        '<div class="bar-track"><div class="bar-fill ' + toneCls(it.tone) + '" style="width:' + w + '%"></div></div>' +
        '<span class="bar-value">' + esc(it.display || '') + '</span>' +
      '</div>';
    }).join('');
    return '<div class="viz viz-bars">' + vizTitle(viz) + rows + vizNote(viz) + '</div>';
  }

  function vizTimeline(viz) {
    var items = (viz.items || []).map(function (it) {
      return '<div class="tl-item">' +
        '<div class="tl-year">' + esc(it.year) + '</div>' +
        '<div class="tl-body">' +
          '<div class="tl-head"><strong>' + esc(it.title) + '</strong>' +
            (it.stat ? '<span class="tl-stat">' + esc(it.stat) + '</span>' : '') + '</div>' +
          (it.sub ? '<p>' + esc(it.sub) + '</p>' : '') +
        '</div>' +
      '</div>';
    }).join('');
    return '<div class="viz viz-timeline">' + vizTitle(viz) + items + vizNote(viz) + '</div>';
  }

  function vizCycle(viz) {
    var phases = viz.phases || [];
    // 경기 순환 곡선: 침체 바닥 → 회복 → 확장(정점) → 둔화 → 침체
    var zones = phases.map(function (p, i) {
      return '<rect x="' + (i * 100) + '" y="0" width="100" height="110" fill="' + esc(p.color) + '" opacity="0.07"/>' +
        '<text x="' + (i * 100 + 50) + '" y="102" text-anchor="middle" fill="' + esc(p.color) + '" font-size="11" font-weight="700">' + esc(p.name) + '</text>';
    }).join('');
    var svg = '<svg viewBox="0 0 400 110" class="cycle-svg" aria-hidden="true">' + zones +
      '<path d="M 0 88 C 60 84, 80 40, 150 22 C 185 14, 215 14, 250 22 C 320 40, 340 84, 400 88" fill="none" stroke="#f59e0b" stroke-width="2.5" stroke-linecap="round"/>' +
      '<circle cx="0" cy="88" r="4" fill="#fb7185"/><circle cx="200" cy="16" r="4" fill="#fbbf24"/>' +
      '</svg>';
    var cards = phases.map(function (p) {
      return '<div class="cycle-card" style="border-color:' + esc(p.color) + '33">' +
        '<strong style="color:' + esc(p.color) + '">' + esc(p.name) + '</strong>' +
        '<p>' + esc(p.desc) + '</p>' +
        '<span>' + esc(p.sectors) + '</span>' +
      '</div>';
    }).join('');
    return '<div class="viz viz-cycle">' + vizTitle(viz) + svg +
      '<div class="cycle-grid">' + cards + '</div>' + vizNote(viz) + '</div>';
  }

  function vizSpectrum(viz) {
    var markers = (viz.markers || []).map(function (m) {
      return '<div class="spec-marker" style="left:' + Math.min(100, Math.max(0, m.pos)) + '%">' +
        '<span class="spec-pin"></span><span class="spec-label">' + esc(m.label) + '</span>' +
      '</div>';
    }).join('');
    return '<div class="viz viz-spectrum">' + vizTitle(viz) +
      '<div class="spec-ends"><span class="tone-info-text">' + esc(viz.left) + '</span><span class="tone-bad-text">' + esc(viz.right) + '</span></div>' +
      '<div class="spec-bar">' + markers + '</div>' +
      '<div class="spec-space"></div>' + vizNote(viz) + '</div>';
  }

  function vizDotplot(viz) {
    var levels = viz.levels || [];
    var cols = viz.cols || [];
    var lh = 26, colW = 92, leftPad = 52, topPad = 10;
    var H = topPad + levels.length * lh + 26;
    var W = leftPad + cols.length * colW;
    var parts = [];
    levels.forEach(function (lv, li) {
      var y = topPad + li * lh + lh / 2;
      parts.push('<text x="' + (leftPad - 10) + '" y="' + (y + 4) + '" text-anchor="end" fill="#64748b" font-size="11">' + esc(lv) + '</text>');
      parts.push('<line x1="' + leftPad + '" y1="' + y + '" x2="' + (W - 8) + '" y2="' + y + '" stroke="rgba(255,255,255,0.06)" stroke-width="1"/>');
    });
    cols.forEach(function (c, ci) {
      var cx = leftPad + ci * colW + colW / 2;
      parts.push('<text x="' + cx + '" y="' + (H - 6) + '" text-anchor="middle" fill="#94a3b8" font-size="11" font-weight="700">' + esc(c.label) + '</text>');
      (c.dots || []).forEach(function (count, li) {
        var y = topPad + li * lh + lh / 2;
        var start = cx - ((count - 1) * 9) / 2;
        for (var d = 0; d < count; d++) {
          parts.push('<circle cx="' + (start + d * 9) + '" cy="' + y + '" r="3.2" fill="#fbbf24" opacity="0.9"/>');
        }
      });
    });
    return '<div class="viz viz-dotplot">' + vizTitle(viz) +
      '<div class="viz-scroll"><svg viewBox="0 0 ' + W + ' ' + H + '" class="dotplot-svg" style="min-width:' + Math.round(W * 0.9) + 'px" aria-hidden="true">' + parts.join('') + '</svg></div>' +
      vizNote(viz) + '</div>';
  }

  function vizChecklist(viz) {
    var items = (viz.items || []).map(function (x) {
      return '<li>' + icon('checkCircle') + '<span>' + esc(x) + '</span></li>';
    }).join('');
    return '<div class="viz viz-checklist">' + vizTitle(viz) + '<ul>' + items + '</ul>' + vizNote(viz) + '</div>';
  }

  function vizYieldCurve(viz) {
    var labels = viz.labels || [];
    var series = viz.series || [];
    if (labels.length < 2 || !series.length) return '';
    var colors = { good: '#34d399', bad: '#fb7185', warn: '#fbbf24', info: '#60a5fa' };
    var all = [];
    series.forEach(function (s) { (s.values || []).forEach(function (v) { if (isFinite(v)) all.push(Number(v)); }); });
    if (!all.length) return '';
    var min = Math.min.apply(null, all), max = Math.max.apply(null, all);
    var pad = Math.max(0.25, (max - min) * 0.18);
    min -= pad; max += pad;
    var W = 620, H = 230, left = 48, right = 18, top = 22, bottom = 44;
    function xAt(i) { return left + (i / (labels.length - 1)) * (W - left - right); }
    function yAt(v) { return top + ((max - Number(v)) / (max - min || 1)) * (H - top - bottom); }
    var grid = '';
    for (var g = 0; g < 4; g++) {
      var gy = top + (g / 3) * (H - top - bottom);
      var gv = max - (g / 3) * (max - min);
      grid += '<line x1="' + left + '" y1="' + gy + '" x2="' + (W - right) + '" y2="' + gy + '" stroke="rgba(255,255,255,.07)"/>' +
        '<text x="' + (left - 8) + '" y="' + (gy + 4) + '" text-anchor="end" fill="#64748b" font-size="11">' + gv.toFixed(1) + '</text>';
    }
    var labelSvg = labels.map(function (label, i) {
      return '<text x="' + xAt(i) + '" y="' + (H - 14) + '" text-anchor="middle" fill="#94a3b8" font-size="12">' + esc(label) + '</text>';
    }).join('');
    var paths = series.map(function (s) {
      var values = (s.values || []).slice(0, labels.length);
      var points = values.map(function (v, i) { return xAt(i) + ',' + yAt(v); }).join(' ');
      var color = colors[s.tone] || colors.info;
      var dots = values.map(function (v, i) {
        return '<circle cx="' + xAt(i) + '" cy="' + yAt(v) + '" r="4" fill="' + color + '" stroke="#101319" stroke-width="2"/>';
      }).join('');
      return '<polyline points="' + points + '" fill="none" stroke="' + color + '" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>' + dots;
    }).join('');
    var legend = series.map(function (s) {
      var color = colors[s.tone] || colors.info;
      return '<span><i style="--legend:' + color + '"></i>' + esc(s.name) + '</span>';
    }).join('');
    return '<figure class="viz viz-yieldcurve">' + vizTitle(viz) +
      '<div class="curve-legend">' + legend + '</div>' +
      '<div class="viz-scroll" tabindex="0"><svg viewBox="0 0 ' + W + ' ' + H + '" class="curve-svg" role="img" aria-label="' + esc(viz.title || '곡선 비교') + '">' + grid + paths + labelSvg + '</svg></div>' +
      vizNote(viz) + '</figure>';
  }

  function vizQuadrant(viz) {
    var cells = (viz.cells || []).map(function (cell) {
      return '<div class="quad-cell ' + toneCls(cell.tone) + '"><strong>' + esc(cell.title) + '</strong><p>' + esc(cell.text) + '</p></div>';
    }).join('');
    return '<figure class="viz viz-quadrant">' + vizTitle(viz) +
      '<div class="quad-y-label quad-y-top">' + esc(viz.yTop) + '</div>' +
      '<div class="quad-grid">' + cells + '</div>' +
      '<div class="quad-y-label">' + esc(viz.yBottom) + '</div>' +
      '<div class="quad-x-labels"><span>' + esc(viz.xLeft) + '</span><span>' + esc(viz.xRight) + '</span></div>' +
      vizNote(viz) + '</figure>';
  }

  function vizLayers(viz) {
    var items = (viz.items || []).map(function (item, i) {
      return '<div class="layer-row ' + toneCls(item.tone) + '">' +
        '<span class="layer-index">' + (i + 1) + '</span>' +
        '<div><strong>' + esc(item.label) + '</strong><p>' + esc(item.value) + '</p></div>' +
      '</div>';
    }).join('');
    return '<figure class="viz viz-layers">' + vizTitle(viz) + '<div class="layer-stack">' + items + '</div>' + vizNote(viz) + '</figure>';
  }

  function vizFormula(viz) {
    var items = (viz.items || []).map(function (item) {
      return '<div class="formula-item"><span>' + esc(item.k) + '</span><strong>' + esc(item.v) + '</strong></div>';
    }).join('');
    return '<figure class="viz viz-formula">' + vizTitle(viz) +
      '<div class="formula-equation">' + esc(viz.equation) + '</div>' +
      '<div class="formula-grid">' + items + '</div>' +
      (viz.example ? '<figcaption class="formula-example">' + icon('lightbulb') + '<span>' + esc(viz.example) + '</span></figcaption>' : '') +
      vizNote(viz) + '</figure>';
  }

  function vizScenario(viz) {
    var branches = (viz.branches || []).map(function (item) {
      return '<div class="scenario-branch ' + toneCls(item.tone) + '">' +
        '<span class="scenario-line" aria-hidden="true"></span>' +
        '<div><strong>' + esc(item.label) + '</strong><p>' + esc(item.outcome) + '</p></div>' +
      '</div>';
    }).join('');
    return '<figure class="viz viz-scenario">' + vizTitle(viz) +
      '<div class="scenario-root">' + esc(viz.root) + '</div>' +
      '<div class="scenario-branches">' + branches + '</div>' + vizNote(viz) + '</figure>';
  }

  function renderViz(viz) {
    if (!viz || !viz.type) return '';
    try {
      switch (viz.type) {
        case 'flow': return vizFlow(viz);
        case 'steps': return vizSteps(viz);
        case 'cards': return vizCards(viz);
        case 'compare': return vizCompare(viz);
        case 'matrix': return vizMatrix(viz);
        case 'table': return vizTable(viz);
        case 'bars': return vizBars(viz);
        case 'timeline': return vizTimeline(viz);
        case 'cycle': return vizCycle(viz);
        case 'spectrum': return vizSpectrum(viz);
        case 'dotplot': return vizDotplot(viz);
        case 'checklist': return vizChecklist(viz);
        case 'yieldcurve': return vizYieldCurve(viz);
        case 'quadrant': return vizQuadrant(viz);
        case 'layers': return vizLayers(viz);
        case 'formula': return vizFormula(viz);
        case 'scenario': return vizScenario(viz);
        default: return '';
      }
    } catch (e) {
      if (window.console && console.error) console.error('시각화 렌더링 오류:', viz.type, e);
      return '<div class="viz viz-error">시각화를 불러오지 못했습니다.</div>';
    }
  }

  /* ---------- 학습 모드 (챕터형 레슨) ---------- */
  function markLessonRead(key, read) {
    var pos = state.readLessons.indexOf(key);
    if (read && pos === -1) state.readLessons.push(key);
    if (!read && pos !== -1) state.readLessons.splice(pos, 1);
    if (read) {
      var lesson = LESSONS.find(function (item) { return item.key === key; });
      if (lesson && Array.isArray(lesson.sections)) {
        lesson.sections.forEach(function (_, i) {
          var seenKey = key + ':' + i;
          if (state.studySeen.indexOf(seenKey) === -1) state.studySeen.push(seenKey);
        });
        store.set('studySeen', state.studySeen);
      }
    }
    store.set('readLessons', state.readLessons);
  }

  function markSectionSeen(lessonKey, sectionIndex) {
    var seenKey = lessonKey + ':' + sectionIndex;
    if (state.studySeen.indexOf(seenKey) !== -1) return false;
    state.studySeen.push(seenKey);
    store.set('studySeen', state.studySeen);
    return true;
  }

  function lessonSeenCount(lesson) {
    if (!lesson || !Array.isArray(lesson.sections)) return 0;
    if (state.readLessons.indexOf(lesson.key) !== -1) return lesson.sections.length;
    return lesson.sections.filter(function (_, i) {
      return state.studySeen.indexOf(lesson.key + ':' + i) !== -1;
    }).length;
  }

  function trackInfo(key) {
    var tracks = typeof LEARNING_TRACKS !== 'undefined' ? LEARNING_TRACKS : [];
    return tracks.find(function (track) { return track.key === key; }) || { key: key || 'all', title: '학습', short: '학습', description: '' };
  }

  function openLesson(key) {
    var exists = LESSONS.some(function (lesson) { return lesson.key === key; });
    if (!exists) return;
    state.lessonKey = key;
    state.lastLesson = key;
    store.set('lastLesson', key);
    updateRoute('study', key);
    render();
    window.scrollTo(0, 0);
  }

  function renderStudyMode() {
    els.main.classList.add('scroll-top');
    if (!LESSONS.length) {
      els.content.innerHTML = '<div class="empty-state">' + icon('library') + '<p>레슨을 준비 중입니다.</p></div>';
      return;
    }
    if (state.lessonKey) renderLessonDetail();
    else renderLessonList();
  }

  function renderLessonList() {
    var readCount = LESSONS.filter(function (l) { return state.readLessons.indexOf(l.key) !== -1; }).length;
    var totalSections = LESSONS.reduce(function (sum, l) { return sum + ((l.sections && l.sections.length) || 0); }, 0);
    var totalMinutes = LESSONS.reduce(function (sum, l) { return sum + (Number(l.minutes) || 0); }, 0);
    var progress = LESSONS.length ? Math.round((readCount / LESSONS.length) * 100) : 0;
    var query = state.studyQuery.trim().toLowerCase();
    var filtered = LESSONS.filter(function (lesson) {
      var trackMatch = state.studyTrack === 'all' || lesson.track === state.studyTrack;
      var haystack = [lesson.title, lesson.tagline, lesson.level].concat(lesson.tags || []).join(' ').toLowerCase();
      return trackMatch && (!query || haystack.indexOf(query) !== -1);
    });
    var continueLesson = LESSONS.find(function (l) { return l.key === state.lastLesson; }) ||
      LESSONS.find(function (l) { return state.readLessons.indexOf(l.key) === -1; }) || LESSONS[0];

    function cardHtml(l) {
      var index = LESSONS.indexOf(l);
      var read = state.readLessons.indexOf(l.key) !== -1;
      var seen = lessonSeenCount(l);
      var sectionCount = (l.sections && l.sections.length) || 0;
      var cardProgress = read ? 100 : (sectionCount ? Math.round((seen / sectionCount) * 100) : 0);
      var status = read ? '완독' : (seen ? seen + '/' + sectionCount + ' 섹션' : '시작 전');
      var t = trackInfo(l.track);
      return '<article class="lesson-card-wrap">' +
        '<a class="lesson-card' + (read ? ' read' : '') + '" href="#study/' + esc(l.key) + '" data-lesson="' + esc(l.key) + '">' +
          '<span class="lesson-icon">' + icon(LESSON_ICONS[l.key] || 'bookOpen') + '</span>' +
          '<span class="lesson-info">' +
            '<span class="lesson-title-row"><span class="lesson-no">CH.' + (index + 1) + '</span>' +
              '<span class="lesson-track-badge">' + esc(t.short || t.title) + '</span>' +
              (read ? '<span class="lesson-read-badge">' + icon('checkCircle') + ' 완독</span>' : '') + '</span>' +
            '<span class="lesson-name" role="heading" aria-level="3">' + esc(l.title) + '</span>' +
            '<span class="lesson-tagline">' + esc(l.tagline) + '</span>' +
            '<span class="lesson-meta-row"><span>' + icon('clock') + ' ' + l.minutes + '분</span><span>' + esc(l.level || '기초') + '</span><span>' + sectionCount + '개 섹션</span></span>' +
            '<span class="lesson-card-progress"><i style="width:' + cardProgress + '%"></i></span>' +
            '<span class="lesson-card-status">' + esc(status) + '</span>' +
          '</span>' +
          '<span class="lesson-arrow">' + icon('chevronRight') + '</span>' +
        '</a>' +
      '</article>';
    }

    var tracks = (typeof LEARNING_TRACKS !== 'undefined' ? LEARNING_TRACKS : []).filter(function (t) { return t.key !== 'all'; });
    var groupsHtml;
    if (!filtered.length) {
      groupsHtml = '<div class="empty-state study-empty">' + icon('search') + '<p>조건에 맞는 챕터가 없습니다.</p><span>검색어나 학습 트랙을 바꿔보세요.</span></div>';
    } else if (state.studyTrack !== 'all' || query) {
      groupsHtml = '<div class="lesson-grid">' + filtered.map(cardHtml).join('') + '</div>';
    } else {
      groupsHtml = tracks.map(function (track) {
        var lessons = filtered.filter(function (l) { return l.track === track.key; });
        if (!lessons.length) return '';
        return '<section class="track-section" aria-labelledby="track-' + esc(track.key) + '">' +
          '<header class="track-head"><div><span>' + esc(track.short) + ' TRACK</span><h3 id="track-' + esc(track.key) + '">' + esc(track.title) + '</h3><p>' + esc(track.description) + '</p></div><b>' + lessons.length + ' CHAPTERS</b></header>' +
          '<div class="lesson-grid">' + lessons.map(cardHtml).join('') + '</div>' +
        '</section>';
      }).join('');
    }

    var filtersHtml = (typeof LEARNING_TRACKS !== 'undefined' ? LEARNING_TRACKS : []).map(function (track) {
      var active = state.studyTrack === track.key;
      return '<button class="study-filter' + (active ? ' active' : '') + '" data-study-track="' + esc(track.key) + '" aria-pressed="' + (active ? 'true' : 'false') + '">' + esc(track.title) + '</button>';
    }).join('');

    els.content.innerHTML =
      '<div class="list-wrap study-dashboard">' +
        '<section class="study-hero">' +
          '<div class="study-hero-copy"><span class="study-eyebrow">NASDAQ 101 · LEARNING PATH</span><h2>시장을 외우지 않고<br><em>연결해서 읽는 법</em></h2><p>금리에서 기업 이익, 시장 내부, 포지션 운영까지 하나의 흐름으로 익히는 반응형 커리큘럼입니다.</p>' +
            (continueLesson ? '<button class="study-continue" id="study-continue" data-lesson="' + esc(continueLesson.key) + '">' + icon('bookOpen') + '<span><small>' + (state.lastLesson ? '이어서 학습' : '추천 시작') + '</small><strong>' + esc(continueLesson.title) + '</strong></span>' + icon('chevronRight') + '</button>' : '') +
          '</div>' +
          '<div class="study-ring" style="--study-progress:' + progress + '" aria-label="전체 완독률 ' + progress + '%"><div><strong>' + progress + '%</strong><span>' + readCount + ' / ' + LESSONS.length + ' 완독</span></div></div>' +
        '</section>' +
        '<div class="study-stats"><div><strong>' + LESSONS.length + '</strong><span>심층 챕터</span></div><div><strong>' + totalSections + '</strong><span>시각화 섹션</span></div><div><strong>' + Math.floor(totalMinutes / 60) + 'h ' + (totalMinutes % 60) + 'm</strong><span>예상 학습시간</span></div><div><strong>' + CARDS.length + '</strong><span>연결 카드</span></div></div>' +
        '<section class="study-tools" aria-label="학습 챕터 찾기"><div class="study-search">' + icon('search') + '<input id="study-search" type="search" placeholder="챕터·개념 검색" value="' + esc(state.studyQuery) + '" aria-label="학습 챕터 검색"></div><div class="study-filters" role="group" aria-label="학습 트랙">' + filtersHtml + '</div></section>' +
        '<div class="study-roadmap">' + groupsHtml + '</div>' +
      '</div>';

    var continueBtn = document.getElementById('study-continue');
    if (continueBtn) continueBtn.addEventListener('click', function () { openLesson(continueBtn.dataset.lesson); });
    els.content.querySelectorAll('.lesson-card').forEach(function (link) {
      link.addEventListener('click', function (e) { e.preventDefault(); openLesson(link.dataset.lesson); });
    });
    els.content.querySelectorAll('[data-study-track]').forEach(function (btn) {
      btn.addEventListener('click', function () { state.studyTrack = btn.dataset.studyTrack; render(); window.scrollTo(0, 0); });
    });
    var searchInput = document.getElementById('study-search');
    if (searchInput) {
      var composingSearch = false;
      function applyStudySearch(value, cursor) {
        state.studyQuery = value;
        render();
        var nextInput = document.getElementById('study-search');
        if (nextInput) {
          nextInput.focus();
          if (typeof cursor === 'number') nextInput.setSelectionRange(cursor, cursor);
        }
      }
      searchInput.addEventListener('compositionstart', function () { composingSearch = true; });
      searchInput.addEventListener('compositionend', function () {
        composingSearch = false;
        applyStudySearch(searchInput.value, searchInput.selectionStart);
      });
      searchInput.addEventListener('input', function (event) {
        // 한글 등 IME 조합 중 DOM을 교체하면 글자가 자모 단위로 끊길 수 있다.
        state.studyQuery = searchInput.value;
        if (composingSearch || event.isComposing || !searchInput.isConnected) return;
        applyStudySearch(searchInput.value, searchInput.selectionStart);
      });
    }
  }

  function updateLessonProgressUi(lesson, activeIndex) {
    var seen = lessonSeenCount(lesson);
    var total = lesson.sections.length;
    var pct = total ? Math.round((seen / total) * 100) : 0;
    els.content.querySelectorAll('.lesson-progress-value').forEach(function (el) { el.textContent = seen + ' / ' + total + ' 섹션'; });
    els.content.querySelectorAll('.lesson-progress-fill').forEach(function (el) { el.style.width = pct + '%'; });
    if (typeof activeIndex === 'number') {
      els.content.querySelectorAll('[data-section-target]').forEach(function (btn) {
        var current = Number(btn.dataset.sectionTarget) === activeIndex;
        btn.classList.toggle('active', current);
        if (current) btn.setAttribute('aria-current', 'step'); else btn.removeAttribute('aria-current');
      });
    }
  }

  function wireLessonProgress(lesson) {
    var sectionEls = Array.prototype.slice.call(els.content.querySelectorAll('.lesson-section[data-section-index]'));
    if (!sectionEls.length) return;
    markSectionSeen(lesson.key, 0);
    updateLessonProgressUi(lesson, 0);
    if (!('IntersectionObserver' in window)) return;
    lessonObserver = new IntersectionObserver(function (entries) {
      var visible = entries.filter(function (entry) { return entry.isIntersecting; }).sort(function (a, b) { return b.intersectionRatio - a.intersectionRatio; });
      if (!visible.length) return;
      var index = Number(visible[0].target.dataset.sectionIndex);
      markSectionSeen(lesson.key, index);
      updateLessonProgressUi(lesson, index);
    }, { rootMargin: '-22% 0px -60% 0px', threshold: [0, 0.15, 0.35] });
    sectionEls.forEach(function (section) { lessonObserver.observe(section); });
  }

  function renderLessonDetail() {
    var idx = -1;
    for (var i = 0; i < LESSONS.length; i++) if (LESSONS[i].key === state.lessonKey) { idx = i; break; }
    if (idx === -1) { state.lessonKey = null; renderLessonList(); return; }
    var l = LESSONS[idx];
    if (!Array.isArray(l.sections) || !l.sections.length) { state.lessonKey = null; renderLessonList(); return; }
    var read = state.readLessons.indexOf(l.key) !== -1;
    state.lastLesson = l.key;
    store.set('lastLesson', l.key);

    var sectionsHtml = l.sections.map(function (s, si) {
      var pointsHtml = (s.points && s.points.length)
        ? '<ul class="lesson-points">' + s.points.map(function (p) {
            return '<li>' + icon('chevronRight') + '<span>' + esc(p) + '</span></li>';
          }).join('') + '</ul>'
        : '';
      var visuals = s.visuals || (s.viz ? [s.viz] : []);
      return '<section class="lesson-section" id="lesson-section-' + si + '" data-section-index="' + si + '" tabindex="-1">' +
        '<h3><span>' + (si + 1) + '</span> ' + esc(s.h) + '</h3>' +
        '<p>' + esc(s.body) + '</p>' + visuals.map(renderViz).join('') + pointsHtml +
      '</section>';
    }).join('');

    var tocHtml = l.sections.map(function (s, si) {
      return '<button data-section-target="' + si + '"><span>' + (si + 1) + '</span>' + esc(s.h) + '</button>';
    }).join('');
    var objectivesHtml = (l.objectives || []).map(function (objective) { return '<li>' + icon('checkCircle') + '<span>' + esc(objective) + '</span></li>'; }).join('');
    var tagsHtml = (l.tags || []).map(function (tag) { return '<span>' + esc(tag) + '</span>'; }).join('');
    var sourceHtml = (l.sources || []).map(function (source) {
      var url = /^https:\/\//.test(source.url || '') ? source.url : '#';
      return '<a href="' + esc(url) + '" target="_blank" rel="noopener noreferrer"><span>' + esc(source.title) + '</span>' + icon('chevronRight') + '</a>';
    }).join('');
    var track = trackInfo(l.track);

    var prevL = idx > 0 ? LESSONS[idx - 1] : null;
    var nextL = idx < LESSONS.length - 1 ? LESSONS[idx + 1] : null;

    els.content.innerHTML =
      '<div class="list-wrap lesson-detail lesson-detail-wrap">' +
        '<button class="lesson-back" id="lesson-back">' + icon('chevronLeft') + ' 목록으로</button>' +
        '<header class="lesson-head">' +
          '<div class="lesson-head-meta"><span class="lesson-no">CHAPTER ' + (idx + 1) + '</span><span>' + esc(track.title) + '</span><span>' + esc(l.level || '기초') + '</span></div>' +
          '<h2 id="lesson-title" tabindex="-1">' + esc(l.title) + '</h2>' +
          '<p>' + esc(l.tagline) + '</p>' +
          '<div class="lesson-head-facts"><span>' + icon('clock') + ' 약 ' + l.minutes + '분</span><span>' + icon('layers') + ' ' + l.sections.length + '개 섹션</span></div>' +
          (tagsHtml ? '<div class="lesson-tags">' + tagsHtml + '</div>' : '') +
        '</header>' +
        '<details class="lesson-mobile-toc"><summary><span>목차</span><b class="lesson-progress-value">' + lessonSeenCount(l) + ' / ' + l.sections.length + ' 섹션</b></summary><nav>' + tocHtml + '</nav></details>' +
        '<div class="lesson-shell">' +
          '<aside class="lesson-toc" aria-label="챕터 목차">' +
            '<div class="toc-progress"><span>학습 진행</span><strong class="lesson-progress-value">' + lessonSeenCount(l) + ' / ' + l.sections.length + ' 섹션</strong><div><i class="lesson-progress-fill" style="width:' + Math.round((lessonSeenCount(l) / l.sections.length) * 100) + '%"></i></div></div>' +
            (objectivesHtml ? '<div class="toc-objectives"><h3>학습 목표</h3><ul>' + objectivesHtml + '</ul></div>' : '') +
            '<nav class="toc-nav">' + tocHtml + '</nav>' +
          '</aside>' +
          '<article class="lesson-article">' +
            sectionsHtml +
            '<div class="lesson-takeaway">' + icon('lightbulb') + '<div><h4>핵심 한 줄</h4><p>' + esc(l.takeaway) + '</p></div></div>' +
            (sourceHtml ? '<details class="lesson-sources"><summary>공식 자료와 더 읽을거리 <span>' + (l.sources || []).length + '</span></summary><div>' + sourceHtml + '</div></details>' : '') +
            (l.quiz && l.quiz.length
              ? '<button class="lesson-quiz-btn" id="lesson-quiz">' + icon('brain') + '<span><strong>이해도 확인하기</strong><small>이 챕터와 연결된 ' + l.quiz.length + '문제</small></span>' + icon('chevronRight') + '</button>'
              : '') +
            '<button class="lesson-done' + (read ? ' done' : '') + '" id="lesson-done">' +
              icon('checkCircle') + (read ? ' 완독 표시됨 · 취소하려면 클릭' : ' 이 챕터를 완독으로 표시') + '</button>' +
            '<div class="lesson-nav">' +
              (prevL ? '<button class="lesson-nav-btn" data-lesson="' + esc(prevL.key) + '">' + icon('chevronLeft') + '<span><small>이전 챕터</small>' + esc(prevL.title) + '</span></button>' : '<span></span>') +
              (nextL ? '<button class="lesson-nav-btn next" data-lesson="' + esc(nextL.key) + '"><span><small>다음 챕터</small>' + esc(nextL.title) + '</span>' + icon('chevronRight') + '</button>' : '<span></span>') +
            '</div>' +
          '</article>' +
        '</div>' +
      '</div>';

    document.getElementById('lesson-back').addEventListener('click', function () {
      state.lessonKey = null;
      updateRoute('study');
      render();
      window.scrollTo(0, 0);
    });
    var quizBtn = document.getElementById('lesson-quiz');
    if (quizBtn) quizBtn.addEventListener('click', function () { startChapterQuiz(l); });
    document.getElementById('lesson-done').addEventListener('click', function () {
      var nowRead = state.readLessons.indexOf(l.key) === -1;
      markLessonRead(l.key, nowRead);
      if (nowRead) addActivity('lesson', l.title, '완독');
      render();
      if (nowRead) toast('챕터를 완독했습니다!');
    });
    els.content.querySelectorAll('.lesson-nav-btn').forEach(function (btn) { btn.addEventListener('click', function () { openLesson(btn.dataset.lesson); }); });
    els.content.querySelectorAll('[data-section-target]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var sectionIndex = Number(btn.dataset.sectionTarget);
        var target = document.getElementById('lesson-section-' + sectionIndex);
        if (target) {
          markSectionSeen(l.key, sectionIndex);
          updateLessonProgressUi(l, sectionIndex);
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          target.focus({ preventScroll: true });
        }
      });
    });
    wireLessonProgress(l);
  }

  function renderGlossaryMode() {
    els.main.classList.add('scroll-top');
    var q = state.glossQuery.toLowerCase();
    var filtered = GLOSSARY.filter(function (t) {
      return t.term.toLowerCase().indexOf(q) !== -1 ||
        (t.en || '').toLowerCase().indexOf(q) !== -1 ||
        t.def.toLowerCase().indexOf(q) !== -1;
    });

    var itemsHtml = filtered.length
      ? filtered.map(function (t) {
          return '<div class="gloss-item">' +
            '<div class="gloss-term"><strong>' + esc(t.term) + '</strong><span>' + esc(t.en || '') + '</span></div>' +
            '<div class="gloss-def">' + esc(t.def) + '</div>' +
            (t.tip ? '<div class="gloss-tip">' + icon('lightbulb') + '<span>' + esc(t.tip) + '</span></div>' : '') +
          '</div>';
        }).join('')
      : '<div class="empty-state" style="grid-column:1/-1">' + icon('search') + '<p>일치하는 용어가 없습니다.</p></div>';

    els.content.innerHTML =
      '<div class="list-wrap library-shell">' +
        libraryHeaderHtml('glossary', filtered.length) +
        '<div class="list-filters">' +
          '<div class="search-box">' + icon('search') +
            '<input type="search" id="gloss-input" placeholder="한글·영문·설명 검색" value="' + esc(state.glossQuery) + '"></div>' +
        '</div>' +
        '<div class="gloss-grid" id="gloss-grid">' + itemsHtml + '</div>' +
      '</div>';

    wireLibraryTabs();

    var input = document.getElementById('gloss-input');
    input.addEventListener('input', function () {
      state.glossQuery = input.value;
      var grid = document.getElementById('gloss-grid');
      var q2 = state.glossQuery.toLowerCase();
      var f2 = GLOSSARY.filter(function (t) {
        return t.term.toLowerCase().indexOf(q2) !== -1 ||
          (t.en || '').toLowerCase().indexOf(q2) !== -1 ||
          t.def.toLowerCase().indexOf(q2) !== -1;
      });
      grid.innerHTML = f2.length
        ? f2.map(function (t) {
            return '<div class="gloss-item">' +
              '<div class="gloss-term"><strong>' + esc(t.term) + '</strong><span>' + esc(t.en || '') + '</span></div>' +
              '<div class="gloss-def">' + esc(t.def) + '</div>' +
              (t.tip ? '<div class="gloss-tip">' + icon('lightbulb') + '<span>' + esc(t.tip) + '</span></div>' : '') +
            '</div>';
          }).join('')
        : '<div class="empty-state" style="grid-column:1/-1">' + icon('search') + '<p>일치하는 용어가 없습니다.</p></div>';
      var meta = els.content.querySelector('.library-meta');
      if (meta) meta.textContent = f2.length + ' RESULTS';
    });
  }

  /* ---------- 카드·챕터·용어 통합 검색 ---------- */
  function searchResultHtml(kind, key, title, subtitle, iconName, meta) {
    return '<button class="search-result" data-search-kind="' + kind + '" data-search-key="' + esc(key) + '">' +
      '<span class="search-result-icon">' + icon(iconName) + '</span>' +
      '<span class="search-result-copy"><strong>' + esc(title) + '</strong><span>' + esc(subtitle || '') + '</span></span>' +
      '<small>' + esc(meta || '') + '</small></button>';
  }

  function updateGlobalSearchResults() {
    var body = document.getElementById('search-command-body');
    if (!body) return;
    var query = state.globalSearch.query.trim().toLowerCase();
    var cardResults;
    var lessonResults;
    var glossaryResults;

    if (!query) {
      cardResults = adaptiveCards(4);
      lessonResults = LESSONS.filter(function (lesson) { return state.readLessons.indexOf(lesson.key) === -1; }).slice(0, 3);
      glossaryResults = [];
    } else {
      cardResults = CARDS.filter(function (card) {
        return [card.q, card.a, card.cat].join(' ').toLowerCase().indexOf(query) !== -1;
      }).slice(0, 6);
      lessonResults = LESSONS.filter(function (lesson) {
        var text = [lesson.title, lesson.tagline, lesson.level].concat(lesson.tags || []).join(' ').toLowerCase();
        return text.indexOf(query) !== -1;
      }).slice(0, 5);
      glossaryResults = GLOSSARY.filter(function (term) {
        return [term.term, term.en || '', term.def, term.tip || ''].join(' ').toLowerCase().indexOf(query) !== -1;
      }).slice(0, 6);
    }

    var html = '';
    if (lessonResults.length) {
      html += '<div class="search-group-label"><span>' + (query ? '챕터' : '다음 학습 추천') + '</span><span>' + lessonResults.length + '</span></div>' +
        lessonResults.map(function (lesson) { return searchResultHtml('lesson', lesson.key, lesson.title, lesson.tagline, LESSON_ICONS[lesson.key] || 'library', lesson.minutes + '분'); }).join('');
    }
    if (cardResults.length) {
      html += '<div class="search-group-label"><span>' + (query ? '인사이트 카드' : '오늘의 카드 추천') + '</span><span>' + cardResults.length + '</span></div>' +
        cardResults.map(function (card) { return searchResultHtml('card', card.id, card.q, card.a, catOf(card).icon, '#' + card.id); }).join('');
    }
    if (glossaryResults.length) {
      html += '<div class="search-group-label"><span>용어사전</span><span>' + glossaryResults.length + '</span></div>' +
        glossaryResults.map(function (term) { return searchResultHtml('glossary', term.term, term.term, term.def, 'gradCap', term.en || ''); }).join('');
    }
    if (!html) html = '<div class="search-empty">일치하는 결과가 없습니다.<br>조금 더 짧은 단어로 검색해보세요.</div>';
    body.innerHTML = html;
    body.querySelectorAll('[data-search-kind]').forEach(function (button) {
      button.addEventListener('click', function () { navigateSearchResult(button.dataset.searchKind, button.dataset.searchKey); });
    });
  }

  function navigateSearchResult(kind, key) {
    closeGlobalSearch();
    if (kind === 'lesson') {
      state.mode = 'study';
      openLesson(key);
    } else if (kind === 'card') {
      var id = Number(key);
      state.mode = 'card';
      state.cardFocusIds = null;
      state.cardDeckTitle = '';
      state.deck = CARDS.slice();
      state.idx = Math.max(0, state.deck.findIndex(function (card) { return card.id === id; }));
      state.flipped = false;
      updateRoute('card', id);
      render();
      window.scrollTo(0, 0);
    } else if (kind === 'glossary') {
      state.mode = 'glossary';
      state.glossQuery = key;
      updateRoute('glossary', key);
      render();
      window.scrollTo(0, 0);
    }
  }

  var globalSearchOpener = null;

  function openGlobalSearch() {
    if (state.ai.open) return;
    globalSearchOpener = document.activeElement;
    state.globalSearch.open = true;
    state.globalSearch.query = '';
    document.body.style.overflow = 'hidden';
    renderGlobalSearch();
  }

  function closeGlobalSearch() {
    state.globalSearch.open = false;
    state.globalSearch.query = '';
    document.body.style.overflow = '';
    els.searchRoot.innerHTML = '';
    if (globalSearchOpener && document.contains(globalSearchOpener) && typeof globalSearchOpener.focus === 'function') globalSearchOpener.focus();
    else {
      var trigger = document.getElementById('global-search-btn');
      if (trigger) trigger.focus();
    }
    globalSearchOpener = null;
  }

  function renderGlobalSearch() {
    if (!state.globalSearch.open) { els.searchRoot.innerHTML = ''; return; }
    els.searchRoot.innerHTML =
      '<div class="search-overlay" id="search-overlay">' +
        '<section class="search-command" role="dialog" aria-modal="true" aria-label="전체 검색">' +
          '<div class="search-command-head">' + icon('search') + '<input id="global-search-input" type="search" autocomplete="off" placeholder="금리, 반도체, 시장 폭처럼 검색하세요"><button class="search-close" id="search-close" aria-label="검색 닫기">' + icon('x') + '</button></div>' +
          '<div class="search-command-body" id="search-command-body"></div>' +
          '<div class="search-command-foot"><span><kbd>↑↓</kbd> 탐색</span><span><kbd>Enter</kbd> 열기</span><span><kbd>Esc</kbd> 닫기</span></div>' +
        '</section>' +
      '</div>';
    updateGlobalSearchResults();
    var input = document.getElementById('global-search-input');
    input.focus();
    input.addEventListener('input', function () { state.globalSearch.query = input.value; updateGlobalSearchResults(); });
    document.getElementById('search-close').addEventListener('click', closeGlobalSearch);
    document.getElementById('search-overlay').addEventListener('click', function (event) { if (event.target === this) closeGlobalSearch(); });
    els.searchRoot.querySelector('.search-command').addEventListener('keydown', function (event) {
      var results = Array.prototype.slice.call(document.querySelectorAll('.search-result'));
      if (event.key === 'Tab') {
        var focusables = Array.prototype.slice.call(this.querySelectorAll('button, input'));
        var first = focusables[0];
        var last = focusables[focusables.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
        return;
      }
      if (!results.length) return;
      var current = results.indexOf(document.activeElement);
      if (event.key === 'ArrowDown') {
        event.preventDefault();
        results[current < 0 ? 0 : (current + 1) % results.length].focus();
      } else if (event.key === 'ArrowUp') {
        event.preventDefault();
        results[current <= 0 ? results.length - 1 : current - 1].focus();
      } else if (event.key === 'Enter' && document.activeElement === input) {
        event.preventDefault();
        results[0].click();
      }
    });
  }

  function renderFooter() {
    var show = (state.mode === 'card' || state.mode === 'quiz') && !(state.quizSession && state.quizSession.done);
    els.footer.classList.toggle('hidden', !show);
    if (!show) return;

    els.progressFill.style.width = (((state.idx + 1) / state.deck.length) * 100) + '%';

    var nextLabel;
    if (state.mode === 'quiz' && ((state.chapterQuiz || state.quizSession) && state.idx === state.deck.length - 1)) {
      nextLabel = '결과 보기';
    } else if (state.mode === 'quiz') {
      nextLabel = state.quiz.selected !== -1 ? 'Next' : 'Skip';
    } else {
      nextLabel = 'Next';
    }

    els.footerContent.innerHTML =
      '<div class="nav-row">' +
        '<button class="nav-prev" id="btn-prev" aria-label="이전">' + icon('chevronLeft') + '</button>' +
        '<div class="nav-counter">' + (state.idx + 1) + ' / ' + state.deck.length + '</div>' +
        '<button class="nav-next" id="btn-next">' + nextLabel + ' ' + icon('chevronRight') + '</button>' +
      '</div>' +
      '<div class="utils-row">' +
        '<button class="util-btn" id="btn-shuffle">' + icon('shuffle') + ' Shuffle</button>' +
        '<button class="util-btn" id="btn-reset">' + icon('rotateCcw') + ' Reset</button>' +
      '</div>';

    document.getElementById('btn-prev').addEventListener('click', prev);
    document.getElementById('btn-next').addEventListener('click', next);
    document.getElementById('btn-shuffle').addEventListener('click', function () {
      state.quiz.score = 0;
      state.quiz.attempted = 0;
      rebuildDeck(true);
      render();
      toast('카드를 섞었습니다.');
    });
    document.getElementById('btn-reset').addEventListener('click', function () {
      state.quiz.score = 0;
      state.quiz.attempted = 0;
      state.reviewMode = false;
      state.catFilter = 'All';
      rebuildDeck(false);
      render();
      toast('처음부터 다시 시작합니다.');
    });
  }

  /* ---------- 모달 ---------- */
  function renderModal() {
    if (!state.ai.open) {
      els.modalRoot.innerHTML = '';
      return;
    }
    var card = state.ai.card;
    var body;

    if (state.ai.needKey) {
      body =
        '<div class="key-setup">' +
          '<p>AI 전문가 해설은 <strong>Google Gemini API</strong>를 사용합니다. ' +
          '<a href="https://aistudio.google.com/apikey" target="_blank" rel="noopener noreferrer">Google AI Studio</a>에서 무료 API 키를 발급받아 아래에 입력해주세요.</p>' +
          '<input type="password" id="api-key-input" placeholder="Gemini API 키 입력 (AIza...)" autocomplete="off">' +
          '<div class="key-actions">' +
            '<button class="btn-primary" id="api-key-save">저장하고 해설 보기</button>' +
            '<button class="btn-ghost" id="api-key-cancel">닫기</button>' +
          '</div>' +
          '<p class="key-note">키는 이 브라우저의 로컬 저장소(localStorage)에만 저장되며, Google 외 다른 곳으로 전송되지 않습니다. 상단의 톱니바퀴 아이콘으로 언제든 변경할 수 있습니다.</p>' +
        '</div>';
    } else if (state.ai.loading) {
      body = '<div class="ai-loading">' + icon('loader') + '<p>데이터를 분석 중입니다...</p></div>';
    } else if (state.ai.error) {
      body = '<div class="ai-error">' + esc(state.ai.error) + '</div>' +
        '<div class="key-actions" style="margin-top:1rem;justify-content:center">' +
          '<button class="btn-ghost" id="api-key-change">API 키 변경</button>' +
          '<button class="btn-primary" id="ai-retry">다시 시도</button>' +
        '</div>';
    } else {
      body =
        '<div class="ai-content">' +
          '<div class="ai-principle"><h4>Original Principle</h4><p>' + esc(card.a) + '</p></div>' +
          '<div class="ai-text">' + formatAiText(state.ai.text) + '</div>' +
        '</div>';
    }

    els.modalRoot.innerHTML =
      '<div class="modal-overlay" id="modal-overlay">' +
        '<div class="modal" role="dialog" aria-modal="true" aria-label="AI 전문가 해설">' +
          '<div class="modal-head">' +
            '<div class="modal-title">' +
              '<div class="modal-title-icon">' + icon('sparkles') + '</div>' +
              '<div><h3>Wall Street Insight</h3><p>AI Macro Strategist</p></div>' +
            '</div>' +
            '<button class="icon-btn" id="modal-close" aria-label="닫기">' + icon('x') + '</button>' +
          '</div>' +
          '<div class="modal-body">' + body + '</div>' +
        '</div>' +
      '</div>';

    document.getElementById('modal-close').addEventListener('click', closeAiModal);
    var overlay = document.getElementById('modal-overlay');
    overlay.addEventListener('click', function (e) {
      if (e.target === this) closeAiModal();
    });

    // 포커스 트랩: Tab이 모달 밖으로 나가지 않도록 순환
    var modalEl = overlay.querySelector('.modal');
    modalEl.addEventListener('keydown', function (e) {
      if (e.key !== 'Tab') return;
      var focusables = modalEl.querySelectorAll('button, input, a[href]');
      if (!focusables.length) return;
      var first = focusables[0];
      var last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault(); last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault(); first.focus();
      }
    });

    // 초기 포커스: 키 입력창이 있으면 거기로, 없으면 닫기 버튼으로
    var keyInputEl = document.getElementById('api-key-input');
    if (!keyInputEl) document.getElementById('modal-close').focus();

    var saveBtn = document.getElementById('api-key-save');
    if (saveBtn) {
      var keyInput = document.getElementById('api-key-input');
      keyInput.focus();
      var save = function () {
        var v = keyInput.value.trim();
        if (!v) { toast('API 키를 입력해주세요.'); return; }
        store.set('apiKey', v);
        fetchAiExplanation(card);
      };
      saveBtn.addEventListener('click', save);
      keyInput.addEventListener('keydown', function (e) { if (e.key === 'Enter') save(); });
      document.getElementById('api-key-cancel').addEventListener('click', closeAiModal);
    }
    var retryBtn = document.getElementById('ai-retry');
    if (retryBtn) retryBtn.addEventListener('click', function () { fetchAiExplanation(card); });
    var changeBtn = document.getElementById('api-key-change');
    if (changeBtn) changeBtn.addEventListener('click', function () {
      state.ai.needKey = true;
      state.ai.error = null;
      renderModal();
    });
  }

  /* ---------- 설정 (API 키 관리) ---------- */
  function openSettings() {
    var card = state.deck[state.idx] || CARDS[0];
    state.ai = { open: true, loading: false, error: null, text: null, card: card, needKey: true };
    renderModal();
  }

  /* ---------- 키보드 ---------- */
  document.addEventListener('keydown', function (e) {
    if (state.globalSearch.open) {
      if (e.key === 'Escape') closeGlobalSearch();
      return;
    }
    if (state.ai.open) {
      if (e.key === 'Escape') closeAiModal();
      return;
    }
    var tag = (document.activeElement && document.activeElement.tagName) || '';
    if (tag === 'INPUT' || tag === 'TEXTAREA') return;
    if (e.key === '/') {
      e.preventDefault();
      openGlobalSearch();
      return;
    }
    if (state.mode === 'study') {
      if (e.key === 'Escape' && state.lessonKey) {
        state.lessonKey = null;
        updateRoute('study');
        render();
        window.scrollTo(0, 0);
      }
      return;
    }
    if (state.mode === 'home' || state.mode === 'list' || state.mode === 'glossary') return;

    if (state.mode === 'card' && e.code === 'Space') {
      e.preventDefault();
      state.flipped = !state.flipped;
      var c3d = document.getElementById('card3d');
      if (c3d) c3d.classList.toggle('flipped', state.flipped);
      var aiB = document.getElementById('ai-btn');
      if (aiB) aiB.tabIndex = state.flipped ? 0 : -1;
      var saveB = document.getElementById('card-save');
      if (saveB) saveB.tabIndex = state.flipped ? -1 : 0;
      var deepB = document.getElementById('deep-toggle-card');
      if (deepB) deepB.tabIndex = state.flipped ? 0 : -1;
    } else if ((state.mode === 'card' || state.mode === 'quiz') && e.code === 'ArrowRight') {
      e.preventDefault();
      next();
    } else if ((state.mode === 'card' || state.mode === 'quiz') && e.code === 'ArrowLeft') {
      e.preventDefault();
      prev();
    } else if (state.mode === 'quiz' && (e.key === '1' || e.key === '2')) {
      answerQuiz(parseInt(e.key, 10) - 1);
    }
  });

  function applyInitialRoute() {
    var raw = decodeURIComponent((window.location.hash || '#home').slice(1));
    var parts = raw.split('/');
    var mode = parts[0];
    var valid = ['home', 'study', 'card', 'quiz', 'list', 'glossary'];
    if (valid.indexOf(mode) === -1) mode = 'home';
    state.mode = mode;
    state.lessonKey = null;
    state.chapterQuiz = null;
    state.quizSession = null;
    if (mode === 'card' || mode === 'quiz') {
      state.deck = CARDS.slice();
      state.cardFocusIds = null;
      state.cardDeckTitle = '';
      state.idx = 0;
      state.flipped = false;
    }
    if (mode === 'study' && parts[1] && LESSONS.some(function (lesson) { return lesson.key === parts[1]; })) {
      state.lessonKey = parts[1];
      state.lastLesson = parts[1];
    }
    if (mode === 'glossary' && parts[1]) state.glossQuery = parts.slice(1).join('/');
    if (mode === 'card' && parts[1]) {
      var id = Number(parts[1]);
      var found = CARDS.findIndex(function (card) { return card.id === id; });
      if (found !== -1) state.idx = found;
    }
  }

  /* ---------- 초기화 ---------- */
  window.addEventListener('resize', syncChromeHeights);
  window.addEventListener('hashchange', function () {
    applyInitialRoute();
    if (state.mode === 'quiz') resetQuizQuestion();
    render();
    window.scrollTo(0, 0);
  });
  syncChromeHeights();

  els.modeSwitch.querySelectorAll('.mode-btn').forEach(function (btn) {
    btn.addEventListener('click', function () { switchMode(btn.dataset.mode); });
  });
  document.getElementById('settings-btn').addEventListener('click', openSettings);
  document.getElementById('global-search-btn').addEventListener('click', openGlobalSearch);
  document.getElementById('brand-home').addEventListener('click', function () { switchMode('home'); });

  // 정적 아이콘 채우기 (nav/브랜드)
  document.querySelectorAll('[data-icon]').forEach(function (el) {
    el.innerHTML = icon(el.dataset.icon);
  });

  applyInitialRoute();
  resetQuizQuestion();
  render();

  if ('serviceWorker' in navigator && window.location.protocol !== 'file:') {
    window.addEventListener('load', function () {
      navigator.serviceWorker.register('./sw.js').catch(function () { /* 오프라인 기능 미지원 환경 */ });
    });
  }
})();
