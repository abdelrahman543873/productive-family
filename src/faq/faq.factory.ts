import * as faker from 'faker';
import { UserRoleEnum } from 'src/_common/app.enum';
import { getValuesFromEnum } from 'src/_common/utils/column-enum';
import { FaqRepo } from 'test/faq/faq-test-repo';
import { Faq } from './models/faq.schema';

interface FaqType {
  enQuestion?: string;
  arQuestion?: string;
  enAnswer?: string;
  arAnswer?: string;
  type?: UserRoleEnum;
}

export const buildFaqParams = (obj: FaqType = {}): Faq => {
  return {
    enQuestion: obj.enQuestion || faker.random.words(),
    arQuestion: obj.arQuestion || faker.random.words(),
    enAnswer: obj.enAnswer || faker.random.words(),
    arAnswer: obj.arAnswer || faker.random.words(),
    type:
      obj.type || faker.random.arrayElement(getValuesFromEnum(UserRoleEnum)),
  };
};

export const faqsFactory = async (
  count = 10,
  obj: FaqType = {},
): Promise<Faq[]> => {
  const faqs: Faq[] = [];
  for (let i = 0; i < count; i++) {
    faqs.push(buildFaqParams(obj));
  }
  return (await FaqRepo()).addMany(faqs);
};

export const faqFactory = async (obj: FaqType = {}): Promise<Faq> => {
  const params: Faq = buildFaqParams(obj);
  return (await FaqRepo()).add(params);
};
