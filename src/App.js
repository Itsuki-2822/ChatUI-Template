import React, { useEffect } from 'react';

import ChatGPTLikeUI from './ChatGPTLikeUI.tsx';

function App() {
  useEffect(() => {
    document.title = "ChatUI-Template";
  }, []);

  return (
    <div>
      <ChatGPTLikeUI />
    </div>
  );
}

export default App;