/* eslint global-require: 1, flowtype-errors/show-errors: 0 */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `npm run build` or `npm run build-main`, this file is compiled to
 * `./app/main.prod.js` using webpack. This gives us some performance wins.
 *
 * @flow
 */
import { app, BrowserWindow, ipcMain } from 'electron';
import MenuBuilder from './menu';
import fs from 'fs';
import xmlbuilder from 'xmlbuilder';
import path from 'path';

let mainWindow = null;

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

if (process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true') {
  require('electron-debug')();
  const path = require('path');
  const p = path.join(__dirname, '..', 'app', 'node_modules');
  require('module').globalPaths.push(p);
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = [
    'REACT_DEVELOPER_TOOLS',
    'REDUX_DEVTOOLS'
  ];

  return Promise
    .all(extensions.map(name => installer.default(installer[name], forceDownload)))
    .catch(console.log);
};


/**
 * Add event listeners...
 */

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});


app.on('ready', async () => {
  if (process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true') {
    await installExtensions();
  }

  mainWindow = new BrowserWindow({
    show: false,
    width: 720,
    height: 720,
    title: "D2SF Screen Editor",
    // frame: false,
    resizable: false,
  });

  mainWindow.loadURL(`file://${__dirname}/app.html`);

  // @TODO: Use 'ready-to-show' event
  //        https://github.com/electron/electron/blob/master/docs/api/browser-window.md#using-ready-to-show-event
  mainWindow.webContents.on('did-finish-load', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    mainWindow.show();
    mainWindow.focus();
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();
});

ipcMain.on('save-settings', (event, args) => {
  fs.writeFile(path.resolve('settings.json'), JSON.stringify(args, null, 4), (err) => {
    if(err) {
      event.returnValue = {
        error: true,
        data: err
      };
    } else {
      event.returnValue = {
        error: false,
        data: args,
        result: 'saved'
      };
    }
  })
});

ipcMain.on('info-settings', (event, args) => {
  fs.exists(path.resolve('settings.json'), function (exists) {
    if(exists) {
      fs.readFile('settings.json', 'utf8', (err, data) => {
        if(err) {
          event.returnValue = {
            error: true,
            data: err
          };
        } else {
          event.returnValue = {
            error: false,
            data: JSON.parse(data)
          };
        }
      });
    } else {
      event.returnValue = {
        error: false,
        data: {
          imagePath: '',
          imageSlidePath: '',
          videoPath: '',
        }
      };
    }
  });
});

ipcMain.on('make-xml', function(event, args) {
  let savedPath = args.savedPath;
  let type = args.type;
  let data = args.data;

  console.log('data', data);

  if (fs.existsSync(path)) {
    fs.unlinkSync(path);
  }

  switch(type) {
    case 'image':
      var imageRoot = makeImageXml(data);

      fs.writeFile(
        savedPath + '/schedule.xml',
        '<?xml version="1.0" encoding="utf-8"?>\n' + imageRoot,
        (error, data) => {
          if (error) {
            event.returnValue = error.Error;;
          } else {
            event.returnValue = 'make';
          }
        }
      );

      break;
    case 'imageSlide':
      var listRoot = makeImageListXml(data);

      fs.writeFile(
        savedPath + '/image.xml',
        '<?xml version="1.0" encoding="utf-8"?>\n' + listRoot,
        (error, data) => {
          if (error) {
            event.returnValue = error.Error;
          } else {
            event.returnValue = 'make';
          }
        }
      );

      var root = makeImageWrapXml();

      fs.writeFile(
        savedPath + '/schedule.xml',
        '<?xml version="1.0" encoding="utf-8"?>\n' + root,
        (error, data) => {
          if (error) {
            event.returnValue = error.Error;
          } else {
            event.returnValue = 'make';
          }
        }
      );

      break;
    case 'video':
      var videoRoot = makeVideoXml(data);

      fs.writeFile(
        savedPath + '/schedule.xml',
        '<?xml version="1.0" encoding="utf-8"?>\n' + videoRoot,
        (error, data) => {
          if (error) {
            event.returnValue = error.Error;;
          } else {
            event.returnValue = 'make';
          }
        }
      );

      break;
    default:
      event.returnValue = 'pong';
  }

});

let makeImageWrapXml = (data) => {
  let root = xmlbuilder.create('BROAD_INFO',
      {version: '1.0', encoding: 'UTF-8', standalone: true},
      {pubID: null, sysID: null},
      {skipNullAttributes: false,
        headless: false, ignoreDecorators: false,
        separateArrayItems: false, noDoubleEncoding: false,
        stringify: {}}
  );

  root
    .ele('SCREEN', {}).d('멀티').up()
    .ele('BROAD_DATE', {}).d('2015-03-27').up()
    .ele('VERSION', {}).d('1427445823').up()
    .ele('PREFIX_URL', {}).d('http://10.101.52.160').up()
    .ele('BROAD_LIST')
    .ele('IDX', {}).d('76158').up()
    .ele('START_TIME', {}).d('09:00').up()
    .ele('END_TIME', {}).d('23:59').up()
    .ele('BROAD_GROUP')
    .ele('GROUP_NAME', {}).d('test').up()
    .ele('GROUP').up()
    .ele('GROUP_NAME', {}).d('내부스~6.JPG').up()
    .ele('GROUP')
    .ele('BROAD_FILE_LIST')
    .ele('IDX', {}).d('900').up()
    .ele('FILE_NAME', {}).d('1999라운지').up()
    .ele('FILE_PATH', {}).d('imageslide/image_m.swf').up()
    .ele('FILE_SIZE', {}).d('875406').up()
    .ele('FILE_TYPE', {}).d('template').up()
    .ele('TIME', {}).d('8').up()
    .ele('CONTENT_START_TIME', {}).d('00:00:00').up()
    .ele('CONTENT_END_TIME', {}).d('23:59:59').up()
    .ele('TEMPLATE_XML_PATH', {}, 'image.xml').up()
    .ele('HAS_ERROR', {}, 'false')
    .end({
      pretty: true,
      allowEmpty: true
    });

  return root;
}

let makeImageXml = (data) => {

  let root = xmlbuilder.create('BROAD_INFO',
    {version: '1.0', encoding: 'UTF-8', standalone: true},
    {pubID: null, sysID: null},
    {skipNullAttributes: false,
      headless: false, ignoreDecorators: false,
      separateArrayItems: false, noDoubleEncoding: false,
      stringify: {}}
  );

  root
    .ele('SCREEN', {}).d('멀티').up()
    .ele('BROAD_DATE', {}).d('2015-03-27').up()
    .ele('VERSION', {}).d('1427445823').up()
    .ele('PREFIX_URL', {}).d('http://10.101.52.160').up()
    .ele('BROAD_LIST')
    .ele('IDX', {}).d('76158').up()
    .ele('START_TIME', {}).d('09:00').up()
    .ele('END_TIME', {}).d('23:59').up()
    .ele('BROAD_GROUP')
    .ele('GROUP_NAME', {}).d('test').up()
    .ele('GROUP').up()
    .ele('GROUP_NAME', {}).d('내부스~6.JPG').up()
    .ele('GROUP')
    .ele('BROAD_FILE_LIST')
    .ele('IDX', {}).d('900').up()
    .ele('FILE_NAME', {}).d('').up()
    .ele('FILE_PATH', {}).d(data.path).up()
    .ele('FILE_SIZE', {}).d('0').up()
    .ele('FILE_TYPE', {}).d('image').up()
    .ele('TIME', {}).d('8').up()
    .end({
      pretty: true,
      allowEmpty: true
    });

  return root;
}

let makeImageListXml = (data) => {
  let root = xmlbuilder.create('nhn',
    {version: '1.0', encoding: 'UTF-8', standalone: true},
    {pubID: null, sysID: null},
    {skipNullAttributes: false,
      headless: false, ignoreDecorators: false,
      separateArrayItems: false, noDoubleEncoding: false,
      stringify: {}}
  );

  var items = root.ele('items', {});

  for(var i = 0, max = data.length; i < max; i += 1) {
    let ltitle = data[i].ltitle;
    let mtitle = data[i].mtitle;
    let stitle = data[i].stitle;
    let images = data[i].images;

    var item = items.ele('item', {})
      .ele('logo', {type: 'image'}).d('').up()
      .ele('ltitle', {type: 'text'}).d(ltitle).up()
      .ele('mtitle', {type: 'text'}).d(mtitle).up()
      .ele('stitle', {type: 'text'}).d(stitle).up();

    for(var j = 0, jmax = images.length; j < jmax; j += 1) {
      item.ele('images', {type: 'image'}).d(images[j]).up();
    }

    item.ele('fullscreen', {type: 'text'}).d('1');
  }

  root.end({
    pretty: true,
    allowEmpty: true
  });

  return root;
}

let makeVideoXml = (data) => {

  let root = xmlbuilder.create('BROAD_INFO',
    {version: '1.0', encoding: 'UTF-8', standalone: true},
    {pubID: null, sysID: null},
    {skipNullAttributes: false,
      headless: false, ignoreDecorators: false,
      separateArrayItems: false, noDoubleEncoding: false,
      stringify: {}}
  );

  root
    .ele('SCREEN', {}).d('멀티').up()
    .ele('BROAD_DATE', {}).d('2015-03-27').up()
    .ele('VERSION', {}).d('1427445823').up()
    .ele('PREFIX_URL', {}).d('http://10.101.52.160').up()
    .ele('BROAD_LIST')
    .ele('IDX', {}).d('900').up()
    .ele('START_TIME', {}).d('09:00').up()
    .ele('END_TIME', {}).d('23:59').up()
    .ele('BROAD_GROUP')
    .ele('GROUP_NAME', {}).d('test').up()
    .ele('GROUP').up()
    .ele('GROUP_NAME', {}).d('내부스~6.JPG').up()
    .ele('GROUP')
    .ele('BROAD_FILE_LIST')
    .ele('IDX', {}).d('900').up()
    .ele('FILE_NAME', {}).d('').up()
    .ele('FILE_PATH', {}).d(data.path).up()
    .ele('FILE_SIZE', {}).d('0').up()
    .ele('FILE_TYPE', {}).d('video').up()
    .ele('TIME', {}).d('8').up()
    .end({
      pretty: true,
      indent: '  ',
      newline: '\n',
      allowEmpty: true
    });

  return root;
}
