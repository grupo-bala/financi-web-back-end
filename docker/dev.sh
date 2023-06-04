#!/bin/bash
npm run db:migrate && npm run db:dev && node build/index.js