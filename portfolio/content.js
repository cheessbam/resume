/* =============================================================================
 *  内容配置文件 —— 你只需要编辑这一个文件，就能更新整站内容
 *  =============================================================================
 *  【改内容的唯一入口】绝大多数情况下你不需要碰 index.html / styles.css / app.js，
 *  只要改本文件，保存后刷新浏览器即可看到效果。
 *
 *  使用说明：
 *  1. 所有“会显示在页面上的文字”都支持中英双语，格式为 { zh: "中文", en: "English" }。
 *     如果某字段不需要翻译（网址 / 年份 / 邮箱 / 电话），直接写普通字符串即可。
 *
 *  2. 要新增一条经历 / 一个作品 / 一项技能 / 一张证书 / 一个社交链接：
 *     在对应的数组里“复制一份 { ... }”并修改内容即可。
 *     数组里放几项，页面就显示几项，顺序与你填写的顺序一致。
 *
 *  3. 如果某个版块不想显示，把它对应的数组清空为 []，页面会自动隐藏该版块。
 *
 *  4. 图片：放到 assets/ 文件夹，然后在 image 字段写 "assets/你的文件名.jpg"。
 *     没放图片也没关系，作品卡片会自动使用漂亮的渐变占位图。
 *
 *  5. 想新增整个版块（例如“奖项”）？见文件末尾的“如何新增版块”说明。
 * =============================================================================
 */
window.SITE = {
  // 站点默认语言：'zh' 或 'en'（用户仍可点击右上角按钮切换，选择会被记住）
  defaultLang: 'zh',

  // ---------------------------------------------------------------------------
  // 站点名称 / 导航
  // ---------------------------------------------------------------------------
  siteName: { zh: '徐昊', en: 'Xu Hao' },

  // 导航栏：按顺序显示。id 对应下方各版块的 id；只保留你想要出现在导航里的项即可。
  nav: [
    { id: 'about',       label: { zh: '关于', en: 'About' } },
    { id: 'experience',  label: { zh: '经历', en: 'Experience' } },
    { id: 'skills',      label: { zh: '技能', en: 'Skills' } },
    { id: 'projects',    label: { zh: '作品', en: 'Works' } },
    { id: 'certificates',label: { zh: '荣誉', en: 'Honors' } },
    { id: 'contact',     label: { zh: '联系', en: 'Contact' } },
  ],

  // ---------------------------------------------------------------------------
  // 首屏 Hero
  // ---------------------------------------------------------------------------
  hero: {
    greeting: { zh: '你好，我是', en: 'Hi, I’m' },
    name: '徐昊',            // 大标题显示的名字
    nameEn: 'Xu Hao',        // 英文名字（切换英文时显示）
    // 轮播的“身份标签”（打字机效果，会依次播放）
    roles: [
      { zh: '数据分析',         en: 'Data Analyst' },
      { zh: '社会政策研究生',   en: 'Social Policy Graduate' },
      { zh: '内容创作者',       en: 'Content Creator' },
    ],
    tagline: {
      zh: '专注数据分析、社会政策与内容创作，用数据与故事创造价值。',
      en: 'Focused on data analysis, social policy, and storytelling — creating value through data and narrative.',
    },
    location: { zh: '广东 · 佛山', en: 'Foshan, Guangdong' },
    // 两个按钮
    ctaPrimary:   { label: { zh: '查看作品', en: 'View Works' }, href: '#projects' },
    ctaSecondary: { label: { zh: '联系我',   en: 'Contact Me' }, href: '#contact' },
    // 头像图片（可选）：留空字符串 "" 则隐藏头像
    avatar: '',
  },

  // ---------------------------------------------------------------------------
  // 关于 / About
  // ---------------------------------------------------------------------------
  about: {
    title: { zh: '关于我', en: 'About' },
    paragraphs: [
      {
        zh: '我是徐昊，复旦大学社会政策专业硕士在读，本科毕业于南京财经大学公共事业管理专业。我热衷于用数据分析解决实际问题，也喜欢用内容创作讲述真实故事。',
        en: 'I’m Xu Hao, a master’s student in Social Policy at Fudan University, with a B.A. in Public Administration from Nanjing University of Finance and Economics. I love solving real problems with data, and telling real stories through content.',
      },
      {
        zh: '我拥有会计师事务所与慈善机构的实习经历，擅长数据清洗、分析与可视化，也参与过公益项目的财务统筹与媒体宣发，始终相信数据与善意能够带来改变。',
        en: 'I’ve interned at accounting firms and a charity foundation, where I focused on data cleaning, analysis, and visualization — and also took part in financial coordination and media outreach for a public-welfare project.',
      },
    ],
    // 高亮数字（Bento 卡片）：value 建议写纯数字或短文本，label 是说明
    highlights: [
      { value: '3',      label: { zh: '段实习经历', en: 'Internships' } },
      { value: '14',     label: { zh: '期访谈栏目', en: 'Interview Episodes' } },
      { value: '3.8/5',  label: { zh: '本科 GPA · 前10%', en: 'GPA · Top 10%' } },
      { value: '10万+',  label: { zh: '项目覆盖人群', en: 'Audience Reached' } },
    ],
  },

  // ---------------------------------------------------------------------------
  // 经历 / Experience（时间轴，可混合“工作”与“教育”）
  // kind: 'work' 显示为工作，'education' 显示为教育（图标不同）
  // ---------------------------------------------------------------------------
  experience: {
    title: { zh: '经历', en: 'Experience' },
    items: [
      {
        kind: 'education',
        role:     { zh: '社会政策（MSP）· 硕士在读', en: 'Social Policy (MSP) · Master’s' },
        company:  { zh: '复旦大学', en: 'Fudan University' },
        period:   { zh: '2026.09 — 2028.06', en: 'Sep 2026 — Jun 2028' },
        location: { zh: '上海', en: 'Shanghai' },
        summary: {
          zh: '社会政策专业硕士在读，主修社会研究方法与统计。',
          en: 'Pursuing a master’s in Social Policy, focusing on research methods and statistics.',
        },
        bullets: [
          { zh: '专业课程：社会研究方法进阶、统计学', en: 'Coursework: Advanced Social Research Methods, Statistics' },
          { zh: '所获荣誉：研究生骨干班优秀学员', en: 'Honor: Outstanding Graduate Cadre Training Member' },
        ],
        tags: ['社会政策', '统计分析'],
      },
      {
        kind: 'work',
        role:     { zh: '项目实习生', en: 'Program Intern' },
        company:  { zh: '深圳市慈善会', en: 'Shenzhen Charity Association' },
        period:   { zh: '2026.03 — 2026.05', en: 'Mar 2026 — May 2026' },
        location: { zh: '深圳', en: 'Shenzhen' },
        summary: {
          zh: '负责募捐平台知识库搭建，以及 400 余家爱心企业的数据整理与可视化。',
          en: 'Built a donation-platform knowledge base and visualized data for 400+ corporate donors.',
        },
        bullets: [
          { zh: '运用多种工具搭建问答训练模型（真实数据 300 余条），使问答覆盖率提升 30%', en: 'Built a Q&A training model (300+ real records), lifting answer coverage by 30%' },
          { zh: '独立设计数据版面并搭建可视化系统，服务百亿级规模企业群，数据核查与监测效率提升超 80%', en: 'Designed a visualization system serving a hundred-billion-scale enterprise group, improving verification efficiency by 80%+' },
        ],
        tags: ['知识库', '数据可视化', 'Agent'],
      },
      {
        kind: 'work',
        role:     { zh: '数据分析助理', en: 'Data Analyst Assistant' },
        company:  { zh: '中喜会计师事务所（南京分所）', en: 'Zhongxi CPA Firm (Nanjing)' },
        period:   { zh: '2024.11 — 2025.01', en: 'Nov 2024 — Jan 2025' },
        location: { zh: '南京', en: 'Nanjing' },
        summary: {
          zh: '参与十余家汽车销售企业年度经营数据分析与报表编制。',
          en: 'Analyzed annual operating data and prepared statements for 10+ auto-sales companies.',
        },
        bullets: [
          { zh: '独立完成报表归档与核算，绘制可视化资金分布与流向图表，为跨企业资金穿透分析提供依据', en: 'Produced visualized fund-flow charts to support cross-company capital tracing' },
          { zh: '参与两省十余家公司部分报表编制，完成 300 余份凭证账目清查及凭证全流程整理装订', en: 'Helped compile statements and cleared 300+ vouchers end-to-end' },
        ],
        tags: ['财务分析', '数据可视化'],
      },
      {
        kind: 'work',
        role:     { zh: '数据分析助理', en: 'Data Analyst Assistant' },
        company:  { zh: '容诚会计师事务所（苏州分所）', en: 'RSM China (Suzhou)' },
        period:   { zh: '2023.12 — 2024.02', en: 'Dec 2023 — Feb 2024' },
        location: { zh: '苏州', en: 'Suzhou' },
        summary: {
          zh: '主导约 3 万份业务台账数据的清洗、整合与合规风险识别。',
          en: 'Led the cleaning, integration, and compliance-risk identification of ~30,000 business ledgers.',
        },
        bullets: [
          { zh: '清洗、整合与交叉验证约 3 万份多渠道业务台账，产出结构化合规分析报告', en: 'Cleaned and cross-validated ~30,000 ledgers, delivering a structured compliance report' },
          { zh: '针对市场、产品、技术三部门数据口径不统一的痛点，牵头构建跨部门数据协作规范', en: 'Led a cross-department data-standardization initiative across market, product, and tech teams' },
        ],
        tags: ['数据清洗', '合规分析'],
      },
      {
        kind: 'education',
        role:     { zh: '公共事业管理 · 本科', en: 'Public Administration · B.A.' },
        company:  { zh: '南京财经大学', en: 'Nanjing University of Finance & Economics' },
        period:   { zh: '2022.09 — 2026.06', en: 'Sep 2022 — Jun 2026' },
        location: { zh: '南京', en: 'Nanjing' },
        summary: {
          zh: '本科毕业于公共事业管理专业，GPA 3.8/5（前 10%）。',
          en: 'Graduated in Public Administration with a 3.8/5 GPA (top 10%).',
        },
        bullets: [
          { zh: '核心课程：财务分析（91）、非营利组织管理（91）、公共组织学（93）', en: 'Key courses: Financial Analysis (91), Nonprofit Management (91), Public Organization (93)' },
          { zh: '所获荣誉：校三等奖学金、校优秀青年志愿者、校素质拓展奖学金、校暑期社会实践优秀团队（一等奖）、校优秀学生会（主席任期内）', en: 'Honors: university scholarships, Outstanding Youth Volunteer, first-prize social-practice team, Outstanding Student Union (as chair)' },
        ],
        tags: ['公共事业管理', '学生工作'],
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // 技能 / Skills
  // level: 0–100 用于绘制进度条
  // ---------------------------------------------------------------------------
  skills: {
    title: { zh: '技能', en: 'Skills' },
    groups: [
      {
        name: { zh: '数据分析', en: 'Data Analysis' },
        items: [
          { name: 'Office 办公软件', level: 88 },
          { name: 'R 语言',         level: 80 },
          { name: 'SPSS',           level: 80 },
          { name: 'Stata',          level: 75 },
        ],
      },
      {
        name: { zh: '财务', en: 'Finance' },
        items: [
          { name: '财务分析',       level: 82 },
          { name: '初级会计师',     level: 72 },
          { name: '计算机二级',     level: 70 },
        ],
      },
      {
        name: { zh: '其他', en: 'Others' },
        items: [
          { name: '媒体宣发',       level: 82 },
          { name: '内容策划',       level: 80 },
          { name: 'Agent 搭建',     level: 75 },
        ],
      },
    ],
    // “标签云”里额外展示的关键词（可选，清空 [] 则不显示标签云）
    cloud: ['数据分析', '社会政策', '财务合规', '数据可视化', '项目统筹', '内容策划', '媒体宣发', '报销规范'],
  },

  // ---------------------------------------------------------------------------
  // 作品集 / Projects（卡片画廊，支持分类筛选，点击图片可全屏查看）
  // ---------------------------------------------------------------------------
  projects: {
    title: { zh: '作品', en: 'Selected Works' },
    // 筛选器的“全部”按钮文案
    filterAll: { zh: '全部', en: 'All' },
    // 分类列表：顺序即筛选按钮顺序
    categories: [
      { zh: '人物访谈', en: 'Interview' },
      { zh: '公益项目', en: 'Nonprofit' },
    ],
    items: [
      { title: { zh: '人物访谈 · 第 1 期', en: 'Interview · Ep. 1' }, category: { zh: '人物访谈', en: 'Interview' }, image: 'assets/works/work-01.jpg', description: { zh: '围绕一位受访人物展开对话，记录其成长经历与思考。', en: 'A conversation with one interviewee, capturing their journey and thoughts.' }, link: '', linkLabel: { zh: '查看', en: 'View' }, tags: ['人物访谈'], featured: false },
      { title: { zh: '人物访谈 · 第 2 期', en: 'Interview · Ep. 2' }, category: { zh: '人物访谈', en: 'Interview' }, image: 'assets/works/work-02.jpg', description: { zh: '围绕一位受访人物展开对话，记录其成长经历与思考。', en: 'A conversation with one interviewee, capturing their journey and thoughts.' }, link: '', linkLabel: { zh: '查看', en: 'View' }, tags: ['人物访谈'], featured: false },
      { title: { zh: '人物访谈 · 第 3 期', en: 'Interview · Ep. 3' }, category: { zh: '人物访谈', en: 'Interview' }, image: 'assets/works/work-03.jpg', description: { zh: '围绕一位受访人物展开对话，记录其成长经历与思考。', en: 'A conversation with one interviewee, capturing their journey and thoughts.' }, link: '', linkLabel: { zh: '查看', en: 'View' }, tags: ['人物访谈'], featured: false },
      { title: { zh: '人物访谈 · 第 4 期', en: 'Interview · Ep. 4' }, category: { zh: '人物访谈', en: 'Interview' }, image: 'assets/works/work-04.jpg', description: { zh: '围绕一位受访人物展开对话，记录其成长经历与思考。', en: 'A conversation with one interviewee, capturing their journey and thoughts.' }, link: '', linkLabel: { zh: '查看', en: 'View' }, tags: ['人物访谈'], featured: false },
      { title: { zh: '人物访谈 · 第 5 期', en: 'Interview · Ep. 5' }, category: { zh: '人物访谈', en: 'Interview' }, image: 'assets/works/work-05.jpg', description: { zh: '围绕一位受访人物展开对话，记录其成长经历与思考。', en: 'A conversation with one interviewee, capturing their journey and thoughts.' }, link: '', linkLabel: { zh: '查看', en: 'View' }, tags: ['人物访谈'], featured: false },
      { title: { zh: '人物访谈 · 第 6 期', en: 'Interview · Ep. 6' }, category: { zh: '人物访谈', en: 'Interview' }, image: 'assets/works/work-06.jpg', description: { zh: '围绕一位受访人物展开对话，记录其成长经历与思考。', en: 'A conversation with one interviewee, capturing their journey and thoughts.' }, link: '', linkLabel: { zh: '查看', en: 'View' }, tags: ['人物访谈'], featured: false },
      { title: { zh: '人物访谈 · 第 7 期', en: 'Interview · Ep. 7' }, category: { zh: '人物访谈', en: 'Interview' }, image: 'assets/works/work-07.jpg', description: { zh: '围绕一位受访人物展开对话，记录其成长经历与思考。', en: 'A conversation with one interviewee, capturing their journey and thoughts.' }, link: '', linkLabel: { zh: '查看', en: 'View' }, tags: ['人物访谈'], featured: false },
      { title: { zh: '人物访谈 · 第 8 期', en: 'Interview · Ep. 8' }, category: { zh: '人物访谈', en: 'Interview' }, image: 'assets/works/work-08.jpg', description: { zh: '围绕一位受访人物展开对话，记录其成长经历与思考。', en: 'A conversation with one interviewee, capturing their journey and thoughts.' }, link: '', linkLabel: { zh: '查看', en: 'View' }, tags: ['人物访谈'], featured: false },
      { title: { zh: '人物访谈 · 第 9 期', en: 'Interview · Ep. 9' }, category: { zh: '人物访谈', en: 'Interview' }, image: 'assets/works/work-09.jpg', description: { zh: '围绕一位受访人物展开对话，记录其成长经历与思考。', en: 'A conversation with one interviewee, capturing their journey and thoughts.' }, link: '', linkLabel: { zh: '查看', en: 'View' }, tags: ['人物访谈'], featured: false },
      { title: { zh: '人物访谈 · 第 10 期', en: 'Interview · Ep. 10' }, category: { zh: '人物访谈', en: 'Interview' }, image: 'assets/works/work-10.jpg', description: { zh: '围绕一位受访人物展开对话，记录其成长经历与思考。', en: 'A conversation with one interviewee, capturing their journey and thoughts.' }, link: '', linkLabel: { zh: '查看', en: 'View' }, tags: ['人物访谈'], featured: false },
      { title: { zh: '人物访谈 · 第 11 期', en: 'Interview · Ep. 11' }, category: { zh: '人物访谈', en: 'Interview' }, image: 'assets/works/work-11.jpg', description: { zh: '围绕一位受访人物展开对话，记录其成长经历与思考。', en: 'A conversation with one interviewee, capturing their journey and thoughts.' }, link: '', linkLabel: { zh: '查看', en: 'View' }, tags: ['人物访谈'], featured: false },
      { title: { zh: '人物访谈 · 第 12 期', en: 'Interview · Ep. 12' }, category: { zh: '人物访谈', en: 'Interview' }, image: 'assets/works/work-12.jpg', description: { zh: '围绕一位受访人物展开对话，记录其成长经历与思考。', en: 'A conversation with one interviewee, capturing their journey and thoughts.' }, link: '', linkLabel: { zh: '查看', en: 'View' }, tags: ['人物访谈'], featured: false },
      { title: { zh: '人物访谈 · 第 13 期', en: 'Interview · Ep. 13' }, category: { zh: '人物访谈', en: 'Interview' }, image: 'assets/works/work-13.jpg', description: { zh: '围绕一位受访人物展开对话，记录其成长经历与思考。', en: 'A conversation with one interviewee, capturing their journey and thoughts.' }, link: '', linkLabel: { zh: '查看', en: 'View' }, tags: ['人物访谈'], featured: false },
      { title: { zh: '人物访谈 · 第 14 期', en: 'Interview · Ep. 14' }, category: { zh: '人物访谈', en: 'Interview' }, image: 'assets/works/work-14.jpg', description: { zh: '围绕一位受访人物展开对话，记录其成长经历与思考。', en: 'A conversation with one interviewee, capturing their journey and thoughts.' }, link: '', linkLabel: { zh: '查看', en: 'View' }, tags: ['人物访谈'], featured: false },
      {
        title:       { zh: '阳光公益 · 暑期支教项目', en: 'Sunshine Charity · Summer Teaching' },
        category:    { zh: '公益项目', en: 'Nonprofit' },
        year:        '2024',
        image:       '',
        description: {
          zh: '独立负责项目全流程财务管理（统筹约 2 万元经费），并负责媒体宣发；项目获国家级、省级媒体报道，覆盖人群超 10 万。',
          en: 'Owned end-to-end financial management (~¥20k budget) and media outreach; the project earned national & provincial media coverage reaching 100k+ people.',
        },
        link:      '',
        linkLabel: { zh: '查看', en: 'View' },
        tags:      ['公益', '财务管理', '媒体宣发'],
        featured:  false,
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // 荣誉与证书 / Honors & Certificates（点击图片可全屏查看）
  // ---------------------------------------------------------------------------
  certificates: {
    title: { zh: '荣誉与证书', en: 'Honors & Certificates' },
    items: [
      { image: 'assets/certs/cert-01.jpg', title: { zh: '优秀学生会主席', en: 'Outstanding Student Union Chair' } },
      { image: 'assets/certs/cert-02.jpg', title: { zh: '优秀中心', en: 'Outstanding Center' } },
      { image: 'assets/certs/cert-03.jpg', title: { zh: '优秀中心负责人', en: 'Outstanding Center Lead' } },
      { image: 'assets/certs/cert-04.jpg', title: { zh: '优秀项目志愿者', en: 'Outstanding Project Volunteer' } },
      { image: 'assets/certs/cert-05.jpg', title: { zh: '初级会计师资格', en: 'Junior Accountant Certificate' } },
      { image: 'assets/certs/cert-06.jpg', title: { zh: '学习优秀奖学金', en: 'Academic Excellence Scholarship' } },
      { image: 'assets/certs/cert-07.jpg', title: { zh: '素质拓展奖学金', en: 'Quality Development Scholarship' } },
      { image: 'assets/certs/cert-08.jpg', title: { zh: '优秀青年志愿者', en: 'Outstanding Youth Volunteer' } },
    ],
  },

  // ---------------------------------------------------------------------------
  // 联系 / Contact
  // ---------------------------------------------------------------------------
  contact: {
    title: { zh: '联系我', en: 'Get in Touch' },
    intro: {
      zh: '无论是实习机会、项目合作，还是交流学习，都欢迎联系我。',
      en: 'Whether it’s an internship, a collaboration, or just a chat — I’d love to hear from you.',
    },
    email: 'xcheess@163.com',
    phone: '18942425152',
    // 社交链接：icon 支持 github / linkedin / twitter / dribbble / instagram / wechat / email
    // 目前留空；拿到你的社交主页链接后，在这里补充即可。
    socials: [],
  },

  // ---------------------------------------------------------------------------
  // 页脚 / Footer
  // ---------------------------------------------------------------------------
  footer: {
    text: {
      zh: '用 ❤ 与代码制作 · 保留所有权利',
      en: 'Made with ❤ and code · All rights reserved',
    },
  },
};

/* =============================================================================
 *  如何新增整个版块（例如“奖项 / 论文”）
 *  =============================================================================
 *  1. 在本文件里新增一段数据，例如：
 *     papers: { title: { zh: '论文', en: 'Papers' }, items: [ { name: {...}, year: '2025' } ] }
 *  2. 在 index.html 的 <main> 里加一个 <section id="papers"> 占位。
 *  3. 在 app.js 里加一段 renderPapers()（参照现有 renderCertificates() 的写法），并在 renderAll() 里调用。
 *  4. 若想让导航栏出现该项，在 nav 数组里加 { id: 'papers', label: { zh: '论文', en: 'Papers' } }。
 * =============================================================================
 */
