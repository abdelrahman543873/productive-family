import * as faker from 'faker';
import { UserRoleEnum } from 'src/_common/user.enum';
import { getValuesFromEnum } from 'src/_common/utils/column-enum';
import { FaqRepo } from 'test/faq/faq-test-repo';
import { Faq } from './models/faq.schema';

export const buildFaqParams = (obj = <any>{}): Faq => {
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
  obj = <any>{},
): Promise<Faq[]> => {
  const faqs: Faq[] = [];
  for (let i = 0; i < count; i++) {
    faqs.push(buildFaqParams(obj));
  }
  return (await FaqRepo()).addMany(faqs);
};

export const FaqFactory = async (obj = <any>{}): Promise<Faq> => {
  const params: Faq = buildFaqParams(obj);
  return (await FaqRepo()).add(params);
};
