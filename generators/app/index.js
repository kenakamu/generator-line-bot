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
                choices: ['csharp', 'nodejs', 'go', 'python', 'ruby'],
                default: 'csharp'
            });
        }

        return this.prompt(prompts).then((answers) => {
            if (answers.language !== undefined) {
                this.language = answers.language
            }

            var prompts = [];
            if (this.language === "csharp" && this.projecttype === undefined) {
                prompts.push({
                    type: 'list',
                    name: 'projecttype',
                    message: 'Select Project Type',
                    choices: ['function', 'webapi'],
                    default: 'function'
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
            if (this.language === "csharp" && this.options.storage_connection_string === undefined) {
                prompts.push({
                    type: 'input',
                    name: 'storage_connection_string',
                    message: 'Enter Azure Storage connection string: '
                });
            }        
    
            return this.prompt(prompts).then((answers) => {
                if (answers.language !== undefined) {
                    this.language = answers.language
                }
                if (answers.projecttype !== undefined) {
                    this.projecttype = answers.projecttype
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
                if (answers.storage_connection_string !== undefined) {
                    this.storage_connection_string = answers.storage_connection_string;
                }
            });           
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
        this.option('ruby', { desc: 'ruby', require: false });

        // project type options for C#
        this.option('function', { desc: 'Azure Function', require: false });
        this.option('webapi', { desc: 'Web API', require: false });

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
        else if (this.options.ruby) {
            this.language = "ruby";
        }

        // Set C# project type option
        if (this.options.csharp && this.options.function) {
            this.projecttype = "function";
        }
        else if (this.options.csharp && this.options.webapi) {
            this.projecttype = "webapi";
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
        if (this.language === "csharp" && this.projecttype === "function") {
            this.fs.copyTpl(
                this.templatePath('csharp_function/local.settings.json'),
                this.destinationPath(`${this.appname}/local.settings.json`),
                {
                    channel_access_token: this.channel_access_token,
                    channel_secret: this.channel_secret,
                    storage_connection_string: this.storage_connection_string
                }
            );
            this.fs.copyTpl(
                this.templatePath('csharp_function/CloudStorage/**/*'),
                this.destinationPath(`${this.appname}/CloudStorage`),
                {
                    appname: this.appname
                }
            );
            this.fs.copyTpl(
                this.templatePath('csharp_function/LINEBOT/**/*'),
                this.destinationPath(`${this.appname}/LINEBOT`),
                {
                    appname: this.appname
                }
            );
            this.fs.copyTpl(
                this.templatePath('csharp_function/Models/**/*'),
                this.destinationPath(`${this.appname}/Models`),
                {
                    appname: this.appname
                }
            );
            this.fs.copyTpl(
                this.templatePath('csharp_function/Services/**/*'),
                this.destinationPath(`${this.appname}/Services`),
                {
                    appname: this.appname
                }
            );
            this.fs.copy(
                this.templatePath('csharp_function/LINEBOT.csproj'),
                this.destinationPath(`${this.appname}/LINEBOT.csproj`)
            );
            this.fs.copy(
                this.templatePath('csharp_function/host.json'),
                this.destinationPath(`${this.appname}/host.json`)
            );
            this.fs.copy(
                this.templatePath('csharp_function/.vscode/launch.json'),
                this.destinationPath(`${this.appname}/.vscode/launch.json`)
            );
            this.fs.copy(
                this.templatePath('csharp_function/Images/**/*'),
                this.destinationPath(`${this.appname}/Images`)
            );
        }
        else if (this.language === "csharp" && this.projecttype === "webapi") {
            this.fs.copyTpl(
                this.templatePath('csharp_webapi/appsettings.json'),
                this.destinationPath(`${this.appname}/appsettings.json`),
                {
                    channel_access_token: this.channel_access_token,
                    channel_secret: this.channel_secret,
                    storage_connection_string: this.storage_connection_string
                }
            );
            this.fs.copyTpl(
                this.templatePath('csharp_webapi/CloudStorage/**/*'),
                this.destinationPath(`${this.appname}/CloudStorage`),
                {
                    appname: this.appname
                }
            );
            this.fs.copyTpl(
                this.templatePath('csharp_webapi/Models/**/*'),
                this.destinationPath(`${this.appname}/Models`),
                {
                    appname: this.appname
                }
            );
            this.fs.copyTpl(
                this.templatePath('csharp_webapi/Services/**/*'),
                this.destinationPath(`${this.appname}/Services`),
                {
                    appname: this.appname
                }
            );            
            this.fs.copyTpl(
                this.templatePath('csharp_webapi/**/*.cs'),
                this.destinationPath(`${this.appname}`),
                {
                    appname: this.appname
                }
            );
            this.fs.copyTpl(
                this.templatePath('csharp_webapi/.vscode/**/*'),
                this.destinationPath(`${this.appname}/.vscode`),
                {
                    appname: this.appname
                }
            );
            this.fs.copy(
                this.templatePath('csharp_webapi/LINEBOT.csproj'),
                this.destinationPath(`${this.appname}/${this.appname}.csproj`)
            );
            this.fs.copy(
                this.templatePath('csharp_webapi/Images/**/*'),
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
                this.templatePath('python/app.py'),
                this.destinationPath(`${this.appname}/app.py`)
            );
            this.fs.copy(
                this.templatePath('python/requirements.txt'),
                this.destinationPath(`${this.appname}/requirements.txt`)
            );
        }
        else if (this.language === "ruby") {
            this.fs.copyTpl(
                this.templatePath('ruby/.vscode/launch.json'),
                this.destinationPath(`${this.appname}/.vscode/launch.json`),
                {
                    channel_access_token: this.channel_access_token,
                    channel_secret: this.channel_secret
                }
            );
            this.fs.copy(
                this.templatePath('ruby/app.rb'),
                this.destinationPath(`${this.appname}/app.rb`)
            );
            this.fs.copy(
                this.templatePath('ruby/Gemfile'),
                this.destinationPath(`${this.appname}/Gemfile`)
            );       
        }

    }

    // Install dependencies
    install() {
        if (this.language === "csharp") {
            this.spawnCommand('dotnet', ['restore'], { cwd: this.appname });
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
        else if (this.language === "ruby") {
            this.spawnCommandSync('gem', ['install', 'bundler']);
            this.spawnCommandSync('bundle', ['install'], {cwd: this.appname});
        }
    }
};

Generator.prototype.welcome 