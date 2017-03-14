request = require('request');
module.exports = {
  exec: (client, message, content, args) => {
    message.send("Surely, senpai. Please wait while I'm looking for info");
    request({ url: "https://raw.githubusercontent.com/aister/nobuDB/master/daily.json", json: true }, function(err, res, body) {
      fields = [];
      date = new Date();
      date.setTime(Date.now() + 9 * 60 * 60 * 1000);
      body = body[date.getDay()];
      body.forEach(item => {
        fields.push({
          name: item.name,
          value: "**Drop:** " + decodeURIComponent(escape(item.drop)) + "\n\u200b"
        });
      });
      
      fields[fields.length - 1]["value"] = fields[fields.length - 1]["value"].slice(0, -2);
      embed = {
        title: "Daily Quest Info for " + date.toDateString(),
        color: 0xff0000,
        fields,
        description: "\u200b"
      }
      message.channel.sendMessage('', {embed});
    });
  }
}