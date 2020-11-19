// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
   apiUrl: 'https://timesheet.api.spsistemi.net/www/timesheetApi/spstimesheet/',
  //apiUrl: 'http://localhost:8080/',
  openRouteServiceDirectionEndpoint: 'https://api.openrouteservice.org/v2/directions/driving-car?',
  openRouteServiceGeoEndpoint: 'https://api.openrouteservice.org/geocode/search?',
  openRouteServiceKey: '5b3ce3597851110001cf6248299e335f9c49402b9e470a50a82662ba',
}

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
