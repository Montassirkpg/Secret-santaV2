module.exports = {
    // Définit l'environnement d'exécution des tests sur Node.js
    testEnvironment: 'node',
    
    // Indique où Jest doit chercher les tests
    testMatch: ['**/tests/**/*.js?(x)', '**/?(*.)+(spec|test).js?(x)'],
    
    // Indique à Jest d'effacer les mocks entre chaque test
    clearMocks: true,
    
    // Active la couverture de code
    collectCoverage: true,
    
    // Spécifie les dossiers où la couverture doit être collectée
    collectCoverageFrom: [
      'SANTA/**/*.{js,jsx}',
      '!SANTA/**/*.test.js', // Ignore les fichiers de test
    ],
    
    // Dossier où les rapports de couverture seront stockés
    coverageDirectory: 'coverage',
  
    // Définit les extensions de fichiers à tester
    moduleFileExtensions: ['js', 'json'],
  
    // Timeout par défaut pour chaque test en millisecondes (utile si tu fais des tests asynchrones)
    testTimeout: 10000,
  
    // Ignore les tests dans certains dossiers
    testPathIgnorePatterns: ['/node_modules/'],
  
    // Définir des chemins d'alias si nécessaire
    moduleNameMapper: {
      '^@models/(.*)$': '<rootDir>/SANTA/models/$1', // Exemple d'alias
    },
  };
  