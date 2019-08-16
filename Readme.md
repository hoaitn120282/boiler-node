# Express & Sequelize starter kit

This repository the usage of Sequelize within an [Express](https://expressjs.com) application.

## Main Features

-   MVC Project Structure
-   Node.js clusters support
-   Sequelize ORM
-   Sequelize CLI
-   Socket IO
-   Social Authentication
-   Faker JS
-   Model/Migration generator
-   Mocha Unit Testing

### [Documents](https://qwiki.tqms.net:9943/qsoft-core/node-starterkit)

## Prerequisites

-   [Sequelize](http://docs.sequelizejs.com)
-   [MySQL](https://www.npmjs.com/package/mysql) or [Postgres SQL](https://www.npmjs.com/package/pg)
-   [Node.js 8.0+](http://nodejs.org)
-   Command Line Tools
-   <img src="http://deluge-torrent.org/images/apple-logo.gif" height="17">&nbsp;**Mac OS X:** [Xcode](https://itunes.apple.com/us/app/xcode/id497799835?mt=12) (or **OS X 10.9+**: `xcode-select --install`)
-   <img src="http://dc942d419843af05523b-ff74ae13537a01be6cfec5927837dcfe.r14.cf1.rackcdn.com/wp-content/uploads/windows-8-50x50.jpg" height="17">&nbsp;**Windows:** [Visual Studio](https://www.visualstudio.com/products/visual-studio-community-vs) OR [Visaul Studio Code](https://code.visualstudio.com) + [Windows Subsystem for Linux - Ubuntu](https://docs.microsoft.com/en-us/windows/wsl/install-win10)
-   <img src="https://lh5.googleusercontent.com/-2YS1ceHWyys/AAAAAAAAAAI/AAAAAAAAAAc/0LCb_tsTvmU/s46-c-k/photo.jpg" height="17">&nbsp;**Ubuntu** / <img src="https://upload.wikimedia.org/wikipedia/commons/3/3f/Logo_Linux_Mint.png" height="17">&nbsp;**Linux Mint:** `sudo apt-get install build-essential`
-   <img src="http://i1-news.softpedia-static.com/images/extra/LINUX/small/slw218news1.png" height="17">&nbsp;**Fedora**: `sudo dnf groupinstall "Development Tools"`
-   <img src="https://en.opensuse.org/images/b/be/Logo-geeko_head.png" height="17">&nbsp;**OpenSUSE:** `sudo zypper install --type pattern devel_basis`

## Getting Started

The easiest way to get started is to clone the repository:

```bash
# Get the latest snapshot
git clone https://github.com/hoaitn120282/boiler-node.git myproject

# Change directory
cd myproject

# Install NPM dependencies
npm install

# Run test
npm test

# Then simply start your app
npm start or node index.js
```

**Warning:** If you want to use some api that need https to work (for example pinterest or facebook),
you will need to download [ngrok](https://ngrok.com/).
You must start ngrok after starting the project.

```bash
# start ngrok to intercept the data exchanged on port 8080
./ngrok http 8080
```

Next, you must use the https url defined by ngrok, for example `https://localhost.ngrok.io`

**Note:**
[Nodemon](https://github.com/remy/nodemon) It watches for any changes in your node.js app and automatically restarts the
server. Once installed, instead of `node app.js` use `nodemon app.js`. It will
save you a lot of time in the long run, because you won't need to manually
restart the server each time you make a small change in code. To install, run
`sudo npm install -g nodemon`.
