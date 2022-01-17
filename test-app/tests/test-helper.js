import Application from 'test-app/app';
import config from 'test-app/config/environment';
import * as QUnit from 'qunit';
import { setApplication } from '@ember/test-helpers';
import { setup } from 'qunit-dom';
import { start } from 'ember-qunit';

import installVerifyAssertion from 'testdouble-qunit';
import td from 'testdouble';
installVerifyAssertion(QUnit, td);

setApplication(Application.create(config.APP));

setup(QUnit.assert);

start();
