import { Space, Typography } from 'antd';
import React from 'react'

const { Text } = Typography;

const App = ({ label }: any) => (
    <Space direction="vertical">
        <Text>{label}</Text>
    </Space>
);

export default App;