const tradfri = require('../tradfri');
const groups = [];

tradfri
  .on('group updated', async group => {
    groups.push(group);
    //console.log(`Added group ${group.name} (${group.instanceId})`);
  })
  .on('error', e => {
    console.log('group error', e);
  })
  .observeGroupsAndScenes();

module.exports = {
  getAll(req, res) {
    res.json({
      items: groups.map(group => {
        delete group.client;
        return group;
      }),
      status: 'ok'
    });
  }
};