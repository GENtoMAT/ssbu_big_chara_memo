# スマブラ対戦相手情報メモビューワー（ビッグキャラメモ）

趣味のスマブラを円滑に進めるために作った個人用ツールです。スプレッドシートをDBとした対戦キャラ情報の専用ビューワーサイトです（ツール名：ビッグキャラメモ）。

![demo_fianl](https://github.com/user-attachments/assets/15af9d85-0dd7-46c2-8ec8-906f44f1d242)

## URL

サンプルのスプレッドシート：https://docs.google.com/spreadsheets/d/1sIsZ_p2TX8NDjCeEsz0YY3Q0WeWnOeQgvKQKUZHIrng/edit?usp=sharing

デモサイト：https://gentomat.github.io/ssbu_big_chara_memo/

## 開発背景

本ゲームには82体もの操作可能なキャラクターが存在するため、対戦相手の情報を網羅的に把握するには膨大なデータの整理が不可欠です。キャラごとの技の仕様、コンボルート、そして自分が使用するキャラとの固有の相性といった多岐にわたる情報を管理するためには、効率的なツールが求められます。そこで、汎用性、メンテナンス性、操作性の高さから、スプレッドシートをDBとして日々データ管理を行っておりました。

しかし、データ量が増えていくにつれてスプレッドシートには視認性という課題があることが判明しました。データ編集には非常に優れていますが、迅速な情報検索やモバイル端末での閲覧といった点においては限界があります。


この課題を解決するため本ビューアーを開発しました。本ビューアーによって直感的な操作のみで、蓄積された膨大なデータから”今”欲しい情報を視覚性高い形で、素早くアクセスすることを可能としました。デモGIFではマウス操作で行ってますが、実運用では「stream deck」といったデバイスを活用することで、より迅速な操作を実現しています。これによりゲーム中の限られた少ない時間で、最適な戦略を立案することが可能になります。



## 使用技術

**バックエンド** 

- Javascript
- GAS
- Google spreadsheet（DBとして使用）
  
**フロントエンド**

- Google fonts

**インフラ**

- Github.io（デモ環境）
- Google site（本番環境）

## システム構成

とてもシンプルな構成です。

スプレッドシートと紐付いたGASのWebアプリに対して、Webサイト内のJavascriptのajax通信でアクセスし、指定したキャラに関する情報だけスプレッドシートから抜き出して表示しています。

セキュリティの観点から、本番環境では当サイトをGoogle site上で構築することによってOAuth認証をかませてアクセス制限しております。

## 機能紹介

随時更新

## 関連情報

大乱闘スマッシュブラザーズSPECIAL：https://www.smashbros.com/ja_JP/

崖掴まり姿勢ランキングの表：https://hyperts.net/smashsp/ledge-rank/
