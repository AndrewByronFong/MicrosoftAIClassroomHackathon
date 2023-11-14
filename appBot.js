global.XMLHttpRequest = require("xhr2");
global.WebSocket = require("ws");

const { DirectLine } = require("botframework-directlinejs");
const { question } = require("readline-sync");

var directLine = new DirectLine({
  secret: "SlkCINMACTM.0VZEIx4xW9qlJXbMdOKewcYrj8lLrguMX-YhKzvmKlE",
  token: "",
  domain: "",
  webSocket: "",
  pollingInterval: "",
  timeout: "",
  conversationStartProperties: {
    locale: "en-US",
  },
});

let times = 1;
directLine.activity$.subscribe((activity) => {
    if (times > 2 && times % 2 == 1) console.log("\nResponse: ", activity["text"]);
    times++;
  });

async function main() {
  while (true) {
    try {
      const userQuestion = question("Question: ");
      await directLine.postActivity({
        from: { id: "1", name: "andrewbyronfong@gmail.com" },
        type: "message",
        text: userQuestion,
      }).toPromise();
    } catch (error) {
      console.log("Error posting activity", error);
    }
  }
}

main();
