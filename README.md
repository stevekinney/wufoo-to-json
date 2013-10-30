# Wufoo to JSON

Does what it says it does. It works as far as I can tell, but I didn't write tests. So, let's call it an `alpha` release for the time being, okay?

## Usage

    var wufooToJSON = require('wufoo-to-json');
    
    var subdomain = 'fishbowl';
    var apiKey = 'AB12-CD34-EF56-GH78';
    var formID = 1;

    wufooToJSON(subdomain, apiKey, formID, function (err, body) {
      console.log(body);
    });

**Disclaimer:** Not writing tests is bad. I will rectify this. I promise. Don't be like me.