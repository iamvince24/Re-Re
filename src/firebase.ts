import { initializeApp, FirebaseApp } from 'firebase/app'
import { getDatabase, ref, update, get, Database } from 'firebase/database'
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  Auth,
  User,
} from 'firebase/auth'

import { getFirestore, Firestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyBY1kXb-eozbwAIS0VYKBcYnb3tcq5wHUg',
  authDomain: 'rere-test-66402.firebaseapp.com',
  databaseURL: 'https://rere-test-66402-default-rtdb.firebaseio.com',
  projectId: 'rere-test-66402',
  storageBucket: 'rere-test-66402.appspot.com',
  messagingSenderId: '1017523095990',
  appId: '1:1017523095990:web:85593af384c894d3e6d917',
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const database = getDatabase(app)
const db = getFirestore(app)
const googleProvider = new GoogleAuthProvider()

const logInWithEmailAndPassword = async (auth: Auth, email: string, password: string): Promise<void> => {
  try {
    const res = await signInWithEmailAndPassword(auth, email, password)
    const user = res.user
    window.localStorage.setItem('uid', user.uid)
  } catch (err: any) {
    console.error(err)
    alert(err.message)
  }
}

const registerWithEmailAndPassword = async (email: string, password: string): Promise<void> => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password)
    const user = res.user
    window.localStorage.setItem('uid', user.uid)
    await handleNewUserData(user.uid)
  } catch (err: any) {
    console.error(err)
    alert(err.message)
  }
}

const signInWithGoogle = async (): Promise<void> => {
  try {
    const res = await signInWithPopup(auth, googleProvider)
    const user = res.user
    const uid = user.uid
    window.localStorage.setItem('uid', user.uid)
    window.localStorage.setItem('username', user.displayName || '')

    const fetchData = async (uid: string): Promise<void> => {
      try {
        const db = getDatabase()
        const starCountRef = ref(db, `users/${uid}`)
        const snapshot = await get(starCountRef)
        const data = snapshot.val()
        if (data === null) {
          console.log('New user')
          await handleNewUserData(uid)
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    await fetchData(uid)
    window.localStorage.setItem('uid', uid)
  } catch (err: any) {
    console.error(err)
    alert(err.message)
  }
}

async function handleNewUserData(uid: string): Promise<void> {
  const db = getDatabase()

  const postData = {
    notebooks: [
      {
        id: 11232,
        name: 'Sample Notebook',
        start: '2024-01-01',
        end: '2024-01-20',
        color: 'white',
        chapters: [
          {
            id: 12312,
            name: 'Markdown Example',
            start: '2024-01-01',
            end: '2024-01-10',
            content:
              '# 標題\n\n使用 `#` 符號表示標題，`#` 的數量表示標題的級別，最多支持六級標題。\n\n```markdown\n# 一級標題\n## 二級標題\n### 三級標題\n```\n\n\n\n強調\n\n使用 * 或 _ 符號包裹文字以斜體顯示，使用 ** 或 __ 符號包裹文字以粗體顯示。\n\n```markdown\n*斜體* 或 _斜體_\n**粗體** 或 __粗體__\n```\n\n\n清單\n\n使用 *、+ 或 - 符號創建無序清單，使用數字和點表示有序清單。\n\n```markdown\n- 項目 1\n- 項目 2\n  - 子項目\n1. 第一點\n2. 第二點\n```\n\n\n連結\n\n使用 [顯示文字](連結) 表示連結。\n\n```markdown\n[Google](https://www.google.com)\n```\n\n\n圖片\n\n使用 ![描述文字](圖片連結) 插入圖片。\n\n```markdown\n![Logo](https://example.com/logo.png)\n```\n\n\n引用\n\n使用 > 符號表示引用。\n\n```markdown\n> 這是引用的文字。\n```\n\n\n程式碼塊\n\n使用三個 ` 符號或四個空格縮進來表示程式碼塊。\n\n```javascript\nconsole.log("Hello, World!");\n```\n',
            color: 'white',
          },
          {
            id: 12335,
            name: 'Example Notebook',
            start: '2024-01-10',
            end: '2024-01-20',
            content:
              "# 介紹 Redux 的 API\n\n## 前言與介紹什麼是 **Redux API ?**\n\n文章內容為 codecademy 的學習筆記。\n\nRedux 的應用程式是建立在 one-way flow 的資料模型之上，並由 store 管理。這邊會介紹一些內部功能：\n\n- State 是可以描述應用程式的資料集合，它用來渲染 UI。\n- 當使用者與 UI 互動的時候會發送 action 到 store。Action 是一個會把預計要做的事情傳送到 state 的一個物件。\n- **Store 會利用 reducer function，reducer function 會接收 action 以及 state 當作輸入 ，來產生下一個 state。**\n- 最後 UI 會基於新 store 的 state 來重新渲染，整個過程會再重新開始。\n\n這邊會專注在利用 Redux API 的 `createStore()` 以及相關的 `store` 來建立基礎的 Redux 應用程式。\n\n- `store.getState()`\n- `store.dispatch(action)`\n- `store.subscribe(listener)`\n\n而 `store.replaceReducer(nextReducer)` 是一個比較進階的方法，之後有機會再介紹。\n\n## 安裝 Redux Library\n\n**使用方式：**\n\n1. 在終端機使用 npm 來安裝 redux 。\n\n```other\nnpm install redux\n```\n\n2. 並在檔案中 import `createStore` 來使用。\n\n```other\nimport { createStore } from 'redux';\n```\n\n## 建立 Redux Store\n\n每個 Redux application 都會使用 reducer function 來說明要用哪些 action 去對 state 做更新，以及 action 會怎麼到下一個 state。\n\n可以看看下面舉例的使用方式：\n\n```javascript\nconst initialState = 'on';\nconst lightSwitchReducer = (state = initialState, action) => {\n  switch (action.type) {\n    case 'toggle':\n      return state === 'on' ? 'off' : 'on';\n    default:\n      return state;\n  }\n}\n\nlet state = 'on';\nstate = lightSwitchReducer(state, { type: 'toggle' });\n\nconsole.log(state); // Prints 'off'\n```\n\n### `createStore()`\n\n而 Redux 有一個很好用的 helper function 叫做 `createStore()` ，它可以用來創建 store object，且只接收一個 reducer function 做為參數。\n\n比如以下例子：\n\n```javascript\nimport { createStore } from 'redux'\n \nconst initialState = 'on';\nconst lightSwitchReducer = (state = initialState, action) => {\n  switch (action.type) {\n    case 'toggle':\n      return state === 'on' ? 'off' : 'on';\n    default:\n      return state;\n  }\n}\n \nconst store = createStore(lightSwitchReducer);\n```\n\n## Dispatch Actions to the Store\n\n這裡介紹一些利用 `createStore()` 所回傳的 store object 延伸的使用方法，可以用來與它的 state 以及 reducer function 做互動。\n\n### `store.dispatch()`\n\n這是最常被使用的方法，它用來把 action 發送到 store object，表示說你希望去更新此 state。而它唯一個參數是一個 action object，這個 object 是 type 屬性，用來描述 state 的變化。\n\n```javascript\nconst action = { type: 'actionDescriptor' }; \nstore.dispatch(action);\n```\n\n當 `action.type` 被 reducer 確認後，state 才會被更新與回傳。\n\n以下來看看使用方式：\n\n```javascript\nimport { createStore } from 'redux';\n \nconst initialState = 'on';\nconst lightSwitchReducer = (state = initialState, action) => {\n  switch (action.type) {\n    case 'toggle':\n      return state === 'on' ? 'off' : 'on';\n    default:\n      return state;\n  }\n}\n \nconst store = createStore(lightSwitchReducer);\n \nconsole.log(store.getState()); // Prints 'on'\n\nstore.dispatch({ type: 'toggle' }); \nconsole.log(store.getState()); // Prints 'off'\n \nstore.dispatch({ type: 'toggle' });\nconsole.log(store.getState()); // Prints 'on'\n```\n\n當 store 執行 reducer function 時，內部的 state 其實是 `store.getState()` 。\n\n## Action Creators\n\n若需要很多次的 `store.dispatch()`，因為需要一直重複，可能比較容易造成錯誤。這時可以透過 action creator 來回傳 type 屬性，使得程式可以簡化。\n\n```javascript\nconst toggle = () => {\n  return { type: \"toggle\" };\n}\nstore.dispatch(toggle()); // Toggles the light to 'off'\nstore.dispatch(toggle()); // Toggles the light back to 'on'\nstore.dispatch(toggle()); // Toggles the light back to 'off'\n```\n\n## Respond to State Changes\n\n若要觸發 DOM events 來與使用者互動，可以使用 event listener ，這邊當然也可以。\n\n### `store.subscribe()`\n\n也就是說 action 發送給 store 的動作可以使用 `store.subscribe()` 的方法來監聽跟觸發。它只接收一個 listener function 參數，用來做改變 store’s state 的動作。\n\n```javascript\nconst reactToChange = () => console.log('change detected!');\nstore.subscribe(reactToChange);\n```\n\n在這個例子中，每當 action 發送給 store 時，state 就會發生變化，而 `reactToChange()` 這個 listener 就會被執行。而有時候它會用來阻止 listener 響應 store，因此 `store.subscribe()` 也可以返回一個 `unsubscribe` function 來停止相關動作。\n\n一樣舉個例子來看看：\n\n```javascript\n// lightSwitchReducer(), toggle(), and store omitted...\n \nconst reactToChange = () => {\n  console.log(`The light was switched ${store.getState()}!`);\n}\nconst unsubscribe = store.subscribe(reactToChange);\n \nstore.dispatch(toggle());\n// reactToChange() is called, printing:\n// 'The light was switched off!'\n \nstore.dispatch(toggle());\n// reactToChange() is called, printing:\n// 'The light was switched on!'\n \nunsubscribe(); \n// reactToChange() is now unsubscribed\n \nstore.dispatch(toggle());\n// no print statement!\n \nconsole.log(store.getState()); // Prints 'off'\n```\n\n在前兩個 action 發送後，藉由呼叫 `unsubscribe` 來讓 `reactToChange()` 取消對 store 做響應。\n\n## Connect the Redux Store to a UI\n\n要將 Redux store 串接到 UI 需要以下幾個步驟：\n\n1. 創建 Redux store。\n2. 渲染最初的 state。\n3. Subscribe to updates，在 the subscription callback 裡：\n   - 取得 the current store state。\n   - 選擇 UI 所需要的 data。\n   - 用 data 去更新 UI。\n4. 藉由 Redux actions 去響應 UI events。\n\n以下舉個例子，創建 index.html 跟 store.js 檔案來做範例：\n\n```javascript\n<p id='counter'>Waiting for current state.</p>\n<button id='incrementer'>+</button>\n<button id='decrementer'>-</button>\n```\n\n大概說明一下 store.js 裡面的 function：\n\n- `counterElement`, `incrementer`, and `decrementer` : 用來取得 DOM 元素。\n- `render` : 用於響應 store state 做監聽。\n- `incrementerClicked` and `decrementerClicked`: DOM event handlers 為使用者與按鈕的互動做響應。\n\n```javascript\nimport { createStore } from 'redux'\n\nconst { createStore } = require('redux');\n\n// Action Creators\nfunction increment() { \n  return {type: 'increment'}\n}\n\nfunction decrement() { \n  return {type: 'decrement'}\n}\n\n// Reducer / Store\nconst initialState = 0;\nconst countReducer = (state = initialState, action) => {\n  switch (action.type) {\n    case 'increment':\n      return state + 1; \n    case 'decrement':\n      return state - 1; \n    default:\n      return state;\n  }\n};  \nconst store = createStore(countReducer);\n\n// HTML Elements\nconst counterElement = document.getElementById('counter');\nconst incrementer = document.getElementById('incrementer');\nconst decrementer = document.getElementById('decrementer');\n\n// Store State Change Listener\nconst render = () => {\n  counterElement.innerHTML = store.getState();\n}\n\nrender();\nstore.subscribe(render);\n\n// DOM Event Handlers\nconst incrementerClicked = () => {\n  store.dispatch(increment())\n}\nincrementer.addEventListener('click', incrementerClicked);\n \nconst decrementerClicked = () => {\n  store.dispatch(decrement())\n}\ndecrementer.addEventListener('click', decrementerClicked);\n```\n\n### React and Redux\n\n這邊更具體的說明一下 Redux 與 React 串接的常見步驟。\n\n- `render()` function 會被同意去渲染 top-level React component 。\n- 而 React component 會接收 `store.getState()` 目前的 value 當作 prop，並利用這筆資料來渲染 UI。\n- 附加在 React component 上的 event listeners 會發送 actions 到 store去。\n\n這邊舉個 light switch 應用的例子做說明：\n\n- `render()` function 會被註冊到 store。\n- `store.getState()` 會作為 prop 當成 state 傳送到 `<LightSwitch />` component。\n- 這個 `LightSwitch` component 會顯示 the current store state，可能是 `'on'` 或是 `'off'` ，而去相應地改變顏色。\n- `LightSwitch` component 會宣告一個 click 監聽來發送 `toggle()` action 到 store 中。\n\n```javascript\nimport React from 'react';\nimport ReactDOM from 'react-dom';\nimport { createStore } from 'redux';\n\n// REDUX CODE\n///////////////////////////////////\n\nconst toggle = () => {\n  return {type: 'toggle'} \n}\n \nconst initialState = 'off';\nconst lightSwitchReducer = (state = initialState, action) => {\n  switch (action.type) {\n    case 'toggle':\n      return state === 'on' ? 'off' : 'on';\n    default:\n      return state; \n  }\n} \n \nconst store = createStore(lightSwitchReducer);\n\n// REACT CODE\n///////////////////////////////////\n \n// Pass the store's current state as a prop to the LightSwitch component.\nconst render = () => {\n  ReactDOM.render(\n    <LightSwitch \n      state={store.getState()}\n    />,\n    document.getElementById('root')\n  )\n}\n \nrender(); // Execute once to render with the initial state.\nstore.subscribe(render); // Re-render in response to state changes.\n\n// Receive the store's state as a prop.\nfunction LightSwitch(props) {\n  const state = props.state; \n\n  // Adjust the UI based on the store's current state.\n  const bgColor = state === 'on' ? 'white' : 'black';\n  const textColor = state === 'on' ? 'black' : 'white';  \n \n  // The click handler dispatches an action to the store.\n  const handleLightSwitchClick = () => {\n    store.dispatch(toggle());\n  }\n \n  return (  \n    <div style={{background : bgColor, color: textColor}}>\n      <button onClick={handleLightSwitchClick}>\n        {state}\n      </button>\n    </div>\n  )\n}\n```\n\n## 文章參考\n\n[Learn Redux](https://www.codecademy.com/learn/learn-redux)\n\n",
            color: 'white',
          },
        ],
      },
    ],
    username: 'User',
  }

  // Get a key for a new Post.
  const updates: { [key: string]: any } = {}
  updates['/users/' + uid] = postData

  return update(ref(db), updates)
}

const logout = (): Promise<void> => {
  return signOut(auth)
}

export {
  auth,
  db,
  database,
  signInWithGoogle,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  logout,
  handleNewUserData,
}
