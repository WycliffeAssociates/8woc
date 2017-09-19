import { describe, it } from 'mocha';
import { expect } from 'chai';
import fs from 'fs-extra';
//helpers
import * as MergeConflictHelpers from '../src/js/helpers/MergeConflictHelpers';
import * as USFMHelpers from '../src/js/helpers/usfmHelpers';
//projects
const noMergeConflictsProjectPath = window.__base + 'test/fixtures/project/mergeConflicts/no_merge_conflicts_project';
const oneMergeConflictsProjectPath = window.__base + 'test/fixtures/project/mergeConflicts/one_merge_conflict_project';
const twoMergeConflictsProjectPath = window.__base + 'test/fixtures/project/mergeConflicts/two_merge_conflicts_project';
const manyMergeConflictsUSFMPath = window.__base + 'test/fixtures/project/mergeConflicts/many_merge_conflicts_usfm';
const noMergeConflictsUSFMPath = window.__base + 'test/fixtures/project/mergeConflicts/no_merge_conflicts_usfm';
const oneMergeConflictsUSFMPath = window.__base + 'test/fixtures/project/mergeConflicts/one_merge_conflict_usfm';
const twoMergeConflictsUSFMPath = window.__base + 'test/fixtures/project/mergeConflicts/two_merge_conflicts_usfm';
const unResolveableConflictProjectPath = window.__base + 'test/fixtures/project/mergeConflicts/unresolveable_conflict_project';

const oneMergeConflictArray =
    [
      {
        "chapter": "1",
        "verses": "8",
        "text": {
          "8": "This is random verse with a merge conflict"
        },
        "checked": true
      },
      {
        "chapter": "1",
        "verses": "8",
        "text": {
          "8": "This is a another random verse with a merge conlfict"
        },
        "checked": false
      }
    ]

describe('MergeConflictHelpers.projectHasMergeConflicts', () => {
  it('should not detect merge conflicts in a pre-imported tC project', function (done) {
    let projectHasMergeConflicts = MergeConflictHelpers.projectHasMergeConflicts(oneMergeConflictsProjectPath, 'php');
    expect(projectHasMergeConflicts).to.be.false;
    done();
  });
  it('should detect merge conflicts in a tC project that was imported without conflicts being resolved', function (done) {
    let projectHasMergeConflicts = MergeConflictHelpers.projectHasMergeConflicts(unResolveableConflictProjectPath, 'php');
    expect(projectHasMergeConflicts).to.be.true;
    done();
  });
});

describe('MergeConflictHelpers.createUSFMFromTsProject', () => {
  it('should create a valid usfm from a tS project', function (done) {
    let usfmData = MergeConflictHelpers.createUSFMFromTsProject(noMergeConflictsProjectPath);
    expect(usfmData).to.be.a.string;
    expect(usfmData.split('\\c').length).to.equal(4)
    expect(usfmData.split('\\p').length).to.equal(4)
    expect(usfmData.split('\\v').length).to.equal(47)
    done();
  });
  it('should detect a merge conlfict in a tS converted project', function (done) {
    let usfmFilePath = USFMHelpers.isUSFMProject(oneMergeConflictsUSFMPath);
    let usfmData = MergeConflictHelpers.createUSFMFromTsProject(oneMergeConflictsProjectPath, usfmFilePath);
    expect(usfmData).to.be.a.string;
    expect(usfmData.split('\\c').length).to.equal(5)
    expect(usfmData.split('\\p').length).to.equal(5)
    expect(usfmData.split('\\v').length).to.equal(105)
    let usfmHasMergeConflicts = MergeConflictHelpers.checkUSFMForMergeConflicts(usfmFilePath);
    expect(usfmHasMergeConflicts).to.be.true;
    done();
  });
});

describe('MergeConflictHelpers.checkUSFMForMergeConflicts', () => {
  it('should detect a merge conflict in a usfm file', function (done) {
    let usfmFilePath = USFMHelpers.isUSFMProject(oneMergeConflictsUSFMPath);
    let hasMergeConflicts = MergeConflictHelpers.checkUSFMForMergeConflicts(usfmFilePath);
    expect(hasMergeConflicts).to.be.true;
    done();
  });
  it('should detect no merge conflicts in a usfm file', function (done) {
    let usfmFilePath = USFMHelpers.isUSFMProject(noMergeConflictsUSFMPath);
    let hasMergeConflicts = MergeConflictHelpers.checkUSFMForMergeConflicts(usfmFilePath);
    expect(hasMergeConflicts).to.be.false;
    done();
  });
});

describe('MergeConflictHelpers.merge', () => {
  it('should successfully merge a seleceted merge conflict', function (done) {
    let inputFile =  oneMergeConflictsUSFMPath + '/php.usfm';
    let outputFile =  oneMergeConflictsUSFMPath + '/php-merged.usfm'
    let hasMergeConflicts = MergeConflictHelpers.checkUSFMForMergeConflicts(inputFile);
    expect(hasMergeConflicts).to.be.true;
    MergeConflictHelpers.merge(oneMergeConflictArray, inputFile, outputFile);
    hasMergeConflicts = MergeConflictHelpers.checkUSFMForMergeConflicts(outputFile);
    expect(hasMergeConflicts).to.be.false;
    fs.removeSync(outputFile);
    done();
  })
  it('should successfully merge two seleceted merge conflicts', function (done) {
    let inputFile =  twoMergeConflictsUSFMPath + '/tit.usfm';
    let outputFile =  twoMergeConflictsUSFMPath + '/tit-merged.usfm'
    let hasMergeConflicts = MergeConflictHelpers.checkUSFMForMergeConflicts(inputFile);
    expect(hasMergeConflicts).to.be.true;
    MergeConflictHelpers.merge(oneMergeConflictArray, inputFile, outputFile);
    hasMergeConflicts = MergeConflictHelpers.checkUSFMForMergeConflicts(outputFile);
    expect(hasMergeConflicts).to.be.false;
    fs.removeSync(outputFile);
    done();
  })
})

describe('MergeConflictHelpers.getMergeConflicts', () => {
  it('should successfully find a merge conflict', function (done) {
    let usfmFilePath = USFMHelpers.isUSFMProject(oneMergeConflictsUSFMPath);
    let usfmData = MergeConflictHelpers.loadUSFM(usfmFilePath);
    let foundMergeConflicts = MergeConflictHelpers.getMergeConflicts(usfmData);
    expect(foundMergeConflicts.length).to.equal(2);
    done();
  })
  it('should successfully find two merge conflicts', function (done) {
    let usfmFilePath = USFMHelpers.isUSFMProject(twoMergeConflictsUSFMPath);
    let usfmData = MergeConflictHelpers.loadUSFM(usfmFilePath);
    let foundMergeConflicts = MergeConflictHelpers.getMergeConflicts(usfmData);
    expect(foundMergeConflicts.length).to.equal(4);
    done();
  })
  it('should successfully find many merge conflicts', function (done) {
    let usfmFilePath = USFMHelpers.isUSFMProject(manyMergeConflictsUSFMPath);
    let usfmData = MergeConflictHelpers.loadUSFM(usfmFilePath);
    let foundMergeConflicts = MergeConflictHelpers.getMergeConflicts(usfmData);
    expect(foundMergeConflicts.length).to.equal(10);
    done();
  })
})