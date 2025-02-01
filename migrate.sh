RUN_DB_SEED=${RUN_DB_SEED:='false'}

MIGRATION_PATH=/app/notification-engine/migrations
CONFIG_PATH=/tmp/config.js

# primaryDbConnectionString used below is under single quotes, 
# This is under consideration, that the env doesn't have any double quotes or single quotes
echo "const fs = require('fs'); const { URL } = require('url');  
const parsed = new URL('${primaryDbConnectionString}');
const obj = {
    username: parsed.username, password: parsed.password,
    database: parsed.pathname.split('/')[1],
    host: parsed.host.split(':')[0], port: parsed.port,
    dialect: parsed.protocol.replace(':', ''),
    schema: parsed.searchParams.get('currentSchema') || undefined
};
module.exports = { ${NODE_ENV}: { ...obj } };" > ${CONFIG_PATH}

# if RUN_DB_SEED doesn't exists, then run DB SEED.
if [ "$RUN_DB_SEED" = "false" ]
then
  echo 'Running notification engine DB Migration'
  /app/notification-engine/node_modules/.bin/sequelize db:migrate \
  --migrations-path ${MIGRATION_PATH} \
  --config ${CONFIG_PATH} 
else
  echo 'Running ADMIN DB SEED'
  node dist/database/db.exec.js ${MIGRATION_PATH}
fi

exit 0