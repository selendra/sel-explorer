import React, { useState } from 'react';
import { Menu, Layout, Breadcrumb  } from 'antd';
import { NavLink, useLocation, withRouter } from 'react-router-dom'
import InputSearch from '../../components/InputSearch'
import { matchPath } from 'react-router'
import selendra from '../../assets/logo/selendra.png'
import Footer from '../Footer';
import {
  PieChartOutlined,
  TeamOutlined,
  MenuFoldOutlined,
  GoldOutlined
} from '@ant-design/icons';


export default withRouter(function(props) {
  const { Header, Content, Sider } = Layout;
  const { SubMenu } = Menu;
  const { location } = props;
  const current_location = useLocation();
  const isMatchBlocks = [
    '/extrinsics',
    '/events',
    'blocks',
    '/accounts',
    '/sudo_extrinsics'
  ].some(path => !!matchPath(location.pathname, { path }))
  const isMatchCrossBlocks = ['/crossblocks'].some(
    path => !!matchPath(location.pathname, { path })
  )
  const isMatchValidators = ['/validators'].some(
    path => !!matchPath(location.pathname, { path })
  )
  const [active, SetActive] = React.useState(false)
  const width = document.documentElement.clientWidth
  const mobile = width < 1024
  let style = mobile === true ? {} : { color: 'black' }
  const [collapsed, setCollapsed] = React.useState(false)
  // const sidebarWidth = window.innerWidth < 700 ? collapsedWidth='0' : null

  return (
    <Layout>
      <Header className='navbar' style={{ padding: '0px 22px' }}>
        <img src={selendra} alt='logo' style={{ width: 100, height: 48, paddingTop: 10 }}/>
        <div className="navbar-end is-hidden-touch is-hidden-tablet-only">
          <InputSearch {...props} />
        </div>
      </Header>
      <Layout>
      <Sider 
          className="site-layout-background sider-mobile" 
          breakpoint='md'
          collapsedWidth='0'
          collapsible 
          collapsed={collapsed} 
          onCollapse={()=>setCollapsed(!collapsed)}
        >
          <Menu
            mode="inline"
            defaultSelectedKeys={[current_location.pathname]}
            defaultOpenKeys={['sub1']}
            style={{ height: '100%', borderRight: 0 }}
          >
            <Menu.Item key="/" icon={<PieChartOutlined />}>
              <NavLink to="/">
                Overview
              </NavLink>
            </Menu.Item>
            <SubMenu key="/chain" title="Chain" icon={<GoldOutlined />}>
              <Menu.Item key="/blocks">
                <NavLink to='/blocks'>
                  Blocks
                </NavLink>
              </Menu.Item>
              <Menu.Item key="/extrinsics">
                <NavLink to='/extrinsics'>
                  Extrinsics
                </NavLink>
              </Menu.Item>
              <Menu.Item key="/events">
                <NavLink to='/Events'>
                  Events
                </NavLink>
              </Menu.Item>
            </SubMenu>
            <Menu.Item key="/accounts" icon={<TeamOutlined />}>
              <NavLink to='/accounts'>
                Accounts
              </NavLink>
            </Menu.Item>
          </Menu>
        </Sider>
        <Sider 
          className="site-layout-background sider-desktop" 
          collapsible 
          collapsed={collapsed} 
          onCollapse={()=>setCollapsed(!collapsed)}
        >
          <Menu
            mode="inline"
            defaultSelectedKeys={[current_location.pathname]}
            defaultOpenKeys={['sub1']}
            style={{ height: '100%', borderRight: 0 }}
          >
            <Menu.Item key="/" icon={<PieChartOutlined />}>
              <NavLink to="/">
                Overview
              </NavLink>
            </Menu.Item>
            <SubMenu key="/chain" title="Chain" icon={<GoldOutlined />}>
              <Menu.Item key="/blocks">
                <NavLink to='/blocks'>
                  Blocks
                </NavLink>
              </Menu.Item>
              <Menu.Item key="/extrinsics">
                <NavLink to='/extrinsics'>
                  Extrinsics
                </NavLink>
              </Menu.Item>
              <Menu.Item key="/events">
                <NavLink to='/Events'>
                  Events
                </NavLink>
              </Menu.Item>
            </SubMenu>
            <Menu.Item key="/accounts" icon={<TeamOutlined />}>
              <NavLink to='/accounts'>
                Accounts
              </NavLink>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Breadcrumb style={{ margin: '16px' }}>
            <span>Scan</span>
            <Breadcrumb.Item>{current_location.pathname}</Breadcrumb.Item>
          </Breadcrumb>
          <Content
            className="site-layout-background"
            style={{
              margin: 0,
              minHeight: 280,
            }}
          >
            {props.children}
          </Content>
          <Footer/>
        </Layout>
      </Layout>
    </Layout>
  );
})
