// Gulp及び必要なプラグインの読み込み
const { src, dest, series, watch, parallel } = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const fs = require("fs");
const gcmq = require("gulp-group-css-media-queries");
const notify = require("gulp-notify");
const plumber = require("gulp-plumber");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const cssdeclsort = require("css-declaration-sorter");
const webp = require("gulp-webp");
const browserSync = require("browser-sync");
const tinypng = require("gulp-tinypng-compress");

// WordPressテーマやローカル開発環境のパスを定義します。
const proxy = "http://site-host.local/"; // local ドメイン
const themaName = "./wp-thema"; // WordPressテーマ名
const srcSass = "./src/scss/**/*.scss";
const srcImg = "./src/img/**";
const distFile = `${themaName}/**/*`;
const distImg = `${themaName}/assets/img`;
const distCss = `${themaName}/assets/css`;
const srcSassFolderBase = "./src/scss/";
const srcSassFolders = [
	// _index.scssに@useでまとめたいフォルダを指定
	"component",
	"layout",
	"project",
	"library",
	"utility",
	"wp",
];

/**
 * _index.scssファイルに@useを追加する関数。指定されたフォルダ内の_scssファイルを
 * _index.scssに@useで読み込みます。
 */
const updateIndexWithUse = (done) => {
	srcSassFolders.forEach((folder) => {
		const dir = `${srcSassFolderBase}${folder}`;
		const files = fs
			.readdirSync(dir)
			.filter(
				(file) =>
					file.startsWith("_") &&
					file.endsWith(".scss") &&
					file !== "_index.scss"
			);

		let importContent = files
			.map((file) => `@use "${file.replace(".scss", "")}";`)
			.join("\n");
		fs.writeFileSync(`${dir}/_index.scss`, importContent);
	});
	done();
};

/**
 * Sassファイルをコンパイルし、出力先にCSSファイルを生成します。
 * 自動プレフィックスの追加、メディアクエリのグループ化、CSSプロパティのソートを行います。
 */
const compileSass = (done) => {
	src(srcSass)
		.pipe(
			plumber({
				errorHandler: notify.onError("Error:<%= error.message %>"),
			})
		)
		.pipe(sass())
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

/**
 * ローカル開発サーバーを起動し、ファイルの変更をリアルタイムでブラウザに反映させる関数です。
 */
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


/**
 * ファイル変更時にブラウザをリロードする関数です。
 */
const browserSyncReload = (done) => {
	browserSync.reload();
	done();
};


/**
 * 画像ファイルをTinyPNGを使用して圧縮し、出力先に保存します。
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

/**
 * ファイル変更を監視し、変更があった場合にタスクを実行します。
 * scssファイルとWordPressテーマのファイル変更を監視します。
 */
const watchFiles = (done) => {
	const watchPattern = [srcSass, `!${srcSassFolderBase}**/_index.scss`];
	watch(watchPattern, series(updateIndexWithUse, compileSass));
	watch(distFile, browserSyncReload);
	done();
};

// Gulpタスク実行
exports.imgmin = imageMiniTinypng; // 画像圧縮タスク
exports.webp = imageMiniWebpTinypng; // WebP変換タスク
exports.default = series(watchFiles, browserSyncFunc); // デフォルトタスク
