# ZiZo -- Zinthu Zothandiza [Utilities]

⚠️ THIS IS NOT READY FOR USE YET

This package contains helper functions that I use almost everyday in my NodeJs Projects. So, I decided to create a
package. I hope this helps.

### Database Helper Functions

Fundamentally, the functions use Knex and Postgres as Database.

1. Provide a connector and a logger

```
import { ZizoDataAccessor } from 'zizo';
const connector = knexfile('path to knexfile')

const logger = bunyan.createLogger({
    name: 'NAME_OF_APP'
});

const database = new Zizo(connecto, logger);

```

2. Check if record exists

```
 await database.recordExists("TABLE_NAME", 'COLUMN', 'VALUE' )
```