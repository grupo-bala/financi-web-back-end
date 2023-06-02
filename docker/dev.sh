#!/bin/bash
npm run db:migrate && npm run db:dev && npm run db:view -- --browser none & node build/index.js