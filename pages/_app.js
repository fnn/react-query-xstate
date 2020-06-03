import { makeServer } from '../mirage';

import CssBaseline from '@material-ui/core/CssBaseline';

if (process.env.NODE_ENV === "development") {
  makeServer({ environment: "development" })
}

export default function MyApp({ Component, pageProps }) {
  return (
    <div>
      <CssBaseline />
      <Component {...pageProps} />
    </div>
  )
}
