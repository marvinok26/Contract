const payservedb = require('payservedb');

const add_unit_to_contract = async (request, reply) => {
    try {
      const { contractId } = request.params;
      const { units } = request.body;
  
      // Find the contract by ID
      const contract = await payservedb.Contract.findById(contractId);
      if (!contract) {
        return reply.code(404).send({ error: 'Contract not found.' });
      }
  
      // Fetch the full unit objects by their IDs
      const unitObjects = await payservedb.Unit.find({ _id: { $in: units } });
  
      // Check if the unit already exists in the contract's units array
      const existingUnits = contract.units.map(unit => unit._id.toString());
      const newUnits = unitObjects.filter(unit => !existingUnits.includes(unit._id.toString()));
  
      if (newUnits.length === 0) {
        return reply.code(409).send({ error: 'Unit already exists in the contract.' });      
    }
  
      // Add the new units to the contract's units array
      contract.units.push(...newUnits);
  
      await contract.save();
  
      return reply.code(200).send('Unit added to Contract successfully.');
    } catch (err) {
      console.error('Error adding unit to contract:', err.message); // Log error for debugging
      return reply.code(502).send({ error: err.message });
    }
  };

  module.exports = add_unit_to_contract;
