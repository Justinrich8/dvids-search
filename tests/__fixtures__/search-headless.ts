import {
  SearchHeadless,
  provideHeadless,
  SearchTypeEnum,
  State
} from '@yext/search-headless-react';
import { RecursivePartial } from '../__utils__/mocks';
import merge from 'lodash/merge';

export function generateMockedHeadless(state?: RecursivePartial<State>): SearchHeadless {
  const emptyState: State = {
    query: {},
    universal: {},
    vertical: {},
    directAnswer: {},
    queryRules: {
      actions: []
    },
    filters: {},
    searchStatus: {},
    spellCheck: {
      enabled: true
    },
    sessionTracking: {},
    meta: {
      searchType: SearchTypeEnum.Universal
    },
    location: {},
  };
  const mergedState = merge(emptyState, state);

  /**
   * a mocked SearchCore class will be use in provideHeadless:
   * - Storybook: through resolve.alias in storybook's webpack config
   * - Jest: through moduleNameMapper configuration
   */
  const headless = provideHeadless({
    apiKey: '3f823ea1c87c6154d6c069c8f77c4b51',
    experienceKey: 'dvids-search',
    locale: 'en'
  });
  headless.setState(mergedState);
  return headless;
}