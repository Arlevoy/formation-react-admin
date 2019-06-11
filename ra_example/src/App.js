// in app.js
import React from "react";
//import { dataProvider } from "./dataProvider";

import { authProvider } from "./authProvider";
import {
  Admin,
  Resource,
  List,
  TextField,
  Datagrid,
  Edit,
  Show,
  SimpleShowLayout,
  DateField,
  EditButton,
  RichTextField,
  Create,
  SimpleForm,
  TextInput,
  DateInput,
  ShowButton,
  CreateButton,
  DeleteButton,
  EditGuesser,
  Filter,
  SearchInput,
  ImageField,
  fetchUtils,
} from "react-admin";
import simpleRestProvider from "ra-data-simple-rest";
import RichTextInput from "ra-input-rich-text";

const httpClient = (url, options = {}) => {
  console.log("options", options);
  if (!options.headers) {
    options.headers = new Headers({ Accept: "application/json" });
  }
  const token = localStorage.getItem("authToken");
  console.log("token", token);
  options.headers.set("Authorization", `Bearer ${token}`);
  return fetchUtils.fetchJson(url, options);
};

const isAdmin = permissions => permissions === "ADMIN";
const dataProvider = simpleRestProvider("http://localhost:5000", httpClient);

const App = () => (
  <div>
    <Admin authProvider={authProvider} dataProvider={dataProvider}>
      {permissions => {
        console.log(permissions);
        return [
          <Resource
            name="posts"
            show={PostShow}
            list={PostList}
            create={PostCreate}
            edit={isAdmin(permissions) ? EditGuesser : null}
          />,
        ];
      }}
    </Admin>
  </div>
);

const PostList = ({ permissions, ...props }) => {
  console.log("permissions", permissions);
  return (
    <List {...props} actions={<CreateButton />}>
      <Datagrid>
        <TextField source="id" />
        <TextField source="title" />
        <TextField source="text" />
        <DateField source="createdAt" />
        <ShowButton />
        {permissions && isAdmin(permissions) && <EditButton />}
        <DeleteButton />
      </Datagrid>
    </List>
  );
};

const ShowPostWithPicture = props => {
  console.log("props", props);
  return (
    <div>
      <SimpleShowLayout {...props}>
        <TextField source="title" />
        <TextField source="text" />
        <DateField source="createdAt" />
        <ImageField source="picture" />
      </SimpleShowLayout>
    </div>
  );
};

const PostShow = props => {
  return (
    <Show {...props}>
      <ShowPostWithPicture />
    </Show>
  );
};

const PostCreate = props => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="title" />
      <TextInput source="text" options={{ multiLine: true }} />
      <DateInput
        label="Publication date"
        source="createdAt"
        defaultValue={new Date()}
      />
    </SimpleForm>
  </Create>
);

// const UserFilter = props => (
//   <Filter {...props}>
//     <SearchInput source="title" alwaysOn />
//   </Filter>
// );

const PostEdit = props => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput source={"title"} />
    </SimpleForm>
  </Edit>
);
export default App;
