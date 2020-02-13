import React from 'react'

import { Layout, Menu } from 'antd'

const { Header, Content } = Layout;

const BACKGROUND_COLOUR = '#FAFAFC'

export class DefaultLayout extends React.Component {
    render() {
        return (
            <Layout>
                <Header>
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        style={{ lineHeight: '64px' }}
                    />
                </Header>
                <Content style={{
                    backgroundColor: BACKGROUND_COLOUR,
                    padding: "2em  4em", display: "flex"
                }}>{this.props.children}</Content>
            </Layout>
        )
    }

}