const jwtAuthz = require("express-jwt-authz");

export const checkPermissions = (permissions) => {
    return jwtAuthz([...permissions], {
        customScopeKey: "permissions",
        checkAllScopes: true,
        failWithError: true
    });
};

export default checkPermissions;