'use client'

// import { Poppins } from "next/font/google";
import "./globals.css";
import { ApolloProvider } from '@apollo/client';
import { ClientApollo } from "./apolloClient";
import { RequestFormStateProvider } from '../context/maintenanceRequestContext';

// const poppins = Poppins({
//   weight: "400"
// });

const isServer = typeof window === 'undefined';
const apollo = new ClientApollo(isServer);
const client = apollo.getClient();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`h-screen bg-[#F8F8FF] text-black`}
      >
        <ApolloProvider client={client}>
          <RequestFormStateProvider>
            {children}
          </RequestFormStateProvider>
        </ApolloProvider>
      </body>
    </html>
  );
}
