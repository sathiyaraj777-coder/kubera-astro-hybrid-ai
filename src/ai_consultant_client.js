/**
 * KUBERA ASTRO - AI VEDIC CONSULTANT CHATBOT CLIENT
 * Conversational thread architecture with clear AI badge verification.
 * Strictly under 300 lines compliant (Rule 6).
 */
(function () {
  'use strict';

  const STORAGE_KEY = 'kubera_astro_ai_brain_history_v1';

  function loadChatHistory() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Could not read chat history from localStorage', e);
    }
    return [];
  }

  function saveChatHistory() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(chatHistory));
    } catch (e) {
      console.warn('Could not save chat history to localStorage', e);
    }
  }

  function clearChatHistory() {
    chatHistory = [];
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {}
    renderStandaloneUI();
  }

  let chatHistory = loadChatHistory();

  function getLang() {
    return window.AstroClient?.getCurrentLanguage?.() || 'en';
  }

  function getWelcomeMessage() {
    const isTa = getLang() === 'ta';
    return isTa
      ? `வணக்கம்! நான் உங்கள் குபேரா வேத ஜோதிட AI ஆலோசகர். உங்கள் பிறந்த ஜாதகம், தொழில் மேன்மை, திருமண யோகம் அல்லது தசா புத்தி குறித்து எந்த கேள்வியும் கேட்கலாம்.`
      : `Namaste! I am your Kubera Vedic Astrology AI Consultant. Ask me anything regarding your horoscope, career prospects, marriage compatibility, or current planetary periods (Dasa-Bhukti).`;
  }

  function renderStandaloneUI() {
    const container = document.getElementById('ai-standalone-consultant-container');
    if (!container) return;
    const isTa = getLang() === 'ta';

    if (chatHistory.length === 0) {
      chatHistory.push({
        sender: 'bot',
        text: getWelcomeMessage(),
        model: 'Google Gemini 2.5 Flash'
      });
    }

    container.innerHTML = `
      <div class="glass-panel" style="padding: 1.5rem; margin-bottom: 2rem;">
        <!-- Header -->
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; flex-wrap: wrap; gap: 0.5rem;">
          <div style="display: flex; align-items: center; gap: 0.75rem;">
            <span style="font-size: 2.2rem;">🕉️</span>
            <div>
              <h2 style="margin: 0; font-size: 1.35rem; font-weight: 800; color: var(--accent-gold-bright);">
                ${isTa ? 'வேத ஜோதிட AI சாட்பாட்' : 'Vedic Astrology AI Chatbot'}
              </h2>
              <span style="font-size: 0.76rem; color: var(--text-muted);">
                #BuildHybridAI • Powered by Google Gemini 2.5 Flash &amp; Chrome Gemini Nano
              </span>
            </div>
          </div>
          <div style="display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap;">
            <button type="button" class="ai-chip-btn" onclick="window.AIConsultantClient?.clearChatHistory()" 
              style="border-color: rgba(239, 68, 68, 0.4); color: #f87171; background: rgba(239, 68, 68, 0.08);">
              🗑️ ${isTa ? 'அரட்டையை அழிக்கவும்' : 'Clear Chat'}
            </button>
            <div id="ai-active-model-pill" style="font-size: 0.76rem; font-weight: 800; padding: 0.35rem 0.85rem; border-radius: var(--radius-pill); background: rgba(245, 158, 11, 0.15); border: 1.5px solid #f59e0b; color: #fbbf24;">
              ☁️ Google Gemini 2.5 Flash (Active Cloud AI)
            </div>
          </div>
        </div>

        <!-- Chat Conversation Thread -->
        <div id="ai-chat-thread" class="ai-chat-thread"></div>

        <!-- Suggested Quick Chips -->
        <div style="display: flex; gap: 0.4rem; flex-wrap: wrap; margin-bottom: 0.85rem;">
          <button type="button" class="ai-chip-btn" onclick="window.AIConsultantClient?.sendQuickChip(1)">
            💼 ${isTa ? 'தொழில் யோகம்' : 'Career Prospects'}
          </button>
          <button type="button" class="ai-chip-btn" onclick="window.AIConsultantClient?.sendQuickChip(2)">
            💍 ${isTa ? 'திருமண வாழ்க்கை' : 'Marriage Compatibility'}
          </button>
          <button type="button" class="ai-chip-btn" onclick="window.AIConsultantClient?.sendQuickChip(3)">
            💰 ${isTa ? 'நிதி நிலைமை' : 'Wealth & Assets'}
          </button>
          <button type="button" class="ai-chip-btn" onclick="window.AIConsultantClient?.sendQuickChip(4)">
            🙏 ${isTa ? 'வேத பரிகாரங்கள்' : 'Spiritual Remedies'}
          </button>
        </div>

        <!-- Input Bar -->
        <form class="ai-chat-input-bar" onsubmit="event.preventDefault(); window.AIConsultantClient?.sendMessage();">
          <input type="text" id="ai-chat-user-input" 
            placeholder="${isTa ? 'ஜோதிட கேள்வியை இங்கே தட்டச்சு செய்யவும்...' : 'Type your astrological question here...'}" 
            style="flex: 1; padding: 0.75rem 1rem; border-radius: var(--radius-sm); border: 1.5px solid var(--accent-gold); background: var(--bg-input); color: var(--text-primary); font-size: 0.95rem; outline: none;">
          <button type="submit" id="btn-chat-send" class="ai-chat-btn-submit">
            <span>✨</span> <span>${isTa ? 'அனுப்பு' : 'Ask AI'}</span>
          </button>
        </form>
      </div>
    `;

    renderChatMessages();
    detectAndReflectModel();
  }

  function renderChatMessages() {
    const thread = document.getElementById('ai-chat-thread');
    if (!thread) return;

    thread.innerHTML = chatHistory.map(msg => {
      const isUser = msg.sender === 'user';
      let content = msg.text
        .replace(/### (.*?)\n/g, '<h4 style="margin:0.25rem 0 0.5rem; color:#fbbf24; font-size:1.05rem;">$1</h4>')
        .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
        .replace(/- (.*?)\n/g, '<div style="margin-bottom:0.35rem;">• $1</div>')
        .replace(/\n/g, '<br>');

      return `
        <div class="ai-bubble ${isUser ? 'ai-bubble-user' : 'ai-bubble-bot'}">
          ${content}
        </div>
      `;
    }).join('');

    thread.scrollTop = thread.scrollHeight;
  }

  async function detectAndReflectModel() {
    const pill = document.getElementById('ai-active-model-pill');
    if (!pill || !window.FirebaseHybridAI) return;
    const isTa = getLang() === 'ta';
    const isNano = await window.FirebaseHybridAI.init();

    if (isNano) {
      pill.innerHTML = isTa 
        ? '⚡ <strong style="color:#10b981;">Gemini Nano</strong> (0ms சாதனத்தில் நேரடி AI)' 
        : '⚡ <strong style="color:#10b981;">Gemini Nano</strong> (0ms On-Device AI)';
      pill.style.background = 'rgba(16, 185, 129, 0.15)';
      pill.style.borderColor = '#10b981';
      pill.style.color = '#34d399';
    } else {
      pill.innerHTML = isTa 
        ? '☁️ <strong style="color:#f59e0b;">Google Gemini 2.5 Flash</strong> (கிளவுட் AI)' 
        : '☁️ <strong style="color:#f59e0b;">Google Gemini 2.5 Flash</strong> (Cloud AI)';
      pill.style.background = 'rgba(245, 158, 11, 0.15)';
      pill.style.borderColor = '#f59e0b';
      pill.style.color = '#fbbf24';
    }
  }

  function sendQuickChip(index) {
    const isTa = getLang() === 'ta';
    const promptsTa = [
      '',
      'என் ஜாதகப்படி தொழில் முன்னேற்றம் மற்றும் வேலை வாய்ப்பு யோகம் எப்படி உள்ளது?',
      'என் ஜாதகப்படி திருமண வாழ்க்கை மற்றும் குடும்ப ஒற்றுமை எப்படி அமையும்?',
      'பொருளாதார வளர்ச்சி, பணவரவு மற்றும் சொத்து வாங்கும் யோகம் எப்போது அதிகரிக்கும்?',
      'தற்போதுள்ள கிரக நிலைகளின்படி நான் செய்ய வேண்டிய எளிய வேத பரிகாரங்கள் என்ன?'
    ];
    const promptsEn = [
      '',
      'What are my career prospects, job growth, or business opportunities according to my chart?',
      'How is my marriage life, spouse compatibility and domestic harmony?',
      'What are my wealth accumulation and property acquisition prospects?',
      'What authentic Vedic remedies should I perform based on my astrological chart?'
    ];

    const input = document.getElementById('ai-chat-user-input');
    if (input) {
      input.value = isTa ? promptsTa[index] : promptsEn[index];
      sendMessage();
    }
  }

  async function sendMessage() {
    const input = document.getElementById('ai-chat-user-input');
    const sendBtn = document.getElementById('btn-chat-send');
    if (!input) return;

    const query = input.value.trim();
    if (!query) return;

    input.value = '';
    const isTa = getLang() === 'ta';

    // Add user message to conversation
    chatHistory.push({ sender: 'user', text: query });
    saveChatHistory();
    renderChatMessages();

    // Add loading / thinking placeholder
    const loadingIdx = chatHistory.length;
    const thinkingText = isTa 
      ? '<div class="ai-thinking-box"><span>🧠 AI கிரக நிலைகளை ஆராய்கிறது</span><span class="ai-thinking-dots"><span></span><span></span><span></span></span></div>' 
      : '<div class="ai-thinking-box"><span>🧠 AI is thinking & synthesizing planetary chart</span><span class="ai-thinking-dots"><span></span><span></span><span></span></span></div>';

    chatHistory.push({
      sender: 'bot',
      text: thinkingText,
      model: 'Thinking...'
    });
    renderChatMessages();

    if (sendBtn) sendBtn.disabled = true;

    const contextData = window.AstroClient?.lastGeneratedData || null;

    try {
      const insight = await window.FirebaseHybridAI.generateInsight(query, contextData, getLang(), chatHistory.slice(0, -1));
      const usedModel = insight.source === 'ON_DEVICE_NANO' 
        ? 'Gemini Nano (On-Device Private)' 
        : 'Google Gemini 2.5 Flash (Cloud API)';

      chatHistory[loadingIdx] = {
        sender: 'bot',
        text: insight.text,
        model: usedModel
      };
    } catch (e) {
      const fallbackMsg = isTa
        ? '⚠️ மன்னிக்கவும், AI சேவை தற்போது கிடைக்கவில்லை. தயவுசெய்து மேலே உள்ள ஜாதகம் / திருமணப் பொருத்தம் / எண் கணிதம் ஆகிய தாவல்களைப் (tabs) பயன்படுத்தி முழு விவரங்களையும் உடனடியாகக் கணக்கிட்டு அறிந்துகொள்ளலாம்.'
        : '⚠️ Sorry, the AI service is currently unavailable. Please use the Horoscope, Matchmaking, or Numerology tabs above to compute complete astrological calculations directly from the engine.';

      chatHistory[loadingIdx] = {
        sender: 'bot',
        text: fallbackMsg,
        model: 'Unavailable'
      };
    } finally {
      if (sendBtn) sendBtn.disabled = false;
      saveChatHistory();
      renderChatMessages();
    }
  }

  window.AIConsultantClient = {
    renderStandalone: renderStandaloneUI,
    sendMessage: sendMessage,
    sendQuickChip: sendQuickChip,
    clearChatHistory: clearChatHistory
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderStandaloneUI);
  } else {
    setTimeout(renderStandaloneUI, 500);
  }
})();
