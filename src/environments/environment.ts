// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,

  // SUPABASE
  supabaseUrl: 'https://tfnycwsbhhsgwmfwwusx.supabase.co',
  supabaseKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRmbnljd3NiaGhzZ3dtZnd3dXN4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTU3ODU2MjcsImV4cCI6MjAxMTM2MTYyN30.y0oZquDBHVh0etdYwgO6jLa-cV3hbqHLHG3IpCkYBko',
  updatePasswordURL: 'http://localhost:8100/update-password',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
