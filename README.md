# BAMP!

[公開サイト](https://bamprogit.github.io/) · [Figma原本](https://www.figma.com/design/1Ht2X1MdhnL3VAjQV2defa/)

Figma「ワイヤーフレーム」の画面、素材、文言、プロトタイプ遷移を静的HTML/CSS/JavaScriptへ実装したサイト。

## ローカル表示

```sh
python3 -m http.server 4173 --bind 127.0.0.1
```

http://127.0.0.1:4173/ をブラウザーで開く。ビルドや依存パッケージのインストールは不要。

## 原本との対応

| 画面 | Figmaノード | URL |
| --- | --- | --- |
| opening（402 × 874） | 3:3 | / |
| PC opening（1280 × 832） | 87:290 | /（幅900px以上） |
| top | 17:216 | /#top |
| about | 26:468 | /#about |
| archive | 26:519 | /#archive |
| archive detail | 26:539 | /#detail |
| member | 26:583 | /#member |
| contact | 34:637 | /#contact |
| メニュー | 87:220 | 各画面のメニューボタン |
| プロフィール | 35:675 | memberのカード |

下層ページは原本の402px幅を維持し、それより狭い画面では比例縮小。PC入口のenterも原本のリンク先である17:216へ遷移する。未接続のPC_top案（127:23）から下層デザインを創作していない。

原本の仮文言、プレースホルダー、`cantact`表記を保持。エントリーの4枠には原本に送信先・フォーム・リンクがないため、表示のみ。問い合わせ送信機能は含まない。

冒頭は原本の動画とフェードの時間を再現。OSの動きを減らす設定では動画を止め、全要素を静止表示する。

## 公開

GitHub Pagesのmainブランチ、ルートディレクトリを配信。更新時はソースとassets、licensesを同じ変更として同期する。Figma変更を自動反映する仕組みではなく、変更したノードを取得し直して実装・照合する。

素材とフォントの出典は[ASSETS.md](ASSETS.md)を参照。
