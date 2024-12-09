import {
  LocationProvider,
  Router,
  Route,
  hydrate,
  prerender as ssr,
} from 'preact-iso';

import { Home } from '@/pages/Home';
import { NotFound } from '@/pages/_404.tsx';
import { MeetThePonies } from '@/pages/MeetThePonies';
import { Schedule } from '@/pages/Schedule';
import { Vendors } from '@/pages/Vendors';
import { FAQ } from '@/pages/FAQ';
import { Header } from '@/components/Header';
import { Sidebar } from '@/components/Sidebar';
import '@/style.scss';

export function App() {
  return (
    <LocationProvider>
      <div className='global_wrapper'>
        <Header />
        <div class='grid'>
          <Sidebar />
          <main>
            <Router>
              <Route path='/' component={Home} />
              <Route path='/meet_the_ponies' component={MeetThePonies} />
              <Route path='/schedule' component={Schedule} />
              <Route path='/schedule/:day' component={Schedule} />
              <Route path='/vendors' component={Vendors} />
              <Route path='/faq' component={FAQ} />
              <Route default component={NotFound} />
            </Router>
          </main>
        </div>
      </div>
    </LocationProvider>
  );
}

if (typeof window !== 'undefined') {
  hydrate(<App />, document.getElementById('app'));
}

export async function prerender(data) {
  return await ssr(<App {...data} />);
}
