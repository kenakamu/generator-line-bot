# Yeoman 用 LINE Bot テンプレートジェネレーター

このレポジトリには Yeoman 用の LINE Bot テンプレートジェネレーターがあります。以下の手順で必要なモジュールをインストールします。

```
npm install -g yo
npm install -g generator-line-bot
```
生成されるプロジェクトは Visual Studio Code に最適化されています。是非 [Visual Studio Code download](https://code.visualstudio.com/Download) よりインストールしてください。

# ゴール
このプロジェクトのゴールは LINE Bot 開発者が最速で開発を始められることです。具体的には以下のステップのみで開発を始められるイメージです。
1. yeoman でプロジェクトを作成。
1. Visual Studio Code でプロジェクトを開く。
1. F5 を押下してデバッグ開始。

もし上記ゴールに達していないものあれば、issue か PR をください。

# 使い方
1. "MyBot" という名前で C# プロジェクトを作る場合は以下のコマンドを実行。:

```script
yo line-bot MyBot --csharp
```
2. C# 以外にも以下の言語も利用可能。最後のオプションを変更。 
- go 
- nodejs
- python

3. ChannelSecret と Token を聞かれるので入力。<br/><br/>
<img src="./readme_img/installprompt.PNG" width="400">

4. 作成されたフォルダを Visual Studio Code で開く
5. Visual Studio Code は必要に応じてエクステンションのインストールを促すので、必要なものをインストール。
6. F5 を押下すればデバッグ開始。

# 他に知っておくべきこと

## C#
- [C# extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode.csharp) を推奨。
- Azure Function v2 が前提となっています。既定でポート 7071 で起動します。
- [dotnet core 2](https://www.microsoft.com/net/download/windows) が必要です。
- dotnet core 用の azure function tools が必要です。詳細は [こちら](https://docs.microsoft.com/en-us/azure/azure-functions/functions-run-local)
- テンプレートは追加の情報を記録するために Azure Blog Storage も利用します。

## Node.js
- 既定でポート 3000 で起動します。詳細は index.js を参照。
```javascript
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});
```
## golang
- [golang](https://golang.org/dl/) が必要です。
- go コマンドに PATH が通っていることを確認してください。
- [Go extension](https://marketplace.visualstudio.com/items?itemName=lukehoban.Go) を推奨。
- 既定でポート 8000 を使います。.vscode/launch.json を確認してください。

## python
- [python](https://www.python.org/downloads/) が必要です。
- python と pip に PATH が通っていることを確認してください。
- [Python extension](https://marketplace.visualstudio.com/items?itemName=ms-python.python) を推奨。
- 既定でポート 8000 を使います。app.py を確認してください。
```python
arg_parser.add_argument('-p', '--port', default=8000, help='port')
```

## その他のリソース
各言語についての詳細な手順は後日ブログ書きます。