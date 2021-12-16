import { Peer } from './Peer'

if(!process.env.PORT)
    throw Error("Variável de ambiente PORT não informada");

const port = process.env.PORT;
const timestamp = Date.now();
const randomNumber = Math.floor( (Math.random() * 10000) + 1000 )
const myKey = sha(port + "" + timestamp + "" + randomNumber );
const peer = new Peer(port);

const receivedMessageSignatures = [ myKey ];

process.argv.slice(2).forEach( anotherPeerAddress => peer.client.connect(anotherPeerAddress) );

peer.client.on('connect', socket => {
    const message = "Hi !! I'm on port " + port;
    const signature = sha(message + myKey + Date.now());
    receivedMessageSignatures.push(signature);
    const firstPayload = {
        signature,
        message
    }
    socket.write(JSON.stringify(firstPayload))
})

process.stdin.on('data', data => {
    const message = data.toString().replace(/\n/g, "");
    const signature = sha(message + myKey + Date.now());
    receivedMessageSignatures.push(signature);
    peer.broadcast(JSON.stringify({ signature, message}));
})

peer.client.on('data', data => {
    const json = data.toString();
    const payload = JSON.parse(json);
    
    if(receivedMessageSignatures.includes(payload.signature))
        return;

    receivedMessageSignatures.push(payload.signature)
    console.log("RECEIVED> ", payload.message)
    peer.broadcast(json);
})