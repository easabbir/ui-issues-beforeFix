<<<<<<< HEAD
# wall Remote App

This is the remote application for the demo project. It is designed to be used as a microfrontend and can be consumed by a host application using Webpack Module Federation.

## Prerequisites

-   Node.js (>= 20.x)
-   pnpm (>= 9.x)

## Environment Setup

**Create environment files for development and production:**

`.env.development`

```
NODE_ENV=development
PORT=5000
REMOTE_BASE_URL=http://localhost
```

`.env.production`

```
NODE_ENV=production
PORT=4000
REMOTE_BASE_URL=http://localhost
```

## Running the Application

**Development Mode**

To run the application in development mode:

`pnpm start`

This will start the Webpack development server on the port specified in `.env.development`.

**Production Mode**

To build and serve the application in production mode:

**Build the application:**

`pnpm build`

**Serve the build files:**

`pnpm build:start`

This will serve the build files on the port specified in .env.production.

## Consuming the Remote App

To consume this remote app in a host application, ensure that the host application's Webpack configuration points to the correct URL for the remote application's `remoteEntry.js`.

Example configuration in the host application's Webpack config:

```
new ModuleFederationPlugin({
    name: 'hostApp',
    remotes: {
        wall: 'wall@http://localhost:5000/remoteEntry.js',
    },
    shared: {
        react: {
            singleton: true,
            requiredVersion: deps.react,
        },
        'react-dom': {
            singleton: true,
            requiredVersion: deps['react-dom'],
        },
    },
}),
```
=======
# ui-issues-beforeFix
This is a demo project to show common UI issues which we will be checking in real projects.
>>>>>>> 2422296e5c369d886a741f868ea94c6fdd5d35e5
