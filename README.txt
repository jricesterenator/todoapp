1. Created project from boilerplate.
https://github.com/DaftMonk/generator-angular-fullstack#app

npm install -g generator-angular-fullstack
mkdir my-new-project && cd $_
yo angular-fullstack [app-name]

Run grunt for building, grunt serve for preview, and grunt serve:dist for a
preview of the built app.

2. grunt build should build the final product, but it had issues with imagemin
Loading "imagemin.js" tasks...ERROR
    >> Error: Cannot find module 'imagemin-gifsicle'
https://github.com/npm/npm/issues/6051

To get it working, upgraded npm and imagemin.
npm install --global npm@latest
npm install grunt-contrib-imagemin --save-dev

3. To run the webpage: grunt serve
