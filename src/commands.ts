import {
  Selection,
  TextDocument,
  TextEditor,
  TextEditorEdit,
  TextEditorRevealType,
  Position,
} from 'vscode'
import {
  nextBoundaryLeft as left,
  nextBoundaryRight as right,
} from './boundaries'

export function cursorWordLeft(editor: TextEditor) {
  cursorSubword(editor, left, move, false)
}

export function cursorWordRight(editor: TextEditor) {
  cursorSubword(editor, right, move, false)
}

export function cursorWordLeftSelect(editor: TextEditor) {
  cursorSubword(editor, left, select, false)
}

export function cursorWordRightSelect(editor: TextEditor) {
  cursorSubword(editor, right, select, false)
}

export function deleteWordLeft(editor: TextEditor) {
  deleteSubword(editor, left, false)
}

export function deleteWordRight(editor: TextEditor) {
  deleteSubword(editor, right, false)
}

export function cursorSubwordLeft(editor: TextEditor) {
  cursorSubword(editor, left, move, true)
}

export function cursorSubwordRight(editor: TextEditor) {
  cursorSubword(editor, right, move, true)
}

export function cursorSubwordLeftSelect(editor: TextEditor) {
  cursorSubword(editor, left, select, true)
}

export function cursorSubwordRightSelect(editor: TextEditor) {
  cursorSubword(editor, right, select, true)
}

export function deleteSubwordLeft(editor: TextEditor) {
  deleteSubword(editor, left, true)
}

export function deleteSubwordRight(editor: TextEditor) {
  deleteSubword(editor, right, true)
}

function cursorSubword(
  editor: TextEditor,
  next: BoundaryFunc,
  sel: SelectionFunc,
  checkSubword: boolean
) {
  editor.selections = editor.selections.map((s) =>
    sel(s, next(editor.document, s.active, checkSubword))
  )
  reveal(editor)
}

function deleteSubword(
  editor: TextEditor,
  next: BoundaryFunc,
  checkSubword: boolean = true
) {
  editor
    .edit((e) =>
      editor.selections.forEach((s) =>
        e.delete(
          s.isEmpty ? s.with(next(editor.document, s.active, checkSubword)) : s
        )
      )
    )
    .then(() => reveal(editor))
}

function reveal(editor: TextEditor) {
  if (editor.selections.length === 1) {
    editor.revealRange(
      editor.selection,
      TextEditorRevealType.InCenterIfOutsideViewport
    )
  }
}

function move(selection: Selection, boundary: Position) {
  return new Selection(boundary, boundary)
}

function select(selection: Selection, boundary: Position) {
  return new Selection(selection.anchor, boundary)
}

type BoundaryFunc = (
  doc: TextDocument,
  pos: Position,
  checkSubword: boolean
) => Position
type SelectionFunc = (selection: Selection, boundary: Position) => Selection
