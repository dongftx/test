// @ts-nocheck

/* eslint-disable  */
const sss1 = [{
  value: '[12,34]',
  time: 1543593600
}, {
  value: '[10,11]',
  time: 1541001600
}, {
  value: '[12,34]',
  time: 1543593600
}, {
  value: '[50,11]',
  time: 1541001600
}, {
  value: '[42,34]',
  time: 1543593600
}, {
  value: '[30,11]',
  time: 1541001600
}, {
  value: '[20,11]',
  time: 1541001600
}];
const sss2 = [[{
  value: '[12,34]',
  time: 1543593600
}, {
  value: '[12,34]',
  time: 1599543236
}, {
  value: '[50,11]',
  time: 1699543258
}, {
  value: '[42,34]',
  time: 1799543280
}, {
  value: '[30,11]',
  time: 1899543332
}, {
  value: '[20,11]',
  time: 1999543401
}, {
  value: '[10,11]',
  time: 2099543413
}], [{
  value: '[9,24]',
  time: 1543593600
}, {
  value: '[8,13]',
  time: 1599543236
}, {
  value: '[112,34]',
  time: 1699543258
}, {
  value: '[88,11]',
  time: 1799543280
}, {
  value: '[142,34]',
  time: 1899543332
}, {
  value: '[130,11]',
  time: 1999543401
}, {
  value: '[10,11]',
  time: 2099543413
}], [{
  value: '[17, 12]',
  time: 1599543236
}, {
  value: '[150,23]',
  time: 1699543258
}, {
  value: '[158,34]',
  time: 1799543280
}, {
  value: '[58,11]',
  time: 1899543332
}, {
  value: '[32,34]',
  time: 1999543401
}, {
  value: '[20,11]',
  time: 2099543413
}, {
  value: '[10,11]',
  time: 2199543423
}]];
let num = 0;

const fakeRequest = c => new Promise(resolve => {
  setTimeout(() => {
    resolve(sss2[num % 3]);
    num += 1;
  }, 500);
});

export { sss1, sss2, fakeRequest };