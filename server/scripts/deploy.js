/* eslint no-console: 0 */
const chalk = require('chalk');
const fs = require('fs');
const path = require('path');
const node_ssh = require('node-ssh');
const ora = require('ora');

const ssh = new node_ssh();

const folder = '/home/ubuntu/api-app';
const files = ['package.json', 'build/server.js'];
const spinner = ora({
    text: 'Deploy to remote server'
});
function deploy() {
    const checkNotExists = files.some(file => {
        if (!fs.existsSync(file)) {
            console.warn(`File ${chalk.cyan.underline(file)} not exists`);
            return true;
        } else {
            return false;
        }
    });
    if (!checkNotExists) {
        spinner.start();
        ssh
            .connect({
                host: '0.0.0.0',
                username: 'ubuntu',
                port: 22,
                privateKey: ''
            })
            .then(() => {
                spinner.succeed('SSH connect success').start();
                const failed = [];
                const successful = [];

                const pushFiles = ssh
                    .putFiles([{ local: 'package.json', remote: `${folder}/package.json` }], {
                        concurrency: 10
                    })
                    .then(a => {
                        spinner.succeed('Successful transfers files').start();
                        return true;
                    });
                const makePushDir = (source, dest) =>
                    ssh
                        .putDirectory(source, dest, {
                            recursive: true,
                            concurrency: 10,
                            validate: function(itemPath) {
                                const baseName = path.basename(itemPath);
                                return (
                                    baseName.substr(0, 1) !== '.' && baseName !== 'node_modules' // do not allow dot files
                                ); // do not allow node_modules
                            },
                            tick: function(localPath, remotePath, error) {
                                if (error) {
                                    failed.push(localPath);
                                } else {
                                    successful.push(localPath);
                                }
                            }
                        })
                        .then(function(status) {
                            if (status)
                                spinner.succeed(`Successful transfers ${chalk.cyan.bold(source)} folder`).start();
                            return status;
                        });

                return Promise.all([
                    pushFiles,
                    makePushDir('build', `${folder}/build`),
                    makePushDir('public', `${folder}/public`)
                ])
                    .then(() => {
                        return ssh.execCommand('yarn install --prod', { cwd: folder }).then(result => {
                            if (result.stderr) {
                                throw result.stderr;
                            } else {
                                console.info(chalk.green('STDOUT: ') + result.stdout);
                                return true;
                            }
                        });
                    })
                    .then(() => {
                        return ssh.execCommand('pm2 start build/server.js', { cwd: folder }).then(result => {
                            if (result.stderr) {
                                throw result.stderr;
                            } else {
                                console.info(chalk.green('STDOUT: ') + result.stdout);
                                spinner.succeed('Deploy successfuly').stop();
                                process.exit(0);
                            }
                        });
                    });
            })
            .catch(err => {
                console.error(chalk.red('ERR: ') + err);
                spinner.fail('Deploy error').stop();
                process.exit(0);
            });
    } else {
        process.exit(0);
    }
}

deploy();
