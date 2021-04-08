import { AuthenticationService } from '@app/services/authentication.service';

export function appInitializer(authenticationService: AuthenticationService) {
  //console.log("handled by init");
    return () => new Promise(resolve => {
        // attempt to refresh token on app start up to auto authenticate
        authenticationService.refreshToken()
            .subscribe()
            .add(resolve);
    });
}
