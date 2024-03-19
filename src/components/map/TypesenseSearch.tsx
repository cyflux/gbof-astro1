import {
  PersistentSearchStateContextProvider,
  Typesense as TypesenseUtils
} from '@performant-software/core-data';
import { useRuntimeConfig } from '@peripleo/peripleo';
import { type ReactNode, useMemo } from 'react';
import {
  InstantSearch,
  useGeoSearch,
  useInfiniteHits,
  useSearchBox
} from 'react-instantsearch';

const SearchProvider = (props: { children: ReactNode }) => {
  const geoSearch = useGeoSearch();
  const infiniteHits = useInfiniteHits();
  const searchBox = useSearchBox();

  return (
    <PersistentSearchStateContextProvider
      infiniteHits={infiniteHits}
      geoSearch={geoSearch}
      searchBox={searchBox}
    >
      { props.children }
    </PersistentSearchStateContextProvider>
  )
};

const TypesenseSearch = (props: { children: ReactNode }) => {
  const config = useRuntimeConfig<any>();

  const adapter = useMemo(() => TypesenseUtils.createTypesenseAdapter(config), []);
  const routing = useMemo(() => TypesenseUtils.createRouting(config), []);

  return (
    <InstantSearch
      indexName={config.typesense.index_name}
      routing={routing}
      searchClient={adapter.searchClient}
      future={{
        preserveSharedStateOnUnmount: true
      }}
    >
      <SearchProvider>
        { props.children }
      </SearchProvider>
    </InstantSearch>
  )
};

export default TypesenseSearch;
