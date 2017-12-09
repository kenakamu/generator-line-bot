var Generator = require('yeoman-generator');

module.exports = class extends Generator {
    // Prompt to user for required input.
    prompting() {
        var prompts = [];
        if (this.language === undefined) {
            prompts.push({
                type: 'list',
                name: 'language',
                message: 'Select language',
                choices: ['C#', 'Node.js', 'go', 'python'],
                default: 'C#'
            });
        }
        if (this.options.appname === undefined) {
            prompts.push({
                type: 'input',
                name: 'name',
                message: 'Your project name: ',
                default: this.appname // Default to current folder name
            });
        }
        if (this.options.channel_secret === undefined) {
            prompts.push({
                type: 'input',
                name: 'channel_secret',
                message: 'Enter your Channel Secret: '
            });
        }
        if (this.options.channel_access_token === undefined) {
            prompts.push({
                type: 'input',
                name: 'channel_access_token',
                message: 'Enter your Channel Access Token: '
            });
        }        

        return this.prompt(prompts).then((answers) => {
            if (answers.language !== undefined) {
                this.language = answers.language
            }
            if (answers.name !== undefined) {
                this.appname = answers.name;
            }
            if (answers.channel_secret !== undefined) {
                this.channel_secret = answers.channel_secret;
            }
            if (answers.channel_access_token !== undefined) {
                this.channel_access_token = answers.channel_access_token;
            }
        });
    }

    // constructor
    constructor(args, opts) {
        super(args, opts);

        // supported arguments. Nothing mandatory at this point
        this.argument('appname', { type: String, required: false });
        this.argument('channel_secret', { type: String, required: false });
        this.argument('channel_access_token', { type: String, required: false });

        // options for language.
        this.option('csharp', { desc: 'C#', require: false });
        this.option('go', { desc: 'go', require: false });
        this.option('nodejs', { desc: 'Node.js', require: false });
        this.option('python', { desc: 'python', require: false });

        // Set language depending on option
        if (this.options.csharp) {
            this.language = "csharp";
        }
        else if (this.options.go) {
            this.language = "go";
        }
        else if (this.options.nodejs) {
            this.language = "nodejs";
        }
        else if (this.options.python) {
            this.language = "python";
        }

        // Set other local variables.
        if (this.options.appname) {
            this.appname = this.options.appname;
        }
        if (this.options.channel_secret) {
            this.channel_secret = this.options.channel_secret;
        }
        if (this.options.channel_access_token) {
            this.channel_access_token = this.options.channel_access_token;
        }
    }

    // Scaffolding
    writing() {
        if (this.language === "csharp") {
            this.fs.copyTpl(
                this.templatePath('csharp/local.settings.json'),
                this.destinationPath(`${this.appname}/local.settings.json`),
                {
                    channel_access_token: this.channel_access_token,
                    channel_secret: this.channel_secret
                }
            );
            this.fs.copyTpl(
                this.templatePath('csharp/CloudStorage/**/*'),
                this.destinationPath(`${this.appname}/CloudStorage`),
                {
                    appname: this.appname
                }
            );
            this.fs.copyTpl(
                this.templatePath('csharp/LINEBOT/**/*'),
                this.destinationPath(`${this.appname}/LINEBOT`),
                {
                    appname: this.appname
                }
            );
            this.fs.copyTpl(
                this.templatePath('csharp/Models/**/*'),
                this.destinationPath(`${this.appname}/Models`),
                {
                    appname: this.appname
                }
            );
            this.fs.copyTpl(
                this.templatePath('csharp/Services/**/*'),
                this.destinationPath(`${this.appname}/Services`),
                {
                    appname: this.appname
                }
            );
            this.fs.copy(
                this.templatePath('csharp/LINEBOT.csproj'),
                this.destinationPath(`${this.appname}/LINEBOT.csproj`)
            );
            this.fs.copy(
                this.templatePath('csharp/Images/**/*'),
                this.destinationPath(`${this.appname}/Images`)
            );
        }
        else if (this.language === "go") {
            this.fs.copyTpl(
                this.templatePath('go/.vscode/launch.json'),
                this.destinationPath(`${this.appname}/.vscode/launch.json`),
                {
                    channel_access_token: this.channel_access_token,
                    channel_secret: this.channel_secret
                }
            );
            this.fs.copy(
                this.templatePath('go/server.go'),
                this.destinationPath(`${this.appname}/server.go`)
            );
            this.fs.copy(
                this.templatePath('go/static/**/*'),
                this.destinationPath(`${this.appname}/static`)
            );
        }
        else if (this.language === "nodejs") {
            this.fs.copyTpl(
                this.templatePath('nodejs/package.json'),
                this.destinationPath(`${this.appname}/package.json`),
                {
                    appname: this.appname
                }
            );
            this.fs.copyTpl(
                this.templatePath('nodejs/.vscode/launch.json'),
                this.destinationPath(`${this.appname}/.vscode/launch.json`),
                {
                    channel_access_token: this.channel_access_token,
                    channel_secret: this.channel_secret
                }
            );
            this.fs.copy(
                this.templatePath('nodejs/index.js'),
                this.destinationPath(`${this.appname}/index.js`)
            );
            this.fs.copy(
                this.templatePath('nodejs/static/**/*'),
                this.destinationPath(`${this.appname}/static`)
            );
        }
        else if (this.language === "python") {
            this.fs.copyTpl(
                this.templatePath('python/.vscode/launch.json'),
                this.destinationPath(`${this.appname}/.vscode/launch.json`),
                {
                    channel_access_token: this.channel_access_token,
                    channel_secret: this.channel_secret
                }
            );
            this.fs.copy(
                this.templatePath('python/.vscode/settings.json'),
                this.destinationPath(`${this.appname}/.vscode/settings.json`)
            );
            this.fs.copy(
                this.templatePath('python/app.py'),
                this.destinationPath(`${this.appname}/app.py`)
            );
            this.fs.copy(
                this.templatePath('python/requirements.txt'),
                this.destinationPath(`${this.appname}/requirements.txt`)
            );
        }
    }

    // Install dependencies
    install() {
        if (this.language === "csharp") {
            this.spawnCommand('dotnet', ['restore']);
        }
        else if (this.language === "go") {
            this.spawnCommand('go', ['get', 'github.com/line/line-bot-sdk-go/linebot']);
        }
        else if (this.language === "nodejs") {
            this.npmInstall(['express', '@line/bot-sdk', 'fs', 'path', 'child-process'], { 'save-dev': true }, { cwd: this.appname });
        }
        else if (this.language === "python") {
            this.spawnCommand('pip', ['install', '-r', 'requirements.txt'], { cwd: this.appname });
        }
    }
};

Generator.prototype.welcome 