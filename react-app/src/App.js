import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import ProjectForm from './components/ProjectForm';
import ProjectPage from './components/ProjectPage';
import CategoriesList from './components/CategoriesPage';
import CategoryPage from './components/CategoryPage';
import ProjectEditForm from './components/ProjectEditForm';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UpdateForm from './components/UpdatesFeature/UpdateForm';
import UsersList from './components/UsersList';
import User from './components/User';
import { authenticate } from './store/session';
import Banner from './components/Banner/index';
import SplashPage from './components/SplashPage/index';
import TierRewards from './components/TierRewards';
import PaymentPage from './components/PaymentPage';
import SearchPage from './components/SearchPage';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <Banner />
      {/* <NavBar /> */}
      <Switch>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        <Route path='/create-project' exact={true}>
          <ProjectForm />
        </Route>
        <Route path='/categories/:id' exact={true}>
          <CategoryPage />
        </Route>
        <Route path='/categories' exact={true}>
          <CategoriesList />
        </Route>
        <ProtectedRoute path='/users' exact={true}>
          <UsersList/>
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true}>
          <User />
        </ProtectedRoute>
        <Route path="/projects/:projectId" exact={true}>
          <ProjectPage />
        </Route>
        <Route path="/projects/:projectId/edit" exact={true}>
          <ProjectEditForm />
        </Route>
        <ProtectedRoute path="/projects/:projectId/rewards" exact={true}>
          <TierRewards />
        </ProtectedRoute>
        <ProtectedRoute path="/checkout/:contributionId" exact={true}>
          <PaymentPage />
        </ProtectedRoute>
        <ProtectedRoute path='/updates/create-form' exact={true}>
          <UpdateForm />
        </ProtectedRoute>
        <Route path="/search/:searchTerms">
          <SearchPage />
        </Route>
        <Route path='/' exact={true} >
          <SplashPage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
