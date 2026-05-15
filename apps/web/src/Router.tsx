import { BrowserRouter, Routes, Route } from 'react-router';
import { App } from './App';
import { AdminDebugView } from './views/AdminDebugView';

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/admin" element={<AdminDebugView />} />
      </Routes>
    </BrowserRouter>
  );
}
