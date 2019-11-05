var documentation = require("documentation");
var fs = require("fs");

let locations = [
    { path: "./src/controllers/", ext: ".controller", title: "Controllers" },
    { path: "./src/services/", ext: ".service", title: "Services" },
    { path: "./src/db/", ext: ".db", title: "Database" }
];

for (let j = 0; j < locations.length; j++) {
    let location = locations[j];
    // console.log(location);
    fs.readdir(location.path, async (err, files) => {
        if (err) {
            console.log("Error reading file", err);
            process.exit(0);
        }
        let text = "# " + location.title;
        for (let i = 0; i < files.length; i++) {
            let file = files[i];
            if (!file.includes(location.ext)) continue;
            console.log("documenting", file);
            let docs = await documentation.build([location.path + file], {
                shallow: true
            });
            let format = await documentation.formats.md(docs);
            let title =
                "# " +
                file
                    .replace(".", " ")
                    .replace(".", " ")
                    .replace("js", "")
                    .toUpperCase();
            text += "\n" + title + "\n" + format + "\n";
        }

        fs.writeFileSync(location.path + "README.md", text);
    });
}
