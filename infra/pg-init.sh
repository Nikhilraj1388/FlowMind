#!/bin/bash
# Fix pg_hba.conf to use md5 for all connections
sed -i 's/scram-sha-256/md5/g' /var/lib/postgresql/data/pg_hba.conf
# Also set password with md5
psql -U flowmind -d flowmind_dev -c "ALTER USER flowmind WITH PASSWORD 'flowmind123';"
