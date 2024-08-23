import { commands, window } from 'vscode'
import * as subwordNavigationFullwidth from './commands'

export function activate() {
  commands.registerCommand('subwordNavigationFullwidth.cursorWordLeft', () =>
    subwordNavigationFullwidth.cursorWordLeft(window.activeTextEditor)
  )

  commands.registerCommand('subwordNavigationFullwidth.cursorWordRight', () =>
    subwordNavigationFullwidth.cursorWordRight(window.activeTextEditor)
  )

  commands.registerCommand(
    'subwordNavigationFullwidth.cursorWordLeftSelect',
    () =>
      subwordNavigationFullwidth.cursorWordLeftSelect(window.activeTextEditor)
  )

  commands.registerCommand(
    'subwordNavigationFullwidth.cursorWordRightSelect',
    () =>
      subwordNavigationFullwidth.cursorWordRightSelect(window.activeTextEditor)
  )

  commands.registerCommand('subwordNavigationFullwidth.deleteWordLeft', () =>
    subwordNavigationFullwidth.deleteWordLeft(window.activeTextEditor)
  )

  commands.registerCommand('subwordNavigationFullwidth.deleteWordRight', () =>
    subwordNavigationFullwidth.deleteWordRight(window.activeTextEditor)
  )

  commands.registerCommand('subwordNavigationFullwidth.cursorSubwordLeft', () =>
    subwordNavigationFullwidth.cursorSubwordLeft(window.activeTextEditor)
  )

  commands.registerCommand(
    'subwordNavigationFullwidth.cursorSubwordRight',
    () => subwordNavigationFullwidth.cursorSubwordRight(window.activeTextEditor)
  )

  commands.registerCommand(
    'subwordNavigationFullwidth.cursorSubwordLeftSelect',
    () =>
      subwordNavigationFullwidth.cursorSubwordLeftSelect(
        window.activeTextEditor
      )
  )

  commands.registerCommand(
    'subwordNavigationFullwidth.cursorSubwordRightSelect',
    () =>
      subwordNavigationFullwidth.cursorSubwordRightSelect(
        window.activeTextEditor
      )
  )

  commands.registerCommand('subwordNavigationFullwidth.deleteSubwordLeft', () =>
    subwordNavigationFullwidth.deleteSubwordLeft(window.activeTextEditor)
  )

  commands.registerCommand(
    'subwordNavigationFullwidth.deleteSubwordRight',
    () => subwordNavigationFullwidth.deleteSubwordRight(window.activeTextEditor)
  )
}
