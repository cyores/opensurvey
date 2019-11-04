var documentation = require("documentation");
var fs = require("fs");

documentation
    .build(["./src/app.js"], { shallow: false })
    .then(documentation.formats.md)
    .then(output => {
        fs.writeFileSync("./README.md", output);
    });
