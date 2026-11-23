/* =============================================================================
 *  app.js —— 渲染逻辑与全部交互动效（一般无需修改）
 * =============================================================================
 *  内容数据来自 content.js 的 window.SITE。
 *  若只想改内容，请编辑 content.js，不要改本文件。
 * =============================================================================
 */
(function () {
  'use strict';

  var SITE = window.SITE;

  /* ---------------- 语言状态 ---------------- */
  var lang = localStorage.getItem('site-lang') || SITE.defaultLang || 'zh';
  if (lang !== 'zh' && lang !== 'en') lang = 'zh';
  var currentFilter = 'all';
  var typewriterTimer = null;
  var galleries = { works: [], certs: [] };   // 全屏查看的图片集合
  var activeGallery = null;
  var lightboxIndex = 0;

  /* ---------------- 工具函数 ---------------- */
  function $(sel) { return document.querySelector(sel); }
  function $$(sel) { return Array.prototype.slice.call(document.querySelectorAll(sel)); }

  // 解析双语字段：字符串直接返回，对象取当前语言（缺省回退 zh -> en）
  function t(field) {
    if (field == null) return '';
    if (typeof field === 'string') return field;
    return field[lang] != null ? field[lang] : (field.zh != null ? field.zh : (field.en != null ? field.en : ''));
  }
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function clamp(v, min, max) { return Math.max(min, Math.min(max, v)); }

  /* ---------------- 图标 ---------------- */
  var icons = {
    email: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>',
    phone: '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>',
    pin: '<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>',
    arrow: '<line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>',
    external: '<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>',
    zoom: '<polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/><line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/>',
    github: '<path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>',
    linkedin: '<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4V9h4v1.5"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>',
    twitter: '<path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/>',
    instagram: '<rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>',
    dribbble: '<circle cx="12" cy="12" r="10"/><path d="M8.56 2.75c4.37 6 6 9.42 8 17.72M19.13 5.09C15.22 9.14 10 10.44 2.25 10.94"/><path d="M21.75 12.84c-6.62-1.41-12.14 1-16.38 6.32"/>',
    wechat: '<path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>',
    globe: '<circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>',
  };
  function svg(name) {
    var body = icons[name] || icons.globe;
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' + body + '</svg>';
  }

  /* =========================================================================
   *  渲染函数
   * ========================================================================= */

  // 判断某个版块是否有内容（没有内容则隐藏版块、并从导航中移除对应项）
  function sectionHasContent(id) {
    switch (id) {
      case 'about':      return !!(SITE.about && (SITE.about.paragraphs || []).length);
      case 'experience': return !!(SITE.experience && (SITE.experience.items || []).length);
      case 'skills':     return !!(SITE.skills && (SITE.skills.groups || []).length);
      case 'projects':     return !!(SITE.projects && (SITE.projects.items || []).length);
      case 'certificates': return !!(SITE.certificates && (SITE.certificates.items || []).length);
      case 'contact':      return !!(SITE.contact && (SITE.contact.email || SITE.contact.phone || (SITE.contact.socials || []).length));
      default:           return true;
    }
  }

  function renderNav() {
    $('#navLogo').textContent = t(SITE.siteName);
    var html = (SITE.nav || []).filter(function (item) { return sectionHasContent(item.id); }).map(function (item) {
      return '<a class="nav-link" href="#' + esc(item.id) + '">' + esc(t(item.label)) + '</a>';
    }).join('');
    $('#navLinks').innerHTML = html;
    $('#langToggle').textContent = lang === 'zh' ? 'EN' : '中文';
    $('#langToggle').setAttribute('title', lang === 'zh' ? 'Switch to English' : '切换到中文');
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
  }

  function renderHero() {
    var h = SITE.hero || {};
    $('#heroGreeting').textContent = t(h.greeting);
    $('#heroName').textContent = lang === 'zh' ? (h.name || '') : (h.nameEn || h.name || '');
    $('#heroRoleStatic').textContent = '—';
    $('#heroTagline').textContent = t(h.tagline);
    $('#heroLocation').textContent = t(h.location);

    var cta = '';
    if (h.ctaPrimary) cta += '<a class="btn btn-primary" href="' + esc(h.ctaPrimary.href) + '">' + esc(t(h.ctaPrimary.label)) + '</a>';
    if (h.ctaSecondary) cta += '<a class="btn btn-ghost" href="' + esc(h.ctaSecondary.href) + '">' + esc(t(h.ctaSecondary.label)) + '</a>';
    $('#heroCta').innerHTML = cta;

    var av = $('#heroAvatarWrap');
    if (h.avatar) {
      av.style.display = 'flex';
      av.innerHTML = '<div class="hero-avatar"><img src="' + esc(h.avatar) + '" alt="' + esc(t(h.name ? { zh: h.name, en: h.nameEn || h.name } : SITE.siteName)) + '"/></div>';
    } else {
      av.style.display = 'none';
      av.innerHTML = '';
    }

    $('#scrollIndicatorText').textContent = lang === 'zh' ? '向下滚动' : 'Scroll';
    $('#preloaderName').textContent = lang === 'zh' ? (h.name || t(SITE.siteName)) : (h.nameEn || h.name || t(SITE.siteName));
    document.title = t(SITE.siteName) + ' · ' + (lang === 'zh' ? '作品集' : 'Portfolio');
  }

  function renderAbout() {
    var a = SITE.about || {};
    $('#aboutEyebrow').textContent = lang === 'zh' ? '01 · 关于' : '01 · About';
    $('#aboutTitle').textContent = t(a.title);
    $('#aboutText').innerHTML = (a.paragraphs || []).map(function (p) {
      return '<p>' + esc(t(p)) + '</p>';
    }).join('');

    var hg = $('#aboutHighlights');
    hg.innerHTML = (a.highlights || []).map(function (h, i) {
      return '<div class="highlight-card reveal" style="transition-delay:' + (i * 90) + 'ms">' +
        '<span class="highlight-value">' + esc(h.value) + '</span>' +
        '<span class="highlight-label">' + esc(t(h.label)) + '</span>' +
        '</div>';
    }).join('');
  }

  function renderExperience() {
    var e = SITE.experience || {};
    $('#experienceEyebrow').textContent = lang === 'zh' ? '02 · 经历' : '02 · Experience';
    $('#experienceTitle').textContent = t(e.title);

    var items = e.items || [];
    var tl = $('#timeline');
    if (!items.length) { tl.innerHTML = ''; return; }
    tl.innerHTML = '<div class="timeline-fill" id="timelineFill"></div>' + items.map(function (item, i) {
      var kindLabel = item.kind === 'education' ? (lang === 'zh' ? '教育' : 'Education') : (lang === 'zh' ? '工作' : 'Work');
      var bullets = (item.bullets || []).map(function (b) { return '<li>' + esc(t(b)) + '</li>'; }).join('');
      var tags = (item.tags || []).map(function (tg) { return '<span class="tag">' + esc(tg) + '</span>'; }).join('');
      var side = i % 2 === 0 ? 'reveal-left' : 'reveal-right';
      return '<div class="timeline-item ' + side + '" style="transition-delay:80ms">' +
        '<span class="timeline-dot"></span>' +
        '<div class="timeline-card">' +
          '<span class="timeline-kind ' + esc(item.kind || 'work') + '">' + esc(kindLabel) + '</span>' +
          '<h3 class="timeline-role">' + esc(t(item.role)) + '</h3>' +
          '<div class="timeline-company">' + esc(t(item.company)) + '</div>' +
          '<p class="timeline-meta">' + esc(t(item.period)) + (item.location ? ' · ' + esc(t(item.location)) : '') + '</p>' +
          (item.summary ? '<p class="timeline-summary">' + esc(t(item.summary)) + '</p>' : '') +
          (bullets ? '<ul class="timeline-bullets">' + bullets + '</ul>' : '') +
          (tags ? '<div class="timeline-tags">' + tags + '</div>' : '') +
        '</div></div>';
    }).join('');
  }

  function renderSkills() {
    var s = SITE.skills || {};
    $('#skillsEyebrow').textContent = lang === 'zh' ? '03 · 技能' : '03 · Skills';
    $('#skillsTitle').textContent = t(s.title);

    var grid = $('#skillsGrid');
    grid.innerHTML = (s.groups || []).map(function (g, gi) {
      var itemsHtml = (g.items || []).map(function (it) {
        return '<div class="skill-item">' +
          '<div class="skill-item-head"><span class="skill-item-name">' + esc(it.name) + '</span><span class="skill-item-level">' + esc(it.level) + '%</span></div>' +
          '<div class="skill-bar"><div class="skill-bar-fill" data-level="' + esc(it.level) + '"></div></div>' +
          '</div>';
      }).join('');
      return '<div class="skill-group reveal" style="transition-delay:' + (gi * 110) + 'ms">' +
        '<h3 class="skill-group-name">' + esc(t(g.name)) + '</h3>' + itemsHtml +
        '</div>';
    }).join('');

    var cloud = $('#skillsCloud');
    if ((s.cloud || []).length) {
      cloud.innerHTML = (s.cloud || []).map(function (c, i) {
        return '<span class="cloud-tag reveal" style="transition-delay:' + (i * 60) + 'ms">' + esc(c) + '</span>';
      }).join('');
    } else {
      cloud.innerHTML = '';
    }
  }

  function renderProjects() {
    var p = SITE.projects || {};
    $('#projectsEyebrow').textContent = lang === 'zh' ? '04 · 作品' : '04 · Works';
    $('#projectsTitle').textContent = t(p.title);

    var items = p.items || [];

    // 筛选按钮：全部 + 出现过的分类（按配置顺序）
    var cats = [];
    (p.categories || []).forEach(function (c) { cats.push(t(c)); });

    var filterHtml = '<button class="filter-btn' + (currentFilter === 'all' ? ' active' : '') + '" data-cat="all">' + esc(t(p.filterAll) || (lang === 'zh' ? '全部' : 'All')) + '</button>';
    cats.forEach(function (c) {
      filterHtml += '<button class="filter-btn' + (currentFilter === c ? ' active' : '') + '" data-cat="' + esc(c) + '">' + esc(c) + '</button>';
    });
    $('#projectsFilter').innerHTML = filterHtml;

    galleries.works = [];
    var grid = $('#projectsGrid');
    grid.innerHTML = items.map(function (it, i) {
      var isFeatured = !!it.featured;
      var cat = t(it.category);
      var galIdx = -1;
      var media;
      if (it.image) {
        galleries.works.push({ src: it.image, caption: t(it.title) });
        galIdx = galleries.works.length - 1;
        media = '<img src="' + esc(it.image) + '" alt="' + esc(t(it.title)) + '" loading="lazy" />';
      } else {
        // 渐变占位图：为每个项目分配不同的渐变角度
        var hue = (i * 47) % 360;
        media = '<div class="project-media-placeholder" style="background:linear-gradient(135deg, hsl(' + hue + ',72%,60%), hsl(' + ((hue + 80) % 360) + ',70%,55%))">' + esc(t(it.title)) + '</div>';
      }
      var tags = (it.tags || []).map(function (tg) { return '<span class="tag">' + esc(tg) + '</span>'; }).join('');
      var link = it.link ? '<a class="project-link" href="' + esc(it.link) + '" target="_blank" rel="noopener">' + esc(t(it.linkLabel) || (lang === 'zh' ? '查看项目' : 'View')) + ' <span class="arrow">' + svg('arrow') + '</span></a>' : '';

      var overlay = '<div class="project-media-overlay">' +
        (it.year ? '<span class="project-year">' + esc(it.year) + '</span>' : '') +
        (galIdx >= 0 ? '<span class="project-zoom">' + svg('zoom') + '</span>' : '') +
        '</div>';

      return '<article class="project-card reveal-zoom' + (isFeatured ? ' featured' : '') + '" data-cat="' + esc(cat) + '" style="transition-delay:' + (i * 70) + 'ms">' +
        '<div class="project-media"' + (galIdx >= 0 ? ' data-gallery="works" data-idx="' + galIdx + '"' : '') + '>' + media + overlay + '</div>' +
        '<div class="project-body">' +
          '<h3 class="project-title">' + esc(t(it.title)) + '</h3>' +
          '<span class="project-category">' + esc(cat) + '</span>' +
          '<p class="project-desc">' + esc(t(it.description)) + '</p>' +
          (tags ? '<div class="project-tags">' + tags + '</div>' : '') +
          link +
        '</div>' +
      '</article>';
    }).join('');

    // 绑定筛选事件
    $$('#projectsFilter .filter-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var cat = btn.getAttribute('data-cat');
        applyProjectFilter(cat);
      });
    });
    applyProjectFilter(currentFilter);

    // 绑定作品图片点击 -> 全屏查看
    $$('#projectsGrid .project-media[data-gallery]').forEach(function (media) {
      media.addEventListener('click', function () {
        openLightbox('works', parseInt(media.getAttribute('data-idx'), 10));
      });
    });
  }

  function applyProjectFilter(cat) {
    currentFilter = cat;
    $$('#projectsFilter .filter-btn').forEach(function (b) {
      b.classList.toggle('active', b.getAttribute('data-cat') === cat);
    });
    $$('#projectsGrid .project-card').forEach(function (card) {
      var match = cat === 'all' || card.getAttribute('data-cat') === cat;
      card.classList.toggle('hidden', !match);
    });
  }

  function renderCertificates() {
    var c = SITE.certificates || {};
    $('#certificatesEyebrow').textContent = lang === 'zh' ? '05 · 荣誉' : '05 · Honors';
    $('#certificatesTitle').textContent = t(c.title);
    galleries.certs = [];
    var grid = $('#certificatesGrid');
    grid.innerHTML = (c.items || []).map(function (it, i) {
      galleries.certs.push({ src: it.image, caption: t(it.title) });
      return '<div class="cert-card reveal" style="transition-delay:' + (i * 70) + 'ms">' +
        '<div class="cert-media"><img src="' + esc(it.image) + '" alt="' + esc(t(it.title)) + '" loading="lazy" /></div>' +
        '<div class="cert-body"><p class="cert-title">' + esc(t(it.title)) + '</p></div>' +
        '</div>';
    }).join('');
    $$('#certificatesGrid .cert-card').forEach(function (card, i) {
      card.addEventListener('click', function () {
        openLightbox('certs', i);
      });
    });
  }

  function renderContact() {
    var c = SITE.contact || {};
    $('#contactEyebrow').textContent = lang === 'zh' ? '06 · 联系' : '06 · Contact';
    $('#contactTitle').textContent = t(c.title);
    $('#contactIntro').textContent = t(c.intro);

    var cards = '';
    if (c.email) cards += '<div class="contact-card reveal" data-copy="' + esc(c.email) + '" style="transition-delay:0ms">' +
      '<span class="contact-card-icon">' + svg('email') + '</span>' +
      '<span><span class="contact-card-label">Email</span><br><span class="contact-card-value">' + esc(c.email) + '</span></span></div>';
    if (c.phone) cards += '<div class="contact-card reveal" data-copy="' + esc(c.phone) + '" style="transition-delay:80ms">' +
      '<span class="contact-card-icon">' + svg('phone') + '</span>' +
      '<span><span class="contact-card-label">' + (lang === 'zh' ? '电话' : 'Phone') + '</span><br><span class="contact-card-value">' + esc(c.phone) + '</span></span></div>';
    $('#contactCards').innerHTML = cards;

    var socials = (c.socials || []).map(function (s, i) {
      return '<a class="social-btn reveal" href="' + esc(s.url) + '" target="_blank" rel="noopener" title="' + esc(s.label) + '" aria-label="' + esc(s.label) + '" style="transition-delay:' + (i * 60) + 'ms">' + svg(s.icon) + '</a>';
    }).join('');
    $('#contactSocials').innerHTML = socials;

    // 绑定“点击复制”
    $$('#contactCards .contact-card').forEach(function (card) {
      card.addEventListener('click', function () {
        copyText(card.getAttribute('data-copy'));
      });
    });
  }

  function renderFooter() {
    $('#footerText').textContent = t((SITE.footer || {}).text);
    $('#footerName').textContent = t(SITE.siteName);
  }

  function renderAll() {
    renderNav();
    renderHero();
    renderAbout();
    renderExperience();
    renderSkills();
    renderProjects();
    renderCertificates();
    renderContact();
    renderFooter();
    // 隐藏空版块
    ['about', 'experience', 'skills', 'projects', 'certificates', 'contact'].forEach(function (id) {
      var sec = document.getElementById(id);
      if (sec) sec.style.display = sectionHasContent(id) ? '' : 'none';
    });
  }

  /* =========================================================================
   *  交互与动效
   * ========================================================================= */

  // 预加载
  function initPreloader() {
    var pre = $('#preloader');
    var hide = function () {
      pre.classList.add('done');
      setTimeout(function () { pre.style.display = 'none'; }, 700);
    };
    if (document.readyState === 'complete') {
      setTimeout(hide, 900);
    } else {
      window.addEventListener('load', function () { setTimeout(hide, 400); });
      setTimeout(hide, 2600); // 兜底，防止资源加载卡住
    }
  }

  // 打字机效果（身份标签轮播）
  function initTypewriter() {
    if (typewriterTimer) { clearTimeout(typewriterTimer); typewriterTimer = null; }
    var el = $('#heroRoleType');
    if (!el) return;
    var roles = (SITE.hero && SITE.hero.roles || []).map(t).filter(function (r) { return r; });
    el.textContent = '';
    if (!roles.length) return;
    var ri = 0, ci = 0, deleting = false;
    function step() {
      var word = roles[ri];
      if (!deleting) {
        ci++;
        el.textContent = word.slice(0, ci);
        if (ci >= word.length) { deleting = true; typewriterTimer = setTimeout(step, 1500); return; }
        typewriterTimer = setTimeout(step, 70);
      } else {
        ci--;
        el.textContent = word.slice(0, ci);
        if (ci <= 0) { deleting = false; ri = (ri + 1) % roles.length; typewriterTimer = setTimeout(step, 400); return; }
        typewriterTimer = setTimeout(step, 38);
      }
    }
    typewriterTimer = setTimeout(step, 300);
  }

  // 语言切换
  function initLangToggle() {
    $('#langToggle').addEventListener('click', function () {
      lang = lang === 'zh' ? 'en' : 'zh';
      localStorage.setItem('site-lang', lang);
      var main = $('#main');
      main.style.opacity = '0';
      main.style.transition = 'opacity 0.25s ease';
      setTimeout(function () {
        renderAll();
        initTypewriter();
        forceRevealAll();
        main.style.opacity = '1';
      }, 250);
    });
  }

  // 语言切换后强制显示（避免切换时元素仍处于隐藏态）
  function forceRevealAll() {
    $$('.reveal, .reveal-left, .reveal-right, .reveal-zoom').forEach(function (el) {
      el.classList.add('visible');
    });
    $$('.skill-bar-fill').forEach(function (el) {
      el.style.width = (el.getAttribute('data-level') || 0) + '%';
    });
  }

  // 导航滚动状态 + 滚动进度条 + 时间轴填充 + 活跃导航
  var ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(function () {
      var y = window.scrollY || window.pageYOffset;
      // 顶部进度条
      var docH = document.documentElement.scrollHeight - window.innerHeight;
      var p = docH > 0 ? (y / docH) * 100 : 0;
      $('#scrollProgress').style.width = p + '%';
      // 导航背景
      $('#nav').classList.toggle('scrolled', y > 30);
      // 首屏内容视差（轻微上移）
      var heroInner = $('.hero-inner');
      if (heroInner && y < window.innerHeight) {
        heroInner.style.transform = 'translateY(' + (y * 0.18) + 'px)';
        heroInner.style.opacity = 1 - clamp(y / (window.innerHeight * 0.9), 0, 1);
        $('.scroll-indicator').style.opacity = 1 - clamp(y / 200, 0, 1);
      }
      // 时间轴进度线
      updateTimelineFill();
      // 活跃导航
      updateActiveNav();
      ticking = false;
    });
  }

  function updateTimelineFill() {
    var fill = $('#timelineFill');
    if (!fill) return;
    var tl = $('#timeline');
    var rect = tl.getBoundingClientRect();
    var total = tl.offsetHeight - 16;
    var start = window.innerHeight * 0.75;
    var progress = clamp((start - rect.top) / total, 0, 1);
    fill.style.height = (progress * total) + 'px';
  }

  function updateActiveNav() {
    var links = $$('#navLinks .nav-link');
    if (!links.length) return;
    var currentId = null;
    var sections = $$('main section[id]');
    var offset = window.innerHeight * 0.35;
    sections.forEach(function (sec) {
      if (sec.getBoundingClientRect().top <= offset) currentId = sec.id;
    });
    links.forEach(function (link) {
      link.classList.toggle('active', link.getAttribute('href') === '#' + currentId);
    });
  }

  function initScroll() {
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    onScroll();
  }

  // 移动端汉堡菜单
  function initBurger() {
    var burger = $('#navBurger');
    var links = $('#navLinks');
    burger.addEventListener('click', function () {
      var open = links.classList.toggle('open');
      burger.classList.toggle('open', open);
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    $$('#navLinks .nav-link').forEach(function (a) {
      a.addEventListener('click', function () {
        links.classList.remove('open');
        burger.classList.remove('open');
      });
    });
  }

  // 自定义光标
  function initCursor() {
    if (window.matchMedia('(hover: none)').matches) return;
    var dot = $('#cursorDot'), ring = $('#cursorRing');
    var tx = window.innerWidth / 2, ty = window.innerHeight / 2, rx = tx, ry = ty;
    function moveDot() {
      dot.style.transform = 'translate(' + tx + 'px,' + ty + 'px) translate(-50%,-50%)';
    }
    function lerpRing() {
      rx += (tx - rx) * 0.18;
      ry += (ty - ry) * 0.18;
      ring.style.transform = 'translate(' + rx + 'px,' + ry + 'px) translate(-50%,-50%)';
      window.requestAnimationFrame(lerpRing);
    }
    document.addEventListener('mousemove', function (e) {
      tx = e.clientX; ty = e.clientY;
      dot.style.transform = 'translate(' + tx + 'px,' + ty + 'px) translate(-50%,-50%)';
      ring.style.transform = 'translate(' + tx + 'px,' + ty + 'px) translate(-50%,-50%)';
    });
    document.addEventListener('mouseleave', function () {
      dot.classList.add('is-hidden'); ring.classList.add('is-hidden');
    });
    document.addEventListener('mouseenter', function () {
      dot.classList.remove('is-hidden'); ring.classList.remove('is-hidden');
    });
    document.addEventListener('mouseover', function (e) {
      var interactive = e.target.closest && e.target.closest('a, button, .contact-card, .project-card, .social-btn, .filter-btn, .nav-link');
      ring.classList.toggle('is-hover', !!interactive);
    });
    lerpRing();
  }

  // 背景光斑随鼠标视差
  function initParallax() {
    if (window.matchMedia('(hover: none)').matches) return;
    var blobs = $$('.blob');
    document.addEventListener('mousemove', function (e) {
      var cx = e.clientX / window.innerWidth - 0.5;
      var cy = e.clientY / window.innerHeight - 0.5;
      blobs.forEach(function (b, i) {
        var depth = (i + 1) * 26;
        b.style.transform = 'translate(' + (cx * depth) + 'px,' + (cy * depth) + 'px)';
      });
    }, { passive: true });
  }

  // 滚动入场
  var revealObserver = null;
  function initReveal() {
    if (revealObserver) revealObserver.disconnect();
    var targets = $$('.reveal, .reveal-left, .reveal-right, .reveal-zoom');
    if (!('IntersectionObserver' in window)) {
      targets.forEach(function (el) { el.classList.add('visible'); });
      return;
    }
    revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    targets.forEach(function (el) { revealObserver.observe(el); });
  }

  // 技能条填充
  var skillObserver = null;
  function initSkillBars() {
    if (skillObserver) skillObserver.disconnect();
    var bars = $$('.skill-bar-fill');
    if (!('IntersectionObserver' in window)) {
      bars.forEach(function (el) { el.style.width = (el.getAttribute('data-level') || 0) + '%'; });
      return;
    }
    skillObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.style.width = (entry.target.getAttribute('data-level') || 0) + '%';
          skillObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });
    bars.forEach(function (el) { skillObserver.observe(el); });
  }

  // 点击复制 + 提示
  function copyText(text) {
    var done = function () {
      toast(lang === 'zh' ? '已复制到剪贴板' : 'Copied to clipboard');
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(done).catch(function () { fallbackCopy(text, done); });
    } else {
      fallbackCopy(text, done);
    }
  }
  function fallbackCopy(text, done) {
    var ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed'; ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.focus(); ta.select();
    try { document.execCommand('copy'); done(); } catch (e) {}
    document.body.removeChild(ta);
  }
  function toast(msg) {
    var el = $('#toast');
    if (!el) {
      el = document.createElement('div');
      el.id = 'toast';
      document.body.appendChild(el);
    }
    el.textContent = msg;
    el.classList.add('show');
    clearTimeout(toast._t);
    toast._t = setTimeout(function () { el.classList.remove('show'); }, 1800);
  }

  // 平滑锚点（对不支持 CSS smooth-scroll 的环境兜底）
  function initSmoothAnchor() {
    document.addEventListener('click', function (e) {
      var a = e.target.closest && e.target.closest('a[href^="#"]');
      if (!a) return;
      var id = a.getAttribute('href');
      if (id === '#') return;
      var target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    });
  }

  // 图片全屏查看
  function openLightbox(name, idx) {
    var list = galleries[name] || [];
    if (!list.length) return;
    activeGallery = name;
    lightboxIndex = clamp(idx, 0, list.length - 1);
    renderLightbox();
    $('#lightbox').classList.add('open');
    $('#lightbox').setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }
  function renderLightbox() {
    var list = galleries[activeGallery] || [];
    var item = list[lightboxIndex];
    if (!item) return;
    $('#lightboxImg').src = item.src;
    $('#lightboxImg').alt = item.caption || '';
    $('#lightboxCaption').textContent = item.caption || '';
    $('#lightboxCount').textContent = (lightboxIndex + 1) + ' / ' + list.length;
  }
  function closeLightbox() {
    $('#lightbox').classList.remove('open');
    $('#lightbox').setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }
  function lightboxStep(delta) {
    var list = galleries[activeGallery] || [];
    if (!list.length) return;
    lightboxIndex = (lightboxIndex + delta + list.length) % list.length;
    renderLightbox();
  }
  function initLightbox() {
    $('#lightboxClose').addEventListener('click', closeLightbox);
    $('#lightboxPrev').addEventListener('click', function () { lightboxStep(-1); });
    $('#lightboxNext').addEventListener('click', function () { lightboxStep(1); });
    $('#lightbox').addEventListener('click', function (e) {
      if (e.target === $('#lightbox')) closeLightbox();
    });
    document.addEventListener('keydown', function (e) {
      if (!$('#lightbox').classList.contains('open')) return;
      if (e.key === 'Escape') closeLightbox();
      else if (e.key === 'ArrowLeft') lightboxStep(-1);
      else if (e.key === 'ArrowRight') lightboxStep(1);
    });
  }

  /* =========================================================================
   *  启动
   * ========================================================================= */
  function boot() {
    renderAll();
    initPreloader();
    initTypewriter();
    initLangToggle();
    initScroll();
    initBurger();
    initCursor();
    initParallax();
    initReveal();
    initSkillBars();
    initSmoothAnchor();
    initLightbox();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
