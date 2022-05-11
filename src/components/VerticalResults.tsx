import { CardComponent } from '../models/cardComponent';
import { useAnswersState } from '@yext/answers-headless-react';
import { CompositionMethod } from '../hooks/useComposedCssClasses';
import { VerticalResultsDisplay } from './VerticalResultsDisplay';
import { Pagination, PaginationCssClasses } from './Pagination';

/**
 * The CSS class interface used for {@link VerticalResults}.
 *
 * @public
 */
export interface VerticalResultsCssClasses extends PaginationCssClasses {
  results?: string,
  results___loading?: string
}

/**
 * Props for the VerticalResults component.
 *
 * @public
 */
export interface VerticalResultsProps {
  /** {@inheritDoc CardComponent} */
  CardComponent: CardComponent,
  /**
   * Whether or not all results should be displayed when there are none returned from the search.
   * Defaults to true.
   */
  displayAllOnNoResults?: boolean,
  /** CSS classes for customizing the component styling. */
  customCssClasses?: VerticalResultsCssClasses,
  /** {@inheritDoc CompositionMethod} */
  cssCompositionMethod?: CompositionMethod,
  /** Whether to include pagination of the results. Defaults to true. */
  allowPagination?: boolean
}

/**
 * A component that renders search results for a vertical page.
 *
 * @public
 *
 * @param props - {@link VerticalResultsProps}
 * @returns A React element for the results, or null if no results should be displayed
 */
export function VerticalResults(props: VerticalResultsProps): JSX.Element | null {
  const { displayAllOnNoResults = true, allowPagination = true, ...otherProps } = props;
  const verticalResults = useAnswersState(state => state.vertical.results) || [];
  const allResultsForVertical =
    useAnswersState(state => state.vertical?.noResults?.allResultsForVertical.results) || [];
  const isLoading = useAnswersState(state => state.searchStatus.isLoading);

  let results = verticalResults;
  if (verticalResults.length === 0 && displayAllOnNoResults) {
    results = allResultsForVertical;
  }

  return (
    <>
      <VerticalResultsDisplay results={results} isLoading={isLoading} {...otherProps} />
      {allowPagination
        && <Pagination
          paginateAllOnNoResults={displayAllOnNoResults}
          customCssClasses={otherProps.customCssClasses}
          cssCompositionMethod={otherProps.cssCompositionMethod}
        />
      }
    </>
  );
}
