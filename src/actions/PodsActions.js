/*
  Copyright 2015 Skippbox, Ltd

  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
*/
import alt from 'src/alt';
import ClustersApi from 'api/ClustersApi';

class PodsActions {

  constructor() {
    this.generateActions(
      'fetchPodsStart',
      'fetchPodsSuccess',
      'fetchPodsFailure',
      'deletePodStart',
      'deletePodSuccess',
      'deletePodFailure',
    );
  }

  fetchPods(cluster) {
    this.fetchPodsStart(cluster);
    return ClustersApi.fetchPods(cluster).then(pods => {
      this.fetchPodsSuccess({cluster, pods});
    })
    .catch(() => {
      this.fetchPodsFailure(cluster);
    });
  }

  deletePod({cluster, pod}) {
    this.deletePodStart({cluster, pod});
    return ClustersApi.deletePod({cluster, pod}).then(() => {
      this.deletePodSuccess({cluster, pod});
    }).catch(() => {
      this.deletePodFailure({cluster, pod});
    });
  }
}

export default alt.createActions(PodsActions);
