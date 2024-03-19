import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';

// Define your user type
interface User {
  id: string;
  username: string;
  password?: string; // Optional because we don't want to return it in the session
}

// Dummy example for demonstration purposes
const users: User[] = [
  { id: '1', username: 'test', password: 'password' },
];

passport.use(new LocalStrategy(
  (username, password, done) => {
    const user = users.find(u => u.username === username);
    if (!user) {
      return done(null, false, { message: 'Incorrect username.' });
    }
    if (user.password !== password) {
      return done(null, false, { message: 'Incorrect password.' });
    }
    const userWithoutPassword: User = { id: user.id, username: user.username };
    return done(null, userWithoutPassword);
  }
));

passport.serializeUser<User>((user, done) => {
  done(null, user.id);
});

passport.deserializeUser<User>((id, done) => {
  const user = users.find(u => u.id === id);
  if (user) {
    const userWithoutPassword: User = { id: user.id, username: user.username };
    done(null, userWithoutPassword);
  } else {
    done(new Error('User not found'));
  }
});

export default passport;
