import React, { Component } from 'react';
import { Menu, Container, Button } from 'semantic-ui-react';

export default class ReactMenu extends Component {
    
    state = {
        activeItem: 'home'
    }

    handleItemClick = (e, { name }) => {
        this.setState({ activeItem: name})
    }
    
    render() {

        const { activeItem } = this.state;

        return (
            
          <Menu pointing style={{ margin: '0'}}>
            <Container>
              <Menu.Item
                name='home'
                active={activeItem === 'home'}
                onClick={this.handleItemClick}
              />
              <Menu.Item
                name='post'
                active={activeItem === 'post'}
                onClick={this.handleItemClick}
              />
              <Menu.Item
                name='seek'
                active={activeItem === 'seek'}
                onClick={this.handleItemClick}
              />
              <Menu.Item
                name='news'
                active={activeItem === 'news'}
                onClick={this.handleItemClick}
              />
              <Menu.Item
                name='analytics'
                active={activeItem === 'analytics'}
                onClick={this.handleItemClick}
              />
              <Menu.Menu position='right'>
                <Menu.Item>
                    <div>
                    <Button primary>Login</Button>
                    <Button secondary>Sign out</Button>

                    </div>
                  
                </Menu.Item>
            </Menu.Menu>
          </Container>
        </Menu>
        )
    }
}
