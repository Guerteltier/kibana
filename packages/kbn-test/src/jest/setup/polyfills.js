/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

// bluebird < v3.3.5 does not work with MutationObserver polyfill
// when MutationObserver exists, bluebird avoids using node's builtin async schedulers
const bluebird = require('bluebird');
bluebird.Promise.setScheduler(function (fn) {
  global.setImmediate.call(global, fn);
});

const MutationObserver = require('mutation-observer');
Object.defineProperty(window, 'MutationObserver', { value: MutationObserver });

require('whatwg-fetch');

if (!global.URL.hasOwnProperty('createObjectURL')) {
  Object.defineProperty(global.URL, 'createObjectURL', { value: () => '' });
}

// Will be replaced with a better solution in EUI
// https://github.com/elastic/eui/issues/3713
global._isJest = true;
