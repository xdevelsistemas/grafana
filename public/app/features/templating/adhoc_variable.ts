///<reference path="../../headers/common.d.ts" />

import _ from 'lodash';
import kbn from 'app/core/utils/kbn';
import {Variable, assignModelProperties, variableTypes} from './variable';
import {VariableSrv} from './variable_srv';

export class AdhocVariable implements Variable {
  filters: any[];

  defaults = {
    type: 'adhoc',
    name: '',
    label: '',
    hide: 0,
    datasource: null,
    filters: [],
  };

  /** @ngInject **/
  constructor(private model) {
    assignModelProperties(this, model, this.defaults);
  }

  setValue(option) {
    return Promise.resolve();
  }

  getModel() {
    assignModelProperties(this.model, this, this.defaults);
    return this.model;
  }

  updateOptions() {
    return Promise.resolve();
  }

  dependsOn(variable) {
    return false;
  }

  setValueFromUrl(urlValue) {
    if (!_.isArray(urlValue)) {
      urlValue = [urlValue];
    }

    this.filters = urlValue.map(item => {
      var values = item.split('|');
      return {
        key: values[0],
        operator: values[1],
        value: values[2],
      };
    });

    return Promise.resolve();
  }

  getValueForUrl() {
    return this.filters.map(filter => {
      return filter.key + '|' + filter.operator + '|' + filter.value;
    });
  }

  setFilters(filters: any[]) {
    this.filters = filters;
  }
}

variableTypes['adhoc'] = {
  name: 'Ad hoc filters',
  ctor: AdhocVariable,
  description: 'Add key/value filters on the fly',
};
