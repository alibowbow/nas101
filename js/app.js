/* =========================================================
 * Nasdaq 101 — Macro Strategy (Static Web App)
 * 순수 바닐라 JS. 빌드 도구 없이 동작합니다.
 * ========================================================= */
(function () {
  'use strict';

  /* ---------- 아이콘 (lucide 기반 인라인 SVG) ---------- */
  var ICONS = {
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
    lightbulb: '<path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/>'
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
  var store = {
    get: function (key, fallback) {
      try {
        var v = localStorage.getItem('nas101.' + key);
        return v == null ? fallback : JSON.parse(v);
      } catch (e) { return fallback; }
    },
    set: function (key, value) {
      try { localStorage.setItem('nas101.' + key, JSON.stringify(value)); } catch (e) { /* private mode 등 */ }
    }
  };

  /* ---------- 상태 ---------- */
  var state = {
    mode: 'card',                 // card | quiz | list | glossary
    deck: CARDS.slice(),
    idx: 0,
    flipped: false,
    reviewMode: false,            // 오답 복습 모드
    quiz: { score: 0, attempted: 0, options: [], selected: -1, correct: null },
    searchQuery: '',
    catFilter: 'All',
    glossQuery: '',
    lifetime: store.get('stats', { attempted: 0, correct: 0 }),
    wrongIds: store.get('wrongIds', []),
    ai: { open: false, loading: false, error: null, text: null, card: null, needKey: false }
  };

  var els = {
    main: document.getElementById('main'),
    content: document.getElementById('content'),
    footer: document.getElementById('footer'),
    footerContent: document.getElementById('footer-content'),
    progressFill: document.getElementById('progress-fill'),
    modeSwitch: document.getElementById('mode-switch'),
    modalRoot: document.getElementById('modal-root'),
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
  function next() { goTo(state.idx < state.deck.length - 1 ? state.idx + 1 : 0); }
  function prev() { goTo(state.idx > 0 ? state.idx - 1 : state.deck.length - 1); }

  function currentPool() {
    if (state.reviewMode) {
      var wrongs = CARDS.filter(function (c) { return state.wrongIds.indexOf(c.id) !== -1; });
      return wrongs.length ? wrongs : CARDS.slice();
    }
    return CARDS.slice();
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
    state.searchQuery = '';
    state.glossQuery = '';
    if (mode !== 'quiz') state.reviewMode = false;
    rebuildDeck(false);
    render();
    window.scrollTo(0, 0);
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
    if (opt.isCorrect) {
      state.quiz.score += 1;
      state.lifetime.correct += 1;
      // 오답 복습 모드에서 맞히면 오답노트에서 제거
      var pos = state.wrongIds.indexOf(card.id);
      if (state.reviewMode && pos !== -1) {
        state.wrongIds.splice(pos, 1);
        store.set('wrongIds', state.wrongIds);
        toast('오답노트에서 해결! (' + state.wrongIds.length + '문제 남음)');
      }
    } else {
      if (state.wrongIds.indexOf(card.id) === -1) {
        state.wrongIds.push(card.id);
        store.set('wrongIds', state.wrongIds);
      }
    }
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

  function openAiModal(card) {
    state.ai = { open: true, loading: false, error: null, text: null, card: card, needKey: !getApiKey() };
    renderModal();
    if (!state.ai.needKey) fetchAiExplanation(card);
  }

  function closeAiModal() {
    state.ai.open = false;
    renderModal();
  }

  function fetchAiExplanation(card) {
    var apiKey = getApiKey();
    if (!apiKey) {
      state.ai.needKey = true;
      renderModal();
      return;
    }
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
        var text = data && data.candidates && data.candidates[0] &&
          data.candidates[0].content && data.candidates[0].content.parts &&
          data.candidates[0].content.parts[0] && data.candidates[0].content.parts[0].text;
        if (!text) throw new Error('No response content');
        state.ai.text = text;
      })
      .catch(function (err) {
        state.ai.error = '전문가 AI 연결에 실패했습니다. API 키가 유효한지 확인하거나 잠시 후 다시 시도해주세요. (' + err.message + ')';
      })
      .then(function () {
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

  /* ---------- 렌더링 ---------- */
  function render() {
    renderNav();
    if (state.mode === 'card') renderCardMode();
    else if (state.mode === 'quiz') renderQuizMode();
    else if (state.mode === 'list') renderListMode();
    else renderGlossaryMode();
    renderFooter();
  }

  function renderNav() {
    var buttons = els.modeSwitch.querySelectorAll('.mode-btn');
    buttons.forEach(function (btn) {
      btn.classList.toggle('active', btn.dataset.mode === state.mode);
    });
  }

  function catChipHtml(card, cls) {
    var cat = catOf(card);
    return '<div class="' + cls + '">' +
      '<span style="color:' + cat.color + ';display:flex">' + icon(cat.icon) + '</span>' +
      '<span>' + esc(card.cat) + '</span></div>';
  }

  function renderCardMode() {
    els.main.classList.remove('scroll-top');
    var card = state.deck[state.idx];
    els.content.innerHTML =
      '<div class="scene" id="scene" role="button" tabindex="0" aria-label="카드 뒤집기">' +
        '<div class="card3d' + (state.flipped ? ' flipped' : '') + '" id="card3d">' +
          '<div class="card-face card-front">' +
            '<div class="card-head">' + catChipHtml(card, 'cat-chip') +
              '<span class="card-num">#' + card.id + '</span></div>' +
            '<div class="card-body"><h2 class="card-q">' + esc(card.q) + '</h2></div>' +
            '<div class="card-foot"><div class="flip-hint">' + icon('arrowLeftRight') + ' Tap to flip</div></div>' +
          '</div>' +
          '<div class="card-face card-back">' +
            '<div class="card-head"><span class="insight-tag">Insight</span></div>' +
            '<div class="card-body"><p class="card-a">' + esc(card.a) + '</p></div>' +
            '<div class="card-foot"><button class="ai-btn" id="ai-btn">' + icon('sparkles') + ' 전문가 해설 보기</button></div>' +
          '</div>' +
        '</div>' +
      '</div>';

    document.getElementById('scene').addEventListener('click', function () {
      state.flipped = !state.flipped;
      document.getElementById('card3d').classList.toggle('flipped', state.flipped);
    });
    document.getElementById('ai-btn').addEventListener('click', function (e) {
      e.stopPropagation();
      openAiModal(card);
    });
  }

  function renderQuizMode() {
    els.main.classList.remove('scroll-top');
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
      resultHtml =
        '<div class="quiz-result"><div class="quiz-result-box ' + (ok ? 'ok' : 'no') + '">' +
          '<div class="quiz-result-head">' +
            '<div class="quiz-result-title">' + icon(ok ? 'checkCircle' : 'alertCircle') +
              '<span>' + (ok ? 'Excellent Insight.' : 'Review Needed.') + '</span></div>' +
            '<button class="quiz-result-ai" id="quiz-ai-btn">' + icon('sparkles') + ' 심층 해설</button>' +
          '</div>' +
          '<p>' + esc(card.a) + '</p>' +
        '</div></div>';
    }

    els.content.innerHTML =
      '<div class="quiz-wrap">' +
        '<div class="quiz-topbar">' +
          '<div class="quiz-score">' + icon('trophy') +
            '<span>SCORE: ' + state.quiz.score + '/' + state.quiz.attempted +
            (state.lifetime.attempted ? ' · 누적 ' + lifetimeRate + '%' : '') + '</span></div>' +
          '<div style="display:flex;gap:.5rem;align-items:center">' +
            '<button class="review-btn' + (state.reviewMode ? ' active' : '') + '" id="review-btn" title="틀린 문제만 다시 풀기">' +
              icon('repeat') + ' 오답 ' + state.wrongIds.length + '</button>' +
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
    document.getElementById('review-btn').addEventListener('click', toggleReviewMode);
    var quizAiBtn = document.getElementById('quiz-ai-btn');
    if (quizAiBtn) quizAiBtn.addEventListener('click', function () { openAiModal(card); });
  }

  function renderListMode() {
    els.main.classList.add('scroll-top');
    var cats = ['All'];
    CARDS.forEach(function (c) { if (cats.indexOf(c.cat) === -1) cats.push(c.cat); });

    var q = state.searchQuery.toLowerCase();
    var filtered = CARDS.filter(function (item) {
      var matchSearch = item.q.toLowerCase().indexOf(q) !== -1 || item.a.toLowerCase().indexOf(q) !== -1;
      var matchCat = state.catFilter === 'All' || item.cat === state.catFilter;
      return matchSearch && matchCat;
    });

    var chipsHtml = cats.map(function (cat) {
      return '<button class="cat-filter' + (state.catFilter === cat ? ' active' : '') +
        '" data-cat="' + esc(cat) + '">' + esc(cat) + '</button>';
    }).join('');

    var itemsHtml = filtered.length
      ? filtered.map(function (item) {
          var cat = catOf(item);
          return '<div class="list-item">' +
            '<div class="list-item-head">' +
              '<div class="list-item-cat" style="color:' + cat.color + ';background:' + cat.bg + ';border-color:' + cat.border + '">' +
                icon(cat.icon) + ' ' + esc(item.cat) + '</div>' +
              '<span class="list-item-num">#' + item.id + '</span></div>' +
            '<div class="list-item-q">Q. ' + esc(item.q) + '</div>' +
            '<div class="list-item-a">' + esc(item.a) + '</div>' +
          '</div>';
        }).join('')
      : '<div class="empty-state">' + icon('search') + '<p>일치하는 인사이트가 없습니다.</p></div>';

    els.content.innerHTML =
      '<div class="list-wrap">' +
        '<div class="list-filters">' +
          '<div class="search-box">' + icon('search') +
            '<input type="text" id="search-input" placeholder="키워드 검색... (총 ' + CARDS.length + '장)" value="' + esc(state.searchQuery) + '"></div>' +
          '<div class="cat-filters">' + chipsHtml + '</div>' +
        '</div>' +
        '<div class="list-items">' + itemsHtml + '</div>' +
      '</div>';

    var input = document.getElementById('search-input');
    input.addEventListener('input', function () {
      state.searchQuery = input.value;
      // 입력 포커스 유지를 위해 목록만 다시 그린다
      refreshListItems();
    });
    els.content.querySelectorAll('.cat-filter').forEach(function (btn) {
      btn.addEventListener('click', function () {
        state.catFilter = btn.dataset.cat;
        renderListMode();
      });
    });
  }

  function refreshListItems() {
    var q = state.searchQuery.toLowerCase();
    var filtered = CARDS.filter(function (item) {
      var matchSearch = item.q.toLowerCase().indexOf(q) !== -1 || item.a.toLowerCase().indexOf(q) !== -1;
      var matchCat = state.catFilter === 'All' || item.cat === state.catFilter;
      return matchSearch && matchCat;
    });
    var itemsHtml = filtered.length
      ? filtered.map(function (item) {
          var cat = catOf(item);
          return '<div class="list-item">' +
            '<div class="list-item-head">' +
              '<div class="list-item-cat" style="color:' + cat.color + ';background:' + cat.bg + ';border-color:' + cat.border + '">' +
                icon(cat.icon) + ' ' + esc(item.cat) + '</div>' +
              '<span class="list-item-num">#' + item.id + '</span></div>' +
            '<div class="list-item-q">Q. ' + esc(item.q) + '</div>' +
            '<div class="list-item-a">' + esc(item.a) + '</div>' +
          '</div>';
        }).join('')
      : '<div class="empty-state">' + icon('search') + '<p>일치하는 인사이트가 없습니다.</p></div>';
    var listEl = els.content.querySelector('.list-items');
    if (listEl) listEl.innerHTML = itemsHtml;
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
      '<div class="list-wrap">' +
        '<div class="list-filters">' +
          '<div class="search-box">' + icon('search') +
            '<input type="text" id="gloss-input" placeholder="용어 검색... (총 ' + GLOSSARY.length + '개)" value="' + esc(state.glossQuery) + '"></div>' +
        '</div>' +
        '<div class="gloss-grid" id="gloss-grid">' + itemsHtml + '</div>' +
      '</div>';

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
    });
  }

  function renderFooter() {
    var show = state.mode === 'card' || state.mode === 'quiz';
    els.footer.classList.toggle('hidden', !show);
    if (!show) return;

    els.progressFill.style.width = (((state.idx + 1) / state.deck.length) * 100) + '%';

    var nextLabel = state.mode === 'quiz'
      ? (state.quiz.selected !== -1 ? 'Next' : 'Skip')
      : 'Next';

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
    document.getElementById('modal-overlay').addEventListener('click', function (e) {
      if (e.target === this) closeAiModal();
    });

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
    if (state.ai.open) {
      if (e.key === 'Escape') closeAiModal();
      return;
    }
    var tag = (document.activeElement && document.activeElement.tagName) || '';
    if (tag === 'INPUT' || tag === 'TEXTAREA') return;
    if (state.mode === 'list' || state.mode === 'glossary') return;

    if (state.mode === 'card' && e.code === 'Space') {
      e.preventDefault();
      state.flipped = !state.flipped;
      var c3d = document.getElementById('card3d');
      if (c3d) c3d.classList.toggle('flipped', state.flipped);
    } else if (e.code === 'ArrowRight') {
      e.preventDefault();
      next();
    } else if (e.code === 'ArrowLeft') {
      e.preventDefault();
      prev();
    } else if (state.mode === 'quiz' && (e.key === '1' || e.key === '2')) {
      answerQuiz(parseInt(e.key, 10) - 1);
    }
  });

  /* ---------- 초기화 ---------- */
  // sticky 필터가 nav에 가리지 않도록 실제 nav 높이를 CSS 변수로 주입
  function syncNavHeight() {
    var nav = document.querySelector('.topnav');
    if (nav) document.documentElement.style.setProperty('--nav-h', nav.offsetHeight + 'px');
  }
  window.addEventListener('resize', syncNavHeight);
  syncNavHeight();

  els.modeSwitch.querySelectorAll('.mode-btn').forEach(function (btn) {
    btn.addEventListener('click', function () { switchMode(btn.dataset.mode); });
  });
  document.getElementById('settings-btn').addEventListener('click', openSettings);

  // 정적 아이콘 채우기 (nav/브랜드)
  document.querySelectorAll('[data-icon]').forEach(function (el) {
    el.innerHTML = icon(el.dataset.icon);
  });

  resetQuizQuestion();
  render();
})();
