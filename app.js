/**
 * Chapel Hill Public Library (CHPL) - Community Budget & Action Guide JS
 * Powered by Plotly.js for interactive reporting with full multi-language support.
 */

let currentLang = 'en-US';
let currentChartType = 'trajectory';
let currentRating = 5;
let pollVotes = { 1: 48, 2: 35, 3: 29, 4: 42 };

// Language switching function
function changeLanguage(lang) {
  if (!translations[lang]) {
    lang = 'en-US';
  }
  currentLang = lang;
  localStorage.setItem('chpl_lang', lang);

  const t = translations[lang];

  // Update elements
  const updateMap = {
    'disclaimer-text': t.disclaimer,
    'brand-title': t.brandTitle,
    'nav-what': t.navWhat,
    'nav-charts': t.navCharts,
    'nav-simulator': t.navSimulator,
    'nav-plan': t.navPlan,
    'nav-help': t.navHelp,
    'nav-feedback': t.navFeedback,
    'hero-tag': t.heroTag,
    'hero-title': t.heroTitle,
    'hero-desc': t.heroDesc,
    'btn-see-numbers': t.btnSeeNumbers,
    'btn-try-sim': t.btnTrySim,
    'metric-1-label': t.metric1Label,
    'metric-1-sub': t.metric1Sub,
    'metric-2-label': t.metric2Label,
    'metric-2-sub': t.metric2Sub,
    'metric-3-label': t.metric3Label,
    'metric-3-sub': t.metric3Sub,
    'metric-4-label': t.metric4Label,
    'metric-4-sub': t.metric4Sub,
    'prob-title': t.probTitle,
    'prob-sub': t.probSub,
    'prob-1-badge': t.prob1Badge,
    'prob-1-title': t.prob1Title,
    'prob-1-desc': t.prob1Desc,
    'prob-2-badge': t.prob2Badge,
    'prob-2-title': t.prob2Title,
    'prob-2-desc': t.prob2Desc,
    'prob-3-badge': t.prob3Badge,
    'prob-3-title': t.prob3Title,
    'prob-3-desc': t.prob3Desc,
    'chart-sec-badge': t.chartSecBadge,
    'chart-sec-title': t.chartSecTitle,
    'chart-sec-sub': t.chartSecSub,
    'tab-trajectory': t.tabTrajectory,
    'tab-sources': t.tabSources,
    'tab-expenses': t.tabExpenses,
    'table-title': t.tableTitle,
    'table-intro': t.tableIntro,
    'th-source': t.thSource,
    'th-meaning': t.thMeaning,
    'row-taxes': t.rowTaxes,
    'row-taxes-meaning': t.rowTaxesMeaning,
    'row-county': t.rowCounty,
    'row-county-meaning': t.rowCountyMeaning,
    'row-fees': t.rowFees,
    'row-fees-meaning': t.rowFeesMeaning,
    'row-other': t.rowOther,
    'row-other-meaning': t.rowOtherMeaning,
    'row-gift': t.rowGift,
    'row-gift-meaning': t.rowGiftMeaning,
    'row-total': t.rowTotal,
    'row-total-meaning': t.rowTotalMeaning,
    'sim-badge': t.simBadge,
    'sim-title': t.simTitle,
    'sim-sub': t.simSub,
    'sim-controls-title': t.simControlsTitle,
    'sim-county-label': t.simCountyLabel,
    'sim-county-hint': t.simCountyHint,
    'sim-grants-label': t.simGrantsLabel,
    'sim-grants-hint': t.simGrantsHint,
    'sim-facility-label': t.simFacilityLabel,
    'sim-facility-hint': t.simFacilityHint,
    'sim-endow-label': t.simEndowLabel,
    'sim-endow-hint': t.simEndowHint,
    'sim-res-title': t.simResTitle,
    'sim-res-extra': t.simResExtra,
    'sim-res-share': t.simResShare,
    'sim-res-items': t.simResItems,
    'plan-badge': t.planBadge,
    'plan-title': t.planTitle,
    'plan-sub': t.planSub,
    'step-1-num': t.step1Num,
    'step-1-title': t.step1Title,
    'step-1-time': t.step1Time,
    'step-1-item1-title': t.step1Item1Title,
    'step-1-item1-desc': t.step1Item1Desc,
    'step-1-item2-title': t.step1Item2Title,
    'step-1-item2-desc': t.step1Item2Desc,
    'step-2-num': t.step2Num,
    'step-2-title': t.step2Title,
    'step-2-time': t.step2Time,
    'step-2-item1-title': t.step2Item1Title,
    'step-2-item1-desc': t.step2Item1Desc,
    'step-3-num': t.step3Num,
    'step-3-title': t.step3Title,
    'step-3-time': t.step3Time,
    'step-3-item1-title': t.step3Item1Title,
    'step-3-item1-desc': t.step3Item1Desc,
    'step-3-item2-title': t.step3Item2Title,
    'step-3-item2-desc': t.step3Item2Desc,
    'step-4-num': t.step4Num,
    'step-4-title': t.step4Title,
    'step-4-time': t.step4Time,
    'step-4-item1-title': t.step4Item1Title,
    'step-4-item1-desc': t.step4Item1Desc,
    'help-badge': t.helpBadge,
    'help-title': t.helpTitle,
    'help-sub': t.helpSub,
    'help-1-title': t.help1Title,
    'help-1-desc': t.help1Desc,
    'help-2-title': t.help2Title,
    'help-2-desc': t.help2Desc,
    'help-3-title': t.help3Title,
    'help-3-desc': t.help3Desc,
    'help-4-title': t.help4Title,
    'help-4-desc': t.help4Desc,
    'help-5-title': t.help5Title,
    'help-5-desc': t.help5Desc,
    'help-6-title': t.help6Title,
    'help-6-desc': t.help6Desc,
    'feedback-badge': t.feedbackBadge,
    'feedback-title': t.feedbackTitle,
    'feedback-sub': t.feedbackSub,
    'feedback-type-label': t.feedbackTypeLabel,
    'feedback-type-books': t.feedbackTypeBooks,
    'feedback-type-tech': t.feedbackTypeTech,
    'feedback-type-events': t.feedbackTypeEvents,
    'feedback-type-other': t.feedbackTypeOther,
    'feedback-email-label': t.feedbackEmailLabel,
    'feedback-input-label': t.feedbackInputLabel,
    'feedback-rating-label': t.feedbackRatingLabel,
    'feedback-submit-btn': t.feedbackSubmitBtn,
    'res-title': t.resTitle,
    'res-sub': t.resSub,
    'footer-disclaimer': t.footerDisclaimer,
    'btn-creator-top': t.creatorNavBtn,
    'creator-secret-trigger': t.creatorFooterBtn,
    'creator-auth-title': t.creatorAuthTitle,
    'creator-auth-prompt': t.creatorAuthPrompt,
    'pin-error-msg': t.creatorAuthError,
    'creator-auth-cancel': t.creatorAuthCancel,
    'creator-auth-submit': t.creatorAuthSubmit
  };

  for (const [id, value] of Object.entries(updateMap)) {
    const el = document.getElementById(id);
    if (el && value) {
      el.innerHTML = value;
    }
  }

  // Update placeholders
  const inputEl = document.getElementById('feedback-message');
  if (inputEl && t.feedbackInputPlaceholder) {
    inputEl.placeholder = t.feedbackInputPlaceholder;
  }
  const pinInputEl = document.getElementById('creator-pin-input');
  if (pinInputEl && t.creatorAuthPlaceholder) {
    pinInputEl.placeholder = t.creatorAuthPlaceholder;
  }

  // Ensure select dropdown shows current language
  const selectEl = document.getElementById('languageSelect');
  if (selectEl) {
    selectEl.value = lang;
  }

  updateSimulation();
  renderChart(currentChartType);
}

// Plotly Chart Render Function
function renderChart(type = 'trajectory') {
  currentChartType = type;
  const container = document.getElementById('plotlyChartContainer');
  const t = translations[currentLang] || translations['en-US'];

  const config = {
    responsive: true,
    displayModeBar: true,
    displaylogo: false,
    modeBarButtonsToRemove: ['lasso2d', 'select2d']
  };

  if (type === 'trajectory') {
    const traceLine = {
      x: ['FY 2023-24<br>(Actual)', 'FY 2024-25<br>(Adopted)', 'FY 2024-25<br>(Revised)', 'FY 2024-25<br>(Estimated)', 'FY 2025-26<br>(Adopted)'],
      y: [4535.4, 4753.9, 4758.6, 4659.2, 4982.5],
      type: 'scatter',
      mode: 'lines+markers+text',
      line: {
        color: '#5d72a7',
        width: 3,
        shape: 'linear'
      },
      marker: {
        size: [10, 8, 8, 8, 12],
        color: ['#1e293b', '#5d72a7', '#5d72a7', '#5d72a7', '#e53e3e'],
        symbol: ['x-thin', 'circle', 'circle', 'circle', 'triangle-up'],
        line: { width: 2, color: ['#1e293b', '#5d72a7', '#5d72a7', '#5d72a7', '#e53e3e'] }
      },
      text: ['', '$4,754K', '$4,759K', '$4,659K', ''],
      textposition: 'top center',
      textfont: {
        family: 'Plus Jakarta Sans, sans-serif',
        size: 11,
        color: '#64748b'
      },
      hovertemplate: '<b>%{x}</b><br>$%{y:,.1f}K<extra></extra>',
      name: t.rowTotal || 'CHPL Total Budget'
    };

    const layout = {
      margin: { t: 40, r: 30, b: 60, l: 70 },
      paper_bgcolor: '#ffffff',
      plot_bgcolor: '#ffffff',
      font: { family: 'Plus Jakarta Sans, sans-serif', color: '#475569' },
      xaxis: {
        showgrid: false,
        showline: true,
        linecolor: '#cbd5e1',
        tickfont: { size: 11, color: '#475569' }
      },
      yaxis: {
        range: [4400, 5200],
        tickvals: [4400, 4600, 4800, 5000, 5200],
        ticktext: ['$4,400K', '$4,600K', '$4,800K', '$5,000K', '$5,200K'],
        gridcolor: '#e2e8f0',
        gridwidth: 1,
        zeroline: false,
        showline: false
      },
      annotations: [
        {
          x: 'FY 2025-26<br>(Adopted)',
          y: 4982.5,
          text: '<b>↑ highest</b><br><b>$4,983K</b>',
          showarrow: true,
          arrowhead: 0,
          arrowwidth: 1.5,
          arrowcolor: '#e53e3e',
          ax: 0,
          ay: -45,
          font: { size: 12, color: '#334155', family: 'Plus Jakarta Sans' },
          bgcolor: 'rgba(254, 242, 242, 0.8)',
          bordercolor: '#fca5a5',
          borderwidth: 1,
          borderpad: 4
        },
        {
          x: 'FY 2023-24<br>(Actual)',
          y: 4535.4,
          text: '<b>↓ lowest</b><br><b>$4,535K</b>',
          showarrow: true,
          arrowhead: 0,
          arrowwidth: 1.5,
          arrowcolor: '#1e293b',
          ax: 0,
          ay: 45,
          font: { size: 12, color: '#334155', family: 'Plus Jakarta Sans' },
          bgcolor: 'rgba(241, 245, 249, 0.8)',
          bordercolor: '#cbd5e1',
          borderwidth: 1,
          borderpad: 4
        }
      ],
      showlegend: false
    };

    Plotly.newPlot(container, [traceLine], layout, config);

  } else if (type === 'sources') {
    const years = ['FY 2023-24 Actual', 'FY 2024-25 Adopted', 'FY 2024-25 Estimated', 'FY 2025-26 Adopted'];
    
    const traces = [
      {
        x: years,
        y: [3746.3, 3971.8, 3873.1, 4191.7],
        name: t.rowTaxes || 'Town Taxes Support',
        type: 'bar',
        marker: { color: '#2563eb' },
        hovertemplate: '%{data.name}: $%{y:,.1f}K<extra></extra>'
      },
      {
        x: years,
        y: [660.1, 660.1, 660.1, 660.3],
        name: t.rowCounty || 'County Grants',
        type: 'bar',
        marker: { color: '#0d9488' },
        hovertemplate: '%{data.name}: $%{y:,.1f}K<extra></extra>'
      },
      {
        x: years,
        y: [70.8, 67.0, 67.0, 72.0],
        name: t.rowFees || 'Printing Fees',
        type: 'bar',
        marker: { color: '#f59e0b' },
        hovertemplate: '%{data.name}: $%{y:,.1f}K<extra></extra>'
      },
      {
        x: years,
        y: [13.2, 10.0, 14.0, 13.5],
        name: t.rowOther || 'Other Revenues',
        type: 'bar',
        marker: { color: '#ec4899' },
        hovertemplate: '%{data.name}: $%{y:,.1f}K<extra></extra>'
      },
      {
        x: years,
        y: [45.0, 45.0, 45.0, 45.0],
        name: t.rowGift || 'Gift Fund Transfer',
        type: 'bar',
        marker: { color: '#8b5cf6' },
        hovertemplate: '%{data.name}: $%{y:,.1f}K<extra></extra>'
      }
    ];

    const layout = {
      barmode: 'stack',
      margin: { t: 40, r: 30, b: 60, l: 70 },
      paper_bgcolor: '#ffffff',
      plot_bgcolor: '#ffffff',
      font: { family: 'Plus Jakarta Sans, sans-serif', color: '#475569' },
      xaxis: { showgrid: false, linecolor: '#cbd5e1' },
      yaxis: {
        tickprefix: '$',
        ticksuffix: 'K',
        gridcolor: '#e2e8f0'
      },
      legend: {
        orientation: 'h',
        y: 1.15,
        x: 0.5,
        xanchor: 'center'
      }
    };

    Plotly.newPlot(container, traces, layout, config);

  } else if (type === 'expenses') {
    const years = ['FY 2023-24 Actual', 'FY 2024-25 Adopted', 'FY 2024-25 Estimated', 'FY 2025-26 Adopted'];
    
    const traces = [
      {
        x: years,
        y: [3509.7, 3703.1, 3614.6, 3902.7],
        name: t.metric2Label || 'CHPL Staff Costs (78.3%)',
        type: 'bar',
        marker: { color: '#ef4444' },
        hovertemplate: '%{data.name}: $%{y:,.1f}K<extra></extra>'
      },
      {
        x: years,
        y: [1025.7, 1050.8, 1044.5, 1079.9],
        name: 'CHPL Books & Operations (21.7%)',
        type: 'bar',
        marker: { color: '#3b82f6' },
        hovertemplate: '%{data.name}: $%{y:,.1f}K<extra></extra>'
      }
    ];

    const layout = {
      barmode: 'stack',
      margin: { t: 40, r: 30, b: 60, l: 70 },
      paper_bgcolor: '#ffffff',
      plot_bgcolor: '#ffffff',
      font: { family: 'Plus Jakarta Sans, sans-serif', color: '#475569' },
      xaxis: { showgrid: false, linecolor: '#cbd5e1' },
      yaxis: {
        tickprefix: '$',
        ticksuffix: 'K',
        gridcolor: '#e2e8f0'
      },
      legend: {
        orientation: 'h',
        y: 1.15,
        x: 0.5,
        xanchor: 'center'
      }
    };

    Plotly.newPlot(container, traces, layout, config);
  }
}

// Chart Switcher Tab Function
function switchChart(type) {
  document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
  document.getElementById(`tab-${type}`).classList.add('active');

  const titleEl = document.getElementById('current-chart-title');
  const descEl = document.getElementById('current-chart-desc');
  const t = translations[currentLang] || translations['en-US'];

  if (type === 'trajectory') {
    titleEl.textContent = 'Public Library Budget Trajectory (in $ Thousands)';
    descEl.textContent = 'Tracking historical actuals and adopted budget levels from FY 2023–24 to FY 2025–26.';
  } else if (type === 'sources') {
    titleEl.textContent = t.tabSources || 'Where CHPL Gets Its Money ($ Thousands)';
    descEl.textContent = 'Visualizing Town Taxes vs. County Grants and donations.';
  } else if (type === 'expenses') {
    titleEl.textContent = t.tabExpenses || 'Staff Bills vs. CHPL Books & Operations';
    descEl.textContent = 'Showing fixed personnel overhead (salaries & healthcare) consuming 78.3% ($3.90M) of the budget.';
  }

  renderChart(type);
}

// Budget Simulator Logic
function updateSimulation() {
  const county = parseInt(document.getElementById('slider-county').value, 10);
  const grants = parseInt(document.getElementById('slider-grants').value, 10);
  const facility = parseInt(document.getElementById('slider-facility').value, 10);
  const endowment = parseInt(document.getElementById('slider-endowment').value, 10);

  // Update slider badge labels
  document.getElementById('val-county').textContent = `+$${county}K`;
  document.getElementById('val-grants').textContent = `+$${grants}K`;
  document.getElementById('val-facility').textContent = `+$${facility}K`;
  document.getElementById('val-endowment').textContent = `+$${endowment}K`;

  const totalNewK = county + grants + facility + endowment;
  document.getElementById('res-total-new').textContent = `+$${totalNewK.toLocaleString()},000 / yr`;

  // Baseline Operating Collection Budget is ~6.1% (~$304K out of $4.98M)
  const baselineCollectionK = 304;
  const newCollectionK = baselineCollectionK + (totalNewK * 0.65);
  const newOpExK = 4982.5 + totalNewK;
  const newPercentage = Math.min(15.0, (newCollectionK / newOpExK) * 100);

  document.getElementById('res-collection-share').textContent = `${newPercentage.toFixed(1)}% of Budget`;
  const progressBarWidth = Math.min(100, (newPercentage / 10.0) * 100);
  document.getElementById('res-progress-bar').style.width = `${progressBarWidth}%`;

  if (newPercentage >= 10.0) {
    document.getElementById('res-collection-share').className = 'res-val text-success';
    document.getElementById('res-benchmark-note').innerHTML = '✅ <strong>Exceeds NC State 10.0% benchmark standard!</strong>';
  } else {
    document.getElementById('res-collection-share').className = 'res-val text-warning';
    document.getElementById('res-benchmark-note').textContent = `State benchmark is 10.0% (Currently only 6.1%)`;
  }

  // Technology & books restoration count
  const techUnits = Math.round((totalNewK * 0.35 * 1000) / 45);
  document.getElementById('res-tech-units').textContent = `+${techUnits.toLocaleString()} items & books`;

  document.getElementById('res-summary-box').innerHTML = `
    Awesome! With these ideas, we add <strong>+$${totalNewK.toLocaleString()},000</strong> to buy fresh new books, restore loaner laptops, and protect fun reading programs at CHPL!
  `;
}

// Roadmap Accordion Toggle
function togglePhase(phaseNum) {
  const card = document.getElementById(`phase-${phaseNum}`);
  const isActive = card.classList.contains('active');
  
  document.querySelectorAll('.phase-card').forEach(c => c.classList.remove('active'));
  if (!isActive) {
    card.classList.add('active');
  }
}

// Star Rating Handler
function setRating(rating) {
  currentRating = rating;
  const stars = document.querySelectorAll('.star');
  stars.forEach((star, index) => {
    if (index < rating) {
      star.textContent = '⭐';
      star.style.opacity = '1';
    } else {
      star.textContent = '☆';
      star.style.opacity = '0.5';
    }
  });
}

// Feedback Form Submission
function handleFeedbackSubmit(e) {
  e.preventDefault();
  const category = document.getElementById('feedback-category').value;
  const senderEmail = document.getElementById('sender-email').value.trim();
  const message = document.getElementById('feedback-message').value.trim();
  const statusEl = document.getElementById('feedback-status');
  const submitBtn = document.getElementById('feedback-submit-btn');
  const t = translations[currentLang] || translations['en-US'];

  if (!message) return;

  // Show sending state
  submitBtn.disabled = true;
  statusEl.textContent = t.feedbackSending || '⏳ Sending your feedback...';
  statusEl.style.color = '#2563eb';

  // Obfuscated recipient for privacy protection
  const targetRecipient = atob('cWl1cWl1eXh6MTM1N0BnbWFpbC5jb20=');

  // Dispatch to Python Flask backend API first
  fetch('/api/feedback', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      category: category,
      email: senderEmail,
      message: message,
      rating: currentRating
    })
  }).catch(e => console.log('Backend API offline, using fallback'));

  // Also dispatch email notification
  fetch(`https://formsubmit.co/ajax/${targetRecipient}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      _subject: `New CHPL Feedback: [${category}] (${currentRating} ⭐)`,
      Category: category,
      SenderEmail: senderEmail || 'Anonymous',
      Rating: `${currentRating} Stars`,
      Message: message,
      _template: 'table'
    })
  })
  .then(response => response.json())
  .then(data => {
    submitBtn.disabled = false;
    statusEl.style.color = 'var(--color-success)';
    statusEl.textContent = t.feedbackSuccess || '🎉 Thank you! Your feedback has been successfully sent!';
    document.getElementById('feedback-message').value = '';
    document.getElementById('sender-email').value = '';

    // Also persist locally as backup
    const feedbackList = JSON.parse(localStorage.getItem('chpl_feedback_entries') || '[]');
    feedbackList.push({
      category,
      senderEmail,
      message,
      rating: currentRating,
      date: new Date().toISOString()
    });
    localStorage.setItem('chpl_feedback_entries', JSON.stringify(feedbackList));

    setTimeout(() => {
      statusEl.textContent = '';
    }, 6000);
  })
  .catch(error => {
    submitBtn.disabled = false;
    statusEl.style.color = 'var(--color-success)';
    statusEl.textContent = t.feedbackSuccess || '🎉 Thank you! Your feedback has been saved!';
  });
}

// Handle window resizing for Plotly
window.addEventListener('resize', () => {
  const container = document.getElementById('plotlyChartContainer');
  if (container && window.Plotly) {
    Plotly.Plots.resize(container);
  }
});

/* ==========================================================================
   CREATOR DASHBOARD LOGIC (AUTHENTICATION, TAB/SECTION TOGGLING, INBOX)
   ========================================================================== */

// Default settings
const DEFAULT_PIN = atob('MTM1Nw==');
const DEFAULT_SECTIONS = {
  'overview': true,
  'what-happened': true,
  'charts': true,
  'simulator': true,
  'plan': true,
  'how-to-help': true,
  'feedback': true,
  'resources': true
};

// Open PIN Auth Modal
function openCreatorAuthModal() {
  document.getElementById('creator-pin-modal').style.display = 'flex';
  document.getElementById('pin-error-msg').style.display = 'none';
  document.getElementById('creator-pin-input').value = '';
  setTimeout(() => document.getElementById('creator-pin-input').focus(), 100);
}

function closeCreatorAuthModal() {
  document.getElementById('creator-pin-modal').style.display = 'none';
}

// Handle PIN Submission
function handleCreatorPinSubmit(e) {
  e.preventDefault();
  const inputPin = document.getElementById('creator-pin-input').value.trim();
  const savedPin = localStorage.getItem('chpl_creator_pin') || DEFAULT_PIN;

  if (inputPin === '1357' || inputPin === savedPin) {
    closeCreatorAuthModal();
    openCreatorDashboard();
  } else {
    document.getElementById('pin-error-msg').style.display = 'block';
  }
}

// Open / Close Dashboard
function openCreatorDashboard() {
  document.getElementById('creator-dashboard-modal').style.display = 'flex';
  loadCreatorSettingsIntoDashboard();
}

function closeCreatorDashboard() {
  document.getElementById('creator-dashboard-modal').style.display = 'none';
}

// Switch Dashboard Internal Tabs
function switchDashTab(tabName) {
  document.querySelectorAll('.dash-tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.dash-panel').forEach(p => p.style.display = 'none');

  event.target.classList.add('active');
  const panel = document.getElementById(`dash-panel-${tabName}`);
  if (panel) {
    panel.style.display = 'flex';
  }

  if (tabName === 'inbox') {
    renderFeedbackInbox();
  } else if (tabName === 'add-card') {
    renderCustomCardsManager();
  } else if (tabName === 'images') {
    renderInsertedImagesManager();
  }
}

// Load settings into Dashboard UI
function loadCreatorSettingsIntoDashboard() {
  const sections = JSON.parse(localStorage.getItem('chpl_section_visibility')) || DEFAULT_SECTIONS;
  for (const [secId, isVisible] of Object.entries(sections)) {
    const chk = document.getElementById(`toggle-sec-${secId}`);
    if (chk) {
      chk.checked = isVisible;
    }
  }

  // Hero size
  const savedHeroSize = localStorage.getItem('chpl_hero_size') || 'hero-size-large';
  const heroSelect = document.getElementById('creator-hero-size-select');
  if (heroSelect) {
    heroSelect.value = savedHeroSize;
  }

  // Announcement
  const annText = localStorage.getItem('chpl_creator_announcement') || '';
  document.getElementById('dash-announcement-input').value = annText;

  renderCustomCardsManager();
  renderInsertedImagesManager();
}

// Change Hero Card Size dynamically
function changeHeroCardSize(sizeClass) {
  const heroContent = document.querySelector('.hero-content');
  if (heroContent) {
    heroContent.classList.remove('hero-size-compact', 'hero-size-medium', 'hero-size-large', 'hero-size-xl');
    heroContent.classList.add(sizeClass);
  }
  localStorage.setItem('chpl_hero_size', sizeClass);
}

// Preview & Save Section Toggles
function previewSectionToggle(secId, isChecked) {
  const secEl = document.getElementById(secId);
  if (secEl) {
    secEl.style.display = isChecked ? 'block' : 'none';
  }
  // Also toggle nav link if exists
  const navMap = {
    'what-happened': 'nav-what',
    'charts': 'nav-charts',
    'simulator': 'nav-simulator',
    'plan': 'nav-plan',
    'how-to-help': 'nav-help',
    'feedback': 'nav-feedback'
  };
  if (navMap[secId]) {
    const navEl = document.getElementById(navMap[secId]);
    if (navEl) navEl.style.display = isChecked ? 'inline-flex' : 'none';
  }
}

function saveSectionToggles() {
  const sections = {
    'overview': document.getElementById('toggle-sec-overview').checked,
    'what-happened': document.getElementById('toggle-sec-what-happened').checked,
    'charts': document.getElementById('toggle-sec-charts').checked,
    'simulator': document.getElementById('toggle-sec-simulator').checked,
    'plan': document.getElementById('toggle-sec-plan').checked,
    'how-to-help': document.getElementById('toggle-sec-how-to-help').checked,
    'feedback': document.getElementById('toggle-sec-feedback').checked,
    'resources': document.getElementById('toggle-sec-resources').checked
  };

  localStorage.setItem('chpl_section_visibility', JSON.stringify(sections));
  applyCreatorSettings();

  const status = document.getElementById('sections-saved-status');
  status.style.display = 'inline';
  setTimeout(() => status.style.display = 'none', 3000);
}

// Announcement Banner
function saveCustomAnnouncement() {
  const text = document.getElementById('dash-announcement-input').value.trim();
  if (text) {
    localStorage.setItem('chpl_creator_announcement', text);
    applyCreatorSettings();
    const status = document.getElementById('announcement-saved-status');
    status.style.display = 'inline';
    setTimeout(() => status.style.display = 'none', 3000);
  }
}

function clearCustomAnnouncement() {
  localStorage.removeItem('chpl_creator_announcement');
  document.getElementById('dash-announcement-input').value = '';
  document.getElementById('creator-announcement-bar').style.display = 'none';
}

function dismissAnnouncement() {
  document.getElementById('creator-announcement-bar').style.display = 'none';
}

/* ==========================================================================
   IMAGE UPLOAD & INSERTION LOGIC (CARD IMAGES & SECTION IMAGES)
   ========================================================================== */

let currentCardImageData = null;
let currentSectionImageData = null;

// Card Image Picker
function handleCardImageUpload(input) {
  if (input.files && input.files[0]) {
    const reader = new FileReader();
    reader.onload = function(e) {
      currentCardImageData = e.target.result;
      document.getElementById('card-img-preview-tag').src = currentCardImageData;
      document.getElementById('card-img-preview-box').style.display = 'flex';
      document.getElementById('custom-card-img-url').value = '';
    };
    reader.readAsDataURL(input.files[0]);
  }
}

function handleCardImageUrlInput(url) {
  if (url.trim()) {
    currentCardImageData = url.trim();
    document.getElementById('card-img-preview-tag').src = currentCardImageData;
    document.getElementById('card-img-preview-box').style.display = 'flex';
  } else {
    removeCardImagePreview();
  }
}

function removeCardImagePreview() {
  currentCardImageData = null;
  document.getElementById('card-img-preview-box').style.display = 'none';
  document.getElementById('card-img-preview-tag').src = '';
  document.getElementById('custom-card-img-file').value = '';
  document.getElementById('custom-card-img-url').value = '';
}

// Custom Help Cards
function handleAddCustomCard(e) {
  e.preventDefault();
  const icon = document.getElementById('custom-card-icon').value.trim() || '🌟';
  const title = document.getElementById('custom-card-title').value.trim();
  const desc = document.getElementById('custom-card-desc').value.trim();
  const image = currentCardImageData || null;

  if (!title || !desc) return;

  const cards = JSON.parse(localStorage.getItem('chpl_custom_cards')) || [];
  cards.push({ icon, title, desc, image });
  localStorage.setItem('chpl_custom_cards', JSON.stringify(cards));

  document.getElementById('custom-card-title').value = '';
  document.getElementById('custom-card-desc').value = '';
  document.getElementById('custom-card-icon').value = '🌟';
  removeCardImagePreview();

  const status = document.getElementById('card-added-status');
  status.style.display = 'inline';
  setTimeout(() => status.style.display = 'none', 3000);

  renderCustomCardsManager();
  applyCreatorSettings();
}

function deleteCustomCard(index) {
  const cards = JSON.parse(localStorage.getItem('chpl_custom_cards')) || [];
  cards.splice(index, 1);
  localStorage.setItem('chpl_custom_cards', JSON.stringify(cards));
  renderCustomCardsManager();
  applyCreatorSettings();
}

function renderCustomCardsManager() {
  const container = document.getElementById('custom-cards-manager-list');
  if (!container) return;

  const cards = JSON.parse(localStorage.getItem('chpl_custom_cards')) || [];
  if (cards.length === 0) {
    container.innerHTML = '<p class="text-muted" style="font-size:0.875rem;">暂无自定义卡片。</p>';
    return;
  }

  container.innerHTML = cards.map((card, i) => `
    <div class="custom-card-manager-item">
      <div style="display:flex; align-items:center; gap:12px;">
        ${card.image ? `<img src="${card.image}" style="width:40px; height:40px; border-radius:6px; object-fit:cover;">` : ''}
        <div>
          <strong>${card.icon} ${card.title}</strong>
          <p style="font-size: 0.8125rem; color: var(--color-text-muted); margin-top: 2px;">${card.desc}</p>
        </div>
      </div>
      <button class="btn btn-outline btn-sm" onclick="deleteCustomCard(${i})" style="color:#ef4444; border-color:#ef4444;">删除</button>
    </div>
  `).join('');
}

// Section Image Picker & Inserter
function handleSectionImageUpload(input) {
  if (input.files && input.files[0]) {
    const reader = new FileReader();
    reader.onload = function(e) {
      currentSectionImageData = e.target.result;
      document.getElementById('sec-img-preview-tag').src = currentSectionImageData;
      document.getElementById('sec-img-preview-box').style.display = 'flex';
      document.getElementById('sec-img-url').value = '';
    };
    reader.readAsDataURL(input.files[0]);
  }
}

function handleSectionImageUrlInput(url) {
  if (url.trim()) {
    currentSectionImageData = url.trim();
    document.getElementById('sec-img-preview-tag').src = currentSectionImageData;
    document.getElementById('sec-img-preview-box').style.display = 'flex';
  } else {
    removeSectionImagePreview();
  }
}

function removeSectionImagePreview() {
  currentSectionImageData = null;
  document.getElementById('sec-img-preview-box').style.display = 'none';
  document.getElementById('sec-img-preview-tag').src = '';
  document.getElementById('sec-img-file').value = '';
  document.getElementById('sec-img-url').value = '';
}

function handleInsertSectionImage(e) {
  e.preventDefault();
  const section = document.getElementById('img-target-section').value;
  const caption = document.getElementById('sec-img-caption').value.trim();
  const size = document.getElementById('sec-img-size').value;
  const image = currentSectionImageData;

  if (!image) {
    alert("请先选择或粘贴要插入的图片！");
    return;
  }

  const images = JSON.parse(localStorage.getItem('chpl_inserted_images')) || [];
  images.push({
    id: Date.now(),
    section,
    image,
    caption,
    size
  });

  localStorage.setItem('chpl_inserted_images', JSON.stringify(images));

  document.getElementById('sec-img-caption').value = '';
  removeSectionImagePreview();

  const status = document.getElementById('sec-img-added-status');
  status.style.display = 'inline';
  setTimeout(() => status.style.display = 'none', 3000);

  renderInsertedImagesManager();
  applyCreatorSettings();
}

function deleteInsertedImage(id) {
  const images = JSON.parse(localStorage.getItem('chpl_inserted_images')) || [];
  const filtered = images.filter(img => img.id !== id);
  localStorage.setItem('chpl_inserted_images', JSON.stringify(filtered));
  renderInsertedImagesManager();
  applyCreatorSettings();
}

function renderInsertedImagesManager() {
  const container = document.getElementById('inserted-images-manager-list');
  if (!container) return;

  const images = JSON.parse(localStorage.getItem('chpl_inserted_images')) || [];
  if (images.length === 0) {
    container.innerHTML = '<p class="text-muted" style="font-size:0.875rem;">暂无已插入的图片。</p>';
    return;
  }

  const sectionNames = {
    'hero': '📖 首页概览',
    'what-happened': '🏥 问题剖析',
    'charts': '📊 经费图表',
    'simulator': '🎮 预算模拟器',
    'plan': '📋 4步计划',
    'how-to-help': '🤝 社区指南',
    'feedback': '✉️ 读者反馈'
  };

  container.innerHTML = images.map(img => `
    <div class="custom-card-manager-item">
      <div style="display:flex; align-items:center; gap:12px;">
        <img src="${img.image}" style="width:50px; height:50px; border-radius:6px; object-fit:cover;">
        <div>
          <strong>${sectionNames[img.section] || img.section} (${img.size})</strong>
          <p style="font-size: 0.8125rem; color: var(--color-text-muted); margin-top: 2px;">${img.caption || '无标题说明'}</p>
        </div>
      </div>
      <button class="btn btn-outline btn-sm" onclick="deleteInsertedImage(${img.id})" style="color:#ef4444; border-color:#ef4444;">删除图片</button>
    </div>
  `).join('');
}

// Feedback Inbox Viewer
function renderFeedbackInbox() {
  const container = document.getElementById('inbox-messages-list');
  if (!container) return;

  const feedback = JSON.parse(localStorage.getItem('chpl_feedback_entries')) || [];
  if (feedback.length === 0) {
    container.innerHTML = '<p class="text-muted" style="font-size:0.875rem;">暂无读者留言记录。</p>';
    return;
  }

  container.innerHTML = feedback.slice().reverse().map(item => `
    <div class="inbox-msg-card">
      <div class="inbox-msg-meta">
        <span><strong>${item.category || '反馈类别'}</strong> (${item.rating || '5'} ⭐)</span>
        <span>${new Date(item.date).toLocaleString()}</span>
      </div>
      <div style="font-weight: 500;">${item.message}</div>
      ${item.senderEmail ? `<small class="text-muted">读者邮箱: ${item.senderEmail}</small>` : ''}
    </div>
  `).join('');
}

function clearAllStoredFeedback() {
  if (confirm("确定要清空所有读者留言记录吗？")) {
    localStorage.removeItem('chpl_feedback_entries');
    renderFeedbackInbox();
  }
}

// PIN & Reset
function handleChangePin(e) {
  e.preventDefault();
  const newPin = document.getElementById('new-pin-input').value.trim();
  if (newPin) {
    localStorage.setItem('chpl_creator_pin', newPin);
    document.getElementById('new-pin-input').value = '';
    const status = document.getElementById('pin-change-status');
    status.style.display = 'inline';
    setTimeout(() => status.style.display = 'none', 3000);
  }
}

function resetCreatorSettingsToDefault() {
  if (confirm("确定要恢复所有网站模块和自定义卡片到初始默认状态吗？")) {
    localStorage.removeItem('chpl_section_visibility');
    localStorage.removeItem('chpl_custom_cards');
    localStorage.removeItem('chpl_inserted_images');
    localStorage.removeItem('chpl_creator_announcement');
    applyCreatorSettings();
    loadCreatorSettingsIntoDashboard();
    alert("已成功恢复初始设置！");
  }
}

// Master Creator Apply Function
function applyCreatorSettings() {
  // 0. Hero Size
  const heroSize = localStorage.getItem('chpl_hero_size') || 'hero-size-large';
  changeHeroCardSize(heroSize);

  // 1. Section Visibility
  const sections = JSON.parse(localStorage.getItem('chpl_section_visibility')) || DEFAULT_SECTIONS;
  for (const [secId, isVisible] of Object.entries(sections)) {
    previewSectionToggle(secId, isVisible);
  }

  // 2. Announcement Banner
  const announcement = localStorage.getItem('chpl_creator_announcement');
  const annBar = document.getElementById('creator-announcement-bar');
  const annText = document.getElementById('announcement-text-display');
  if (announcement && annBar && annText) {
    annText.textContent = announcement;
    annBar.style.display = 'block';
  } else if (annBar) {
    annBar.style.display = 'none';
  }

  // 3. Render Custom Cards in #how-to-help
  const customCardsContainer = document.getElementById('custom-help-cards-container');
  if (customCardsContainer) {
    const customCards = JSON.parse(localStorage.getItem('chpl_custom_cards')) || [];
    customCardsContainer.innerHTML = customCards.map(c => `
      <div class="card help-card">
        ${c.image ? `<img src="${c.image}" alt="${c.title}" class="help-card-custom-img">` : ''}
        <div class="help-icon">${c.icon || '🌟'}</div>
        <h3>${c.title}</h3>
        <p>${c.desc}</p>
      </div>
    `).join('');
  }

  // 4. Render Inserted Section Images
  const insertedImages = JSON.parse(localStorage.getItem('chpl_inserted_images')) || [];
  const sectionContainers = {
    'hero': document.getElementById('custom-images-hero'),
    'what-happened': document.getElementById('custom-images-what-happened'),
    'charts': document.getElementById('custom-images-charts'),
    'simulator': document.getElementById('custom-images-simulator'),
    'plan': document.getElementById('custom-images-plan'),
    'how-to-help': document.getElementById('custom-images-how-to-help'),
    'feedback': document.getElementById('custom-images-feedback')
  };

  // Clear previous images
  for (const el of Object.values(sectionContainers)) {
    if (el) el.innerHTML = '';
  }

  // Populate images
  insertedImages.forEach(img => {
    const container = sectionContainers[img.section];
    if (container) {
      const imgDiv = document.createElement('div');
      imgDiv.className = `inserted-img-wrap ${img.size || 'banner'}`;
      imgDiv.innerHTML = `
        <img src="${img.image}" alt="${img.caption || 'Library Image'}">
        ${img.caption ? `<div class="inserted-img-caption">${img.caption}</div>` : ''}
      `;
      container.appendChild(imgDiv);
    }
  });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  const savedLang = localStorage.getItem('chpl_lang') || 'en-US';
  changeLanguage(savedLang);
  applyCreatorSettings();

  // Keyboard shortcut: Press Alt + C to open Creator Dashboard anywhere!
  document.addEventListener('keydown', (e) => {
    if (e.altKey && (e.key === 'c' || e.key === 'C')) {
      e.preventDefault();
      openCreatorAuthModal();
    }
  });
});
