import { lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { List, Detail, New } from '~/screens';
const LayoutDefault = lazy(() => import('~/layouts/LayoutDefault'));

const App = () => {
  return (
    <div className='App '>
      <BrowserRouter>
        <Routes>
          <Route path='/'>
            <Route index element={<LayoutDefault />} />
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
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};
export default App;
