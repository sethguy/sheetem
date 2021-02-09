
fs = require('fs')
var gm = require('gm');

const pngname = `${__dirname}/talls`

const renameFiles = () => {

    fs.readdir(pngname, (err, files) => {
        console.log("renameFiles -> err", err)

        files.forEach(file => {

            const name = `${pngname}/${file}`;
            const newName = name.replace('Pill- 2.1 - ', 'Pill bottle – 2.')


            // gm(name)

            //     // Invoke trim function  
            //     .trim()

            //     // Process and Write the image 

            //     .write(name, function (err) {
            //         if (!err) {
            //             console.log('err', err);
            //             return;
            //         }

            //     });


            // console.log(name)
            // console.log(newName);

            fs.rename(name, newName, () => {

                console.log(name)
                console.log(newName);

            })


        });
    });


}


renameFiles()


