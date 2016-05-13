# Watch & Compile your Sass with npm.

![npm-logo](https://cdn-images-1.medium.com/max/800/1*0fr3PbT2XqjsMD52sc2-NQ.png)

I build a lot of websites and simple prototypes using Node.js and Sass.

Both of them are great for what I do at work and for my own side projects.

Where I work at Bluemix, we’re interested in using the least amount of package managers possible to simplify how we work with the front-end of our code bases. Speaking just for myself, I’ve been slowly catching on to using npm as my package manager and build tool.

I’m also kind of lazy.

Have you ever wanted to write a single starting command for your app? In the best case scenario, for simple projects, my terminal usually looks like this:

![iterm](https://cdn-images-1.medium.com/max/800/1*jldAraopNj972njyWe71Fg.png)

* One window for git
* One window for gulp
* One window for node web server

This is fine. We can make this better. But I want this article to be a baby first step into showing how npm can be an asset pipeline and build tool by enabling you to do two things:

* Compile your scss files to css files.
* Watch for changes on your scss files and trigger a re-compile.

## Pre-requisites

You need Node.js installed on your computer.

If you’re on a Mac, I recommend installing Homebrew, a package manager for mac.

After installing this, you can install Node.js by doing:

```
$ brew install node
```

If you want more details on installing Node.js, check out [this article from Treehouse](http://blog.teamtreehouse.com/install-node-js-npm-mac).

Getting Started Open terminal and create a new folder for our project.

```
$ mkdir portfolio && cd portfolio
```

Create a package.json file and follow the prompts.

```
$ npm init
```

Now let’s set up our files. Create these folders:

```
$ mkdir bin public scss && mkdir public/css
```
* **scss** folder is where I like to keep all of my scss files and directories.
* **public** folder is where I keep all my static assets, inside I have a css folder for my css files.
* **bin** folder is where we are going to put a command line script to compile our scss files.

Now let’s create some files:

```
$ touch scss/main.scss .gitignore
```
* **main.scss** is where we will write out scss code.
* **.gitignore** *(recommended)*: this is a hidden file we use to tell GitHub what files and folders to exclude from our repo. I like to tell GitHub to ignore my **node_modules** folder. If I or anyone else needs to clone my repo, I can tell them to npm install based on the packages in package.json.

Now your file structure should look like this:

![your-file-structure-should-look-like-this](https://cdn-images-1.medium.com/max/800/1*21kxMu-JL__TXtFo5QLzJw.png)

## Simple Sass compiler and watcher

When I started playing around with npm scripts, my original intention was to stop using gulp and try to write everything I needed using things like node-sass, autoprefixer, and browsersync without their respective gulp tasks.

In this section, I’ll show you how I made a simple sass compiler and watcher without using gulp.js and only using npm scripts.

This section will probably be the simplest example for understanding npm scripts so let’s diiiiive in.

*Sploosh!*

## Install the things

Let’s install our dev-dependencies:

```
$ npm install -D node-sass nodemon
```
* -D flag is another way of saying "write these node_modules into my package.json under devDependencies" (go look at your package.json)
* **node-sass** is that thing gulp-sass uses to compile your scss files to css files. node-sass wraps Libsass.
* **nodemon** is a thing we’ll use to watch for changes on our scss files. Normally, it’s used to watch for changes on your server-side Node.js code.

## Compile the Sass

Before we write our first script, write some dummy scss in your main.scss file so node-sass can use that to compile.

```scss
$badass: #bada55;

body {
  margin: 0;
  background-color: $badass;
}
```

Now, let’s write a command line script for compiling our scss files using node-sass.

In your package.json, find the "scripts" object and inside, write the following code:

```json
"scripts": {
  "build-css": "node-sass --include-path scss scss/main.scss   public/css/main.css"
},
```

In your terminal, do this:

```
$ npm run build-css
```

Whoa! Stuff happened!

Go look at your main.css file and you’ll see that node-sass indeed compiled your scss file to css. Awesome!

## Watch the Sass

Let’s update our scripts with a watch script. Inside package.json, make your scripts object look like this:

```json
"scripts": {
 "build-css": "node-sass --include-path scss scss/main.scss public/css/main.css",
 "watch-css": "nodemon -e scss -x \"npm run build-css\""
},
```

Now let’s try it in the terminal!

```
$ npm run watch-css
```

Open up your text editor and start writing some more styles in your **main.scss** file. Now check your **main.css** file and the terminal. You’ll see that whenever you save new styles to main.scss, those changes will re-compile to create updates to main.css and you’ll see some feedback from your terminal, like this:

![terminal](https://cdn-images-1.medium.com/max/800/1*f6Uw8hOunC31odya6Uk4Lw.png)

So congrats! You’ve built your own sass compiler and watcher that you can start using npm scripts.

If you decide you want to stick with this, let’s capture the node-sass and nodemon scripts in their own executable files.

## Refactor: Move scripts into their own files

Create a build-css file and a watch-css file (no file extensions) inside the bin folder.

```
$ touch bin/build-css bin/watch-css
```

Take that build-css (node-sass) script and put inside the build-css file.
Take that watch-css (nodemon) script and put inside the watch-css file.

We can clean up these files so we don’t have to escape any quotes. For example, your build-css file should look like this:

```
node-sass --include-path scss scss/main.scss public/css/main.css
```

And your watch-css file should look like this:

```
nodemon -e scss -x "npm run build-css"
```

We also need to make both of these files executable.

Do this in your command line:

```
chmod +x bin/build-css
chmod +x bin/watch-css
```

Now go back to your package.json file and change the scripts to reference the relative paths of our new bin files. So, it’ll look like this:

```json
"scripts": {
 "build-css": "./bin/build-css",
 "watch-css": "./bin/watch-css"
},
```

This is a lot cleaner looking, right?

Now try running npm run watch-css again and you’ll see it should work just the way it did before.

Thanks for getting this far and taking the time to follow along with this article! You can find all this code up on my GitHub.

Obviously this is missing a lot of stuff that I usually like to have in my projects, like live-reload and autoprefixer. For a more useful set-up that includes those missing things, check out my npm-sass repo for Express.js projects.

Anyway, thanks again for reading. Here are some puppies.

![puppies](https://cdn-images-1.medium.com/max/800/1*l_I1sL8XOWAr_3kjmjMf2w.gif)
