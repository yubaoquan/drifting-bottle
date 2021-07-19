const dayjs = require('dayjs');
const express = require('express');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  const { type, user } = req.query;
  let typeTitle = '全部性别';
  if (type === 'male') typeTitle = '男性';
  if (type === 'female') typeTitle = '女性';

  res.send(`打捞漂流瓶, 类型: ${typeTitle}, 用户标识: ${user}`);
});

const getErrSender = (res) => (error) => res.status(422).send({ error });

app.post('/', (req, res) => {
  const { owner, type, content, time = Date.now() } = req.body;
  const sendErr = getErrSender(res);

  if (!owner) return sendErr('Need owner');
  if (!['male', 'female'].includes(type)) return sendErr('Type must be male or female');
  if (!content) return sendErr('Content must not be empty');

  const typeTitle = type === 'male' ? '男性' : '女性';
  const formatedTime = dayjs(time).format('YYYY-MM-DD HH:mm:ss');
  res.send(`${typeTitle}用户${owner}在${formatedTime}发送了一个漂流瓶, 内容: ${content}`);
});

const port = 3000;
app.listen(port, () => {
  console.info(`server running on http://localhost:${port}`);
});
