export type RootStackParamList = {
  'Todo List': undefined;
  'Todo Info': { noteId: string };
  'History': undefined;
  'Map': undefined;
};

export type RootTabParamList = {
  Tasks: undefined;
  History: undefined;
  Map: undefined;
};

export interface Attachment {
  id: string;
  uri: string;
  name: string;
  mimeType: string;
  size?: number;
}