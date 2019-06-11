// in app.js
import React from "react";
import {
  Admin,
  Resource,
  List,
  TextField,
  Datagrid,
  fetchUtils,
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
} from "react-admin";
import simpleRestProvider from "ra-data-simple-rest";
import RichTextInput from "ra-input-rich-text";

const dataProvider = simpleRestProvider("http://localhost:5000");

const App = () => (
  <Admin dataProvider={dataProvider}>
    <Resource
      name="posts"
      show={PostShow}
      list={PostList}
      create={PostCreate}
      edit={EditGuesser}
    />
  </Admin>
);

const PostList = props => (
  <List {...props} actions={<CreateButton />}>
    <Datagrid>
      <TextField source="id" />
      <TextField source="title" />
      <RichTextField source="text" />
      <DateField source="createdAt" />
      <ShowButton />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);

const PostShow = props => (
  <Show {...props}>
    <SimpleShowLayout>
      <TextField source="title" />
      <RichTextField source="text" />
      <DateField source="createdAt" />
    </SimpleShowLayout>
  </Show>
);

const PostCreate = props => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="title" />
      <RichTextInput source="text" options={{ multiLine: true }} />
      <DateInput
        label="Publication date"
        source="createdAt"
        defaultValue={new Date()}
      />
    </SimpleForm>
  </Create>
);

const PostEdit = props => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput source={"title"} />
    </SimpleForm>
  </Edit>
);
export default App;
