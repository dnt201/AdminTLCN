import { lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { List, Detail, New, Home } from '~/screens';
import NotFound from '~/screens/notFound/NotFound';
const LayoutDefault = lazy(() => import('~/layouts/LayoutDefault'));

const App = () => {
  return (
    <div className='App '>
      <Routes>
        <Route path='/' element={<LayoutDefault />}>
          <Route path='home' element={<Home />} />
          <Route path='users'>
            <Route index element={<List />} />
            <Route path=':userId' element={<Detail />} />
            <Route path='new' element={<New />} />
          </Route>
          <Route path='products'>
            <Route index element={<List />} />
            <Route path=':productId' element={<Detail />} />
            <Route path='new' element={<New />} />
          </Route>
          <Route path='*' element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  );
};
export default App;
