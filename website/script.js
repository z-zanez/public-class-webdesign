// 蛛网点击特效
!function () {
  function n(n, e, t) {
      return n.getAttribute(e) || t
  }

  function e(n) {
      return document.getElementsByTagName(n)
  }

  function t() {
      var t = e("script"), o = t.length, i = t[o - 1];
      return {l: o, z: n(i, "zIndex", -1), o: n(i, "opacity", .5), c: n(i, "color", "255,0,0"), n: n(i, "count", 99)}
  }

  function o() {
      a = m.width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth, c = m.height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
  }

  function i() {
      r.clearRect(0, 0, a, c);
      var n, e, t, o, m, l;
      s.forEach(function (i, x) {
          for (i.x += i.xa, i.y += i.ya, i.xa *= i.x > a || i.x < 0 ? -1 : 1, i.ya *= i.y > c || i.y < 0 ? -1 : 1, r.fillRect(i.x - .5, i.y - .5, 1, 1), e = x + 1; e < u.length; e++) n = u[e], null !== n.x && null !== n.y && (o = i.x - n.x, m = i.y - n.y, l = o * o + m * m, l < n.max && (n === y && l >= n.max / 2 && (i.x -= .03 * o, i.y -= .03 * m), t = (n.max - l) / n.max, r.beginPath(), r.lineWidth = t / 2, r.strokeStyle = "rgba(" + d.c + "," + Math.max(t + .2, 0.3) + ")", r.moveTo(i.x, i.y), r.lineTo(n.x, n.y), r.stroke()))
      }), x(i)
  }

  var a, c, u, m = document.createElement("canvas"), d = t(), l = "c_n" + d.l, r = m.getContext("2d"),
      x = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (n) {
          window.setTimeout(n, 1e3 / 45)
      }, w = Math.random, y = {x: null, y: null, max: 2e4};
  m.id = l, m.style.cssText = "position:fixed;top:0;left:0;z-index:" + d.z + ";opacity:" + d.o, e("body")[0].appendChild(m), o(), window.onresize = o, window.onmousemove = function (n) {
      n = n || window.event, y.x = n.clientX, y.y = n.clientY
  }, window.onmouseout = function () {
      y.x = null, y.y = null
  };
  for (var s = [], f = 0; d.n > f; f++) {
      var h = w() * a, g = w() * c, v = 2 * w() - 1, p = 2 * w() - 1;
      s.push({x: h, y: g, xa: v, ya: p, max: 6e3})
  }
  u = s.concat([y]), setTimeout(function () {
      i()
  }, 100)
}();


// 表单提交事件
document.getElementById('contactForm').addEventListener('submit', function(event) {
  event.preventDefault(); // 阻止表单默认提交行为

  // 获取表单数据
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;

  // 简单验证
  if (name && email && message) {
      alert('感谢您的留言！我们会尽快联系您。');
      document.getElementById('contactForm').reset(); // 清空表单
  } else {
      alert('请填写所有字段。');
  }
});



// 页面搜索工具定义
// 更新script.js中的搜索功能
document.addEventListener('DOMContentLoaded', () => {
  const searchToggle = document.getElementById('searchToggle');
  const searchBox = document.querySelector('.search-box');
  const searchInput = document.getElementById('searchInput');
  const resultsContainer = document.getElementById('searchResults');

  // 切换搜索框可见性
  searchToggle.addEventListener('click', (e) => {
      e.preventDefault();
      searchBox.classList.toggle('active');
      if (searchBox.classList.contains('active')) {
          searchInput.focus();
      }
  });

  // 实时搜索功能
  searchInput.addEventListener('input', debounce(performSearch, 300));

  // 提交搜索
  document.getElementById('searchSubmit').addEventListener('click', performSearch);

  function performSearch() {
      const query = searchInput.value.trim().toLowerCase();
      resultsContainer.innerHTML = '';
      
      if (!query) {
          resultsContainer.classList.remove('active');
          return;
      }

      // 遍历所有可搜索内容
      const searchables = document.querySelectorAll('[data-searchable]');
      const matches = [];
      
      searchables.forEach(section => {
          const text = section.textContent.toLowerCase();
          if (text.includes(query)) {
              const title = section.querySelector('h2, h3').textContent;
              matches.push({
                  title,
                  id: section.id,
                  content: text.substring(0, 150) + '...'
              });
          }
      });

      // 显示结果
      if (matches.length) {
          matches.forEach(match => {
              const item = document.createElement('div');
              item.className = 'search-result-item';
              item.innerHTML = `
                  <h4><a href="#${match.id}">${match.title}</a></h4>
                  <p>${match.content}</p>
              `;
              resultsContainer.appendChild(item);
          });
          resultsContainer.classList.add('active');
      } else {
          resultsContainer.innerHTML = '<div class="search-result-item">未找到相关结果</div>';
          resultsContainer.classList.add('active');
      }
  }

  // 防抖函数优化性能
  function debounce(func, wait) {
      let timeout;
      return function(...args) {
          clearTimeout(timeout);
          timeout = setTimeout(() => func.apply(this, args), wait);
      };
  }

  // 点击外部关闭搜索结果
  document.addEventListener('click', (e) => {
      if (!e.target.closest('.search-container')) {
          resultsContainer.classList.remove('active');
      }
  });
});



const i18nData = {
  cn: {
    // --- 网页通用 ---
    titleSite: "我的网站",
    mainHeader: "网络空间安全",
    toggleTheme: "夜间模式",
    searchPlaceholder: "搜索...",

    navHome: "首页",
    navAbout: "关于",
    navServices: "服务",
    navNews: "新闻",
    navContact: "联系",

    footerText: "© 2023 我的公司. 保留所有权利。",

    // --- 首页 ---
    homeTitle: "首页",
    homeContent: "欢迎来到我们的网站！我们致力于提供最先进的网络空间安全解决方案，保护您的数据和隐私。",

    // --- 关于 ---
    aboutTitle: "关于我们",
    aboutContent: "党训班第21组，热衷于研究网络空间安全领域！",

    // --- 定义 ---
    defTitle: "网络空间安全定义",
    defContent: "网络空间安全是指通过技术手段、管理措施及政策保障网络环境中的数据、信息系统及其传输的安全性、完整性和可用性。",

    // --- 危机四伏 ---
    nDefTitle: "网络空间“危机四伏”",
    nDefContent: "随着数字化社会的发展，网络空间安全已成为各个领域必不可少的基础设施。无论是个人数据保护，还是国家的关键信息基础设施，网络安全问题正日益受到重视。网络攻击形式多种多样，可能威胁到个人隐私、企业机密甚至国家安全。从简单的网络钓鱼到复杂的勒索病毒、DDoS攻击，攻击者通过不断创新手段突破防线。因此，全面提升网络空间的安全防护能力已成为当务之急。",

    // --- 服务 ---
    serviceTitle: "我们的服务",
    serviceItem1Title: "近期新闻",
    serviceItem1Desc: "提供最新的网络空间安全新闻，帮助用户及时了解行业动态。",
    serviceItem2Title: "网络空间安全防范措施",
    serviceItem2Desc: "介绍各种网络空间安全防范措施，帮助用户提升安全意识和防护能力。",
    serviceItem3Title: "网络空间安全工具推荐",
    serviceItem3Desc: "推荐各种网络空间安全工具，帮助用户选择适合的工具来保护数据和系统。",

    // --- 新闻 ---
    newsTitle: "近期网络空间安全新闻",
    likeBtn: "点赞 (0)",
    commentBtn: "评论",
    commentPlaceholder: "请输入评论...",
    submitComment: "提交评论",

    newsArticle1Title: "微软高管邮箱被“午夜暴风雪”攻陷",
    newsArticle1Time: "2024年1月",
    newsArticle1Content: "微软披露其遭到威胁组织“午夜暴风雪”攻击，攻击者通过非生产测试租户账户获得访问权限......",

    newsArticle2Title: "CrowdStrike更新失误致全球Windows系统崩溃",
    newsArticle2Time: "2024年7月",
    newsArticle2Content: "CrowdStrike的更新故障导致全球数百万Windows系统崩溃......",

    newsArticle3Title: "黎巴嫩突发寻呼机大规模群体爆炸",
    newsArticle3Time: "2024年9月",
    newsArticle3Content: "黎巴嫩首都发生一起寻呼机爆炸事件，导致至少12人死亡、2800多人受伤......",

    // --- 统计 ---
    statTitle: "网络空间安全统计数据（2023年7月-2024年6月）",
    statCol1: "主要攻击类型",
    statCol2: "事件数量",
    statCol3: "占比（%）",
    statRow1: "DOS/DDOS/RDOS",
    statRow2: "勒索病毒（Ransomware）",
    statRow3: "数据泄露（Data）",
    statRow4: "社会工程学攻击（Social Engineering Threats）",
    statRow5: "恶意软件（Malware）",
    statRow6: "供应链攻击（Supply Chain Attack）",
    statRow7: "网络威胁（Web Threats）",
    statRow8: "零日漏洞（Zero Day）",
    statSource: "数据来源",
    statSourceLink: "ENISA 2024报告",

    // --- 防护措施 ---
    measuresTitle: "网络空间安全防护措施",
    measuresItem1: "强密码和密码管理：强密码是防止恶意攻击者入侵账户的第一道防线......",
    measuresItem2: "多因素身份验证（MFA）：通过结合密码、手机验证、指纹识别等多种方式......",
    measuresItem3: "定期系统更新和补丁管理：许多网络攻击都利用了操作系统和应用程序中的已知漏洞......",
    measuresItem4: "数据加密：数据加密是保护信息安全的重要手段之一......",
    measuresItem5: "防火墙和入侵检测系统（IDS）：防火墙可以帮助防止未授权访问并控制网络流量......",
    measuresItem6: "网络安全意识培训：网络钓鱼攻击和社交工程攻击是最常见的网络入侵方式之一......",

    // --- 工具 ---
    toolsTitle: "网络空间安全工具",
    toolsDetectTitle: "网络安全检测工具",
    toolsDetectItem1: "SecurityHeaders.io - 该工具可帮助分析网站的HTTP头部设置......",
    toolsDetectItem2: "Qualys SSL Labs - 用于检查网站的SSL/TLS配置......",
    toolsFirewallTitle: "防火墙配置指南",
    toolsFirewallItem1: "配置规则 - 只允许特定IP地址或端口的流量进入网络......",
    toolsFirewallItem2: "防火墙日志监控 - 定期查看防火墙日志......",
    toolsFirewallItem3: "入侵检测与响应 - 防火墙应配合入侵检测系统使用......",
    toolsEncryptTitle: "数据加密工具",
    toolsEncryptItem1: "VeraCrypt - 一款开源磁盘加密工具，可用于加密整个硬盘或文件夹。",
    toolsEncryptItem2: "BitLocker（Windows） - 可加密系统盘和数据盘，防止数据丢失或被盗。",

    // --- 小测试 ---
    quizTitle: "网络安全小测试",
    quizSubmit: "提交答案",
    quizQ1: "问题 1: 什么是网络钓鱼？",
    quizQ1Parse: "正确答案解析：网络钓鱼是一种通过伪装成可信任机构骗取用户信息的攻击手段。",
    quizQ2: "问题 2: 什么是“勒索病毒”？",
    quizQ2Parse: "正确答案解析：勒索病毒是一种恶意软件，它加密数据并要求支付赎金才能解密。",
    quizQ3: "问题 3: 以下哪种方式能有效防止密码被盗？",
    quizQ3Parse: "正确答案解析：启用两步验证（2FA）是一个有效的保护措施......",
    quizQ4: "问题 4: 以下哪个是强密码的特点？",
    quizQ4Parse: "正确答案解析：强密码是防止恶意攻击者入侵账户的第一道防线......",
    quizQ5: "问题 5: 网络攻击的常见入口是：",
    quizQ5Parse: "正确答案解析：密码破解、系统漏洞和社会工程学攻击都是网络攻击的常见入口。",
    quizQ6: "问题 6: 如何加强网站的安全性？",
    quizQ6Parse: "正确答案解析：禁用所有非必要的网络服务是一个良好的安全实践......",

    // ===== 新增每道题的 A/B/C/D 选项 =====
    quizQ1A: "A. 一种通过伪装成可信任机构骗取用户信息的攻击手段",
    quizQ1B: "B. 一种通过搜索引擎获得信息的方式",
    quizQ1C: "C. 一种网络游戏活动",
    quizQ1D: "D. 一种网络加速技术",

    quizQ2A: "A. 一种通过窃取密码实现攻击的病毒",
    quizQ2B: "B. 一种恶意软件，它加密数据并要求支付赎金",
    quizQ2C: "C. 一种用于测试系统漏洞的工具",
    quizQ2D: "D. 一种常见的病毒防护软件",

    quizQ3A: "A. 使用简单密码并且不经常更换",
    quizQ3B: "B. 启用两步验证（2FA）",
    quizQ3C: "C. 使用相同密码用于所有网站",
    quizQ3D: "D. 关闭防火墙",

    quizQ4A: "A. 简单的字母和数字组合",
    quizQ4B: "B. 至少12个字符，包含大小写字母、数字和符号",
    quizQ4C: "C. 只包含数字",
    quizQ4D: "D. 与用户名相同",

    quizQ5A: "A. 密码破解",
    quizQ5B: "B. 系统漏洞",
    quizQ5C: "C. 社会工程学攻击",
    quizQ5D: "D. 以上所有",

    quizQ6A: "A. 禁用所有非必要的网络服务",
    quizQ6B: "B. 通过HTTPS加密传输数据",
    quizQ6C: "C. 定期更新软件和系统",
    quizQ6D: "D. 以上所有",

    // --- 联系 ---
    contactTitle: "联系我们",
    contactNameLabel: "姓名:",
    contactEmailLabel: "邮箱:",
    contactMsgLabel: "留言:",
    contactSubmit: "提交",

  },
  en: {
    // --- General ---
    titleSite: "My Website",
    mainHeader: "Cybersecurity",
    toggleTheme: "Dark Mode",
    searchPlaceholder: "Search...",

    navHome: "Home",
    navAbout: "About",
    navServices: "Services",
    navNews: "News",
    navContact: "Contact",

    footerText: "© 2023 My Company. All rights reserved.",

    // --- Home ---
    homeTitle: "Home",
    homeContent: "Welcome to our website! We are committed to providing the most advanced cybersecurity solutions to protect your data and privacy.",

    // --- About ---
    aboutTitle: "About Us",
    aboutContent: "We are Team 21, devoted to researching the field of cybersecurity!",

    // --- Definition ---
    defTitle: "Definition of Cybersecurity",
    defContent: "Cybersecurity refers to the protection of data, information systems, and their transmissions in a network environment through technical measures, management controls, and policies.",

    // --- Crisis ---
    nDefTitle: "Cybersecurity Is At Risk",
    nDefContent: "As our society becomes increasingly digital, cybersecurity has become essential infrastructure across all sectors. Whether for personal data protection or national critical information infrastructure, cybersecurity issues are receiving more attention. Cyberattacks come in various forms, threatening personal privacy, corporate secrets, and even national security. From simple phishing to complex ransomware or DDoS attacks, attackers continually innovate to breach defenses. Therefore, enhancing comprehensive cybersecurity protection has become an urgent matter.",

    // --- Services ---
    serviceTitle: "Our Services",
    serviceItem1Title: "Latest Cybersecurity News",
    serviceItem1Desc: "Providing up-to-date cybersecurity news to help users stay informed about industry trends.",
    serviceItem2Title: "Cybersecurity Measures",
    serviceItem2Desc: "Introducing various cybersecurity measures to help users raise awareness and enhance their defenses.",
    serviceItem3Title: "Recommended Security Tools",
    serviceItem3Desc: "Recommending various cybersecurity tools to help users choose suitable ones for data and system protection.",

    // --- News ---
    newsTitle: "Recent Cybersecurity News",
    likeBtn: "Like (0)",
    commentBtn: "Comment",
    commentPlaceholder: "Enter your comment...",
    submitComment: "Submit",

    newsArticle1Title: "Microsoft Executives’ Mailboxes Breached by 'Midnight Blizzard'",
    newsArticle1Time: "January 2024",
    newsArticle1Content: "Microsoft disclosed that it was attacked by the threat group 'Midnight Blizzard'. The attackers gained access via a non-production testing tenant account and performed password spraying to steal emails, files, and some source code from executives and employees...",

    newsArticle2Title: "CrowdStrike Update Error Causes Global Windows Crashes",
    newsArticle2Time: "July 2024",
    newsArticle2Content: "A CrowdStrike update error caused millions of Windows systems worldwide to crash. The faulty update triggered blue screens, affecting 8.5 million systems and causing major disruptions in aviation, banking, and healthcare...",

    newsArticle3Title: "Lebanon Pager Explosion Sparks Mass Casualties",
    newsArticle3Time: "September 2024",
    newsArticle3Content: "A pager explosion in Lebanon’s capital caused at least 12 deaths and 2,800 injuries. The pager, remotely triggered and loaded with explosives in its lithium battery, shows that cyberattacks have extended beyond the digital world into physical harm...",

    // --- Statistics ---
    statTitle: "Cybersecurity Statistics (July 2023 - June 2024)",
    statCol1: "Major Attack Types",
    statCol2: "Number of Incidents",
    statCol3: "Percentage (%)",
    statRow1: "DOS/DDOS/RDOS",
    statRow2: "Ransomware",
    statRow3: "Data Breach",
    statRow4: "Social Engineering Attacks",
    statRow5: "Malware",
    statRow6: "Supply Chain Attack",
    statRow7: "Web Threats",
    statRow8: "Zero Day",
    statSource: "Data Source",
    statSourceLink: "ENISA 2024 Report",

    // --- Measures ---
    measuresTitle: "Cybersecurity Measures",
    measuresItem1: "Strong Passwords & Management: Strong passwords are the first line of defense against malicious attackers...",
    measuresItem2: "Multi-Factor Authentication (MFA): By combining passwords, phone verification, fingerprint recognition, etc. ...",
    measuresItem3: "Regular System Updates & Patching: Many cyberattacks exploit known vulnerabilities in operating systems and applications...",
    measuresItem4: "Data Encryption: Encrypting data is an important way to protect information security...",
    measuresItem5: "Firewalls & Intrusion Detection Systems (IDS): Firewalls help block unauthorized access and control traffic...",
    measuresItem6: "Cybersecurity Awareness Training: Phishing and social engineering are among the most common attack vectors...",

    // --- Tools ---
    toolsTitle: "Cybersecurity Tools",
    toolsDetectTitle: "Security Detection Tools",
    toolsDetectItem1: "SecurityHeaders.io - Helps analyze HTTP header settings to evaluate website security and provide recommendations.",
    toolsDetectItem2: "Qualys SSL Labs - Used to check a website’s SSL/TLS configuration, ensuring secure data transmission.",
    toolsFirewallTitle: "Firewall Configuration Guide",
    toolsFirewallItem1: "Configuration Rules - Only allow traffic from specific IP addresses or ports...",
    toolsFirewallItem2: "Firewall Log Monitoring - Regularly review firewall logs to detect abnormal access or potential attacks.",
    toolsFirewallItem3: "Intrusion Detection & Response - Firewalls should be used with IDS to promptly identify and respond to intrusions.",
    toolsEncryptTitle: "Data Encryption Tools",
    toolsEncryptItem1: "VeraCrypt - An open-source disk encryption tool that can encrypt entire drives or specific folders.",
    toolsEncryptItem2: "BitLocker (Windows) - A built-in tool for Windows that encrypts system and data drives to prevent data loss or theft.",

    // --- Quiz ---
    quizTitle: "Cybersecurity Quiz",
    quizSubmit: "Submit Answers",
    quizQ1: "Question 1: What is phishing?",
    quizQ1Parse: "Correct Explanation: Phishing is an attack that impersonates a trusted entity to trick users into revealing information.",
    quizQ2: "Question 2: What is ransomware?",
    quizQ2Parse: "Correct Explanation: Ransomware is malicious software that encrypts data and demands payment for decryption.",
    quizQ3: "Question 3: Which method can effectively prevent password theft?",
    quizQ3Parse: "Correct Explanation: Enabling two-factor authentication (2FA) is an effective safeguard...",
    quizQ4: "Question 4: Which is a characteristic of a strong password?",
    quizQ4Parse: "Correct Explanation: Strong passwords are the first line of defense against malicious attackers...",
    quizQ5: "Question 5: Common entry points for cyberattacks include:",
    quizQ5Parse: "Correct Explanation: Password cracking, system vulnerabilities, and social engineering are common entry points.",
    quizQ6: "Question 6: How to strengthen website security?",
    quizQ6Parse: "Correct Explanation: Disabling unnecessary network services is good practice...",

    // ===== 新增每道题的 A/B/C/D 选项 =====
    quizQ1A: "A. An attack method that impersonates a trusted organization to steal user information",
    quizQ1B: "B. A method to obtain information through a search engine",
    quizQ1C: "C. An online gaming activity",
    quizQ1D: "D. A network acceleration technology",

    quizQ2A: "A. A virus that attacks by stealing passwords",
    quizQ2B: "B. A malicious program that encrypts data and demands ransom",
    quizQ2C: "C. A tool used to test system vulnerabilities",
    quizQ2D: "D. A common antivirus software",

    quizQ3A: "A. Use simple passwords and rarely change them",
    quizQ3B: "B. Enable two-factor authentication (2FA)",
    quizQ3C: "C. Use the same password for all websites",
    quizQ3D: "D. Turn off the firewall",

    quizQ4A: "A. A simple combination of letters and numbers",
    quizQ4B: "B. At least 12 characters, including uppercase, lowercase, numbers, and symbols",
    quizQ4C: "C. Numbers only",
    quizQ4D: "D. The same as the username",

    quizQ5A: "A. Password cracking",
    quizQ5B: "B. System vulnerabilities",
    quizQ5C: "C. Social engineering attacks",
    quizQ5D: "D. All of the above",

    quizQ6A: "A. Disable all unnecessary network services",
    quizQ6B: "B. Encrypt data transmission via HTTPS",
    quizQ6C: "C. Regularly update software and systems",
    quizQ6D: "D. All of the above",

    // --- Contact ---
    contactTitle: "Contact Us",
    contactNameLabel: "Name:",
    contactEmailLabel: "Email:",
    contactMsgLabel: "Message:",
    contactSubmit: "Submit",
  }
};


// ========== 页面加载时，初始化功能 ========== //
document.addEventListener('DOMContentLoaded', function() {
  // 1) 多语言
  initLanguage();

  // 2) 夜间模式
  initDarkMode();

  // 3) 回到顶部
  initBackToTop();

  // 4) 评论 / 点赞
  initLikeAndComment();

  // 5) 搜索功能
  initSearch();

  // 6) 小测试判分
  initQuiz();

  // 7) 联系表单提交示例
  initContactForm();
});

// ========== 1) 多语言切换 ========== //
function initLanguage() {
  const languageSelector = document.getElementById('languageSelector');
  const allI18nElements = document.querySelectorAll('[data-i18n]');
  const allI18nPlaceholders = document.querySelectorAll('[data-i18n-placeholder]');

  // 如果 localStorage 中已保存语言，读取，否则默认中文
  let savedLang = localStorage.getItem('language') || 'cn';
  languageSelector.value = savedLang;
  switchLanguage(savedLang);

  // 切换下拉事件
  languageSelector.addEventListener('change', () => {
    const selectedLang = languageSelector.value;
    localStorage.setItem('language', selectedLang);
    switchLanguage(selectedLang);
  });

  function switchLanguage(lang) {
    // 替换文本
    allI18nElements.forEach(elem => {
      const key = elem.getAttribute('data-i18n');
      if (i18nData[lang] && i18nData[lang][key]) {
        elem.textContent = i18nData[lang][key];
      }
    });
    // 替换 placeholder
    allI18nPlaceholders.forEach(elem => {
      const placeholderKey = elem.getAttribute('data-i18n-placeholder');
      if (i18nData[lang] && i18nData[lang][placeholderKey]) {
        elem.setAttribute('placeholder', i18nData[lang][placeholderKey]);
      }
    });
  }
}

// ========== 2) 夜间模式 ========== //
function initDarkMode() {
  const toggleDarkModeBtn = document.getElementById('toggleDarkMode');
  const body = document.body;

  // 页面加载时检查主题
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    body.classList.add('dark-mode');
  }

  // 点击切换
  toggleDarkModeBtn.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    if (body.classList.contains('dark-mode')) {
      localStorage.setItem('theme', 'dark');
    } else {
      localStorage.setItem('theme', 'light');
    }
  });
}

// ========== 3) 回到顶部 ========== //
function initBackToTop() {
  const backToTopBtn = document.getElementById('backToTop');

  window.addEventListener('scroll', () => {
    if (document.documentElement.scrollTop > 300 || document.body.scrollTop > 300) {
      backToTopBtn.style.display = 'block';
    } else {
      backToTopBtn.style.display = 'none';
    }
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ========== 4) 评论 / 点赞 ========== //
function initLikeAndComment() {
  // 点赞
  const likeButtons = document.querySelectorAll('.like-btn');
  likeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      let currentLikes = parseInt(btn.getAttribute('data-likes')) || 0;
      currentLikes++;
      btn.setAttribute('data-likes', currentLikes);

      // 根据当前语言决定按钮文字
      const lang = localStorage.getItem('language') || 'cn';
      const baseText = (lang === 'en') ? "Like" : "点赞";
      btn.textContent = `${baseText} (${currentLikes})`;
    });
  });

  // 显示/隐藏评论区
  const commentButtons = document.querySelectorAll('.comment-btn');
  commentButtons.forEach(cBtn => {
    cBtn.addEventListener('click', () => {
      const commentSection = cBtn.parentElement.querySelector('.comment-section');
      if (commentSection.style.display === 'none' || commentSection.style.display === '') {
        commentSection.style.display = 'block';
      } else {
        commentSection.style.display = 'none';
      }
    });
  });

  // 提交评论
  const submitCommentBtns = document.querySelectorAll('.submit-comment');
  submitCommentBtns.forEach(sBtn => {
    sBtn.addEventListener('click', () => {
      const commentSection = sBtn.parentElement;
      const commentInput = commentSection.querySelector('.comment-input');
      const commentList = commentSection.querySelector('.comment-list');
      const content = commentInput.value.trim();
      if (content !== '') {
        const li = document.createElement('li');
        li.textContent = content;
        commentList.appendChild(li);
        commentInput.value = '';
      }
    });
  });
}

// ========== 5) 搜索功能 ========== //
function initSearch() {
  const searchToggle = document.getElementById('searchToggle');
  const searchBox = document.querySelector('.search-box');
  const searchInput = document.getElementById('searchInput');
  const searchSubmit = document.getElementById('searchSubmit');
  const searchResultsDiv = document.getElementById('searchResults');

  // 点击图标，展开/收起搜索框
  searchToggle.addEventListener('click', () => {
    if (searchBox.style.display === 'block') {
      searchBox.style.display = 'none';
      searchResultsDiv.style.display = 'none';
    } else {
      searchBox.style.display = 'block';
      searchInput.focus();
    }
  });

  // 点击搜索按钮
  searchSubmit.addEventListener('click', () => {
    performSearch();
  });

  // 回车搜索
  searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      performSearch();
    }
  });

  function performSearch() {
    const keyword = searchInput.value.trim().toLowerCase();
    if (!keyword) return;

    const searchableSections = document.querySelectorAll('[data-searchable]');
    let results = [];
    searchableSections.forEach(section => {
      const textContent = section.innerText.toLowerCase();
      if (textContent.includes(keyword)) {
        // 取此section的标题
        const sectionTitle = section.querySelector('h2, h3');
        let titleText = sectionTitle ? sectionTitle.innerText : "Untitled Section";
        results.push({ title: titleText, element: section });
      }
    });

    // 显示结果
    searchResultsDiv.innerHTML = '';
    if (results.length === 0) {
      searchResultsDiv.innerHTML = '<p>未找到匹配结果</p>';
      searchResultsDiv.style.display = 'block';
    } else {
      let ul = document.createElement('ul');
      results.forEach(item => {
        let li = document.createElement('li');
        li.innerHTML = `<a href="javascript:void(0)">${item.title}</a>`;
        li.addEventListener('click', () => {
          item.element.scrollIntoView({ behavior: 'smooth' });
        });
        ul.appendChild(li);
      });
      searchResultsDiv.appendChild(ul);
      searchResultsDiv.style.display = 'block';
    }
  }
}

// ========== 6) 小测验判分 ========== //
function initQuiz() {
  const quizForm = document.getElementById('quizForm');
  if (!quizForm) return;

  quizForm.addEventListener('submit', function(event) {
    event.preventDefault(); // 防止页面刷新
    const totalQuestions = 6;
    let score = 0;
    const correctAnswers = {
      q1: "a",
      q2: "b",
      q3: "b",
      q4: "b",
      q5: "d",
      q6: "d"
    };

    for (let i = 1; i <= totalQuestions; i++) {
      const q = document.querySelector(`input[name="q${i}"]:checked`);
      const resultDiv = document.getElementById('result' + i);
      const parserDiv = document.getElementById('parser' + i);

      if (q && q.value === correctAnswers['q' + i]) {
        score++;
        resultDiv.textContent = "正确";
        resultDiv.classList.remove('wrong');
        parserDiv.style.display = 'none';
      } else {
        resultDiv.textContent = "错误";
        resultDiv.classList.add('wrong');
        parserDiv.style.display = 'block';
      }
    }

    let summary = document.getElementById('quizSummary');
    if (!summary) {
      summary = document.createElement('div');
      summary.id = 'quizSummary';
      document.getElementById('quiz').appendChild(summary);
    }
    summary.innerHTML = `你的得分: ${score} / ${totalQuestions}，正确率: ${(score / totalQuestions * 100).toFixed(2)}%`;
  });
}

// ========== 7) 联系表单 ========== //
function initContactForm() {
  const contactForm = document.getElementById('contactForm');
  if (!contactForm) return;

  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    alert("表单已提交！(此处可添加后端发送逻辑)");
    contactForm.reset();
  });
}