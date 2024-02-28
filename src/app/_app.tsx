import BoardContextComponent from "@/components/BoardContext";
import { AppProps } from "next/app";

export default function MyApp({ Component, pageProps }: AppProps) {
  console.log(2);
  return (
    <BoardContextComponent>
      <Component {...pageProps} />
    </BoardContextComponent>
  );
}
