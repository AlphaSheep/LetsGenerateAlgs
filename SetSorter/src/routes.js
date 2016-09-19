import {Injectable} from '@angular/core';
import {Hello} from './app/hello.js';

const INITIAL_STATES = [
  {name: 'App', url: '/', component: Hello}
];

@Injectable()
export class MyUIRouterConfig {
  configure(uiRouter) {
    uiRouter.urlRouterProvider.otherwise(() => uiRouter.stateService.go('App', null, null));
    uiRouter.stateRegistry.root();
    INITIAL_STATES.forEach(state => uiRouter.stateRegistry.register(state));
  }
}
