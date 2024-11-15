const payservedb = require('payservedb');

const editContract = async (request, reply) => {
    try {
        const { contractId } = request.params;
        const updateData = request.body;

        const updatedContract = await payservedb.Contract.findByIdAndUpdate(
            contractId,
            updateData,
            { new: true }
        );

        if (!updatedContract) {
            return reply.code(404).send({ error: 'Contract not found' });
        }

        return reply.code(200).send('Contract updated successfully');
    } catch (err) {
        return reply.code(502).send({ error: err.message });
    }
};

module.exports = editContract;
