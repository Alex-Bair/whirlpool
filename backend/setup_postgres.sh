#!/bin/bash

# Make sure to give file executable privileges. Can suppress errors with 2>/dev/null as well
# Command to give executable priviledges:   chmod +x setup_postgres.sh
# Command to run script:                    ./setup_postgres.sh 2>/dev/null

# create user
sudo -u postgres bash -c "psql -c \"CREATE USER whirlpool WITH SUPERUSER PASSWORD 'password';\""
# create fresh database
sudo -u postgres dropdb --if-exists whirlpool
sudo -u postgres createdb whirlpool

# create schema
psql whirlpool < schema.sql