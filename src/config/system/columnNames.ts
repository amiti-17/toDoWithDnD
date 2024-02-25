export type NamesType = {
  [index: string]: string,
}

export type ColumnNamesType = {
  toDo: 'To do',
  inProgress: 'In progress',
  done: 'Done',
}

export const columnNames: ColumnNamesType = {
  toDo: 'To do',
  inProgress: 'In progress',
  done: 'Done',
}

export const firstAndLastColumnNames: NamesType = {
  first: 'toDo',
  last: 'done',
}