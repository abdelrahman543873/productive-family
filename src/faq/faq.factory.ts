import * as faker from 'faker';
import { UserRoleEnum } from 'src/shared/user.enum';
import { getValuesFromEnum } from 'src/shared/utils/column-enum';
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
  const faqs = [];
  for (let i = 0; i < count; i++) {
    faqs.push(buildFaqParams(obj));
  }
  return (await FaqRepo()).addMany(faqs);
};

export const FaqFactory = async (obj = <any>{}): Promise<Faq> => {
  const params: any = buildFaqParams(obj);
  return (await FaqRepo()).add(params);
};
