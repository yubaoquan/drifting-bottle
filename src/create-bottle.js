const md5 = require('md5');

const getErrSender = (res) => (msg) => res.status(422).json({ code: 0, msg });

module.exports = (redis) => async (req, res) => {
  const sendErr = getErrSender(res);
  try {
    const { owner, type, content, time = Date.now() } = req.body;

    if (!owner) return sendErr('Need owner');
    if (!['male', 'female'].includes(type)) return sendErr('Type must be male or female');
    if (!content) return sendErr('Content must not be empty');

    const bottle = JSON.stringify({ time, owner, type, content });
    const bottleHash = md5(bottle);

    await redis.set(bottleHash, bottle);
    await redis.sadd(type, bottleHash);
    await redis.sadd('all', bottleHash);

    res.send({ code: 1, msg: '扔瓶成功' });
  } catch (e) {
    console.error(e);
    sendErr(e.message);
  }
};
