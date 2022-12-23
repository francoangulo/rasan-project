var fs = require("fs");
const {
    getAttributes,
    listQueues,
    receiveMessage,
    sendMessage,
} = require("../actions/actions");

module.exports = {
    getAttributes,
    listQueues,
    receiveMessage,
    sendMessage,
    pwd: function (data, done) {
        done(process.argv[1]);
    },
    date: function (data, done) {
        done(Date());
    },
    ls: function (data, done) {
        fs.readdir(".", function (err, files) {
            var output = "";
            if (err) throw err;
            files.forEach(function (file) {
                output += file.toString() + "\n";
            });
            done(output);
        });
    },
    echo: function (data, done) {
        done(data);
    },
};
