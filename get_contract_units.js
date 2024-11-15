const payservedb = require('payservedb');

const get_units_by_contract = async (request, reply) => {
  try {
    const { contractId } = request.params;

    // Find contract by ID
    const contract = await payservedb.Contract.findById(contractId).populate('units');

    if (!contract) {
      return reply.code(404).send({ error: 'Contract not found' });
    }

    // Assuming units are referenced in the contract document
    return reply.code(200).send(contract.units);
    
  } catch (err) {
    return reply.code(502).send({ error: err.message });
  }
};

module.exports = get_units_by_contract;
