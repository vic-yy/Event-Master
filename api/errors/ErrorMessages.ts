export const ErrorMessages = {
    InvalidParamError: {
      missingParam: (param: string) => `The "${param}" is missing or invalid.`,
      invalidFormat: (param: string) => `The "${param}" has an invalid format.`,
    },
    InvalidRouteError: {
      invalidRoute: 'The requested route is invalid.'
    },
    LoginError: {
      loginFailed: 'Login attempt failed. Please check your credentials.',
      accountLocked: 'The account is locked due to too many failed login attempts.'
    },
    NotAuthorizedError: {
      notAuthorized: 'You are not authorized to perform this action.'
    },
    PermissionError: {
      permissionDenied: 'You do not have the necessary permissions.'
    },
    QueryError: {
      userNotFound: 'User not found.',
      queryFailed: 'There was an error while executing the query.'
    },
    TokenError: {
      invalidToken: 'The token provided is invalid.',
      expiredToken: 'The token has expired.'
    },
    PasswordError: {
      routeNotAllowed: 'Password update is not allowed through this route.'
    }
  };
  