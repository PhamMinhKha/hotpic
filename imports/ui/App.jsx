import React, { useState, Fragment, useContext, Children } from 'react';
import { useTracker } from 'meteor/react-meteor-data'
import { TaskCollection, Task2Collection } from '../db/TaskCollection'
import 'antd/dist/antd.css';
import ConfigContext, { ConfigProvider } from './ConfigContext';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
  HashRouter
} from "react-router-dom";

//import screen
import { Button, Layout } from 'antd';
const { Header, Footer, Sider, Content } = Layout;
import Home from './screens/Home';
import Detail from './screens/Detail';
import Register from './screens/Register';
import Menu from './components/TopMenu';
import LeftMenu from './components/LeftMenu';
import ListIProductItem from './components/ListIProductItem';
import { useTranslation } from 'react-i18next';
/* Teme dark or light */
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from './theme/theme';
import { GlobalStyles } from './theme/global';

export const App = () => {
  /* Đa ngôn ngữ */
  const { t, i18n } = useTranslation();
  /* Tạo context cho app */
  const [config, setConfig] = useState({ theme: 'light', lng: 'en', left_menu_collapsed: false });
  /* Theo dõi database mongo */
  const user = useTracker(() => Meteor.user())
  const hideCompletedFilter = { isChecked: { $ne: true } };
  const userFilter = user ? { userId: user._id } : {};
  const pendingOnlyFilter = { ...hideCompletedFilter, ...userFilter };
  const [hideCompleted, setHideCompleted] = useState(false);
  const logout = () => Meteor.logout();
  const { tasks, pendingTasksCount, isLoading } = useTracker(() => {
    const noDataAvailable = { tasks: [], pendingTasksCount: 0 };
    if (!Meteor.user()) {
      return noDataAvailable;
    }
    const handler = Meteor.subscribe('tasks');

    if (!handler.ready()) {
      return { ...noDataAvailable, isLoading: true };
    }

    const tasks = TaskCollection.find(
      hideCompleted ? pendingOnlyFilter : userFilter,
      {
        sort: { createdAt: -1 },
      }
    ).fetch();
    const pendingTasksCount = TaskCollection.find(pendingOnlyFilter).count();

    return { tasks, pendingTasksCount };
  });
  function createTask() {
    TaskCollection.insert({ text: 'New Task' })
  }
  const toggleChecked = ({ _id, isChecked }) => {
    Meteor.call('tasks.setIsChecked', _id, !isChecked);
  };
  const deleteTask = ({ _id }) => Meteor.call('tasks.remove', _id);
  function changeTheme(myTheme) {
    // console.log(config);
  }
  function changeLanguage(newLang) {
    i18n.changeLanguage(newLang);
  }
  console.log(config);
  return (
    <ConfigProvider value={[config, setConfig]}>
      <ThemeProvider theme={config.theme === 'dark' ? darkTheme : lightTheme}>
        <Router>
          <div>
            <GlobalStyles />
            <Layout>
              <Menu changeLanguage={changeLanguage} />
              <Layout>
                <Sider theme={config.theme}
                  collapsed={config.left_menu_collapsed}>
                  <LeftMenu />
                </Sider>
                <Content className="themeChange content" style={{ margin: '24px 16px 0', overflow: 'initial' }}>
                  <Switch>
                    <Route path="/detail">
                      <Detail />
                    </Route>
                    <Route path="/register">
                      <Register />
                    </Route>
                    <Route path="/login">
                      <Register />
                    </Route>
                    <Route path="/">
                      <ListIProductItem />
                    </Route>
                  </Switch>
                </Content>
              </Layout>
            </Layout>

          </div>

        </Router>

      </ThemeProvider>
    </ConfigProvider>
  )
};