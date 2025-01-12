# Template WordPress

## 開発環境

以下の環境で動作を確認しています。

- node v-18.16
- npm v-9.5.1
- WordPress v-6.3
- PHP v-8.1.9

## セットアップ

WordPress のローカル開発環境には LOCAL を使用。

1. [LOCAL](https://localwp.com/)をインストール
2. Add Local site から作業環境を作成
3. リポジトリの中身を`app/public/wp-content/themes/`に配置
4. LOCAL に作成した作業環境の Site domain を gulpfile.js に定義

- `const proxy = "http://site-host.local/";`
- LOCAL の設定で、Router mode が localhost の場合動作しないため注意

5. LOCAL を Start site -> gulp 実行

## ターミナルコマンド

### パッケージ

```sh
npm i
```

### gulpデフォルトタスクの起動

```sh
npx gulp
```

### webp変換

```sh
npx gulp webp
```

## gulpfile.js の設定

### Sass の分割ファイルをまとめるタスク

`srcSassFolders`の指定をしてください。<br>
この中に、分割したパーシャルファイルを index.scss でまとめたいフォルダを指定してください。

```

const srcSassFolders = [
// _index.scssに@useでまとめたいフォルダを指定
"component",
"layout",
"project",
"library",
"utility",
"wp",
];

```

### 画像圧縮 tinyPNG

画像の圧縮には [tinypng](https://tinypng.com/) を使用します。<br>
API を取得し、API キーを入力してください。<br>
[Developer API](https://tinypng.com/developers)

```

const tinypngApi = "xxxxxxxxxxxxxxx"; // TinyPNGのAPI Key

```

### WebP 変換

WebP の圧縮率を 0〜100 の間で適宜調整してください。
数値が低いほど圧縮率は高くなりますが、クオリティは低くなります。

```

const webpQuality = 90;

```

## ファイル構造

- .vscode・・・VSCodeの設定ファイル
- src/・・・コンパイル前のファイル群
  - img/・・・src 画像ファイル群
  - sass/・・・Sass ファイル群
- wp-thema/・・・テーマディレクトリ
  - assets/
    - css/・・・コンパイル後の CSS が出力されます
    - img/・・・コンパイル後の画像が出力されます
- .editorconfig・・・エディタの設定ファイル
- .gitignore・・・Git管理
- .markuplintrc・・・HTMLとPHPのlintツール
- .prettierrc・・・自動整形
- .stylelintrc.json・・・CSSとSassのlintツール
- eslint.config.mjs・・・JavaScriptのlintツール
- gulpfile.js・・・Gulp設定ファイル
- index.php・・・空のindex
- package.json・・・glup パッケージ

## lintツール

使用するVS Code拡張機能

### 自動整形

https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode

### HTML PHP

https://marketplace.visualstudio.com/items?itemName=yusukehirao.vscode-markuplint

### CSS

https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint

### JavaScript

https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint

### WordPress

https://marketplace.visualstudio.com/items?itemName=shevaua.phpcs

https://marketplace.visualstudio.com/items?itemName=persoderlind.vscode-phpcbf
