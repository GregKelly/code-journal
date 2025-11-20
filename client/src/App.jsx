import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import EntryListPage from './pages/EntryListPage/EntryListPage';
import EntryDetailPage from './pages/EntryDetailPage/EntryDetailPage';
import CreateEntryPage from './pages/CreateEntryPage/CreateEntryPage';
import EditEntryPage from './pages/EditEntryPage/EditEntryPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<EntryListPage />} />
        <Route path="entries/new" element={<CreateEntryPage />} />
        <Route path="entries/:id" element={<EntryDetailPage />} />
        <Route path="entries/:id/edit" element={<EditEntryPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
