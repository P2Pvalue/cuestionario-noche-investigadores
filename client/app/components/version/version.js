'use strict';

angular.module('nocheInv.version', [
  'nocheInv.version.interpolate-filter',
  'nocheInv.version.version-directive'
])

.value('version', '0.1');
