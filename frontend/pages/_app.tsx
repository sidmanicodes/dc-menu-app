import { AppProps } from 'next/app';
import './globals.css'; // Global CSS styles

function MyApp({ Component, pageProps }: AppProps) {
  // Any initial setup or state management can be done here
  
  return (
    <div>
      {/* Wrap all pages with a layout component or provide any global context */}
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
