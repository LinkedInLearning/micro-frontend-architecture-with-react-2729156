import React from 'react';

const RemoteComponent = React.lazy(() => import('remote/RemoteComponent'));

const App = () => (
  <div>
    <h1>Host Application</h1>
    <h2>Remote Component Below:</h2>
    <React.Suspense fallback="Loading Remote Component...">
      <RemoteComponent />
    </React.Suspense>
  </div>
);

export default App;