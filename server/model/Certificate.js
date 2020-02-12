import _ from "lodash";
import fs from "fs";

const CHAT_PEM = fs.readFileSync(`${__dirname}/../../__mocks__/chat.pem`);

const env = _.defaults(process.env, { CHAT_PEM });

export default {
  chat: env.CHAT_PEM
};
