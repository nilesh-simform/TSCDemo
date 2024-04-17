import SQLite from 'react-native-sqlite-storage';

const DB_NAME: string = 'MyTSC.db';

const scripts: string[] = [
  'CREATE TABLE IF NOT EXISTS active_user (userId INTEGER, name VARCHAR, mobile INTEGER, role VARCHAR, username VARCHAR)',
  'CREATE TABLE IF NOT EXISTS users (userId INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR, mobile INTEGER, role VARCHAR, username VARCHAR, password VARCHAR)',
  'CREATE TABLE IF NOT EXISTS todos (id INTEGER PRIMARY KEY AUTOINCREMENT,userId INTEGER, title VARCHAR, is_completed BOOLEAN, FOREIGN KEY(userId) REFERENCES users(userId))',
];

class Database {
  db: SQLite.SQLiteDatabase;
  constructor() {
    this.db = this.initializeDatabase();
  }

  initializeDatabase(): SQLite.SQLiteDatabase {
    return SQLite.openDatabase(
      {name: DB_NAME, location: 'default'},
      this.handleDbSuccess,
      this.handleDbError,
    );
  }

  getDatabase(): SQLite.SQLiteDatabase {
    return this.db;
  }

  initialSetup(): void {
    this.db.transaction(tx => {
      scripts.map((scpt, idx) => {
        tx.executeSql(
          scpt,
          [],
          s => {
            console.log('Success of Initial Setup', s, idx);
          },
          e => {
            console.log('ERROR on Initial Setup', e, idx);
          },
        );
      });
    });
  }

  handleDbSuccess = (): void => {
    console.log('Database opened successfully');
    this.initialSetup();
  };

  handleDbError = (error: SQLite.SQLError): void => {
    console.error('Error opening database: ', error);
  };
}

export default new Database();
