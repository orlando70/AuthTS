// import sinon from 'sinon';
import _ from 'lodash';
import { AppDataSource } from '../src/config/data-source';
import initialize from '../src/initialize';


// stubs
// sinon.stub(_, 'random').returns(12345);
// nock.disableNetConnect();

export const mochaHooks = {
  async beforeAll(): Promise<void> {
    await initialize();
  },

  async afterAll(): Promise<void> {
    await AppDataSource.destroy();
  },
};
