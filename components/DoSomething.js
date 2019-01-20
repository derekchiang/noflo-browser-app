const noflo = require('noflo');
const Web3 = require('web3')

exports.getComponent = () => {
  const c = new noflo.Component();
  // Define a meaningful icon for component from http://fontawesome.io/icons/
  c.icon = 'cog';
  // Provide a description on component usage
  c.description = 'do X';
  // Add input ports
  c.inPorts.add('in', {
    datatype: 'string',
  });
  // Add output ports
  c.outPorts.add('out', {
    datatype: 'string',
  });
  // What to do when port receives a packet
  c.process((input, output) => {
    // Check that input has received data packet
    if (!input.hasData('in')) {
      return;
    }
    // Read the contents of the data packet
    const data = input.getData('in');
    let web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");
    console.log(web3)
    // Send the contents to output port
    output.send({
      out: data,
    });
    // Finish processing
    output.done();
  });
  return c;
};
