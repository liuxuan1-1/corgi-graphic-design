import * as React from 'react';
import { Menu, Icon } from 'antd';
import { ClickParam } from 'antd/lib/menu';
import { inject, observer } from 'mobx-react';

import NavPanel from './navpanel';
import EditorRight from '../workspace/index';

// import axios from 'axios';
// import { API_URL } from '../../../../../pagesConst';
import './index.scss';


interface Istates {
  menuCurrent: string,
}

interface Iprops {
  store?: any,
}

@inject('store')
@observer
class EditorContent extends React.Component<Iprops, Istates> {
  public readonly state: Readonly<Istates> = {
    menuCurrent: 'material',
  }

  public handleMenuClick = (e: ClickParam): void => {
    this.setState({
      menuCurrent: e.key,
    });
  }

  public callbackChangeStore = (e: any): void => {
    this.props.store.setDesignData({
      info: e
    });
  }

  public render() {
    const { menuCurrent } = this.state;
    const { data, fontSpecial, materialSpecial } = this.props.store;
    return (
      <div className="editor-content-wrapper">
        <div className="editor-nav">
          <Menu
            onClick={this.handleMenuClick}
            selectedKeys={[menuCurrent]}
            style={{ width: 68 }}
            theme="dark"
            className="left-menu"
          >
            <Menu.Item key="background">
              <Icon type="picture" />
              背景
            </Menu.Item>
            <Menu.Item key="font">
              <Icon type="font-size" />
              文字
            </Menu.Item>
            <Menu.Item key="material">
              <Icon type="experiment" />
              素材
            </Menu.Item>
          </Menu>
        </div>
        <div className="editor-nav-panel">
          <NavPanel
            callbackChangeStore={this.callbackChangeStore}
            data={{
              ...data.info
            }}
            fontSpecial={fontSpecial}
            menuCurrent={menuCurrent}
            materialSpecial={materialSpecial}
          />
        </div>
        <EditorRight />
      </div>
    );
  }
}

export default EditorContent;
