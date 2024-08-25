https://www.npmjs.com/package/xlsx-js-style
https://www.npmjs.com/package/exceljs

## Command

- To run the application use the next commands (to test the application access the link: http:// localhost:3000):

```
npm install
npm run dev
```

- To create a docker image use the next command:

```
docker build -t <image-name> .
docker run -p 3000:3000 your-image-name
```

### About the project

# Secure authentication + authorization:

- Refresh token: stored in the httpOnly cookies
- Access token: stored int the react context.

# Custom Hooks

- useAxiosPrivate: custom hook that adds Bearer token to the headers of requests
- useAuth: custom hook that supplies the context
- useRefrshToken: custom hook, that refreshes the access token and ads it to the private axios request

## Docker:

- Dockerfile: set of instructions for Docker image creation
- .dockerignore: files that are not incuded into the container
