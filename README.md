# Pinyin Practice

Pinyin Practice is an open-source web app for after-class Pinyin review. It is designed for young Chinese learners, especially kindergarten-to-grade-one students, and can be deployed as a static site on GitHub Pages.

The app focuses on simple card-based practice without accounts, backend services, ads, analytics, or student data collection.

## Features

- Initials, finals, and whole-syllable recognition
- Tone practice for finals
- Initial-final spelling practice
- Lesson-based review pages
- Random practice mode
- Audio and image asset conventions for adding new content

## 技术栈

- React
- Vite
- TypeScript
- Tailwind CSS
- React Router

## 安装和运行

```bash
npm install
npm run dev
npm run build
```

本地开发默认使用：

```bash
npm run dev
```

构建静态文件：

```bash
npm run build
```

## 页面路由

- `/`：首页
- `/single`：单个拼音，包含声母、韵母、整体认读
- `/tones`：韵母四声练习
- `/spell`：声韵拼读练习
- `/lesson/1`、`/lesson/2`、`/lesson/3`：课程练习
- `/random`：随机拼读练习

## 复习范围

- 声母：`b p m f d t n l g k h j q x zh ch sh r z c s y w`
- 韵母：`a o e i u ü ai ei ui ao ou iu ie üe er an en in un ün ang eng ing ong`
- 整体认读：`zhi chi shi ri zi ci si yi wu yu ye yue yuan yin yun ying`

页面采用卡片式练习：每次看一张大卡，可以点“上一张”“下一张”，也可以用下面的小格子快速跳转。

## GitHub Pages

项目按仓库名 `pinyin-practice` 配置，`vite.config.ts` 中的 `base` 为：

```ts
base: "/pinyin-practice/"
```

如果仓库名改变，需要同步修改这个值。

## 音频命名规则

所有音频放在 `public/audio`。

- 单个拼音：`public/audio/single/{id}.mp3`，例如 `a.mp3`、`b.mp3`、`zhi.mp3`、`v.mp3`
- 四声练习：`public/audio/tone/{finalId}{tone}.mp3`，例如 `a1.mp3`、`v4.mp3`、`ve2.mp3`、`vn3.mp3`
- 拼读练习：`public/audio/spell/{initial}{finalId}{tone}.mp3`，例如 `ba1.mp3`、`zha4.mp3`、`xve2.mp3`

文件名里 `v` 表示页面上的 `ü`。
为了避免初学学生把 `ü` 误认成 `u`，拼读练习中 `j/q/x + v` 系列会显示两点，例如 `qüan`、`xüe`；音频文件名仍然使用 `qvan`、`xve`。

## 图片命名规则

图片放在 `public/images`，建议使用拼音 id 命名：

- `a.png`
- `b.png`
- `zhi.png`
- `v.png`

图片缺失时页面会显示“图片待补充”。

## 新增单个拼音

在 `src/data/singleItems.ts` 增加一条数据，并把对应图片和音频放到 `public/images`、`public/audio/single`。

## 新增韵母四声

在 `src/data/finals.ts` 增加韵母数据，再把四个音频放到 `public/audio/tone`。

## 新增拼读组合

在 `src/data/syllables.ts` 的 `basesByInitial` 中增加合法的声母韵母组合。系统会自动生成四声。

拼读练习里的组合是“合法基础音节”，可以包含 `bi`、`bu`、`bian`、`xüe`、`guo` 这类拼读项；它不受 24 个韵母复习表限制。不要加入不存在的组合，例如 `be`。

如果有把握的汉字例词，可以在 `exampleWords` 中补充，例如：

```ts
ma3: "马"
```

不要为了“完整”强行给每个四声都配汉字。

## 新增课程

在 `src/data/lessons.ts` 增加课程数据：

- `singles` 填单个拼音 id
- `syllables` 填已有拼读 id
- 不确定或没有音频的拼读可以暂时不加入课程

## 第一版不包含

登录、注册、数据库、后端、教师后台、学生管理、家长管理、儿童信息收集、排行榜、支付、广告、第三方统计、语音识别、AI 纠音、录音上传、复杂游戏。

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.
