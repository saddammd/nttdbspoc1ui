// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
 /* usersbaseUrl: 'http://3.109.194.186.nip.io/poc/',
  productsbaseUrl: 'http://3.109.194.186.nip.io/poc/products',
  registerbaseUrl: 'http://3.109.194.186.nip.io/poc/register',
  retailersbaseUrl: 'http://3.109.194.186.nip.io/poc/retailers/',
  rolesbaseUrl: 'http://3.109.194.186.nip.io/poc/userRoles/',
  loginbaseUrl: 'http://3.109.194.186.nip.io/poc/login',
  */

 usersbaseUrl: 'http://localhost:5000/poc/',
  productsbaseUrl: 'http://localhost:5000/poc/products',
  registerbaseUrl: 'http://localhost:5000/poc/register',
  retailersbaseUrl: 'http://localhost:5000/poc/retailers/',
  rolesbaseUrl: 'http://localhost:5000/poc/userRoles/',
  loginbaseUrl: 'http://localhost:5000/poc/login',

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
