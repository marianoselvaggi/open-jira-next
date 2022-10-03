interface SeedData {
    entries: SeedEntry[];
}

interface SeedEntry {
    description: string;
    status: string;
    createdAt: number;
}

export const seedData: SeedData = {
    entries: [
        {
            description: 'Nisi officia labore cupidatat duis irure Lorem magna.',
            status: 'pending',
            createdAt: Date.now(),  
          },
          {
            description: 'Voluptate reprehenderit non nostrud amet ullamco Lorem veniam voluptate adipisicing duis enim deserunt cillum qui.',
            status: 'in-progress',
            createdAt: Date.now(),  
          },
          {
            description: 'Tempor aute aliqua velit enim magna sint.',
            status: 'in-progress',
            createdAt: Date.now() - 1000000,  
          },
          {
            description: 'Tempor magna amet occaecat aute eu.',
            status: 'finished',
            createdAt: Date.now() - 100000,  
          }
    ]
}