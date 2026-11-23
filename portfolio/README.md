# 个人简历 · 作品集网站 https://probable-dollop-wvgg9gg677vwhg7gj-4173.app.github.dev/

一个**零依赖、纯静态、中英双语、创意动效**的个人简历与作品集网站。
打开 `index.html` 即可预览；部署到 GitHub Pages / Vercel / Netlify 即可上线。

---

## 一、快速开始

- **本地预览**：直接双击 `index.html`（推荐用 Chrome / Edge 打开），或在本目录运行任意静态服务器，例如：
  ```
  npx serve .
  ```
- **上线部署**：见文末「如何部署」。

---

## 二、文件结构（你只需要关注前两个）

| 文件 | 作用 | 你需要改吗 |
|------|------|-----------|
| `index.html` | 页面骨架（各版块容器） | 一般不用改 |
| **`content.js`** | **全部内容数据（简历 + 作品集）** | ✅ **主要改这里** |
| `styles.css` | 视觉样式与动画 | 一般不用改 |
| `app.js` | 渲染与交互逻辑 | 一般不用改 |
| `assets/` | 放图片（头像、作品截图等） | 放图片时用 |

> 结论：**更新网站内容，基本只需要编辑 `content.js` 一个文件。**

---

## 三、核心概念：双语字段

`content.js` 里所有「会显示在页面上的文字」都用这种格式表示中英双语：

```js
tagline: {
  zh: '我专注于把想法变成有温度、可交互的作品。',
  en: 'I turn ideas into warm, interactive experiences.',
},
```

如果某个字段**不需要翻译**（网址、年份、邮箱、电话），直接写普通字符串：

```js
year: '2024',
email: 'hello@example.com',
```

---

## 四、常用操作

### 1. 改姓名 / 简介 / 联系方式
编辑 `content.js` 顶部的 `hero`、`about`、`contact` 段落，替换成你自己的文字即可。

### 2. 新增一条「经历」
在 `experience.items` 数组里复制一份 `{ ... }`，改里面的内容：

```js
{
  kind: 'work',            // 'work' 工作 / 'education' 教育
  role:     { zh: '岗位名称', en: 'Job Title' },
  company:  { zh: '公司名', en: 'Company' },
  period:   { zh: '2023.06 — 至今', en: 'Jun 2023 — Present' },
  location: { zh: '上海', en: 'Shanghai' },
  summary:  { zh: '一句话概述', en: 'One-line summary' },
  bullets:  [ { zh: '业绩/职责一', en: 'Achievement one' } ],
  tags:     ['Figma', '设计系统'],
},
```

### 3. 新增一个「作品」
在 `projects.items` 数组里复制一份：

```js
{
  title:       { zh: '项目名称', en: 'Project Name' },
  category:    { zh: '产品设计', en: 'Product' },   // 需与 projects.categories 中的某项一致
  year:        '2024',
  image:       'assets/project-1.jpg',   // 留空 '' 则用自动渐变占位图
  description: { zh: '一句话介绍', en: 'One-line intro' },
  link:        'https://example.com',    // 留空 '' 则不显示“查看项目”按钮
  linkLabel:   { zh: '查看项目', en: 'View Project' },
  tags:        ['设计', '原型'],
  featured:    true,    // true 的卡片更大、更突出
},
```

> 想新增一个「分类」：在 `projects.categories` 里加一项，并在作品的 `category` 里使用同样的文字。

### 4. 新增一项「技能」
在 `skills.groups` 里找到对应分组，往 `items` 里加：

```js
{ name: 'Figma', level: 90 },   // level 0–100，控制进度条长度
```

### 5. 新增一个「社交链接」
在 `contact.socials` 里加，`icon` 支持：`github` / `linkedin` / `twitter` / `dribbble` / `instagram` / `wechat` / `email`。

```js
{ icon: 'github', label: 'GitHub', url: 'https://github.com/yourname' },
```

### 6. 添加头像 / 作品图片
把图片放进 `assets/` 文件夹，然后在对应字段写 `"assets/文件名.jpg"`。头像在 `hero.avatar`，作品图在 `projects.items[].image`。

> 作品与证书图片**点击可全屏放大查看**（左右方向键或两侧按钮翻页，Esc / 点击空白处关闭）。

### 7. 新增一张「荣誉与证书」
在 `certificates.items` 数组里复制一份：
```js
{ image: 'assets/certs/你的证书.jpg', title: { zh: '证书名称', en: 'Certificate Name' } },
```
图片建议放在 `assets/certs/` 文件夹下。

---

## 五、隐藏某个版块

把对应数组清空为 `[]`，该版块会**自动隐藏**，导航栏里的对应项也会自动消失：

- 隐藏「关于」：`about.paragraphs: []`
- 隐藏「经历」：`experience.items: []`
- 隐藏「技能」：`skills.groups: []`
- 隐藏「作品」：`projects.items: []`
- 隐藏「荣誉」：`certificates.items: []`
- 隐藏「联系」：清空 `contact.email` / `contact.phone` / `contact.socials`

---

## 六、切换默认语言

`content.js` 顶部的 `defaultLang` 设为 `'zh'` 或 `'en'`。访客仍可点击右上角按钮切换，选择会被浏览器记住。

---

## 七、新增整个版块（进阶，例如「奖项 / 荣誉」）

1. 在 `content.js` 里新增一段数据：
   ```js
   honors: {
     title: { zh: '荣誉', en: 'Honors' },
     items: [ { year: '2024', name: { zh: '某某奖', en: 'Some Award' } } ],
   },
   ```
2. 在 `index.html` 的 `<main>` 里加一个 `<section id="honors">` 占位。
3. 在 `app.js` 里加一段 `renderHonors()`（参照现有 `renderCertificates()` 的写法），并在 `renderAll()` 里调用。
4. 若想让导航出现该项，在 `content.js` 的 `nav` 数组里加 `{ id: 'honors', label: { zh: '荣誉', en: 'Honors' } }`。

---

## 八、如何部署

- **GitHub Pages**：把本文件夹推到 GitHub 仓库，Settings → Pages → 选择分支后发布。
- **Vercel / Netlify**：把本文件夹作为项目根目录导入即可，无需任何构建命令（纯静态）。
- 部署后改内容：直接改 `content.js` 再提交推送，网站即更新。

---

## 九、常见问题

- **改了没变化？** 刷新浏览器（有时需要 Ctrl+F5 强刷，清缓存）。
- **中文显示成英文？** 点击右上角语言按钮，或清空浏览器 localStorage 后重开。
- **字体没加载？** 网站用了 Google Fonts，需要联网；离线环境会自动回退到系统字体，不影响使用。
