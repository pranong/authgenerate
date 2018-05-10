const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

app.post('/posts', (req, res) => {
    const data = req.body;
    const AccessToken = require('twilio').jwt.AccessToken;
    const VideoGrant = AccessToken.VideoGrant;

    // Used when generating any kind of tokens
    const twilioAccountSid = 'ACc5399d9fab3e9eacb464f8948693e099';
    const twilioApiKey = 'SK44b906d2be870c854a621001c442d143';
    const twilioApiSecret = 'dXlQVEvLjmsqLFfWWokGPvVmFI2bJDIk';

    const identity = data['name'];

    // Create Video Grant
    const videoGrant = new VideoGrant({
    room: 'cool room',
    });

    // Create an access token which we will sign and return to the client,
    // containing the grant we just created
    const token = new AccessToken(twilioAccountSid, twilioApiKey, twilioApiSecret);
    //token.addGrant(videoGrant);
    token.identity = identity;

    // Serialize the token to a JWT string
    
    console.log(identity);
    console.log("AnyRoom@");
    console.log(token.toJwt());
  res.send(
    [{
      title: identity,
      room: "Any Room",
      token: token.toJwt()
    }]
  )
})

app.listen(process.env.PORT || 8081)