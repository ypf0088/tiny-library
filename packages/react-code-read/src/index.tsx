/*
 * @Author: yourname
 * @LastEditors: Please set LastEditors
 * @Date: 2021-08-02 15:34:39
 * @LastEditTime: 2021-08-02 17:12:45
 * @FilePath: /packages/react-code-read/src/index.tsx
 * @Description: file content
 * Copyright (C) 2021 yourname. All rights reserved.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import Hooks from './hooks';

function App() {
    return (
        <div>
            <Hooks />
        </div>
    );
}
ReactDOM.render(<App />, document.getElementById('root'));
