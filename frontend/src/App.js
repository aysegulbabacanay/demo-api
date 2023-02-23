import { useState, useEffect } from 'react';
import { UserList } from './components/UserList';
import { UserLogin } from './components/UserLogin';

import { checkAuth } from './common/utils/api';

function App() {

  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {

    checkAuth()
      .then(() => {

        setAuthenticated(true);
      })
      .catch((err) => {

        setAuthenticated(false);
      })

  }, [])

  return (
    <div className="App">
      {authenticated ? <UserList /> : <UserLogin />}
    </div>
  );
}

export default App;
