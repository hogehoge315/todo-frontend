import { Provider } from "@/components/ui/provider"
import { AppProps } from "next/app";

function App({ Component, pageProps }: AppProps) {
  return (
    <Provider>
      <Component {...pageProps} />
    </Provider>
  )
}