const fs = require('fs');
const path = require('path');

const dotenvFile = '.env';

const { NODE_ENV = 'production' } = process.env;

// https://github.com/bkeepers/dotenv#what-other-env-files-can-i-use
// const dotenvFiles = [`${dotenvFile}.${NODE_ENV}.local`, `${dotenvFile}.${NODE_ENV}`, dotenvFile].filter(Boolean);

const dotenvFiles = [
    `${dotenvFile}.${NODE_ENV}.local`,
    `${dotenvFile}.${NODE_ENV}`,
    // Don't include `.env.local` for `test` environment
    // since normally you expect tests to produce the same
    // results for everyone
    NODE_ENV !== 'test' && `${dotenvFile}.local`,
    dotenvFile
].filter(Boolean);

// Load environment variables from .env* files. Suppress warnings using silent
// if this file is missing. dotenv will never modify any environment variables
// that have already been set.
// https://github.com/motdotla/dotenv
dotenvFiles.forEach(dotenvFile => {
    if (fs.existsSync(dotenvFile)) {
        require('dotenv').config({
            path: dotenvFile
        });
    }
});

// We support resolving modules according to `NODE_PATH`.
// This lets you use absolute paths in imports inside large monorepos:
// https://github.com/facebookincubator/create-react-app/issues/253.
// It works similar to `NODE_PATH` in Node itself:
// https://nodejs.org/api/modules.html#modules_loading_from_the_global_folders
// Note that unlike in Node, only *relative* paths from `NODE_PATH` are honored.
// Otherwise, we risk importing Node.js core modules into an app instead of Webpack shims.
// https://github.com/facebookincubator/create-react-app/issues/1023#issuecomment-265344421
// We also resolve them to make sure all tools using them work consistently.
const appDirectory = fs.realpathSync(process.cwd());
process.env.NODE_PATH = (process.env.NODE_PATH || '')
    .split(path.delimiter)
    .filter(folder => folder && !path.isAbsolute(folder))
    .map(folder => path.resolve(appDirectory, folder))
    .join(path.delimiter);

// injected into the application via DefinePlugin in Webpack configuration.
const NODE_APP = /^NODE_APP_/i;

function getClientEnvironment() {
    const raw = Object.keys(process.env)
        .filter(key => NODE_APP.test(key))
        .reduce(
            (env, key) => {
                env[key] = process.env[key];
                return env;
            },
            {
                // Useful for determining whether we’re running in production mode.
                // Most importantly, it switches React into the correct mode.
                NODE_ENV: process.env.NODE_ENV || 'production'
            }
        );
    // Stringify all values so we can feed into Webpack DefinePlugin
    const stringified = {
        'process.env': Object.keys(raw).reduce((env, key) => {
            env[key] = JSON.stringify(raw[key]);
            return env;
        }, {})
    };

    return {
        raw,
        stringified
    };
}

module.exports = getClientEnvironment;
