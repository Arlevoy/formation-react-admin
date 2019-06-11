import { postGetAllAction } from "./controller/PostGetAllAction";
import { postGetByIdAction } from "./controller/PostGetByIdAction";
import { postSaveAction, postDeleteAction } from "./controller/PostSaveAction";
import { userSaveAction } from "./controller/UserSaveAction";
import { login } from "./controller/LoginAction";

/**
 * All application routes.
 */
export const AppRoutes = [
  {
    path: "/posts",
    method: "get",
    action: postGetAllAction,
  },
  {
    path: "/posts/:id",
    method: "get",
    action: postGetByIdAction,
  },
  {
    path: "/posts",
    method: "post",
    action: postSaveAction,
  },
  {
    path: "/users",
    method: "post",
    action: userSaveAction,
  },
  {
    path: "/posts/:id",
    method: "put",
    action: postSaveAction,
  },
  {
    path: "/posts/:id",
    method: "delete",
    action: postDeleteAction,
  },
];
