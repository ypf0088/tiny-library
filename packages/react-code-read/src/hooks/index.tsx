/*
 * @Author: yourname
 * @LastEditors: Please set LastEditors
 * @Date: 2021-08-02 15:39:08
 * @LastEditTime: 2021-08-02 16:06:16
 * @FilePath: /packages/react-code-read/src/hooks/index.tsx
 * @Description: file content
 * Copyright (C) 2021 yourname. All rights reserved.
 */
import React, { useCallback, useContext, useEffect, useMemo, useReducer, useRef, useState } from 'react';

function TestUseCallBack() {
    const handle = useCallback(e => {
        console.log(e);
    }, []);
    return <p onClick={handle}>测试useCallback</p>;
}

function TestUseMemo() {
    const [state, setState] = useState(1);

    debugger
    const count = useMemo(() => {
        return state;
    }, []);

    console.log(count)
    return <p onClick={() => setState(state + 1)}>测试一下useMemo</p>;
}

export default function (props: any) {
    return (
        <div>
            <p>测试hooks都是干啥用的</p>
            <dl>
                <dt>useCallback</dt>
                <dd>
                    <TestUseCallBack />
                </dd>
                <dt>useMemo</dt>
                <dd>
                    <TestUseMemo />
                </dd>
            </dl>
        </div>
    );
}
