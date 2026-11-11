import { test } from 'node:test';
import assert from 'node:assert/strict';
import { yearsOfExperience } from '../src/data/profile.ts';
test('uses configured experience when career date is unknown or invalid',()=>{
 assert.equal(yearsOfExperience(null,7),7);
 assert.equal(yearsOfExperience('invalid',7),7);
});
test('counts completed career years around the anniversary',()=>{
 assert.equal(yearsOfExperience('2019-11-12',7,new Date('2026-11-11T12:00:00')),6);
 assert.equal(yearsOfExperience('2019-11-12',7,new Date('2026-11-12T12:00:00')),7);
 assert.equal(yearsOfExperience('2030-01-01',7,new Date('2026-11-11T12:00:00')),0);
});
