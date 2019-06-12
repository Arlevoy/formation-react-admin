import { UPDATE } from '../../dataFetchActions';
export var crudUpdate = function (resource, id, data, previousData, basePath, redirectTo) {
    if (redirectTo === void 0) { redirectTo = 'show'; }
    return ({
        type: CRUD_UPDATE,
        payload: { id: id, data: data, previousData: previousData },
        meta: {
            resource: resource,
            fetch: UPDATE,
            onSuccess: {
                notification: {
                    body: 'ra.notification.updated',
                    level: 'info',
                    messageArgs: {
                        smart_count: 1,
                    },
                },
                redirectTo: redirectTo,
                basePath: basePath,
            },
            onFailure: {
                notification: {
                    body: 'ra.notification.http_error',
                    level: 'warning',
                },
            },
        },
    });
};
export var CRUD_UPDATE = 'RA/CRUD_UPDATE';
export var CRUD_UPDATE_LOADING = 'RA/CRUD_UPDATE_LOADING';
export var CRUD_UPDATE_FAILURE = 'RA/CRUD_UPDATE_FAILURE';
export var CRUD_UPDATE_SUCCESS = 'RA/CRUD_UPDATE_SUCCESS';
