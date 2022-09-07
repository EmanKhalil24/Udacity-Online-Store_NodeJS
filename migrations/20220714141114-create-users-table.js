'use strict';

var dbm;
var type;
var seed;
import { readFile } from 'fs';
import { join } from 'path';
var Promise;

export function setup(options, seedLink) {
   dbm = options.dbmigrate;
   // eslint-disable-next-line @typescript-eslint/no-unused-vars
   type = dbm.dataType;
   // eslint-disable-next-line @typescript-eslint/no-unused-vars
   seed = seedLink;
   Promise = options.Promise;
}

export function up(db) {
   var filePath = join(
      __dirname,
      'sqls',
      '20220714141114-create-users-table-up.sql'
   );
   return new Promise(function (resolve, reject) {
      readFile(filePath, { encoding: 'utf-8' }, function (err, data) {
         if (err) return reject(err);
         console.log('received data: ' + data);

         resolve(data);
      });
   }).then(function (data) {
      return db.runSql(data);
   });
}

export function down(db) {
   var filePath = join(
      __dirname,
      'sqls',
      '20220714141114-create-users-table-down.sql'
   );
   return new Promise(function (resolve, reject) {
      readFile(filePath, { encoding: 'utf-8' }, function (err, data) {
         if (err) return reject(err);
         console.log('received data: ' + data);

         resolve(data);
      });
   }).then(function (data) {
      return db.runSql(data);
   });
}

export const _meta = {
   version: 1
};
