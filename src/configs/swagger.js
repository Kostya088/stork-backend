import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Stork API',
      version: '1.0.0',
      description: 'API for pregnancy tracking application',
    },
    servers: [
      {
        url: 'https://stork-backend.onrender.com',
        description: 'Development server',
      },
    ],
    components: {
      securitySchemes: {
        refreshToken: {
          type: 'apiKey',
          in: 'cookie',
          name: 'refreshToken',
        },
      },
      schemas: {
        User: {
          type: 'object',
          properties: {
            name: { type: 'string', maxLength: 32 },
            email: { type: 'string', format: 'email', maxLength: 64 },
            avatar: { type: 'string' },
            gender: { type: 'string', enum: ['male', 'female'] },
            dueDate: { type: 'string', format: 'date' },
            theme: { type: 'string', enum: ['light', 'blue', 'pink'] },
          },
        },
        RegisterUser: {
          type: 'object',
          required: ['name', 'email', 'password', 'dueDate'],
          properties: {
            name: { type: 'string', maxLength: 32 },
            email: { type: 'string', format: 'email', maxLength: 64 },
            password: { type: 'string', minLength: 8, maxLength: 128 },
            avatar: { type: 'string' },
            gender: { type: 'string', enum: ['male', 'female', 'null'] },
            dueDate: { type: 'string', pattern: '^\\d{4}-\\d{2}-\\d{2}$' },
          },
        },
        LoginUser: {
          type: 'object',
          required: ['email', 'password'],
          properties: {
            email: { type: 'string', format: 'email' },
            password: { type: 'string' },
          },
        },
        Task: {
          type: 'object',
          properties: {
            _id: { type: 'string' },
            name: { type: 'string', maxLength: 96 },
            date: { type: 'string', format: 'date' },
            isDone: { type: 'boolean' },
            userId: { type: 'string' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' },
          },
        },
        CreateTask: {
          type: 'object',
          required: ['name', 'date'],
          properties: {
            name: { type: 'string', maxLength: 96 },
            date: { type: 'string', pattern: '^\\d{4}-\\d{2}-\\d{2}$' },
          },
        },
        UpdateTask: {
          type: 'object',
          required: ['isDone'],
          properties: {
            isDone: { type: 'boolean' },
          },
        },
        Diary: {
          type: 'object',
          properties: {
            _id: { type: 'string' },
            title: { type: 'string', maxLength: 64 },
            description: { type: 'string', maxLength: 1000 },
            date: { type: 'string' },
            emotions: { type: 'array', items: { type: 'string' } },
            userId: { type: 'string' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' },
          },
        },
        CreateDiary: {
          type: 'object',
          required: ['title', 'description', 'emotions'],
          properties: {
            title: { type: 'string', maxLength: 64 },
            description: { type: 'string', maxLength: 1000 },
            date: { type: 'string' },
            emotions: {
              type: 'array',
              items: { type: 'string' },
              minItems: 1,
              maxItems: 12,
            },
          },
        },
        UpdateDiary: {
          type: 'object',
          properties: {
            title: { type: 'string', maxLength: 64 },
            description: { type: 'string', maxLength: 1000 },
            date: { type: 'string' },
            emotions: {
              type: 'array',
              items: { type: 'string' },
              minItems: 1,
              maxItems: 12,
            },
          },
        },
        Emotion: {
          type: 'object',
          properties: {
            _id: { type: 'string' },
            title: { type: 'string' },
          },
        },
        WeekPublic: {
          type: 'object',
          properties: {
            weekNumber: { type: 'integer' },
            daysUntilDue: { type: 'integer' },
            tipForMom: { type: 'string', nullable: true },
            babyInfo: {
              type: 'object',
              properties: {
                analogy: { type: 'string', nullable: true },
                image: { type: 'string', nullable: true },
                development: { type: 'string', nullable: true },
              },
              nullable: true,
            },
          },
        },
        WeekCurrent: {
          type: 'object',
          properties: {
            weekNumber: { type: 'integer' },
            daysUntilDue: { type: 'integer' },
            tipForMom: { type: 'string', nullable: true },
            babyInfo: {
              type: 'object',
              properties: {
                gender: { type: 'string', nullable: true },
                analogy: { type: 'string', nullable: true },
                image: { type: 'string', nullable: true },
                development: { type: 'string', nullable: true },
                size: { type: 'number' },
                weight: { type: 'number' },
              },
              nullable: true,
            },
          },
        },
        BabyInfo: {
          type: 'object',
          properties: {
            weekNumber: { type: 'integer' },
            development: { type: 'string', nullable: true },
            size: { type: 'number' },
            weight: { type: 'number' },
            analogy: { type: 'string', nullable: true },
            image: { type: 'string', nullable: true },
          },
        },
        MomInfo: {
          type: 'object',
          properties: {
            weekNumber: { type: 'integer' },
            symptoms: { type: 'array', items: { type: 'string' } },
            bodyChanges: { type: 'string', nullable: true },
            tips: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  category: { type: 'string' },
                  tip: { type: 'string' },
                },
              },
            },
          },
        },
        Error: {
          type: 'object',
          properties: {
            error: { type: 'string' },
          },
        },
        ValidationError: {
          type: 'object',
          properties: {
            statusCode: { type: 'integer' },
            error: { type: 'string' },
            message: { type: 'string' },
          },
        },
      },
    },
  },
  apis: ['./src/routes/*.js'],
};

export const specs = swaggerJsdoc(options);
