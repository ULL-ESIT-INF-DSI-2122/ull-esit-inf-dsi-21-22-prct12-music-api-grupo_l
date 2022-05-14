import 'mocha';
import { expect } from 'chai';
import { sayHello } from '../src/index'

describe('prueba',() => {
  it ('prueba',() => {
      expect(sayHello()).to.be.eql("Hello World")
  });
});