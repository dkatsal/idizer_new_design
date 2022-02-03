/**
 * One Test Job
 *
 *    Example:
 *    Jobs.schedule('now', 'test.oneTestJob', {param1: value1, param2: value2});
 *
 * @param agenda
 * @returns {{run: run}}
 */
module.exports = function (agenda) {
  return {
    frequency: 'every 10 minutes',
    disabled: true,
    run: async function (job, done) {
      sails.log.info('Job test.oneTestJob was started.');

      const {param1, param2, ...data} = job.attrs.data;

      //some stuff
      //socket notification etc

      sails.log.info('Job test.oneTestJob was executed.');
      done();
    }
  };
};
