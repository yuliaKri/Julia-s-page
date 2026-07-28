import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { GlobalStyle } from './styles/GlobalStyle';
import { Header } from './components/Header';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { PlacesPage } from './pages/PlacesPage';
import { StocksPage } from './pages/StocksPage';
import { ChatWidget } from './components/ChatWidget';

const App: React.FC = () => {
  return (
    <Router>
      <GlobalStyle />
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/about" component={AboutPage} />
        <Route path="/places" component={PlacesPage} />
        <Route path="/stocks" component={StocksPage} />
        <Route path="/contact" component={ContactPage} />
      </Switch>
      <ChatWidget />
    </Router>
  );
};

export default App;
