import { I18nContext, Peripleo as PeripleoUtils } from '@performant-software/core-data';
import { Peripleo, RuntimeConfig } from '@peripleo/peripleo';
import SearchPanel from './SearchPanel';
import TypesenseSearch from './TypesenseSearch';
import MapView from './MapView';

const Search = () => {
  // this is not elegant but seems to be necessary for now
  const translations = {
    t_selectMapLayers: () => 'Select Map Layers',
    t_baseLayers: () => 'Base Layers',
    t_overlays: () => 'Overlays'
  };

  return (
    <RuntimeConfig
      //@ts-ignore
      path='/public/config.json'
      preprocess={PeripleoUtils.normalize}
    >
      <I18nContext.Provider
        value={{ translations: translations }}
      >
        <Peripleo>
          <TypesenseSearch>
            <SearchPanel />
            <MapView />
          </TypesenseSearch>
        </Peripleo>
      </I18nContext.Provider>
    </RuntimeConfig>
  );
};

export default Search;
