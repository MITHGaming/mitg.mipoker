const env = {
  SOCKET: {
    URL: process.env.NEXT_PUBLIC_SOCKET_URL || `http://localhost:3001`,
  },
  googleProvider: {
    clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || ``,
    clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET || ``,
  },
  nextAuth: {
    secret: process.env.NEXT_PUBLIC_NEXT_AUTH_SECRET || ``,
  },
};

export default env;
