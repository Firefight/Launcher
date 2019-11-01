// prebuild hook

const fs = require('fs'), path = require('path')

console.log('Prebuild started.')

const dist = path.join(__dirname, 'dist')

if ( !fs.existsSync(dist) ) fs.mkdirSync(dist)

const del = dir => fs.existsSync(dir) && (
    fs.readdirSync(dir).forEach( file => {
        const current = path.join(dir, file)

        fs.lstatSync(current).isDirectory()
            ? del(current)
            : fs.unlinkSync(current)
    }),

    fs.rmdirSync(dir)
)

del(path.join(__dirname, 'dist', 'win-unpacked'))