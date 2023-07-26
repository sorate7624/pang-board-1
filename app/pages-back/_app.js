// pages/_app.js 또는 pages/_app.tsx
import { Provider } from "react-redux"
import { createStore } from "redux"
import rootReducer from "../store/reducers"

const store = createStore(rootReducer)

function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}

export default App
