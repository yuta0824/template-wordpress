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

## gulp コマンド

```
# パッケージのダウンロード
$ npm i

# コンパイル
$ npx gulp

# webp変換
$ npx gulp webp
```

## ファイル構造

- wp-thema/・・・テーマディレクトリ
  - assets/
    - css/・・・コンパイル後の CSS が出力されます
    - img/・・・コンパイル後の画像が出力されます
- img/・・・src 画像ファイル群
- sass/・・・Sass ファイル群
- package.json・・・glup パッケージ
- gulpfile.js・・・glup タスク
- .editorconfig・・・エディタルール
- .stylelintrc.json・・・Sass コーディングルール
