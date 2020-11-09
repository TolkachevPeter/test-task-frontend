import objectMapValues from "../util";

const BRAND = 'jl';

interface SelectorMap {
  [key: string]: (state: any) => any,
}

export function createType(group: string, typeName: string) {
  return `${BRAND}/${group}/${typeName}`;
}

export function mapSelectorsToProps(selectorsByProp: SelectorMap) {
  return (state) => objectMapValues(selectorsByProp, selector => selector(state));
}

export function getReducers(ducks) {
  return Object.keys(ducks)
    .map(duckName => {
      const { reducer, PREFIX } = ducks[duckName];
      return [reducer, PREFIX];
    })
    .filter(([reducer, PREFIX]) => {
      if (reducer && !PREFIX) {
        throw new Error('duck with reducer requires a PREFIX');
      }
      return reducer;
    })
    .reduce((acc, [reducer, PREFIX]) => {
      acc[PREFIX] = reducer;
      return acc;
    }, {});
}

export function getSagas(ducks) {
  return Object.values(ducks)
    .map((duck: any) => duck.rootSaga)
    .filter(Boolean);
}
