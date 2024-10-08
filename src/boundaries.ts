import { Position, TextDocument } from 'vscode'

const whitespace = /\s/
const separators =
  /[\`\~\!\@\#\$\%\^\&\*\(\)\-\=\+\[\{\]\}\\\|\;\:\'\"\,\.\<\>\/\?\uFF08\uFF09\uFF0C\uFF1A\uFF1B\uFF01\uFF1F\uFF02\u3002\u3001\u201c\u201d\u2018\u2019\u300a\u300b\s]/

export function nextBoundaryLeft(
  document: TextDocument,
  position: Position,
  checkSubword: boolean
) {
  // find previous word boundary
  const cur = document.lineAt(position)
  if (position.isAfter(cur.range.start)) {
    for (
      let i = position.translate(0, -1);
      i.isAfterOrEqual(cur.range.start);
      i = i.translate(0, -1)
    ) {
      if (i.isEqual(cur.range.start)) return i
      if (isBoundary(cur.text, i, checkSubword)) return i
    }
  }

  // found no boundary before line start
  if (position.line === 0) return position
  const prev = document.lineAt(position.line - 1)
  for (
    let i = prev.range.end;
    i.isAfter(prev.range.start);
    i = i.translate(0, -1)
  ) {
    if (!whitespace.test(prev.text[i.character - 1])) return i
  }
  return prev.range.start
}

export function nextBoundaryRight(
  document: TextDocument,
  position: Position,
  checkSubword: boolean
) {
  // find next word boundary
  const cur = document.lineAt(position)
  for (
    let i = position.translate(0, 1);
    i.isBeforeOrEqual(cur.range.end);
    i = i.translate(0, 1)
  ) {
    if (i.isEqual(cur.range.end)) return i
    if (isBoundary(cur.text, i, checkSubword)) return i
  }

  // found no boundary before line end
  if (position.line + 1 >= document.lineCount) return cur.range.end
  const next = document.lineAt(position.line + 1)
  return next.range.start.translate(0, next.firstNonWhitespaceCharacterIndex)
}

function isBoundary(text: string, position: Position, checkSubword: boolean) {
  const prev = char(text[position.character - 1])
  const cur = char(text[position.character])
  const next = char(text[position.character + 1])

  if (prev.separator !== cur.separator) return true
  if (checkSubword && cur.underscore && !prev.underscore) return true
  if (checkSubword && prev.underscore && !cur.underscore) return true
  if (checkSubword && cur.numeric && !prev.numeric) return true
  if (checkSubword && prev.numeric && !cur.numeric) return true
  if (checkSubword && cur.upper && prev.lower) return true
  if (checkSubword && cur.upper && next.lower) return true

  return false
}

function char(c: string) {
  const cl = {
    none: false,
    upper: false,
    lower: false,
    numeric: false,
    underscore: false,
    separator: '',
  }

  if (!c) cl.none = true
  else if (c === '_') cl.underscore = true
  else if (isSeparator(c)) cl.separator = c
  else if (isDigit(c)) cl.numeric = true
  else if (isUpper(c)) cl.upper = true
  else if (isLower(c)) cl.lower = true

  return cl
}

function isUpper(c: string) {
  return c === c.toUpperCase() && c !== c.toLowerCase()
}

function isLower(c: string) {
  return c === c.toLowerCase() && c !== c.toUpperCase()
}

function isDigit(c: string) {
  const d = c.charCodeAt(0)
  return d >= 0x30 && d <= 0x39
}

function isSeparator(c: string) {
  return separators.test(c)
}
