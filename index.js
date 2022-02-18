// let secureEnv = require("secure-env");
// global.env = secureEnv({ secret: "rollingstone" });
const commands = require("./userinput/commands");

const done = function (output) {
    output && console.log(output);
    process.stdout.write("\nprompt > ");
};

// Output un prompt
process.stdout.write("prompt > ");
// El evento stdin 'data' se dispara cuando el user escribe una línea
process.stdin.on("data", function (data) {
    var cmd = data.toString().trim(); // remueve la nueva línea

    var divided = cmd.split(" ");
    var cmd = divided.shift().toString();
    joined = divided.join(" ").toString();
    try {
        commands[cmd](joined, done);
    } catch (error) {
        console.error(` "${cmd}" no es un comando válido`);
        process.stdout.write("prompt > ");
    }
});
