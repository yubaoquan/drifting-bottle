module.exports = (redis) => async (req, res) => {
  try {
    const { type } = req.query;
    const typeToPick = ['male', 'female'].includes(type) ? type : 'all';

    const bottleKey = await redis.spop(typeToPick);
    console.info(bottleKey);
    if (!bottleKey) return res.json({ code: 0, msg: '没有瓶子了' });

    const bottle = JSON.parse(await redis.getdel(bottleKey));

    if (typeToPick === bottle.type) { // key 来自男/女集合, 需要把 all 中的 key 同步删掉
      await redis.srem('all', bottleKey);
    } else { // key 来自 all, 需要把男/女集合中对应的 key 删掉
      await redis.srem(bottle.type, bottleKey);
    }

    console.info(bottle);
    res.json({ code: 1, message: bottle });
  } catch (e) {
    console.error(e);
    res.json({ code: 0, message: e.message });
  }
};
