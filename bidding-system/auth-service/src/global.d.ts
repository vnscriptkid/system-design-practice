// // https://stackoverflow.com/questions/45194598/using-process-env-in-typescript
declare global {
    namespace NodeJS {
        interface ProcessEnv {
            AUTH0_PUBLIC_KEY: Secret;
        }
    }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
// export {}