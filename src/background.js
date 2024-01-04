'use strict'

import { app, protocol, BrowserWindow, ipcMain } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
import installExtension, { VUEJS3_DEVTOOLS } from 'electron-devtools-installer'
const isDevelopment = process.env.NODE_ENV !== 'production'
const sqlite3 = require('sqlite3').verbose()


// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } }
])

async function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {

      // Use pluginOptions.nodeIntegration, leave this alone
      // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
      nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
      contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION
    }
  })

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    if (!process.env.IS_TEST) win.webContents.openDevTools()
  } else {
    createProtocol('app')
    // Load the index.html when not in development
    win.loadURL('app://./index.html')
  }
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      await installExtension(VUEJS3_DEVTOOLS)
    } catch (e) {
      console.error('Vue Devtools failed to install:', e.toString())
    }
  }
  createWindow()
})

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}

// Inicialize o banco de dados
let db = new sqlite3.Database('database.db', (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to the SQlite database.');
});

db.serialize(() => {
  // Crie a tabela se ela não existir
  // db.run('CREATE TABLE IF NOT EXISTS tarefas (id INTEGER PRIMARY KEY AUTOINCREMENT, titulo TEXT)');
  ipcMain.on('newStudentInDB', (event, data) => {
    let stmt = db.prepare('INSERT INTO Alunos (name, cpf, birthday, class, horary, father_name, father_cpf, father_number, mother_name, mother_cpf, mother_number, address ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)');

    data.name = data.name || 'Não informado';
    data.cpf = data.cpf || 'Não informado';
    data.birthday = data.birthday || 'Não informado';
    data.class = data.class || 'Não informado';
    data.horary = data.horary || 'Não informado';
    data.father_name = data.father_name || 'Não informado';
    data.father_cpf = data.father_cpf || 'Não informado';
    data.father_number = data.father_number || 'Não informado';
    data.mother_name = data.mother_name || 'Não informado';
    data.mother_cpf = data.mother_cpf || 'Não informado';
    data.mother_number = data.mother_number || 'Não informado';
    data.address = data.address || 'Não informado';

    // Insere os dados no banco de dados
    stmt.run(data.name, data.cpf, data.birthday, data.class, data.horary, data.father_name, data.father_cpf, data.father_number, data.mother_name, data.mother_cpf, data.mother_number, data.address);
  })


  // Seleciona todas as tarefas e exibe-as no console
  ipcMain.on('getALL', (event, data) => {
    db.all('SELECT * FROM Alunos', [], (err, rows) => {
      if (err) {
        return console.error(err.message);
      }
      event.sender.send('sendAll', rows);
    })
  });

  ipcMain.on('deleteStudentInDB', (event, data) => {
    db.run(`DELETE FROM Alunos WHERE id = ?`, [data], function (err) {
      if (err) {
        return console.error(err.message);
      }
      console.log(`Aluno com id ${data} deletado com sucesso.`);
    });
  })
});

ipcMain.on('UpdateStudentInDB', (event, data) => {
  console.log(`oi` + data);
  let sql = `UPDATE Alunos SET name = ?, cpf = ?, birthday = ?, class = ?, horary = ?, father_name = ?, father_cpf = ?, father_number = ?, mother_name = ?, mother_cpf = ?, mother_number = ?, address = ? WHERE id = ?;`;
  let values = [data.name, data.cpf, data.birthday, data.class, data.horary, data.father_name, data.father_cpf, data.father_number, data.mother_name, data.mother_cpf, data.mother_number, data.address, data.id];



  db.run(sql, values, function (err) {
    if (err) {
      return console.error(err.message);
    }
    console.log(`${this.changes} row(s) were updated.`);
  });



})

// fecha a conexão com o banco de dados
// db.close((err) => {
//   if (err) {
//     return console.error(err.message);
//   }
//   console.log('Close the database connection.');
// });