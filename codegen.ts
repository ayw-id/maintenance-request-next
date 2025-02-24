module.exports = {
  overwrite: true,
  schema:'http://localhost:4000/graphql',
  documents: [
    './src/graphql/**/*.gql',
  ],
  generates: {
    './src/graphql/index.tsx': {
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-react-apollo'
      ]
    }
  }
};