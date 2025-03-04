import session from 'express-session';
import sessionFileStore from 'session-file-store';

const FileStore = sessionFileStore(session);

const sessionConfig = {
  store: new FileStore({ path: './sessions' }),
  secret: 'SomeSuperLongHardToGuessSecretString',
  resave: false,
  saveUninitialized: false,
};

export default sessionConfig;
