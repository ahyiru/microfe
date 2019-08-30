import React from 'react';
import { mount,shallow,render } from 'enzyme';
import renderer from 'react-test-renderer';

/*import Autocomplete from '../';

it('[Autocomplete]组件测试',()=>{
  const props={
    data:[],
    value:null,
    getSelectVal:(v)=>{console.log(v);},
  };
  const tree = renderer.create(
    <Autocomplete {...props} />
  ).toJSON();
  expect(tree).toMatchSnapshot();
  tree.props.getSelectVal;
  expect(tree).toMatchSnapshot();
});*/

const sum=require('./sum');

import tsSum from './tsSum';

describe('sum',()=>{
  it('adds 1 + 2 to equal 3',()=>{
    expect(sum(1,2)).toBe(3);
  });
});

describe('ts-sum',()=>{
  it('adds 1 + 2 to equal 3',()=>{
    expect(tsSum(1,2)).toBe(3);
  });
});
















