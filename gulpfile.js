const { src, dest, series, watch, parallel } = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const gcmq = require("gulp-group-css-media-queries");
const notify = require("gulp-notify");
const plumber = require("gulp-plumber");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const cssdeclsort = require("css-declaration-sorter");
const sassGlob = require("gulp-sass-glob-use-forward");
const webp = require("gulp-webp");
const browserSync = require("browser-sync");
const tinypng = require("gulp-tinypng-compress");

// パスの定義
const proxy = "http://site-host.local/"; // local ドメイン
const themaName = "./wp-thema"; // WordPressテーマ名
const srcSass = "./src/scss/**/*.scss";
const srcImg = "./src/img/**";
const distCss = `${themaName}/assets/css`;
const distImg = `${themaName}/assets/img`;
const distFile = `${themaName}/**/*`;

// Sassコンパイル
const compileSass = (done) => {
	src(srcSass)
		.pipe(
			plumber({
				errorHandler: notify.onError("Error:<%= error.message %>"),
			})
		)
		.pipe(sassGlob())
		.pipe(sass({ outputStyle: "compressed" }))
		.pipe(postcss([autoprefixer()]))
		.pipe(
			postcss([
				cssdeclsort({
					order: "alphabetical",
				}),
			])
		)
		.pipe(gcmq())
		.pipe(dest(distCss));
	done();
};

// ローカルサーバー
const browserSyncFunc = (done) => {
	browserSync.init({
		proxy: proxy,
		open: true,
		watchOptions: {
			debounceDelay: 1000,
		},
	});
	done();
};
const browserSyncReload = (done) => {
	browserSync.reload();
	done();
};


/**
 * 画像ファイルをTinyPNGを使用して圧縮する関数。
 * PNG、JPG、JPEG形式の画像ファイルを対象に圧縮を行い、出力ディレクトリに保存します。
 */
const tinypngApi = "XXXXXXXXXXXXXX"; // TinyPNGのAPI Key
const imageMiniTinypng = () => {
	return src([`${srcImg}/**.png`, `${srcImg}/**.jpg`, `${srcImg}/**.jpeg`])
		.pipe(
			tinypng({
				key: tinypngApi,
			})
		)
		.pipe(dest(distImg));
};

/**
 * 画像ファイルをTinyPNGで圧縮した後、WebP形式に変換する関数。
 * 圧縮と変換を組み合わせることで、サイズの削減とパフォーマンスの向上を図ります。
 */
const imageMiniWebpTinypng = () => {
	const webpQuality = 90; // WebPの圧縮率（0〜100）
	return src([`${srcImg}/**.png`, `${srcImg}/**.jpg`, `${srcImg}/**.jpeg`])
		.pipe(
			tinypng({
				key: tinypngApi,
			})
		)
		.pipe(
			webp({
				quality: webpQuality,
				method: 6,
			})
		)
		.pipe(dest(distImg));
};

// 変更の監視
const watchFiles = (done) => {
	watch(srcSass, series(compileSass, browserSyncReload));
	watch(distFile, browserSyncReload);
	done();
};

// タスク実行
exports.imgmin = imageMiniTinypng; // 画像圧縮タスク
exports.webp = imageMiniWebpTinypng; // WebP変換タスク
exports.default = series(watchFiles, browserSyncFunc);
