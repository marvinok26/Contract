const payservedb = require('payservedb');

const addContract = async (request, reply) => {
    try {
        const {
            contractName,
            levyId,
            customerId,
            unitId,
            amount,
            startDate,
            endDate,
            status,
            paymentFrequency,
            facilityId
        } = request.body;

        const contract = new payservedb.Contract({
            contractName,
            levy: levyId,
            customerId,
            unitId,
            amount,
            startDate,
            endDate,
            status,
            paymentFrequency,
            facilityId
        });

        await contract.save();

        return reply.code(201).send('Contract created successfully');
    } catch (err) {
        return reply.code(502).send({ error: err.message });
    }
};

module.exports = addContract;
