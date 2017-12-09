# LINE Bot template generator for yeoman

This repository contains generator of LINE Bot for yeoman. To use the package, install yeoman and the generator.

```
npm install -g yo
npm install -g generator-line-bot
```
This is optimized for Visual Studio Code, I strongly recommend using Visual Studio Code as editor. You can install it from [Visual Studio Code download](https://code.visualstudio.com/Download).

# How to use
1. To generate the application as "MyBot" with C# :

```
yo line-bot MyBot --csharp
```
2. It also supports other languages. Change the last option 
- go 
- nodejs
- python

3. It will ask you for ChannelSecret and Token. Pass the correct values.<br/><br/>
![installprompt.PNG](readme_img/installprompt.PNG)

4. Open the generated folder via VSCode and you are good to go.
5. Visual Studio Code will let you know which extension you should install. Follow the instruction and install them as needed.

## Other resources
For further reference for each language experience, refer to followings.
