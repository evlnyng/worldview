import {
  assign as lodashAssign
} from 'lodash';

export function getVectorStyleAttributeArray(layer) {
  var isCustomActive = false;
  var isMinActive = false;
  var isMaxActive = false;
  if (layer.custom) { isCustomActive = true; }
  if (layer.min) { isMinActive = true; }
  if (layer.max) { isMaxActive = true; }
  const styleObj = lodashAssign({}, { key: 'custom', value: layer.custom, isActive: isCustomActive });
  const minObj = lodashAssign({}, { key: 'min', value: layer.min, isActive: isMinActive });
  const maxObj = lodashAssign({}, { key: 'max', value: layer.max, isActive: isMaxActive });
  const attrArray = [];

  [styleObj, minObj, maxObj].forEach(obj => {
    if (obj.isActive) {
      attrArray.push({
        id: obj.key === 'custom' ? 'style' : obj.key,
        value: obj.value
      });
    } else {
      if (obj.isActive) {
        attrArray.push({
          id: obj.key === 'custom' ? 'style' : obj.key,
          value: ''
        });
      }
    }
  });
  return attrArray;
}

export function getMinValue(v) {
  return v.length ? v[0] : v;
}

export function getMaxValue(v) {
  return v.length ? v[v.length - 1] : v;
}
export function isConditional(item) {
  return Array.isArray(item) && item[0] === 'case';
}
