# NEBULA XR - WebXR Game Portal

近未来風のWebXRゲームポータルのスターターキットです。GitHub Pagesで公開できます。

## ファイル構成

```text
webxr-portal/
├── index.html
├── style.css
├── script.js
└── games/
    └── sample/
        └── index.html
```

## ローカルで確認する

HTMLファイルを直接開いて確認することもできますが、WebXR機能の確認にはHTTPSまたはlocalhostで配信する必要があります。

Pythonがインストールされている場合、プロジェクトのフォルダで次を実行します。

```bash
python -m http.server 8000
```

ブラウザで `http://localhost:8000/` を開きます。

## GitHub Pagesで公開する

1. GitHubで `webxr-portal` というPublicリポジトリを作成します。
2. このフォルダの中身をリポジトリのルートにアップロードします。
3. リポジトリの Settings → Pages を開きます。
4. Build and deployment の Source を `Deploy from a branch` にします。
5. Branchを `main`、フォルダを `/(root)` にしてSaveします。
6. 公開URL `https://ユーザー名.github.io/webxr-portal/` にアクセスします。

## ゲームを追加する

`script.js` の `games` 配列にゲーム情報を追加します。

```js
{
  id: "my-game",
  title: "MY GAME",
  description: "ゲームの説明。",
  genre: "action",
  genreName: "ACTION",
  icon: "🎮",
  path: "./games/my-game/index.html"
}
```

ゲームのHTMLファイルを `games/my-game/index.html` に配置してください。
ジャンルの絞り込みボタンは現在 `all`、`action`、`exploration`、`demo` に対応しています。

## WebXR / iframeについて

- WebXRのVRセッションには安全なコンテキスト（HTTPSまたはlocalhost）が必要です。
- VRモード開始は、ユーザーが画面上のボタンを操作して行う必要があります。
- このサンプルはA-Frame 1.7.1をCDNから読み込みます。初回表示にはインターネット接続が必要です。
- ポータルはゲームをiframe内に表示します。ブラウザやゲーム側の設定によっては、iframe内でVRセッションを開始できない場合があります。
- その場合はゲームを別タブで開く方式に変更してください。
- 外部ゲームを埋め込む場合、ゲーム提供元がiframe表示を許可している必要があります。

## 注意

これは学習・開発用のスターターキットです。実際のゲームを追加する際は、配布元の利用規約、著作権、埋め込み可否を確認してください。
