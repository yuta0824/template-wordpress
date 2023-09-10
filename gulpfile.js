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
const del = require("del");
const browserSync = require("browser-sync");

// パスの定義
const proxy = "http://site-host.local/"; // local ドメイン
const themaName = "./wp-thema"; // WordPressテーマ名
const srcSass = "./scss/**/*.scss";
const srcImg = "./img/**";
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

// 画像ファイルリセット
const clean = () => {
	return del(distImg, {
		force: true,
	});
};

// 画像をコピー
const copyImages = (done) => {
	src(srcImg).pipe(dest(distImg));
	done();
};

//webP変換
function imageWebp() {
	return src([`${srcImg}/**.png`, `${srcImg}/**.jpg`, `${srcImg}/**.jpeg`])
		.pipe(
			webp({
				quality: 90,
				method: 6,
			})
		)
		.pipe(dest(`${distImg}`));
}

// 変更の監視
const watchFiles = (done) => {
	watch(srcSass, series(compileSass, browserSyncReload));
	watch(srcImg, series(clean, copyImages, browserSyncReload));
	watch(distFile, browserSyncReload);
	done();
};

// タスク実行
exports.webp = imageWebp;
exports.default = series(watchFiles, browserSyncFunc);
