const folders = [{
        env: "ios",
        dir: "../res/iOS/LaunchImage.launchimage",
        type: 'splash'
    },
    {
        env: "ios",
        dir: "../res/iOS/AppIcon.appiconset",
        type: 'icon'
    },
    {
        env: "android",
        dir: "../res/android",
    }
]
const fs = require('fs');

folders.forEach(element => {
    let src = element.dir.substring(3);
    if (element.env == 'ios') {
        fs.readdir(element.dir, (err, files) => {
            files.forEach(file => {
                processIOS(element, file, src);
            });
            console.log();
        })
    } else {
        processAndroid(element,src);
    }
});

function processAndroid(element,src) {
    fs.readdir(element.dir, (err, files) => {
        files.forEach(file => {
            if((file.startsWith('drawable-')) && (file!='drawable-land')) {
                let landscape = file.includes('-land');
                let size = file.substring(landscape?14:9);
                let qualifier = landscape?'land':'port';
                console.log(`<splash qualifier="${qualifier}-${size}" src="${src}/${file}/screen.png" />`)
                if(!landscape) {
                    console.log(`<icon qualifier="${size}" src="${src}/${file}/icon.png" />`)
                }

                // <icon qualifier="xxxhdpi" src="res/android/drawable-xxxhdpi/icon.png" />
                // <splash qualifier="land-xxxhdpi" src="res/screens/android/drawable-land-xxxhdpi/screen.png" />
                // <splash qualifier="port-ldpi" src="res/screens/android/drawable-ldpi/screen.png" />
            }
        });
        console.log();
    })
}

function processIOS(element, file, src) {
    let idx = file.lastIndexOf('_');
    if (idx == -1) {
        idx = file.lastIndexOf('-');
    }
    if (idx > -1) {
        let dim = file.substring(idx + 1, file.length - 4);
        let at = dim.indexOf('@');
        let mult = 1;
        if (at > -1) {
            mult = dim.substring(at + 1, at + 2);
        }
        idx = dim.indexOf('x');
        let h = dim.substring(0, idx) * mult;
        let w = dim.substring(idx + 1);
        if (at > -1) {
            w = dim.substring(idx + 1, at);
        }
        w = w * mult;
        let row = "";
        row = `<${element.type} height="${h}" width="${w}" platform="${element.env}" src="${src}/${file}" />`
        if (element.type == 'icon' && w == 1024) {
            h = 'skip';
        }

        if (!isNaN(h)) {
            console.log(row);
        }
    }
}