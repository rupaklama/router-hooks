import {
  Route,
  Switch,
  useHistory,
  useLocation,
  useParams,
  useRouteMatch,
} from 'react-router-dom';
import './App.css';

const Home = () => {
  const history = useHistory();

  const handleClick = () => {
    history.push('/about');
  };

  return (
    <div>
      <h1>React Router Hooks API</h1>
      <button onClick={handleClick}>To About</button>
    </div>
  );
};
const About = () => {
  // useParams returns an object of key/value pairs of URL parameters - object {param-key: 'value' }
  // Use it to access match.params of the current <Route>
  const params = useParams();
  
  // useRouterMatch hook
  // display a button if url matches exactly
  const match = useRouteMatch('/about/button'); // Do whatever you want with the match...
  // const showButton = match && match.isExact
  const showButton = match && match.url // same as above with url prop
  
  // we use param key - id, in our path='/about/:id'
  // params.id returns the value of :id parameter
  return (
    <div>
      <h1>About page - {params.id} </h1>
      {showButton && <button>Our button</button>}
    </div>
  );

  // Popular use case of useParams hook is to fetch api data by params key
  // const { id } = useParams();
  // fetch(`https://api.tvmaze.com/shows/${id}?embed[]=seasons&embed[]=cast`)
};

const Header = () => {
  const history = useHistory();

  const location = useLocation();
  // const atAboutPage = location.pathname === '/about';

  // includes func is to apply Go Back button
  // to all its sub routes - about/1, about/2
  const atAboutPage = location.pathname.includes('/about');

  const handleBackClick = () => {
    history.goBack(); // previous page
  };

  // using useLocation hook
  // show Back Button if we are in 'about' page on Header
  return atAboutPage && <button onClick={handleBackClick}>Go Back</button>;
};
function App() {
  return (
    <div className='App'>
      <Header />
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/about' component={About} />
        <Route exact path='/about/:id' component={About} />
      </Switch>
    </div>
  );
}

export default App;
