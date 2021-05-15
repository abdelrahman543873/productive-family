import { env } from './env';
import * as twilio from 'twilio';
import { MessageInstance } from 'twilio/lib/rest/api/v2010/account/message';

interface messageInterface {
  to: string;
  body: string;
}

const client = twilio(env.TWILIO_ACCOUNT_SID, env.TWILIO_TOKEN);
export const sendMessage = async (
  input: messageInterface,
): Promise<MessageInstance | string> => {
  return process.env.NODE_ENV === 'production'
    ? await client.messages.create({
        body: input.body,
        from: process.env.TWILIO_NUMBER,
        to: input.to,
      })
    : 'success';
};
