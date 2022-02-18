const express = require("express");
const formidable = require('formidable');
const fs = require('fs')

const app = express();
app.use(express.static(__dirname));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/main.html");
});

app.post('/sounds', (req, res) => {
    if (req.url == '/sounds') {
        var form = new formidable.IncomingForm();
        form.parse(req, function (err, fields, files) {
            if (keyPhrase == '' || newpath == '') {
                return
            } else {
                var oldpath = files.soundfile.filepath;
                var newpath = './sounds/' + files.soundfile.originalFilename;
                var keySlot = fields.keys - 64
                var keyPhrase = fields.keyPhrase
                const fileData = fs.readFileSync("./helper/helper2.json", "utf8")
                const jsonData = JSON.parse(fileData)
                if (keyPhrase == '') {
                    return
                } else {
                    fs.rename(oldpath, newpath, function (err) {
                        if (err) {
                            console.log(err);
                        } else {
                            res.redirect("/");
                        }
                       
                    });
                    
                }
                
                jsonData.keyMap[keySlot].phrase = keyPhrase
                jsonData.keyMap[keySlot].file = newpath
                fs.writeFile("./helper/helper2.json", JSON.stringify(jsonData, null, 4), function (err) { if (err) throw err; return; });
            }
        });
    };
});


app.listen(8085, function () {
    console.log("Listening on port 8085")
});
